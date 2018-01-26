using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

using Castle.Windsor;
using Castle.Windsor.Installer;
using System.Web.Optimization;
using Doglogbook_WebApi.IoC;
using StatsOne.Components.AssetService;

namespace Doglogbook_WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {

        public static WindsorContainer Container { get; private set; }

        public WebApiApplication()
        {
            Container = new WindsorContainer();
        }


        private void InstallDependencies()
        {
            Container.Install(FromAssembly.This());
            Assets.Service = Container.Resolve<IAssetService>();
        }

        private void RegisterDependencyResolver()
        {
            GlobalConfiguration.Configuration.DependencyResolver = new WindsorDependencyResolver(Container.Kernel);
        }


        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            // IoC
            this.RegisterDependencyResolver();
            this.InstallDependencies();

            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
