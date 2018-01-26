using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using doglogbook_web.Email;
using Microsoft.AspNet.Identity;
using Postal;

namespace doglogbook_web.IoC.Installers
{
    public class EmailInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IEmailService>()
                    .UsingFactoryMethod(() => Postal.Email.CreateEmailService()));

            container.Register(
                Component.For<IIdentityMessageService>()
                    .ImplementedBy<EmailMessageService>());
        }
    }
}