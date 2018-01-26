using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using NLog;
using NLog.Config;
using NLog.Layouts;
using NLog.Targets;
using StackExchange.Redis;

namespace StatsOne.Components.Logging
{
    public static class Logging
    {
        public static void Init(params Target[] targets)
        {
            var config = new LoggingConfiguration();
            foreach (var target in targets)
            {
                config.AddTarget(target);
                var rule = new LoggingRule("*", LogLevel.Info, target);
                config.LoggingRules.Add(rule);
            }

            LogManager.Configuration = config;
        }

        public static RedisTarget CreateRedisTarget(IConnectionMultiplexer connectionMultiplexer, int db)
        {
            var redisConnectionManager = new RedisConnectionManager(connectionMultiplexer, db);

            var exceptionLayout = new JsonLayout
            {
                Attributes =
                {
                    new JsonAttribute("type", "${exception:format=Type}"),
                    new JsonAttribute("message", "${exception:format=Message}"),
                    new JsonAttribute("method", "${exception:format=Method}"),
                    new JsonAttribute("stackTrace", "${exception:format=StackTrace}"),
                    new JsonAttribute("data", "${exception:format=Data}")
                }
            };

            var requestLayout = new JsonLayout
            {
                Attributes =
                {
                    new JsonAttribute("httpUrl", "${aspnet-request:HTTP_URL}"),
                    new JsonAttribute("httpHost", "${aspnet-request:HTTP_HOST}"),
                    new JsonAttribute("serverName", "${aspnet-request:SERVER_NAME}"),
                    new JsonAttribute("httpUserAgent", "${aspnet-request:HTTP_USER_AGENT}"),
                    new JsonAttribute("httpVersion", "${aspnet-request:HTTP_VERSION}"),
                    new JsonAttribute("https", "${aspnet-request:HTTPS}"),
                    new JsonAttribute("httpMethod", "${aspnet-request:HTTP_METHOD}"),
                    new JsonAttribute("queryString", "${aspnet-request:QUERY_STRING}"),
                    new JsonAttribute("remoteAddress", "${aspnet-request:REMOTE_ADDR}"),
                    new JsonAttribute("user", "${aspnet-user-identity}")
                }
            };

            var layout = new JsonLayout
            {
                Attributes =
                {
                    new JsonAttribute("time", "${date:universalTime=true:format=yyyy-MM-ddTHH\\:mm\\:ss.fff}"),
                    new JsonAttribute("level", "${uppercase:${level}}"),
                    new JsonAttribute("message", "${message}"),
                    new JsonAttribute("exception", exceptionLayout, false),
                    new JsonAttribute("request", requestLayout, false)
                }
            };

            return new RedisTarget(redisConnectionManager)
            {
                Name = "redis",
                DataType = "list",
                Layout = layout,
                Key = "log",
            };
        }

        public class LogEntry
        {
            public DateTime Time { get; set; }
            public string Level { get; set; }
            public string Message { get; set; }
            public LogRequestEntry Request { get; set; }
            public LogExceptionEntry Exception { get; set; }

            public class LogRequestEntry
            {
                public Uri HttpUrl { get; set; }
                public string HttpHost { get; set; }
                public string ServerName { get; set; }
                public string HttpUserAgent { get; set; }
                public string HttpVersion { get; set; }
                public string Https { get; set; }
                public string HttpMethod { get; set; }
                public string QueryString { get; set; }
                public string RemoteAddr { get; set; }
                public string User { get; set; }
            }

            public class LogExceptionEntry
            {
                public string Type { get; set; }
                public string Method { get; set; }
                public string Message { get; set; }
                public string StackTrace { get; set; }
                public string Data { get; set; }
            }
        }
    }
}
