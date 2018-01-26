using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using HtmlTags;
using NLog;
using NLog.Common;
using NLog.Config;
using NLog.Layouts;
using NLog.Targets;
using Postal;

namespace StatsOne.Components.Logging.Targets
{
    public class PostalTarget : Target
    {
        private IEmailService EmailService { get; }
        private string EmailView { get; }

        [RequiredParameter]
        public Layout To { get; set; }
        public Layout Subject { get; set; }
        public Layout Body { get; set; }
        public Layout Header { get; set; }
        public Layout Footer { get; set; }

        public PostalTarget(IEmailService emailService, string emailView)
        {
            EmailService = emailService;
            EmailView = emailView;

            Subject = "${level:uppercase=true}: Log Alert from ${machinename}";
            Header = "${level:uppercase=true} message from ${logger} on ${machinename}";

            Func<string, string> header = name => new HtmlTag("h1")
                .Text(name)
                .ToString();

            Func<string, string, string> item = (n, v) => new HtmlTag("div")
                .Append(new HtmlTag("strong").AppendHtml(n))
                .Append("br")
                .AppendHtml(v)
                .Append("br")
                .ToString();

            Func<string, string> pre = v => new HtmlTag("pre")
                .Style("white-space", "pre-wrap")
                .Style("word-wrap", "break-word")
                .Text(v)
                .ToString();

            var body = new TagBuilder("div")
            {
                InnerHtml = header("General") +
                            item("Time", "${longdate}") +
                            item("Level", "${level}") +
                            item("Message", "${message}") +
                            header("Request") +
                            item("User", "${aspnet-user-identity}") +
                            item("Url", "${aspnet-request:HTTP_URL}") +
                            item("Host", "${aspnet-request:HTTP_HOST}") +
                            item("Server Name", "${aspnet-request:SERVER_NAME}") +
                            item("User Agent", "${aspnet-request:HTTP_USER_AGENT}") +
                            item("Http Version", "${aspnet-request:HTTP_VERSION}") +
                            item("Https", "${aspnet-request:HTTPS}") +
                            item("Query String", "${aspnet-request:QUERY_STRING}") +
                            item("Remote Address", "${aspnet-request:REMOTE_ADDR}") +
                            header("Exception") +
                            item("Type", pre("${exception:format=Type}")) +
                            item("Message", pre("${exception:format=Message}")) +
                            item("Method", pre("${exception:format=Method}")) +
                            item("Stack Trace", pre("${exception:format=StackTrace}"))
            };
            Body = $"{body}";
            Footer = "Sent from ${machinename}";
        }

        protected override void Write(LogEventInfo logEvent)
        {
            EmailService.Send(GenerateEmail(logEvent));
        }

        protected override void Write(AsyncLogEventInfo logEvent)
        {
            EmailService.Send(GenerateEmail(logEvent.LogEvent));
            logEvent.Continuation(null);
        }

        private Email GenerateEmail(LogEventInfo logEvent)
        {
            dynamic email = new Email(EmailView);
            email.To = To.Render(logEvent);
            email.Subject = Subject.Render(logEvent);
            email.Header = Header.Render(logEvent);
            email.Body = new MvcHtmlString(Body.Render(logEvent));
            email.Footer = Footer.Render(logEvent);
            return email;
        }
    }
}
