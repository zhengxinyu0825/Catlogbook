using AutoMapper;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Tasks;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Doglogbook_WebApi.Models
{

    public class PetViewModel
    {
        public int? Id { get; set; }

        [Required, MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public int PetSubtypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubtype { get; set; }

        [Required]
        public int OwnerId { get; set; }
        public virtual UserInfoViewModel Owner { get; set; }

        public IEnumerable<PetBreedViewModel> PetBreeds { get; set; }

        [Required]
        public PetSex Sex { get; set; }

        public DateTime Registered { get; set; }

        public bool? Desexed { get; set; }
        public AgeDesexed? AgeDesexed { get; set; }
        public AgeAcquired? AgeAcquired { get; set; }
        public int? HousedId { get; set; }
        [MaxLength(15)]
        public string MicrochipNumber { get; set; }

        public bool? Insured { get; set; }

        public int? TrainerId { get; set; }
        public int? SeizureDiagnosisId { get; set; }

        [DataType(DataType.ImageUrl)]
        public string PhotoLink { get; set; }

        public int? PetSeizureId { get; set; }
        public virtual PetSeizureViewModel PetSeizure { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetViewModel, Pet>()
                .ForMember(d => d.Registered, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.OwnerId, o => o.Ignore())
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Pet, PetViewModel>();
        }
    }

    public class PetUpdateViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public int PetSubtypeId { get; set; }

        [Required]
        public int OwnerId { get; set; }

        public IEnumerable<PetBreedViewModel> PetBreeds { get; set; }

        [Required]
        public PetSex Sex { get; set; }

        public bool? Desexed { get; set; }
        public AgeDesexed? AgeDesexed { get; set; }
        public AgeAcquired? AgeAcquired { get; set; }
        public int? HousedId { get; set; }

        [MaxLength(15)]
        public string MicrochipNumber { get; set; }

        public bool? Insured { get; set; }

        public int? TrainerId { get; set; }
        public int? SeizureDiagnosisId { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetUpdateViewModel, Pet>();
        }
    }


    public class PetBreedViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int BreedId { get; set; }
        public virtual BreedViewModel Breed { get; set; }

        [Required]
        public int Percentage { get; set; }


        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetBreedViewModel, PetBreed>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<PetBreed, PetBreedViewModel>();
        }
    }

    public class PetAvatarViewModel
    {
        public string Data { get; set; }
    }

    public class PetTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetTypeViewModel, PetType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<PetType, PetTypeViewModel>();
        }
    }

    public class PetDeleteStatusViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetDeleteStatusViewModel, PetDeleteStatus>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<PetDeleteStatus, PetDeleteStatusViewModel>();
        }
    }

    public class PetSubTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public int PetTypeId { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetSubTypeViewModel, PetSubType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<PetSubType, PetSubTypeViewModel>();
        }
    }

    public class BreedViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<BreedViewModel, Breed>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Breed, BreedViewModel>();
        }
    }

    public class WeightBindingModel
    {
        [Required]
        public float Weight { get; set; }

        [Required]
        public string Units { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<WeightBindingModel, TimeSeries>()
                .ForMember(d => d.Weight, o => o.MapFrom(s => s.Weight))
                .ForMember(d => d.WeightUnits, o => o.MapFrom(s => s.Units));
        }
    }

    public class WeightViewModel
    {
        public float? Weight { get; set; }

        public string Units { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TimeSeries, WeightViewModel>()
                .ForMember(d => d.Weight, o => o.MapFrom(s => s.Weight))
                .ForMember(d => d.Units, o => o.MapFrom(s => s.WeightUnits));
        }
    }


    public class TimelineViewModel
    {
        public string Name { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Type { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TimelineViewModel, Timeline>();
            Mapper.CreateMap<Timeline, TimelineViewModel>();
        }
    }

    public class TimeSeriesViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int PetId { get; set; }

        public float? Weight { get; set; }

        public string WeightUnits { get; set; }

        public DateTimeOffset DateCreated { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TimeSeriesViewModel, TimeSeries>()
                  .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now));

            Mapper.CreateMap<TimeSeries, TimeSeriesViewModel>();
        }
    }
}