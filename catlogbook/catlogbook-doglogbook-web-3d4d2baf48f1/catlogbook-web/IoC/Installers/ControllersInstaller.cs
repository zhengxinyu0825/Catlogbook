using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using SmartSports.Data.I18N.Context;

namespace doglogbook_web.IoC.Installers
{
    public class ControllersInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<ViewDataDictionary>()
                    .UsingFactoryMethod(() =>
                    {
                        var viewData = new ViewDataDictionary
                        {
                            ["I18NContext"] = container.Resolve<IInternationalizationResourceContext>(),
                            ["I18NContextFactory"] = container.Resolve<IInternationalizationResourceContextFactory>()
                        };
                        return viewData;
                    })
                    .LifestyleTransient());

            container.Register(Classes.FromThisAssembly()
                .BasedOn<IController>()
                .LifestyleTransient());

            container.Register(Component.For<HttpRequestBase>()
                .LifeStyle.PerWebRequest
                .UsingFactoryMethod(() => new HttpRequestWrapper(HttpContext.Current.Request)));

            container.Register(Component.For<HttpContextBase>()
                .LifeStyle.PerWebRequest
                .UsingFactoryMethod(() => new HttpContextWrapper(HttpContext.Current)));
        }
    }
}