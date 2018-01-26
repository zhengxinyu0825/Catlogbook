using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace doglogbook_web.IoC.Installers
{
    public class DatabaseInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Classes.FromAssemblyInDirectory(new AssemblyFilter(HttpRuntime.BinDirectory))
                    .BasedOn<DbContext>()
                    .Configure(c => c.LifeStyle.HybridPerWebRequestTransient()));
        }
    }
}