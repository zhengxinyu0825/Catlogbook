using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Doglogbook.EntityFramework.DAL;
using Doglogbook.EntityFramework.DAL.User;
using Doglogbook.EntityFramework.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;

namespace doglogbook_web.IoC.Installers
{
    public class UserManagementInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<DataProtectorTokenProvider<Member, int>>()
                    .DependsOn(new {protector = new MachineKeyProtectionProvider().Create("ConfirmationToken")})
                    .LifestyleTransient());

            container.Register(
                Component.For<IMemberStore>()
                    .ImplementedBy(typeof(MemberStore))
                    .DependsOn(new
                    {
                        Context = container.Resolve<DoglogbookDbContext>()
                    })
                    .LifestylePerWebRequest());

            container.Register(
                Component.For<MemberManager>()
                    .UsingFactoryMethod(() =>
                    {
                        var memberManager = new MemberManager(container.Resolve<IMemberStore>());
                        memberManager.UserValidator = new MemberValidator(memberManager);
                        memberManager.EmailService = container.Resolve<IIdentityMessageService>();
                        memberManager.UserTokenProvider = container.Resolve<DataProtectorTokenProvider<Member, int>>();
                        return memberManager;
                    })
                    .LifestylePerWebRequest());

            container.Register(
                Component.For<IRoleStore<AppRole, int>>()
                    .ImplementedBy(typeof (RoleStore<AppRole, int, MemberRole>))
                    .DependsOn(new
                    {
                        Context = container.Resolve<DoglogbookDbContext>()
                    })
                    .LifestylePerWebRequest());

            container.Register(Component.For<IOwinContext>()
                .UsingFactoryMethod(() => HttpContext.Current.GetOwinContext())
                .LifestylePerWebRequest());

            container.Register(Component.For<IAuthenticationManager>()
                .UsingFactoryMethod(() => container.Resolve<IOwinContext>().Authentication));
        }
    }
}