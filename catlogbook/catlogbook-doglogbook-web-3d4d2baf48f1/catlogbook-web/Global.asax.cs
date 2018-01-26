using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Castle.Core.Internal;
using Castle.MicroKernel;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Castle.Windsor.Installer;
using doglogbook_web.IoC;
using doglogbook_web.IoC.Installers;

namespace doglogbook_web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public static IWindsorContainer Container { get; set; }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            BootstrapContainer();
        }

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
        }

        private static void BootstrapContainer()
        {
            var firstInstallers = new[]
            {
                typeof (DatabaseInstaller),
                typeof (InternationalizationInstallers)
            };

            var installers = firstInstallers.Concat(
                Assembly.GetCallingAssembly()
                    .GetTypes()
                    .Where(t => t.GetInterfaces().Contains(typeof (IWindsorInstaller)))
                    .Except(firstInstallers)
                );

            Container = new WindsorContainer()
                .Install(installers.Select(t => t.CreateInstance<IWindsorInstaller>()).ToArray());

            var controllerFactory = new WindsorControllerFactory(Container.Kernel);
            ControllerBuilder.Current.SetControllerFactory(controllerFactory);
        }

        protected void Application_End()
        {
            Container.Dispose();
        }
    }
}
