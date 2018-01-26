using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Castle.DynamicProxy;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Doglogbook.EntityFramework.DAL;
using SmartSports.Data.I18N;
using SmartSports.Data.I18N.Context;
using SmartSports.Mvc;

namespace doglogbook_web.IoC.Installers
{
    public class InternationalizationInstallers : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            var fallback = new Fallback<IResourceProvider>(container, e => { }, 15);
            fallback.Register(c => c.Resolve<MemoryResourceProvider>());
            fallback.Register(c => c.Resolve<DbResourceProvider>());
            fallback.Configure("SaveResource", new FallbackMethodOptions {EvaluateAll = true});

            container.Register(
                Component.For<ProxyGenerator>());

            var fallbackCulture = new CultureInfo("en");
            container.Register(
                Component.For<DbResourceProvider>()
                    .DependsOn(new
                    {
                        dbContext = container.Resolve<DoglogbookDbContext>(),
                        fallbackCulture
                    })
                    .LifeStyle.HybridPerWebRequestTransient());

            container.Register(
                Component.For<MemoryResourceProvider>()
                    .DependsOn(new
                    {
                        backendProvider = container.Resolve<DbResourceProvider>(),
                        fallbackCulture
                    })
                    .LifeStyle.HybridPerWebRequestTransient());

            container.Register(
                Component.For<IResourceProvider>()
                    .Instance(fallback.Object)
                    .LifestyleSingleton());

            container.Register(
                Component.For<IInternationalizationResourceContextFactory>()
                    .ImplementedBy(typeof (InternationalizationResourceContextFactory))
                    .LifeStyle.HybridPerWebRequestTransient());

            container.Register(
                Component.For<IInternationalizationResourceContext>()
                    .UsingFactoryMethod(
                        kernel => 
                            kernel.Resolve<IInternationalizationResourceContextFactory>().Create("DogLogBook", true))
                    .LifeStyle.HybridPerWebRequestTransient());
        }
    }
}