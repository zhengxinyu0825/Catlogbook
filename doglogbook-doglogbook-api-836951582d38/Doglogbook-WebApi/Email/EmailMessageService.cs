using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Postal;

namespace Doglogbook_WebApi.Email
{
    public class EmailMessageService : IIdentityMessageService
    {
        IEmailService EmailService { get; }

        public EmailMessageService(IEmailService emailService)
        {
            EmailService = emailService;
        }

        public async Task SendAsync(IdentityMessage message)
        {
            dynamic email = new Postal.Email("IdentityMessage");
            email.To = message.Destination;
            email.Subject = message.Subject;
            email.Body = message.Body;

            await EmailService.SendAsync(email);
        }
    }
}