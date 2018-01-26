using AutoMapper;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Commons;
using Doglogbook.EntityFramework.Models.Sessions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Doglogbook_WebApi.Models
{

    public class SessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        //[Required]
        //public RelationshipType LocationRelationship { get; set; }

        //[Required]
        //public int LocationTypeId { get; set; }

        //[Required]
        //public int LocationSubTypeId { get; set; }

        //[Required]
        //public int PercentageOnLead { get; set; }

        //[Required]
        //public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        //// Training Reinforcement //
        //////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SessionViewModel, Session>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Session, SessionViewModel>();
        }
    }

    public class GuideSeeingTrainingSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Training
        // Assessment & Development Work //
        //////////////////////////////////

        //Building association between target and reward Duration H:M
        public int? BuildingAssociationTargetRewardDuration { get; set; }

        //Teaching/shaping desired alert behaviour Duration H:M
        public int? TeachingAlertBehaviourDuration { get; set; }

        //Teaching/shaping desired release behaviour Duration H:M
        public int? TeachingReleaseBehaviourDuration { get; set; }

        //Association of training to environment similar to operational environment
        //Duration H:M:S
        public int? SimilarEnvironmentDuration { get; set; }

        //Generalisation of training using variety of wind/weather/temperature conditions
        //Duration H:M:S
        public int? GeneralisationUsingWeatherVarietyDuration { get; set; }

        //Generalisation of training using variety of scenario conditions(blind, etc)
        //Duration H:M:S
        public int? GeneralisationUsingScenarioVarietyDuration { get; set; }

        //Validation/Routine skill appraisal exercise Duration H:M:S
        public int? ValidationSkillAppraisalDuration { get; set; }

        // Exercise / Physical //
        /////////////////////////

        public virtual ICollection<ExercisePhysicalConditionItemViewModel> ExercisePhysicalConditionItems { get; set; }

        public string OtherTimeSpentDescription { get; set; }
        public int? OtherTimeSpentDuration { get; set; }

        #endregion

        //////////////////////////////////
        ////////   GUIDE/SEEING  ////////
        ////////////////////////////////

        // Additional Trainings
        public virtual ICollection<GuideSeeingAditionalTrainingItemViewModel> GuideSeeingAditionalTrainingItems { get; set; }
        public int? TrainingTransportationTypeId { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<GuideSeeingTrainingSessionViewModel, GuideSeeingTrainingSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<GuideSeeingTrainingSession, GuideSeeingTrainingSessionViewModel>();
        }
    }

    public class GuideSeeingAssessmentSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Assessment

        // Assessment & Development Work //
        //////////////////////////////////

        public MotivationScale? MotivationDriveScale { get; set; }
        public ConfidenceScale? BoldnessConfidenceScale { get; set; }

        public virtual ICollection<DevelopmentWorkBehaviourItem> DevelopmentWorkBehaviourItems { get; set; }

        #endregion

        //////////////////////////////////
        ////////   GUIDE/SEEING  ////////
        ////////////////////////////////

        // Additional Trainings
        public virtual ICollection<GuideSeeingAditionalTrainingItemViewModel> GuideSeeingAditionalTrainingItems { get; set; }
        public int? TrainingTransportationTypeId { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<GuideSeeingAssessmentSessionViewModel, GuideSeeingAssessmentSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<GuideSeeingAssessmentSession, GuideSeeingAssessmentSessionViewModel>();
        }
    }


    public class LivestockHerdingTrainingSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Training
        // Assessment & Development Work //
        //////////////////////////////////

        //Building association between target and reward Duration H:M
        public int? BuildingAssociationTargetRewardDuration { get; set; }

        //Teaching/shaping desired alert behaviour Duration H:M
        public int? TeachingAlertBehaviourDuration { get; set; }

        //Teaching/shaping desired release behaviour Duration H:M
        public int? TeachingReleaseBehaviourDuration { get; set; }

        //Association of training to environment similar to operational environment
        //Duration H:M:S
        public int? SimilarEnvironmentDuration { get; set; }

        //Generalisation of training using variety of wind/weather/temperature conditions
        //Duration H:M:S
        public int? GeneralisationUsingWeatherVarietyDuration { get; set; }

        //Generalisation of training using variety of scenario conditions(blind, etc)
        //Duration H:M:S
        public int? GeneralisationUsingScenarioVarietyDuration { get; set; }

        //Validation/Routine skill appraisal exercise Duration H:M:S
        public int? ValidationSkillAppraisalDuration { get; set; }

        // Exercise / Physical //
        /////////////////////////

        public virtual ICollection<ExercisePhysicalConditionItemViewModel> ExercisePhysicalConditionItems { get; set; }

        public string OtherTimeSpentDescription { get; set; }
        public int? OtherTimeSpentDuration { get; set; }

        #endregion

        #region  LivestockHerdingSession

        // General Information
        public virtual ICollection<LivestockHerdingWorkTypeItemViewModel> LivestockHerdingWorkTypeItems { get; set; }
        public virtual ICollection<WorkWithStockItemViewModel> WorkWithStockItems { get; set; }

        #endregion

        // TRANING  //
        /////////////

        // General Information
        public int? TrialTypeId { get; set; }
        public virtual TrialTypeViewModel TrialType { get; set; }

        public TrialRange? TrialRange { get; set; }
        public CompetitionDivision? HighestCompetitionDivision { get; set; }
        public CompetitionAward? HighestCompetitionAward { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<LivestockHerdingTrainingSessionViewModel, LivestockHerdingTrainingSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<LivestockHerdingTrainingSession, LivestockHerdingTrainingSessionViewModel>();
        }
    }


    public class LivestockHerdingAssessmentSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Assessment

        // Assessment & Development Work //
        //////////////////////////////////

        public MotivationScale? MotivationDriveScale { get; set; }
        public ConfidenceScale? BoldnessConfidenceScale { get; set; }

        public virtual ICollection<DevelopmentWorkBehaviourItem> DevelopmentWorkBehaviourItems { get; set; }

        #endregion

        #region  LivestockHerdingSession

        // General Information
        public virtual ICollection<LivestockHerdingWorkTypeItemViewModel> LivestockHerdingWorkTypeItems { get; set; }
        public virtual ICollection<WorkWithStockItemViewModel> WorkWithStockItems { get; set; }

        #endregion

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<LivestockHerdingAssessmentSessionViewModel, LivestockHerdingAssessmentSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<LivestockHerdingAssessmentSession, LivestockHerdingAssessmentSessionViewModel>();
        }
    }


    public class ProtectionGuardTrainingSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Training
        // Assessment & Development Work //
        //////////////////////////////////

        //Building association between target and reward Duration H:M
        public int? BuildingAssociationTargetRewardDuration { get; set; }

        //Teaching/shaping desired alert behaviour Duration H:M
        public int? TeachingAlertBehaviourDuration { get; set; }

        //Teaching/shaping desired release behaviour Duration H:M
        public int? TeachingReleaseBehaviourDuration { get; set; }

        //Association of training to environment similar to operational environment
        //Duration H:M:S
        public int? SimilarEnvironmentDuration { get; set; }

        //Generalisation of training using variety of wind/weather/temperature conditions
        //Duration H:M:S
        public int? GeneralisationUsingWeatherVarietyDuration { get; set; }

        //Generalisation of training using variety of scenario conditions(blind, etc)
        //Duration H:M:S
        public int? GeneralisationUsingScenarioVarietyDuration { get; set; }

        //Validation/Routine skill appraisal exercise Duration H:M:S
        public int? ValidationSkillAppraisalDuration { get; set; }

        // Exercise / Physical //
        /////////////////////////

        public virtual ICollection<ExercisePhysicalConditionItemViewModel> ExercisePhysicalConditionItems { get; set; }

        public string OtherTimeSpentDescription { get; set; }
        public int? OtherTimeSpentDuration { get; set; }

        #endregion

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ProtectionGuardTrainingSessionViewModel, ProtectionGuardTrainingSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ProtectionGuardTrainingSession, ProtectionGuardTrainingSessionViewModel>();
        }
    }

    public class ProtectionGuardAssessmentSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Assessment

        // Assessment & Development Work //
        //////////////////////////////////

        public MotivationScale? MotivationDriveScale { get; set; }
        public ConfidenceScale? BoldnessConfidenceScale { get; set; }

        public virtual ICollection<DevelopmentWorkBehaviourItem> DevelopmentWorkBehaviourItems { get; set; }

        #endregion

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ProtectionGuardAssessmentSessionViewModel, ProtectionGuardAssessmentSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ProtectionGuardAssessmentSession, ProtectionGuardAssessmentSessionViewModel>();
        }
    }

    public class RacingGreyhoundTrainingSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Training
        // Assessment & Development Work //
        //////////////////////////////////

        //Building association between target and reward Duration H:M
        public int? BuildingAssociationTargetRewardDuration { get; set; }

        //Teaching/shaping desired alert behaviour Duration H:M
        public int? TeachingAlertBehaviourDuration { get; set; }

        //Teaching/shaping desired release behaviour Duration H:M
        public int? TeachingReleaseBehaviourDuration { get; set; }

        //Association of training to environment similar to operational environment
        //Duration H:M:S
        public int? SimilarEnvironmentDuration { get; set; }

        //Generalisation of training using variety of wind/weather/temperature conditions
        //Duration H:M:S
        public int? GeneralisationUsingWeatherVarietyDuration { get; set; }

        //Generalisation of training using variety of scenario conditions(blind, etc)
        //Duration H:M:S
        public int? GeneralisationUsingScenarioVarietyDuration { get; set; }

        //Validation/Routine skill appraisal exercise Duration H:M:S
        public int? ValidationSkillAppraisalDuration { get; set; }

        // Exercise / Physical //
        /////////////////////////

        public virtual ICollection<ExercisePhysicalConditionItemViewModel> ExercisePhysicalConditionItems { get; set; }

        public string OtherTimeSpentDescription { get; set; }
        public int? OtherTimeSpentDuration { get; set; }

        #endregion

        #region RacingGreyhound Session
        // Session Details
        public virtual ICollection<RacingGreyhoundActivityItem> RacingGreyhoundActivityItems { get; set; }
        public virtual ICollection<RacingGreyhoundActivityElementItem> RacingGreyhoundActivityElementItems { get; set; }

        //public int? NumberChaseStarts { get; set; }
        //public int? NumberFailChase { get; set; }
        #endregion

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<RacingGreyhoundTrainingSessionViewModel, RacingGreyhoundTrainingSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<RacingGreyhoundTrainingSession, RacingGreyhoundTrainingSessionViewModel>();
        }
    }

    public class RacingGreyhoundAssessmentSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Assessment

        // Assessment & Development Work //
        //////////////////////////////////

        public MotivationScale? MotivationDriveScale { get; set; }
        public ConfidenceScale? BoldnessConfidenceScale { get; set; }

        public virtual ICollection<DevelopmentWorkBehaviourItem> DevelopmentWorkBehaviourItems { get; set; }

        #endregion

        // General
        public int? Distance { get; set; }
        public DistanceUnits? DistanceUnit { get; set; }
        public RunChaseQuality? RunChaseQuality { get; set; }

        #region RacingGreyhound Session
        // Session Details
        public virtual ICollection<RacingGreyhoundActivityItem> RacingGreyhoundActivityItems { get; set; }
        public virtual ICollection<RacingGreyhoundActivityElementItem> RacingGreyhoundActivityElementItems { get; set; }

        //public int? NumberChaseStarts { get; set; }
        //public int? NumberFailChase { get; set; }
        #endregion

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<RacingGreyhoundAssessmentSessionViewModel, RacingGreyhoundAssessmentSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<RacingGreyhoundAssessmentSession, RacingGreyhoundAssessmentSessionViewModel>();
        }
    }



    
    public class ScentDetectionTrainingSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Training
        // Assessment & Development Work //
        //////////////////////////////////

        //Building association between target and reward Duration H:M
        public int? BuildingAssociationTargetRewardDuration { get; set; }

        //Teaching/shaping desired alert behaviour Duration H:M
        public int? TeachingAlertBehaviourDuration { get; set; }

        //Teaching/shaping desired release behaviour Duration H:M
        public int? TeachingReleaseBehaviourDuration { get; set; }

        //Association of training to environment similar to operational environment
        //Duration H:M:S
        public int? SimilarEnvironmentDuration { get; set; }

        //Generalisation of training using variety of wind/weather/temperature conditions
        //Duration H:M:S
        public int? GeneralisationUsingWeatherVarietyDuration { get; set; }

        //Generalisation of training using variety of scenario conditions(blind, etc)
        //Duration H:M:S
        public int? GeneralisationUsingScenarioVarietyDuration { get; set; }

        //Validation/Routine skill appraisal exercise Duration H:M:S
        public int? ValidationSkillAppraisalDuration { get; set; }

        // Exercise / Physical //
        /////////////////////////

        public virtual ICollection<ExercisePhysicalConditionItemViewModel> ExercisePhysicalConditionItems { get; set; }

        public string OtherTimeSpentDescription { get; set; }
        public int? OtherTimeSpentDuration { get; set; }

        #endregion

        public int? ConcentrationConditionDuration { get; set; }

        #region ScentDetection Session
        // Session Details
        public virtual ICollection<ScentDetectionOdourItem> EquipmentWithNoDistractions { get; set; }
        public virtual ICollection<ScentDetectionOdourItem> EquipmentWithDistractions { get; set; }
        #endregion

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ScentDetectionTrainingSessionViewModel, ScentDetectionTrainingSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ScentDetectionTrainingSession, ScentDetectionTrainingSessionViewModel>();
        }
    }

    public class ScentDetectionAssessmentSessionViewModel
    {
        #region Session
        public int? Id { get; set; }

        // General Information

        [Required]
        public int SessionTypeId { get; set; }
        public virtual SessionTypeViewModel SessionType { get; set; }

        [Required]
        public int PetSubTypeId { get; set; }
        public virtual PetSubTypeViewModel PetSubType { get; set; }

        // Session Info //
        //////////////////

        [Required]
        public int Duration { get; set; }

        [Required]
        public RelationshipType LocationRelationship { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public int LocationSubTypeId { get; set; }

        [Required]
        public int PercentageOnLead { get; set; }

        [Required]
        public int PercentageOffLead { get; set; }

        // Exposure & Socialisation //
        //////////////////////////////

        public HumanGender? PeopleEnconteredGender { get; set; }
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

        // Spent Tethered`
        public int? SpentTetheredDuration { get; set; }
        public int? SpentTetheredTypeId { get; set; }
        public LocationTypeViewModel SpentTetheredType { get; set; }
        public TravelQuality? SpentTetheredTravelQuality { get; set; }

        // Spent Crated Items  
        public virtual ICollection<CreatedItemViewModel> CreatedItems { get; set; }

        // Observed
        public int? ObservedTime { get; set; }

        // Obedience & Control //
        /////////////////////////

        public ScoredBy? ScoredBy { get; set; }

        // Verbal Commands
        public int? VerbalCommandsDuration { get; set; }
        public virtual ICollection<VerbalCommandItemViewModel> VerbalCommandsItems { get; set; }

        // Hand / Gestural Commands
        public int? HandGesturalCommandsDuration { get; set; }
        public virtual ICollection<HandGesturalCommandItemViewModel> HandGesturalCommandsItems { get; set; }

        // Whistle / Laser Commands
        public int? WhistleLaserCommandsDuration { get; set; }
        public virtual ICollection<WhistleLaserCommandItemViewModel> WhistleLaserCommandsItems { get; set; }

        // Other Skill Development
        public int? OtherSkillsDevelopmentDuration { get; set; }
        public virtual ICollection<SkillDevelopmentItemViewModel> OtherSkillsDevelopmentItems { get; set; }

        // Devices / Method Used
        public virtual ICollection<PetDeviceMethodItemViewModel> PetDeviceMethodItems { get; set; }

        // Training Reinforcement //
        ////////////////////////////

        // Rewards USED
        public virtual ICollection<RewardItemViewModel> RewardItems { get; set; }

        // Corrections USED
        public virtual ICollection<CorrectionDeviceItemViewModel> CorrectionDeviceItems { get; set; }

        // Assessment & Development Work //
        ///////////////////////////////////

        public int? SessionLevelId { get; set; }

        public int? WithDistractionsDuration { get; set; }
        public int? WithoutDistractionsDuration { get; set; }

        public float? TemperatureValue { get; set; }
        public TemperatureUnits? TemperatureUnit { get; set; }
        public WeatherLevel? Wind { get; set; }
        public WeatherLevel? Rain { get; set; }

        #endregion

        #region Assessment

        // Assessment & Development Work //
        //////////////////////////////////

        public MotivationScale? MotivationDriveScale { get; set; }
        public ConfidenceScale? BoldnessConfidenceScale { get; set; }

        public virtual ICollection<DevelopmentWorkBehaviourItem> DevelopmentWorkBehaviourItems { get; set; }

        #endregion

        #region ScentDetection Session
        // Session Details
        public virtual ICollection<ScentDetectionOdourItem> EquipmentWithNoDistractions { get; set; }
        public virtual ICollection<ScentDetectionOdourItem> EquipmentWithDistractions { get; set; }
        #endregion


        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ScentDetectionAssessmentSessionViewModel, ScentDetectionAssessmentSession>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTime.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ScentDetectionAssessmentSession, ScentDetectionAssessmentSessionViewModel>();
        }
    }


    public class RacingGreyhoundActivityViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<RacingGreyhoundActivityViewModel, RacingGreyhoundActivity>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<RacingGreyhoundActivity, RacingGreyhoundActivityViewModel>();
        }
    }


    public class RacingGreyhoundActivityElementViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<RacingGreyhoundActivityElementViewModel, RacingGreyhoundActivityElement>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<RacingGreyhoundActivityElement, RacingGreyhoundActivityElementViewModel>();
        }
    }

    
    public class ScentDetectionOdourViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ScentDetectionOdourViewModel, ScentDetectionOdour>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ScentDetectionOdour, ScentDetectionOdourViewModel>();
        }
    }

    public class TrialTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TrialTypeViewModel, TrialType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<TrialType, TrialTypeViewModel>();
        }
    }

    public class LivestockHerdingWorkTypeItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int LivestockHerdingDogWorkTypeId { get; set; }
        public virtual LivestockHerdingWorkTypeViewModel LivestockHerdingDogWorkType { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<LivestockHerdingWorkTypeItemViewModel, LivestockHerdingWorkTypeItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<LivestockHerdingWorkTypeItem, LivestockHerdingWorkTypeItemViewModel>();
        }
    }

    public class LivestockHerdingWorkTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<LivestockHerdingWorkTypeViewModel, LivestockHerdingWorkType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<LivestockHerdingWorkType, LivestockHerdingWorkTypeViewModel>();
        }
    }

    public class WorkWithStockItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int SpeciesId { get; set; }
        public virtual SpeciesViewModel Species { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<WorkWithStockItemViewModel, WorkWithStockItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<WorkWithStockItem, WorkWithStockItemViewModel>();
        }
    }


    public class DevelopmentWorkBehaviourViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<DevelopmentWorkBehaviourViewModel, DevelopmentWorkBehaviour>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<DevelopmentWorkBehaviour, DevelopmentWorkBehaviourViewModel>();
        }
    }
    public class DevelopmentWorkBehaviourItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int DevelopmentWorkBehaviourId { get; set; }

        public int? TimesRequested { get; set; }
        public int? TimesComplied { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<DevelopmentWorkBehaviourItemViewModel, DevelopmentWorkBehaviourItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<DevelopmentWorkBehaviourItem, DevelopmentWorkBehaviourItemViewModel>();
        }
    }

    public class SessionTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SessionTypeViewModel, SessionType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SessionType, SessionTypeViewModel>();
        }
    }

    public class SessionLevelViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SessionLevelViewModel, SessionLevel>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SessionLevel, SessionLevelViewModel>();
        }
    }


    public class LocationSubTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<LocationSubTypeViewModel, LocationSubType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<LocationSubType, LocationSubTypeViewModel>();
        }
    }

    public class DistractedByAnimalItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int SpeciesId { get; set; }
        public virtual SpeciesViewModel Species { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<DistractedByAnimalItemViewModel, DistractedByAnimalItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<DistractedByAnimalItem, DistractedByAnimalItemViewModel>();
        }
    }

    public class SessionSurfaceItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int SurfaceObstacleId { get; set; }
        public virtual SurfaceObstacleViewModel SurfaceObstacleViewModel { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SessionSurfaceItemViewModel, SessionSurfaceItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SessionSurfaceItem, SessionSurfaceItemViewModel>();
        }
    }

    public class SurfaceObstacleViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SurfaceObstacleViewModel, SurfaceObstacle>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SurfaceObstacle, SurfaceObstacleViewModel>();
        }
    }



    public class TransportationTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TransportationTypeViewModel, TransportationType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<TransportationType, TransportationTypeViewModel>();
        }
    }

    public class CreatedItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public int TransportationTypeId { get; set; }
        public virtual TransportationTypeViewModel TransportationType { get; set; }

        [Required]
        public TravelQuality TravelQuality { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<CreatedItemViewModel, CreatedItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<CreatedItem, CreatedItemViewModel>();
        }
    }

    public class VerbalCommandItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int VerbalCommandId { get; set; }
        public virtual VerbalCommandViewModel VerbalCommand { get; set; }

        public Frecuency? Frecuency { get; set; }
        public int? Duration { get; set; }
        public int? TimesRequested { get; set; }
        public int? TimesComplied { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<VerbalCommandItemViewModel, VerbalCommandItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<VerbalCommandItem, VerbalCommandItemViewModel>();
        }
    }

    public class VerbalCommandViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<VerbalCommandViewModel, VerbalCommand>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<VerbalCommand, VerbalCommandViewModel>();
        }
    }

    public class WhistleLaserCommandItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int WhistleLaserCommandId { get; set; }
        public virtual WhistleLaserCommand WhistleLaserCommand { get; set; }

        public Frecuency? Frecuency { get; set; }
        public int? Duration { get; set; }
        public int? TimesRequested { get; set; }
        public int? TimesComplied { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<WhistleLaserCommandItemViewModel, WhistleLaserCommandItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<WhistleLaserCommandItem, WhistleLaserCommandItemViewModel>();
        }
    }



    public class RewardViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<RewardViewModel, Reward>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Reward, RewardViewModel>();
        }
    }

    public class HandGesturalCommandItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int HandGesturalCommandId { get; set; }
        public virtual HandGesturalCommandViewModel HandGesturalCommand { get; set; }

        public Frecuency? Frecuency { get; set; }
        public int? Duration { get; set; }
        public int? TimesRequested { get; set; }
        public int? TimesComplied { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<HandGesturalCommandItemViewModel, HandGesturalCommandItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<HandGesturalCommandItem, HandGesturalCommandItemViewModel>();
        }
    }

    public class HandGesturalCommandViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<HandGesturalCommandViewModel, HandGesturalCommand>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<HandGesturalCommand, HandGesturalCommandViewModel>();
        }
    }

    public class WhistleLaserCommandViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<WhistleLaserCommandViewModel, WhistleLaserCommand>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<WhistleLaserCommand, WhistleLaserCommandViewModel>();
        }
    }

    public class PetSkillViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetSkillViewModel, PetSkill>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<PetSkill, PetSkillViewModel>();
        }
    }

    public class CorrectionDeviceViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<CorrectionDeviceViewModel, CorrectionDevice>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<CorrectionDevice, CorrectionDeviceViewModel>();
        }
    }

    public class PetDeviceMethodViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetDeviceMethodViewModel, PetDeviceMethod>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<PetDeviceMethod, PetDeviceMethodViewModel>();
        }
    }

    public class SkillDevelopmentItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int PetSkillId { get; set; }

        public int? Duration { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SkillDevelopmentItemViewModel, SkillDevelopmentItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SkillDevelopmentItem, SkillDevelopmentItemViewModel>();
        }
    }

    public class PetDeviceMethodItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int PetDeviceMethodId { get; set; }
        public virtual PetDeviceMethodViewModel PetDeviceMethod { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<PetDeviceMethodItemViewModel, PetDeviceMethodItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<PetDeviceMethodItem, PetDeviceMethodItemViewModel>();
        }
    }

    public class RewardItemViewModel
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        [Required]
        public int? RewardId { get; set; }
        public virtual RewardViewModel Reward { get; set; }

        [Required]
        public int Percentage { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<RewardItemViewModel, RewardItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<RewardItem, RewardItemViewModel>();
        }
    }

    public class CorrectionDeviceItemViewModel
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        [Required]
        public int CorrectionDeviceId { get; set; }
        public virtual CorrectionDeviceViewModel CorrectionDevice { get; set; }

        [Required]
        public int Percentage { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<CorrectionDeviceItemViewModel, CorrectionDeviceItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<CorrectionDeviceItem, CorrectionDeviceItemViewModel>();
        }
    }

    public class ExercisePhysicalConditionItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int ExercisePhysicalConditionId { get; set; }

        [Required]
        public int? Duration { get; set; }

        public string Comment { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ExercisePhysicalConditionItemViewModel, ExercisePhysicalConditionItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ExercisePhysicalConditionItem, ExercisePhysicalConditionItemViewModel>();
        }
    }

    public class GuideSeeingAditionalTrainingItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int GuideSeeingAditionalTrainingId { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<GuideSeeingAditionalTrainingItemViewModel, GuideSeeingAditionalTrainingItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<GuideSeeingAditionalTrainingItem, GuideSeeingAditionalTrainingItemViewModel>();
        }
    }
}