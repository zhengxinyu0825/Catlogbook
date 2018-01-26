using System.Web.Http;
using System.Web.Http.Dispatcher;

using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace Doglogbook_WebApi.IoC.Installers
{
    public class WindsorWebApiInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(AllTypes.FromThisAssembly().BasedOn<ApiController>().LifestyleScoped());
        }
    }
}