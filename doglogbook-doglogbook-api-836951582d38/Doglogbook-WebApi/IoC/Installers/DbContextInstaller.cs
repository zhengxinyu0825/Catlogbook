using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace Doglogbook_WebApi.IoC.Installers
{
    public class DbContextInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            var allTypesFromBinDir = Classes
                        .FromAssemblyInDirectory(new AssemblyFilter(HttpRuntime.BinDirectory));

            container.Register(
                allTypesFromBinDir
                .BasedOn<DbContext>()
                .LifestylePerWebRequest());
        }
    }
}