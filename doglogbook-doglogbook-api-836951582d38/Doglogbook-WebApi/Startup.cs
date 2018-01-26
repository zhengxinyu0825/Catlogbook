using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Doglogbook_WebApi.Startup))]

namespace Doglogbook_WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            AutoMapConfig.CreateMaps();
            ConfigureAuth(app);
        }
    }
}
