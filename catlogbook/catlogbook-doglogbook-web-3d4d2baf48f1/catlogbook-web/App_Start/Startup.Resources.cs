using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Castle.MicroKernel;
using Doglogbook.EntityFramework.DAL;
using Hangfire;
using SmartSports.Data.I18N;

namespace doglogbook_web
{
    public partial class Startup
    {
        private static void ConfigureI18N(IKernel kernel)
        {
            BackgroundJob.Enqueue(() => UpdateResourceCache());
            RecurringJob.AddOrUpdate(() => UpdateResourceCache(), Cron.Hourly);
        }


        public static void UpdateResourceCache()
        {
            var kernel = MvcApplication.Container.Kernel;
            var dbContext = kernel.Resolve<DoglogbookDbContext>();
            var cache = kernel.Resolve<MemoryResourceProvider>();

            foreach (var resource in dbContext.Resources.ToList())
            {
                cache.SaveResource(resource.Name, resource.Value, resource.Culture, resource.ApplicationName, true);
            }
        }
    }
}