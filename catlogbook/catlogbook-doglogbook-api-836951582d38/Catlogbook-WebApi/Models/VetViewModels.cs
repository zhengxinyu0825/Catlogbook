using AutoMapper;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Behaviour;
using Doglogbook.EntityFramework.Models.Commons;
using Doglogbook.EntityFramework.Models.Vet;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Doglogbook_WebApi.Models
{
    public class TreatmentViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int TreatmentTypeId { get; set; }
        public virtual TreatmentType TreatmentType { get; set; }

        public string CustomType { get; set; }

        [Required]
        public DateTimeOffset DateAdministered { get; set; }

        [Required]
        public float Dose { get; set; }

        public string Instructions { get; set; }

        public int Reminders { get; set; }

        public DateTimeOffset DateCreated { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TreatmentViewModel, Treatment>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now));

            Mapper.CreateMap<Treatment, TreatmentViewModel>();
        }
    }

    public class TreatmentReminderViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int TreatmentId { get; set; }
        public virtual TreatmentViewModel Treatment { get; set; }

        [Required]
        public DateTimeOffset DoseDateTime { get; set; }

        public DateTimeOffset? DateCompleted { get; set; }

        public string Instructions { get; set; }

        [Required]
        public string JsonObj { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TreatmentReminderViewModel, TreatmentReminder>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now));

            Mapper.CreateMap<TreatmentReminder, TreatmentReminderViewModel>();
        }
    }

    public class TreatmentTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TreatmentTypeViewModel, TreatmentType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<TreatmentType, TreatmentTypeViewModel>();
        }
    }

    public class RespirationRateViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int Breaths { get; set; }

        [Required]
        public DateTimeOffset DateRegistered { get; set; }

        [Required]
        public int RegisteredById { get; set; }

        public string Comment { get; set; }

        public DateTimeOffset DateCreated { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<RespirationRateViewModel, RespirationRate>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now));

            Mapper.CreateMap<RespirationRate, RespirationRateViewModel>();
        }
    }


    public class SymptomViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int SymptomTypeId { get; set; }
        public virtual SymptomTypeViewModel SymptomType { get; set; }

        [Required]
        public int SymptomFrequencyId { get; set; }
        public virtual SymptomFrequencyViewModel SymptomFrequency { get; set; }

        public string Comment { get; set; }

        public DateTimeOffset DateCreated { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SymptomViewModel, Symptom>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now));

            Mapper.CreateMap<Symptom, SymptomViewModel>();
        }
    }

    public class SymptomTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SymptomTypeViewModel, SymptomType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SymptomType, SymptomTypeViewModel>();
        }
    }


    public class SymptomFrequencyViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SymptomFrequencyViewModel, SymptomFrequency>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SymptomFrequency, SymptomFrequencyViewModel>();
        }
    }


    public class PetSeizureViewModel
    {
        public int? Id { get; set; }

        [Required]
        public AgeFirstTimeSeizure AgeFirstTime { get; set; }

        [Required]
        public bool ClusterSeizures { get; set; }

        [Required]
        public bool StatusEpilepticus { get; set; }

        public int? SeizureDiagnosisId { get; set; }
        public virtual SeizureDiagnosisViewModel SeizureDiagnosis { get; set; }

        public virtual IEnumerable<SeizureTestViewModel> SeizureTests { get; set; }
        public virtual IEnumerable<Seizure> Seizures { get; set; }


        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetSeizureViewModel, PetSeizure>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now));

            Mapper.CreateMap<PetSeizure, PetSeizureViewModel>();
        }
    }



    public class SeizureDiagnosisViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureDiagnosisViewModel, SeizureDiagnosis>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SeizureDiagnosis, SeizureDiagnosisViewModel>();
        }
    }

    public class SeizureTestViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int SeizureTestTypeId { get; set; }
        public virtual SeizureTestTypeViewModel SeizureTestType { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureTestViewModel, SeizureTest>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SeizureTest, SeizureTestViewModel>();
        }
    }

    public class SeizureTestTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureTestTypeViewModel, SeizureTestType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SeizureTestType, SeizureTestTypeViewModel>();
        }
    }

    public class SeizureViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int SeizureTypeId { get; set; }
        public virtual SeizureTypeViewModel SeizureType { get; set; }

        [Required]
        public int Duration { get; set; }

        public int? SeizureBodyStateId { get; set; }
        public virtual SeizureBodyStateViewModel SeizureBodyState { get; set; }

        public int? SeizureBodyStatePositionId { get; set; }
        public virtual SeizureBodyStatePositionViewModel SeizureBodyStatePositions { get; set; }

        public virtual IEnumerable<SeizureSignViewModel> SeizureSigns { get; set; }
        public virtual IEnumerable<SeizureAfterSignViewModel> SeizureAfterSigns { get; set; }

        public DateTimeOffset DateCreated { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureViewModel, Seizure>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now));

            Mapper.CreateMap<Seizure, SeizureViewModel>();
        }
    }

    public class SeizureTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureTypeViewModel, SeizureType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SeizureType, SeizureTypeViewModel>();
        }
    }
    
    public class SeizureBodyStateViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureBodyStateViewModel, SeizureBodyState>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SeizureBodyState, SeizureBodyStateViewModel>();
        }
    }

    public class SeizureBodyStatePositionViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureBodyStatePositionViewModel, SeizureBodyStatePosition>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SeizureBodyStatePosition, SeizureBodyStatePositionViewModel>();
        }
    }

    public class SeizureAfterSignViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int SeizureAfterSignTypeId { get; set; }
        public virtual SeizureAfterSignTypeViewModel SeizureAfterSignType { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureAfterSignViewModel, SeizureAfterSign>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SeizureAfterSign, SeizureAfterSignViewModel>();
        }
    }

    public class SeizureAfterSignTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureAfterSignTypeViewModel, SeizureAfterSignType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SeizureAfterSignType, SeizureAfterSignTypeViewModel>();
        }
    }

    public class SeizureSignViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int SeizureSignTypeId { get; set; }
        public virtual SeizureSignTypeViewModel SeizureSignType { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureSignViewModel, SeizureSign>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now));

            Mapper.CreateMap<SeizureSign, SeizureSignViewModel>();
        }
    }
    
    public class SeizureSignTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SeizureSignTypeViewModel, SeizureSignType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SeizureSignType, SeizureSignTypeViewModel>();
        }
    }

    public class BehaviourViewModel
    {
        public int? Id { get; set; }

        [Required]
        public DateTimeOffset DateRegistered { get; set; }

        [Required]
        public int BehaviourTypeId { get; set; }
        public virtual BehaviourTypeViewModel BehaviourType { get; set; }

        public virtual IEnumerable<BehaviourItemViewModel> BehaviourItems { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<BehaviourViewModel, Behaviour>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now));

            Mapper.CreateMap<Behaviour, BehaviourViewModel>();
        }
    }

    public class DestructiveBehaviourViewModel
    {
        public int? Id { get; set; }

        [Required]
        public DateTimeOffset DateRegistered { get; set; }

        [Required]
        public int BehaviourTypeId { get; set; }
        public virtual BehaviourTypeViewModel BehaviourType { get; set; }

        public virtual IEnumerable<BehaviourItemViewModel> BehaviourItems { get; set; }

        [Required]
        public bool OwnerAtHome { get; set; }
        public string OtherDestroyedObject { get; set; }

        public virtual IEnumerable<DestroyedObjectItemViewModel> DestroyedObjectItems { get; set; }

        public static void AutoMapper_CreateMaps()
        {

            Mapper.CreateMap<DestructiveBehaviourViewModel, DestructiveBehaviour>()
                    .ForMember(d => d.Id, o => o.Ignore())
                    .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now))
                    .IncludeBase<BehaviourViewModel, Behaviour>();


            Mapper.CreateMap<DestructiveBehaviour, DestructiveBehaviourViewModel>()
                  .IncludeBase<Behaviour, BehaviourViewModel>();
        }
    }

    public class SeniorBehaviourViewModel
    {
        public int? Id { get; set; }

        [Required]
        public DateTimeOffset DateRegistered { get; set; }

        [Required]
        public int BehaviourTypeId { get; set; }
        public virtual BehaviourTypeViewModel BehaviourType { get; set; }

        public virtual IEnumerable<BehaviourItemViewModel> BehaviourItems { get; set; }

        // Specific behaviour Attributes

        [Required]
        public bool PaceUpAndDown { get; set; }

        [Required]
        public bool StareBlanklyAtWallsOrFloor { get; set; }

        [Required]
        public bool StuckBehindObjects { get; set; }

        [Required]
        public bool RecogniseFamiliar { get; set; }

        [Required]
        public bool WalkWallsOrDoors { get; set; }

        [Required]
        public bool WalkAwayWhileAvoindPatted { get; set; }

        [Required]
        public bool UrinateOrDefecateInAreaKeptClean { get; set; }

        [Required]
        public bool DifficultyFindingFoodDroppped { get; set; }

        public static void AutoMapper_CreateMaps()
        {

            Mapper.CreateMap<SeniorBehaviourViewModel, SeniorBehaviour>()
                    .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now))
                    .IncludeBase<BehaviourViewModel, Behaviour>();

            Mapper.CreateMap<SeniorBehaviour, SeniorBehaviourViewModel>()
                  .IncludeBase<Behaviour, BehaviourViewModel>();
        }
    }

    public class FearRelatedBehaviourViewModel
    {
        public int? Id { get; set; }

        [Required]
        public DateTimeOffset DateRegistered { get; set; }

        [Required]
        public int BehaviourTypeId { get; set; }
        public virtual BehaviourTypeViewModel BehaviourType { get; set; }

        public virtual IEnumerable<BehaviourItemViewModel> BehaviourItems { get; set; }

        // Specific behaviour Attributes
        public int? BehaviourDuringTypeId { get; set; }
        public virtual BehaviourDuringTypeViewModel BehaviourDuringType { get; set; }

        public static void AutoMapper_CreateMaps()
        {

            Mapper.CreateMap<FearRelatedBehaviourViewModel, FearRelatedBehaviour>()
                    .ForMember(d => d.Id, o => o.Ignore())
                    .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now))
                    .IncludeBase<BehaviourViewModel, Behaviour>();

            Mapper.CreateMap<FearRelatedBehaviour, FearRelatedBehaviourViewModel>()
                  .IncludeBase<Behaviour, BehaviourViewModel>();
        }
    }

    public class AggressiveBehaviourViewModel
    {
        public int? Id { get; set; }

        [Required]
        public DateTimeOffset DateRegistered { get; set; }

        [Required]
        public int BehaviourTypeId { get; set; }
        public virtual BehaviourTypeViewModel BehaviourType { get; set; }

        public virtual IEnumerable<BehaviourItemViewModel> BehaviourItems { get; set; }

        // Specific behaviour Attributes

        public int? NearResourceTypeId { get; set; }
        public virtual NearResourceTypeViewModel NearResourceType { get; set; }

        [Required]
        public int BehaviourDirectedTowardId { get; set; }
        public virtual BehaviourDirectedTowardViewModel BehaviourDirectedToward { get; set; }

        [Required]
        public RelationshipType BehaviourDirectedTowardType { get; set; }

        public HumanGender? HumanGender { get; set; }
        public DogType? DogType { get; set; }

        public int? SpeciesId { get; set; }
        public virtual SpeciesViewModel Species { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<AggressiveBehaviourViewModel, AggressiveBehaviour>()
                    .ForMember(d => d.Id, o => o.Ignore())
                    .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now))
                    .IncludeBase<BehaviourViewModel, Behaviour>();

            Mapper.CreateMap<AggressiveBehaviour, AggressiveBehaviourViewModel>()
                  .IncludeBase<Behaviour, BehaviourViewModel>();
        }
    }

   
    public class NearResourceTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<NearResourceTypeViewModel, NearResourceType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<NearResourceType, NearResourceTypeViewModel>();
        }
    }

    
    public class BehaviourDirectedTowardViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<BehaviourDirectedTowardViewModel, BehaviourDirectedToward>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<BehaviourDirectedToward, BehaviourDirectedTowardViewModel>();
        }
    }


    public class BehaviourDuringTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<BehaviourDuringTypeViewModel, BehaviourDuringType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<BehaviourDuringType, BehaviourDuringTypeViewModel>();
        }
    }


    public class DestroyedObjectItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int DestroyedObjectId { get; set; }
        public virtual DestroyedObjectViewModel DestroyedObject { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<DestroyedObjectItemViewModel, DestroyedObjectItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<DestroyedObjectItem, DestroyedObjectItemViewModel>();
        }
    }


    public class DestroyedObjectViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<DestroyedObjectViewModel, DestroyedObject>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<DestroyedObject, DestroyedObjectViewModel>();
        }
    }


    public class BehaviourTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<BehaviourTypeViewModel, BehaviourType>();
            Mapper.CreateMap<BehaviourType, BehaviourTypeViewModel>();
        }
    }

    public class BehaviourItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int BehaviourItemTypeId { get; set; }
        public virtual BehaviourItemTypeViewModel BehaviourItemType { get; set; }

        public int? ObservationTypeId { get; set; }
        public virtual ObservationTypeViewModel ObservationType { get; set; }

        public int? LocationTypeId { get; set; }
        public virtual LocationTypeViewModel LocationType { get; set; }

        public string Comment { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<BehaviourItemViewModel, BehaviourItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<BehaviourItem, BehaviourItemViewModel>();
        }
    }

    public class LocationTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<LocationTypeViewModel, LocationType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<LocationType, LocationTypeViewModel>();
        }
    }
    public class ObservationTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ObservationTypeViewModel, ObservationType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ObservationType, ObservationTypeViewModel>();
        }
    }

    public class BehaviourItemTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public int BehaviourTypeId { get; set; }
        public virtual BehaviourTypeViewModel BehaviourType { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<BehaviourItemTypeViewModel, BehaviourItemType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<BehaviourItemType, BehaviourItemTypeViewModel>();
        }
    }

}