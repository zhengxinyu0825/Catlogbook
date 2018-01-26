using System.Configuration;
using Hangfire;
using Hangfire.Dashboard;
using Microsoft.Owin;
using Owin;
using SmartSports.Data.I18N.Context;
using SmartSports.Data.I18N.Models;

[assembly: OwinStartupAttribute(typeof(doglogbook_web.Startup))]
namespace doglogbook_web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var kernel = MvcApplication.Container.Kernel;

            GlobalConfiguration.Configuration
                .UseSqlServerStorage(ConfigurationManager.AppSettings["DoglogbookDbConnection"]);

            var options = new DashboardOptions
            {
                AuthorizationFilters = new[]
                {
                    new AuthorizationFilter { Roles = "Admin" }
                }
            };

            app.UseHangfireDashboard("/hangfire", options);
            app.UseHangfireServer();

            ConfigureAuth(app, kernel);
            ConfigureI18N(kernel);
            ConfigureTasks(app, kernel);

            DisplayResourceType.Configuration =
                new DisplayResourceTypeConfiguration(() => kernel.Resolve<IInternationalizationResourceContextFactory>()) { SaveMissingResources = true };
        }
    }
}
