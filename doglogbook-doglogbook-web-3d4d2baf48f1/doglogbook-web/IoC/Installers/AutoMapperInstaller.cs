using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using AutoMapper;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace doglogbook_web.IoC.Installers
{
    public class AutoMapperInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            var config = new MapperConfiguration(c =>
            {
                var types = Assembly.GetExecutingAssembly().GetTypes();
                var methods = types
                    .SelectMany(t => t.GetMethods(BindingFlags.Public | BindingFlags.Static));

                var autoMapMethods = methods
                    .Where(m => m.Name.Equals("AutoMapper_CreateMaps") && m.MemberType == MemberTypes.Method);

                foreach (var method in autoMapMethods)
                {
                    method.Invoke(null, new object[] {c});
                }
            });

            container.Register(
                Component.For<MapperConfiguration>()
                    .Instance(config)
                    .LifestyleSingleton());

            container.Register(
                Component.For<IMapper>()
                    .UsingFactoryMethod(kernel => kernel.Resolve<MapperConfiguration>().CreateMapper()));

        }
    }
}