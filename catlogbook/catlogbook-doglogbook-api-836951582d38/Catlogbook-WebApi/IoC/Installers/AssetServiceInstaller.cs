using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using StatsOne.Components.AssetService;
using StatsOne.Components.Cloudinary;

namespace Doglogbook_WebApi.IoC.Installers
{
    public class AssetServiceInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Component.For<CloudinaryDotNet.Cloudinary>()
                .UsingFactoryMethod(() =>
                {
                    dynamic config = new Formo.Configuration();
                    return Cloudinary.Create(new CloudinaryAccountCredentials
                    {
                        CloudName = config.CloudinaryAccountName,
                        ApiKey = config.CloudinaryKey,
                        ApiSecret = config.CloudinarySecret
                    });
                })
                .LifestyleTransient());

            container.Register(Component.For<IAssetService>()
                .ImplementedBy(typeof(CloudinaryService))
                .DependsOn(new
                {
                    cloudinaryInstance = container.Resolve<CloudinaryDotNet.Cloudinary>(),
                    Salt = ConfigurationManager.AppSettings["CloudinarySalt"]
                }).LifestyleTransient());
        }
    }
}