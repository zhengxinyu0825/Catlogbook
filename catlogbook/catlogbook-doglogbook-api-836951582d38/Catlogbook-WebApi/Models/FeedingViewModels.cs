using AutoMapper;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Feeding;
using Doglogbook.EntityFramework.Models.Reports;
using Doglogbook.EntityFramework.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Doglogbook_WebApi.Models
{

    public class FeedViewModel
    {
        public int? Id { get; set; }

        [Required]
        public DateTimeOffset DateCreated { get; set; }

        [Required]
        public int FeedingTypeId { get; set; }
        public virtual FeedingTypeViewModel FeedingType { get; set; }

        public int RecordedById { get; set; }

        public virtual ICollection<FeedItemViewModel> FeedItems { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<FeedViewModel, Feed>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now));

            Mapper.CreateMap<Feed, FeedViewModel>();
        }
    }

    public class FeedingTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<FeedingTypeViewModel, FeedingType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<FeedingType, FeedingTypeViewModel>();
        }
    }

    public class FeedingTypeFrecuencyViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int FeedingTypeId { get; set; }
        public virtual FeedingTypeViewModel FeedingType { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<FeedingTypeFrecuencyViewModel, FeedingTypeFrecuency>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<FeedingTypeFrecuency, FeedingTypeFrecuencyViewModel>();
        }
    }

    public class FeedItemViewModel
    {
        public int? Id { get; set; }

        public int? FoodTypeId { get; set; }
        public virtual FoodTypeViewModel FoodType { get; set; }

        public int? FoodProductId { get; set; }
        public virtual FoodProductViewModel FoodProduct { get; set; }

        public int? FeedingTypeFrecuencyId { get; set; }
        public FeedingTypeFrecuencyViewModel FeedingTypeFrecuency { get; set; }

        public int? FeedingUnitId { get; set; }
        public virtual FeedingUnitViewModel FeedingUnit { get; set; }

        public float? Amount { get; set; }

        public string Other { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<FeedItemViewModel, FeedItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<FeedItem, FeedItemViewModel>();
        }

    }

    public class FeedingUnitViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<FeedingUnitViewModel, FeedingUnit>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<FeedingUnit, FeedingUnitViewModel>();
        }
    }

    public class FoodBrandViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int CountryId { get; set; }

        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<FoodBrandViewModel, FoodBrand>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<FoodBrand, FoodBrandViewModel>();
        }
    }

    public class FoodProductViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int FoodBrandId { get; set; }
        public virtual FoodBrandViewModel FoodBrand { get; set; }

        [Required]
        public int FoodTypeId { get; set; }
        public virtual FoodTypeViewModel FoodType { get; set; }

        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<FoodProductViewModel, FoodProduct>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<FoodProduct, FoodProductViewModel>();
        }
    }

    public class FoodTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public int Order { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<FoodTypeViewModel, FoodType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<FoodType, FoodTypeViewModel>();
        }
    }
}