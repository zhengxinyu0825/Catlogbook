using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Castle.MicroKernel;
using Doglogbook.EntityFramework.DAL;
using Hangfire;
using Owin;

namespace doglogbook_web
{
    public partial class Startup
    {
        public void ConfigureTasks(IAppBuilder app, IKernel kernel)
        {
         
        }

    }
}