using AutoMapper;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Reports;
using Doglogbook.EntityFramework.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Doglogbook_WebApi.Models
{
    public class ReportViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public int ReportTypeId { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ReportViewModel, Report>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Report, ReportViewModel>();
        }
    }

    public class EventViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        public String Abbreviation { get; set; }
        public int MaxValue { get; set; }
        public int MinValue { get; set; }
        public int SequenceNumber { get; set; }
        public string Icon { get; set; }
        public bool GetDefault { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<EventViewModel, Event>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Event, EventViewModel>();
        }
    }

    public class ReportTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public int ReportTypeId { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ReportTypeViewModel, ReportType>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ReportType, ReportTypeViewModel>();
        }
    }

    public class ReportEventViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string ReportId { get; set; }
        public ReportItemViewModel Report { get; set; }

        [Required]
        public string EventId { get; set; }
        public EventItemViewModel Event { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ReportEventViewModel, ReportEvent>().ReverseMap();
        }
    }

    public class ActivityRateViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int RateId { get; set; }
        public RateViewModel Rate { get; set; }

        public string Comment { get; set; }

        public int? Duration { get; set; }

        [Required]
        public DateTimeOffset DateRegistered { get; set; }

        [Required]
        public DateTimeOffset DateCreated { get; set; }

        [Required]
        public int ReportEventId { get; set; }
        public virtual ReportEventViewModel ReportEvent { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ActivityRateViewModel, ActivityRate>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ActivityRate, ActivityRateViewModel>();
        }

    }

    public class ReportItemViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ReportItemViewModel, Report>().ReverseMap();
        }
    }

    public class EventItemViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<EventItemViewModel, Event>().ReverseMap();
        }
    }

    public class RateViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Order { get; set; }

        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<RateViewModel, Rate>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Rate, RateViewModel>();
        }
    }

    public class SocialisationViewModel
    {
        public int? Id { get; set; }

        public Boolean pTask;

        // Handlers details
        public HumanGender? PeopleEnconteredGender { get; set; }
        public RelationshipType? PeopleEnconteredRelationshipType { get; set; }
        public HumanAgeRange? PeopleEnconteredAgeRange { get; set; }


        // Planned Encounters
        public int? PlannedEncounterNumber { get; set; }
        public RelationshipType? PlannedEncounterType { get; set; }
        public HumanGenderOption? PlannedEncounterGender { get; set; }
        public int? PlannedEncounterChildren13Number { get; set; }
        public int? PlannedEncounterTeeens1320Number { get; set; }
        public int? PlannedEncounterAdults2065Number { get; set; }
        public int? PlannedEncounterSeniors65Number { get; set; }

        // Unplanned Encounters
        public int? UnplannedEncounterNumber { get; set; }
        public RelationshipType? UnplannedEncounterType { get; set; }
        public HumanGenderOption? UnplannedEncounterGender { get; set; }
        public int? UnpPlannedEncounterChildren13Number { get; set; }
        public int? UnplannedEncounterTeeens1320Number { get; set; }
        public int? UnplannedEncounterAdults2065Number { get; set; }
        public int? UnplannedEncounterSeniors65Number { get; set; }

        // Dog Encounters
        public int? DogEncounterNumber { get; set; }
        public RelationshipType? DogEncounterRelationshipType { get; set; }
        public DogType? DogEncounterType { get; set; }
        public bool? DogEncounterSameBreed { get; set; }

        // Dog Distracted
        public virtual ICollection<DistractedByAnimalItemViewModel> DistractedByAnimalItems { get; set; }

        // Surfaces
        public virtual ICollection<SessionSurfaceItemViewModel> SurfacesItems { get; set; }

        // Travel / Transportation
        public int? TransportationTypeId { get; set; }
        public virtual TransportationTypeViewModel TransportationType { get; set; }
        public int? TransportationDuration { get; set; }
        public int? TransportationDistance { get; set; }
        public DistanceUnits? TransportationDistanceUnit { get; set; }
        public TravelQuality? TransportationTravelQuality { get; set; }

        // Sounds
        public virtual ICollection<SoundItemViewModel> SoundItems { get; set; }

        // Life Experiences
        public virtual ICollection<LifeExperienceItemViewModel> LifeExperienceItems { get; set; }

        [Required]
        public DateTimeOffset DateCreated { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SocialisationViewModel, Socialisation>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Socialisation, SocialisationViewModel>();
        }
    }


    public class LifeExperienceItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int LifeExperienceId { get; set; }
        public virtual LifeExperienceViewModel LifeExperience { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<LifeExperienceItemViewModel, LifeExperienceItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<LifeExperienceItem, LifeExperienceItemViewModel>();
        }
    }

    public class LifeExperienceViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<LifeExperienceViewModel, LifeExperience>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<LifeExperience, LifeExperienceViewModel>();
        }
    }


    public class SoundItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int SoundId { get; set; }
        public virtual SoundViewModel Sound { get; set; }

        [Required]
        public bool IsReal { get; set; }

        [Required]
        public int? Duration { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SoundItemViewModel, SoundItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SoundItem, SoundItemViewModel>();
        }
    }

    public class SoundViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SoundViewModel, Sound>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Sound, SoundViewModel>();
        }
    }
}