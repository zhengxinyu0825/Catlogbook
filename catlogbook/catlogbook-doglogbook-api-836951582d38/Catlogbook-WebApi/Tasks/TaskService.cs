using Doglogbook.EntityFramework.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using Doglogbook.EntityFramework.Models.Behaviour;
using Doglogbook.EntityFramework.Models.Tasks;
using System.Data.Entity.SqlServer;

namespace Doglogbook_WebApi.Tasks
{
    public class TaskService
    {
        private DoglogbookDbContext dbContext { get; }

        public TaskService(DoglogbookDbContext DbContext)
        {
            dbContext = DbContext;
        }


        public TaskAlertTypeEnum getPSMessageByPoints(int points) {
            int defaultPoints = 2000;
            int currentPoints = defaultPoints - points;

            if (points <= 2000 && points >= 1601)
            {
                return TaskAlertTypeEnum.TaskMsgPuppySocialisation_2;
            }
            else if (points <= 1600 && points >= 1301)
            {
                return TaskAlertTypeEnum.TaskMsgPuppySocialisation_3;
            }
            else if (points <= 1300 && points >= 1001)
            {
                return TaskAlertTypeEnum.TaskMsgPuppySocialisation_4;
            }
            else if (points <= 1000 && points >= 701)
            {
                return TaskAlertTypeEnum.TaskMsgPuppySocialisation_5;
            }
            else if (points <= 700 && points >= 401)
            {
                return TaskAlertTypeEnum.TaskMsgPuppySocialisation_6;
            }
            else if (points <= 400 && points >= 201)
            {
                return TaskAlertTypeEnum.TaskMsgPuppySocialisation_7;
            }
            else if (points <= 200 && points >= 1)
            {
                return TaskAlertTypeEnum.TaskMsgPuppySocialisation_8;
            }
            else if (points <= 1 && points >= -500)
            {
                return TaskAlertTypeEnum.TaskMsgPuppySocialisation_9;
            }
            else
            {
                return TaskAlertTypeEnum.None;
            }

        }

        public int getOccurrencesPoints(int count) {
            if (count == 1) return 100;
            else if (count == 2) return 175;
            else if (count == 3) return 225;
            else if (count == 4) return 250;
            else return 0;
        }

        public void PuppySocialisationPoints(DateTime dateTo, int PetId)
        {
            TaskAlert alert = null;

            // Categories points
            int subTotalPoints = 0;
            int plannedEncounterPeoplePoints = 0;
            int unplannedEncounterPeoplePoints = 0;
            int dogEncounterPoints = 0;
            int distractedByAnimalsPoints = 0;
            int surfacesItemsPoints = 0;
            int transportPoints = 0;
            int noisesPoints = 0;
            int lifeExperiencesPoints = 0;


            var pet = dbContext.Pets.Where(x => x.Id == PetId).FirstOrDefault();

            if (pet != null)
            {
                // Category 1: Planned encounters with people 
                plannedEncounterPeoplePoints = dbContext.Socialisations
                .Where(x => x.Pet.Id == PetId && x.DateDeleted == null)
                .Where(d => d.PlannedEncounterNumber != null ||
                        d.PlannedEncounterType != null ||
                        d.PlannedEncounterGender != null ||
                        d.PlannedEncounterChildren13Number != null ||
                        d.PlannedEncounterTeeens1320Number != null ||
                        d.PlannedEncounterAdults2065Number != null ||
                        d.PlannedEncounterSeniors65Number != null)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Count())
                .SingleOrDefault();

                if (plannedEncounterPeoplePoints > 0) {
                    subTotalPoints += getOccurrencesPoints(plannedEncounterPeoplePoints);
                }

                // Category 2: Unplanned encounters with people
                unplannedEncounterPeoplePoints = dbContext.Socialisations
                .Where(x => x.Pet.Id == PetId && x.DateDeleted == null)
                .Where(d => d.UnplannedEncounterNumber != null ||
                        d.UnplannedEncounterType != null ||
                        d.UnplannedEncounterGender != null ||
                        d.UnpPlannedEncounterChildren13Number != null ||
                        d.UnplannedEncounterTeeens1320Number != null ||
                        d.UnplannedEncounterAdults2065Number != null ||
                        d.UnplannedEncounterSeniors65Number != null)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Count())
                .SingleOrDefault();

                if (unplannedEncounterPeoplePoints > 0)
                {
                    subTotalPoints += getOccurrencesPoints(unplannedEncounterPeoplePoints);
                }


                // Category 3: Meeting other dogs
                dogEncounterPoints = dbContext.Socialisations
                .Where(x => x.Pet.Id == PetId && x.DateDeleted == null)
                .Where(d => d.DogEncounterNumber != null ||
                        d.DogEncounterRelationshipType != null ||
                        d.DogEncounterType != null ||
                        d.DogEncounterSameBreed != null)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Count())
                .SingleOrDefault();

                if (dogEncounterPoints > 0)
                {
                    subTotalPoints += getOccurrencesPoints(dogEncounterPoints);
                }


                // Category 4: Meeting other animals
                distractedByAnimalsPoints = dbContext.Socialisations
                .Where(x => x.Pet.Id == PetId && x.DateDeleted == null)
                .Where(d => d.DistractedByAnimalItems.Count > 0)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Count())
                .SingleOrDefault();

                if (distractedByAnimalsPoints > 0)
                {
                    subTotalPoints += getOccurrencesPoints(distractedByAnimalsPoints);
                }


                // Category 5: Surfaces/Obstacles
                surfacesItemsPoints = dbContext.Socialisations
                .Where(x => x.Pet.Id == PetId && x.DateDeleted == null)
                .Where(d => d.SurfacesItems.Count > 0)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Count())
                .SingleOrDefault();

                if (surfacesItemsPoints > 0)
                {
                    subTotalPoints += getOccurrencesPoints(surfacesItemsPoints);
                }

                // Category 6: Transport
                transportPoints = dbContext.Socialisations
                .Where(x => x.Pet.Id == PetId && x.DateDeleted == null)
                .Where(d => d.TransportationTypeId != null ||
                        d.TransportationType != null ||
                        d.TransportationDuration != null ||
                        d.TransportationDistance != null ||
                        d.TransportationDistanceUnit != null ||
                        d.TransportationTravelQuality != null)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Count())
                .SingleOrDefault();

                if (transportPoints > 0)
                {
                    subTotalPoints += getOccurrencesPoints(transportPoints);
                }

                // Category 7: Noise
                noisesPoints = dbContext.Socialisations
                .Where(x => x.Pet.Id == PetId && x.DateDeleted == null)
                .Where(d => d.SoundItems.Count > 0)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Count())
                .SingleOrDefault();

                if (noisesPoints > 0)
                {
                    subTotalPoints += getOccurrencesPoints(noisesPoints);
                }

                // Category 8: Life experiences
                lifeExperiencesPoints = dbContext.Socialisations
                .Where(x => x.Pet.Id == PetId && x.DateDeleted == null)
                .Where(d => d.LifeExperienceItems.Count > 0)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Count())
                .SingleOrDefault();

                if (lifeExperiencesPoints > 0)
                {
                    subTotalPoints += getOccurrencesPoints(lifeExperiencesPoints);
                }

                var totalSocialisations = dbContext.Socialisations
                    .Where(x => x.Pet.Id == PetId && x.DateDeleted == null)
                    .Count();

                if (totalSocialisations == 1) {
                    // well done

                    alert = new TaskAlert
                    {
                        PetId = pet.Id,
                        DateCreated = DateTime.Now,
                        TaskAlertType = TaskAlertTypeEnum.TaskMsgPuppySocialisation_1,
                        Description = "",
                        DateFrom = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                        DateTo = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                        PeriodCode = String.Format("{0}-{1}", dateTo.ToString("ddMMyyyy"), dateTo.ToString("ddMMyyyy")),
                        Items = null
                    };
                }
                else if (totalSocialisations > 1)
                {
                   var currentTaskAlertTypeEnum = getPSMessageByPoints(subTotalPoints);
                    if (currentTaskAlertTypeEnum != TaskAlertTypeEnum.None) {
                        alert = new TaskAlert
                        {
                            PetId = pet.Id,
                            DateCreated = DateTime.Now,
                            TaskAlertType = currentTaskAlertTypeEnum,
                            Description = "",
                            DateFrom = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                            DateTo = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                            PeriodCode = String.Format("{0}-{1}", dateTo.ToString("ddMMyyyy"), dateTo.ToString("ddMMyyyy")),
                            Items = null
                        };
                    }
                        
                }

                if (alert != null) {
                    using (var transactionContext = dbContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (alert != null && !dbContext.TaskAlerts.Any(
                                x => x.PetId == alert.PetId &&
                                x.TaskAlertType == alert.TaskAlertType &&
                                x.PeriodCode == alert.PeriodCode))
                            {
                                dbContext.TaskAlerts.Add(alert);
                            }

                            dbContext.SaveChanges();
                            transactionContext.Commit();
                        }
                        catch (Exception e)
                        {

                        }
                    }
                }

            }
        }

        // Consecutive activities and then stop
        //if 4 weeks of consecutive data entry and then no entry, then message.
        public void ActivitiesA(DateTime dateTo, int userId)
        {
            TaskAlert alert = null;
            DateTime dateWeeksTo = dateTo;
            DateTime dateFrom = dateWeeksTo.AddDays(-28); // 4 weeks

            var pet = dbContext.Pets.Where(x => x.OwnerId == userId).FirstOrDefault();

            if (pet != null) {
                // An owner valid pet.

                var ActivitiesResults = dbContext.ActivityRates
                    .Where(x => x.Pet.OwnerId == userId && x.DateDeleted == null && x.BulkLog == null)
                    .Where(d => d.DateCreated >= dateFrom && d.DateCreated <= dateWeeksTo)
                    .ToList();

                var BehavioursResults = dbContext.Behaviours
                        .Where(x => x.Pet.OwnerId == userId && x.DateDeleted == null)
                        .Where(d => d.DateCreated >= dateFrom && d.DateCreated <= dateWeeksTo)
                        .ToList();

                if (ActivitiesResults == null || ActivitiesResults.Count == 0 ||
                    BehavioursResults == null || BehavioursResults.Count == 0)

                {
                    alert = new TaskAlert
                    {
                        PetId = pet.Id,
                        DateCreated = DateTime.Now,
                        TaskAlertType = TaskAlertTypeEnum.ActivitiesHealthCheckA,
                        Description = "",
                        DateFrom = new DateTime(dateFrom.Year, dateFrom.Month, dateFrom.Day),
                        DateTo = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                        PeriodCode = String.Format("{0}-{1}", dateFrom.ToString("ddMMyyyy"), dateTo.ToString("ddMMyyyy")),
                        Items = null
                    };

                    using (var transactionContext = dbContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (alert != null && !dbContext.TaskAlerts.Any(
                                x => x.PetId == alert.PetId &&
                                x.TaskAlertType == alert.TaskAlertType &&
                                x.PeriodCode == alert.PeriodCode))
                            {
                                dbContext.TaskAlerts.Add(alert);
                            }

                            dbContext.SaveChanges();
                            transactionContext.Commit();
                        }
                        catch (Exception e)
                        {

                        }
                    }

                }

            }
      


        }

        // Initial Rates check
        // If Rating for Activity B, is 3 times in a row below Initial Rating, this needs to be flagged.
        public void ActivitiesB(DateTime dateTo, int PetId, int ReportEventId)
        {
            Dictionary<string, ActivityRateAux> candidatesRates = new Dictionary<string, ActivityRateAux>();
            Dictionary<string, ActivityRateAux> resultsRates = new Dictionary<string, ActivityRateAux>();

            List<TaskAlert> alerts = null;
            DateTime dateFrom = dateTo.AddDays(-7);

            try
            {
                var rateItems = dbContext.ActivityRates
                    .Where(x => x.Pet.Id == PetId && x.ReportEventId == ReportEventId && x.DateDeleted == null)
                    .Where(d => d.BulkLog == null)
                    .Where(d => d.DateCreated >= dateFrom && d.DateCreated <= dateTo)
                    .ToList();

                if (rateItems != null && rateItems.Count() > 0)
                {

                    var selectedItems = rateItems
                       .GroupBy(g => new { PetId = g.Pet.Id, ReportEventId = g.ReportEventId })
                       .Select(s => new { s.Key.PetId, s.Key.ReportEventId, Count = s.Count() })
                       .Where(x => x.Count >= 3)
                       .ToList();

                    List<int> selectedPets = selectedItems
                        .GroupBy(g => new { PetId = g.PetId })
                        .Select(s => s.Key.PetId)
                        .ToList();

                    List<int> selectedReportEventsIds = selectedItems
                        .GroupBy(g => new { ReportEventId = g.ReportEventId })
                        .Select(s => s.Key.ReportEventId)
                        .ToList();

                    var initialRates = dbContext.ActivityRates
                         .Where(x => x.Pet.Id == PetId && x.ReportEventId == ReportEventId && x.DateDeleted == null)
                         .Where(d => d.BulkLog == true)
                         .Where(x => selectedPets.Contains(x.Pet.Id) && selectedReportEventsIds.Contains(x.ReportEventId))
                         .ToList();

                    if (initialRates != null && initialRates.Count() > 0)
                    {

                        List<ActivityRateAux> rateItemsMixin = rateItems
                            .Where(x => selectedPets.Contains(x.Pet.Id) && selectedReportEventsIds.Contains(x.ReportEventId))
                            .Select(x => new ActivityRateAux
                            {
                                PetId = x.Pet.Id,
                                ReportEvent = x.ReportEvent,
                                DateCreated = x.DateCreated,
                                Rate = x.Rate.Order,
                                InitialRate = initialRates
                                    .Where(w => w.Pet.Id == x.Pet.Id && w.ReportEventId == x.ReportEvent.Id).FirstOrDefault(),
                                Count = 0

                            })
                            .OrderByDescending(o => o.DateCreated)
                            .ToList();


                        foreach (ActivityRateAux rateitem in rateItemsMixin)
                        {
                            var itemkey = rateitem.PetId.ToString() + rateitem.ReportEvent.Id.ToString();
                            if (!candidatesRates.ContainsKey(itemkey))
                            {
                                candidatesRates.Add(itemkey, rateitem);
                            }

                            // getting aux result
                            var candidateItem = candidatesRates[itemkey];

                            if (rateitem.InitialRate != null &&
                                rateitem.InitialRate.Rate.Order < candidateItem.Rate)
                            {
                                // rates going down.
                                candidateItem.Count = candidateItem.Count + 1;

                                if (candidateItem.Count == 3)
                                {
                                    // we have a result
                                    if (!resultsRates.ContainsKey(itemkey))
                                    {
                                        resultsRates.Add(itemkey, candidateItem);
                                    }
                                    candidatesRates.Remove(itemkey);
                                }
                                else
                                {
                                    candidatesRates[itemkey] = candidateItem;
                                }
                            }
                            else
                            {
                                // going up -> reset
                                candidateItem.Count = 0;
                                candidatesRates[itemkey] = candidateItem;
                            }
                        }


                        if (resultsRates != null && resultsRates.Count > 0)
                        {
                            alerts = resultsRates.Select(x => new TaskAlert
                            {
                                PetId = x.Value.PetId,
                                DateCreated = DateTime.Now,
                                TaskAlertType = TaskAlertTypeEnum.ActivitiesHealthCheckB,
                                Description = String.Format("{0} ({1})", x.Value.ReportEvent.Event.Name, x.Value.ReportEvent.Report.Name),
                                DateFrom = new DateTime(dateFrom.Year, dateFrom.Month, dateFrom.Day),
                                DateTo = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                                PeriodCode = String.Format("{0}-{1}", dateFrom.ToString("ddMMyyyy"), dateTo.ToString("ddMMyyyy")),
                                Items = null
                            }).ToList();

                            using (var transactionContext = dbContext.Database.BeginTransaction())
                            {
                                try
                                {
                                    foreach (TaskAlert task in alerts)
                                    {
                                        if (!dbContext.TaskAlerts.Any(
                                            x => x.PetId == task.PetId &&
                                            x.TaskAlertType == task.TaskAlertType &&
                                            x.PeriodCode == task.PeriodCode))
                                        {

                                            dbContext.TaskAlerts.Add(task);
                                            dbContext.SaveChanges();
                                        }
                                    }
                                    transactionContext.Commit();
                                }
                                catch (Exception e)
                                {

                                }
                            }

                        }

                    }
                }

            }
            catch (Exception e)
            {

            }



        }

        public void ProblematicBehaviour(DateTime dateTo, int PetId)
        {
            List<KeyValuePair<int, string>> kvResults = new List<KeyValuePair<int, string>>();
            List<TaskAlert> alerts = null;
            DateTime dateFrom = dateTo.AddDays(-7);

            #region Criterias

            var criterias = new List<BehaviourRuleCriteria>()
            {
                #region Vocalising behaviour

                new BehaviourRuleCriteria {
                   Name = "Vocalizing when left – whining",
                   BehaviourType = BehaviourTypeEnum.Vocalising,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Frustration
                   }
               },
               new BehaviourRuleCriteria {
                   Name = "Vocalizing when left – barking",
                   BehaviourType = BehaviourTypeEnum.Vocalising,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety
                   }
               },
               new BehaviourRuleCriteria {
                   Name = "Vocalizing when left – howling",
                   BehaviourType = BehaviourTypeEnum.Vocalising,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety
                   }
               },
                #endregion

                #region Destructive behaviour

                new BehaviourRuleCriteria {
                   Name = "Destroying property",
                   BehaviourType = BehaviourTypeEnum.Destructive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Frustration
                   }
               },
                new BehaviourRuleCriteria {
                   Name = "Hole digging",
                   BehaviourType = BehaviourTypeEnum.Destructive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Frustration
                   }
               },
               new BehaviourRuleCriteria {
                   Name = "Scratching at door",
                   BehaviourType = BehaviourTypeEnum.Destructive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety
                   }
               },
                #endregion

                #region Repetitive behaviour

                new BehaviourRuleCriteria {
                   Name = "Route-tracing, circling or repeated pacing",
                   BehaviourType = BehaviourTypeEnum.Repetitive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.CanineCognitiveDecline,
                       ProblematicBehaviourEnum.Frustration
                   }
               },

               new BehaviourRuleCriteria {
                   Name = "Spinning or tail-chasing",
                   BehaviourType = BehaviourTypeEnum.Repetitive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Frustration
                   }
               },
               new BehaviourRuleCriteria {
                   Name = "Fly/shadow chasing",
                   BehaviourType = BehaviourTypeEnum.Repetitive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Frustration
                   }
               },
               new BehaviourRuleCriteria {
                   Name = "Other repetitive behaviour with no apparent purpose",
                   BehaviourType = BehaviourTypeEnum.Repetitive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                        ProblematicBehaviourEnum.SeparationAnxiety,
                        ProblematicBehaviourEnum.CanineCognitiveDecline,
                        ProblematicBehaviourEnum.Frustration
                   }
               },
                #endregion

                #region Toileting/Elimination-related behaviour
                new BehaviourRuleCriteria {
                   Name = "Defecating (Pooing) inappropriately",
                   BehaviourType = BehaviourTypeEnum.ToiletingEliminationRelated,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.CanineCognitiveDecline

                   }
               },
               new BehaviourRuleCriteria {
                   Name = "Urinating (weeing) inappropriately",
                   BehaviourType = BehaviourTypeEnum.ToiletingEliminationRelated,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.CanineCognitiveDecline
                   }
               },
               new BehaviourRuleCriteria {
                   Name = "Eating faeces – dog’s own",
                   BehaviourType = BehaviourTypeEnum.ToiletingEliminationRelated,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.Health
                   }
               },
               new BehaviourRuleCriteria {
                   Name = "Eating faeces - other dogs",
                   BehaviourType = BehaviourTypeEnum.ToiletingEliminationRelated,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.Health
                   }
               },
               new BehaviourRuleCriteria {
                   Name = "Eating faeces - other animals",
                   BehaviourType = BehaviourTypeEnum.ToiletingEliminationRelated,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.Health
                   }
               },

               new BehaviourRuleCriteria {
                   Name = "Rolling in faeces (poo)- any",
                   BehaviourType = BehaviourTypeEnum.ToiletingEliminationRelated,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Health
                   }
               },

               new BehaviourRuleCriteria {
                   Name = "Scooting bottom on ground",
                   BehaviourType = BehaviourTypeEnum.ToiletingEliminationRelated,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.NotApplicable
                   }
               },
                #endregion

                #region Escaping/evading behaviour

                new BehaviourRuleCriteria {
                   Name = "Hiding",
                   BehaviourType = BehaviourTypeEnum.EscapingEvading,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.CanineCognitiveDecline
                   }
               },
               new BehaviourRuleCriteria
               {
                   Name = "Escape: Fence jumping",
                   BehaviourType = BehaviourTypeEnum.EscapingEvading,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Frustration
                   }
               },
               new BehaviourRuleCriteria
               {
                   Name = "Escape: Fence digging under",
                   BehaviourType = BehaviourTypeEnum.EscapingEvading,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Frustration
                   }
               },
               new BehaviourRuleCriteria
               {
                   Name = "Escape: Other",
                   BehaviourType = BehaviourTypeEnum.EscapingEvading,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Frustration
                   }
               },
                #endregion

                #region Other behaviour

               new BehaviourRuleCriteria
               {
                   Name = "Jumping-up on person",
                   BehaviourType = BehaviourTypeEnum.Other,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.NotApplicable
                   }
               },
               new BehaviourRuleCriteria
               {
                   Name = "Head shaking",
                   BehaviourType = BehaviourTypeEnum.Other,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Health
                   }
               },
               new BehaviourRuleCriteria
               {
                   Name = "Scratching ears",
                   BehaviourType = BehaviourTypeEnum.Other,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Health
                   }
               },

               new BehaviourRuleCriteria
               {
                   Name = "Licking paws",
                   BehaviourType = BehaviourTypeEnum.Other,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Health
                   }
               },
               new BehaviourRuleCriteria
               {
                   Name = "Licking/chewing legs",
                   BehaviourType = BehaviourTypeEnum.Other,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Health
                   }
               },
               new BehaviourRuleCriteria
               {
                   Name = "Licking/chewing flank (side of the body)",
                   BehaviourType = BehaviourTypeEnum.Other,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Health
                   }
               },
               new BehaviourRuleCriteria
               {
                   Name = "Licking/chewing under tail",
                   BehaviourType = BehaviourTypeEnum.Other,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Health
                   }
               },
               new BehaviourRuleCriteria
               {
                   Name = "Licking lips",
                   BehaviourType = BehaviourTypeEnum.Other,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.Health
                   }
               },

                #endregion

                #region Aggressive behaviour

               new BehaviourRuleCriteria
               {
                   Name = "Bark",
                   BehaviourType = BehaviourTypeEnum.Aggressive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Health
                   }
               },

                new BehaviourRuleCriteria
               {
                   Name = "Growl without lifting lips",
                   BehaviourType = BehaviourTypeEnum.Aggressive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.Health
                   }
               },

                new BehaviourRuleCriteria
               {
                   Name = "Growl with lifting lips",
                   BehaviourType = BehaviourTypeEnum.Aggressive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.Health
                   }
               },
                new BehaviourRuleCriteria
               {
                   Name = "Snap (no contact made)",
                   BehaviourType = BehaviourTypeEnum.Aggressive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.Health
                   }
               },
                new BehaviourRuleCriteria
               {
                   Name = "Bite (contact made)",
                   BehaviourType = BehaviourTypeEnum.Aggressive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.Health
                   }
               },
                new BehaviourRuleCriteria
               {
                   Name = "Fence run",
                   BehaviourType = BehaviourTypeEnum.Aggressive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Frustration,
                       ProblematicBehaviourEnum.Health
                   }
               },
                new BehaviourRuleCriteria
               {
                   Name = "Chase/Rush/Pursuit",
                   BehaviourType = BehaviourTypeEnum.Aggressive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Health
                   }
               },
                new BehaviourRuleCriteria
               {
                   Name = "Jumping-up on person",
                   BehaviourType = BehaviourTypeEnum.Aggressive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Health
                   }
               },
                new BehaviourRuleCriteria
               {
                   Name = "Hackles raised",
                   BehaviourType = BehaviourTypeEnum.Aggressive,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.Health
                   }
               },
                #endregion

                #region Fear-related behaviour

                new BehaviourRuleCriteria
               {
                   Name = "No - no obvious trigger for behaviour",
                   BehaviourType = BehaviourTypeEnum.FearRelated,
                   ProblematicBehaviours = new List<ProblematicBehaviourEnum> {
                       ProblematicBehaviourEnum.SeparationAnxiety,
                       ProblematicBehaviourEnum.Aggression,
                       ProblematicBehaviourEnum.Fear,
                       ProblematicBehaviourEnum.CanineCognitiveDecline,
                       ProblematicBehaviourEnum.Frustration,
                       ProblematicBehaviourEnum.Health
                   }
               },
                #endregion

            };

            // Updating Ids
            criterias = criterias.Select(x => new BehaviourRuleCriteria
            {
                Id = dbContext.BehaviourItemTypes
                           .Where(r => r.Name == x.Name && r.BehaviourTypeId == (int)x.BehaviourType)
                           .Select(d => d.Id).FirstOrDefault(),
                Name = x.Name,
                BehaviourType = x.BehaviourType,
                ProblematicBehaviours = x.ProblematicBehaviours
            }).ToList();

            #endregion

            var separationAnxietyResults = this.CheckSeparationAnxiety(dbContext, PetId, criterias, dateFrom, dateTo);
            if (separationAnxietyResults != null && separationAnxietyResults.Count > 0)
            {

                foreach (int id in separationAnxietyResults)
                {
                    kvResults.Add(new KeyValuePair<int, string>(id, "Separation Anxiety"));
                }

            }

            var aggressionResults = this.CheckAggression(dbContext, PetId, criterias, dateFrom, dateTo);
            if (aggressionResults != null && aggressionResults.Count > 0)
            {
                foreach (int id in aggressionResults)
                {
                    kvResults.Add(new KeyValuePair<int, string>(id, "Aggression"));
                }
            }

            var fearResults = this.CheckFear(dbContext, PetId, criterias, dateFrom, dateTo);
            if (fearResults != null && fearResults.Count > 0)
            {
                foreach (int id in fearResults)
                {
                    kvResults.Add(new KeyValuePair<int, string>(id, "Fear"));
                }
            }

            var canineCognitiveDeclineResults = this.CheckCanineCognitiveDecline(dbContext, PetId, criterias, dateFrom, dateTo);
            if (canineCognitiveDeclineResults != null && canineCognitiveDeclineResults.Count > 0)
            {
                foreach (int id in canineCognitiveDeclineResults)
                {
                    kvResults.Add(new KeyValuePair<int, string>(id, "Canine Cognitive Decline"));
                }
            }

            var frustationResults = this.CheckFrustation(dbContext, PetId, criterias, dateFrom, dateTo);
            if (frustationResults != null && frustationResults.Count > 0)
            {
                foreach (int id in frustationResults)
                {
                    kvResults.Add(new KeyValuePair<int, string>(id, "Frustation"));
                }
            }

            var healthResults = this.CheckHealth(dbContext, PetId, criterias, dateFrom, dateTo);
            if (healthResults != null && healthResults.Count > 0)
            {
                foreach (int id in healthResults)
                {
                    kvResults.Add(new KeyValuePair<int, string>(id, "Health"));
                }
            }

            // Applying Rule conditions
            var filteredResults = kvResults
                .GroupBy(x => x.Key)
                .Select(s => new
                {
                    Key = s.Key,
                    Count = s.Count()
                })
                .Where(x => x.Count >= 3)
                .Select(x => x.Key)
                .ToList();

            if (filteredResults != null && filteredResults.Count > 0)
            {
                alerts = filteredResults.Select(x => new TaskAlert
                {
                    PetId = x,
                    DateCreated = DateTime.Now,
                    TaskAlertType = TaskAlertTypeEnum.ProblematicBehaviour,
                    Description = "Problematic Behaviour",
                    DateFrom = new DateTime(dateFrom.Year, dateFrom.Month, dateFrom.Day),
                    DateTo = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                    PeriodCode = String.Format("{0}-{1}", dateFrom.ToString("ddMMyyyy"), dateTo.ToString("ddMMyyyy")),
                    Items = kvResults.Where(z => z.Key == x)
                    .Select(s => new TaskAlertItem { Name = s.Value }).ToList()
                }).ToList();


                using (var transactionContext = dbContext.Database.BeginTransaction())
                {
                    try
                    {
                        foreach (TaskAlert task in alerts)
                        {
                            if (!dbContext.TaskAlerts.Any(
                                x => x.PetId == task.PetId &&
                                x.TaskAlertType == task.TaskAlertType &&
                                x.PeriodCode == task.PeriodCode))
                            {

                                dbContext.TaskAlerts.Add(task);
                            }
                        }
                        dbContext.SaveChanges();
                        transactionContext.Commit();
                    }
                    catch (Exception e)
                    {

                    }
                }

            }



        }

        public void DogJoyRating(DateTime dateTo, int PetId, int ReportEventId)
        {
            List<TaskAlert> alerts = new List<TaskAlert>();

            try
            {
                var rateItems = dbContext.ActivityRates
                          .Where(x => x.Pet.Id == PetId &&
                                 x.ReportEventId == ReportEventId &&
                                 x.DateDeleted == null &&
                                 x.BulkLog == null)
                          .ToList();

                var reportEvent = dbContext.ReportEvents
                    .Where(x => x.Id == ReportEventId).FirstOrDefault();

                if (reportEvent != null)
                {

                    if (rateItems != null & rateItems.Count <= 4)
                    {
                        TaskAlertTypeEnum selectedType;

                        if (rateItems.Count == 1)
                        {
                            selectedType = TaskAlertTypeEnum.DogJoyFirstEntry;
                        }
                        else if (rateItems.Count == 2)
                        {
                            selectedType = TaskAlertTypeEnum.DogJoySecondEntry;
                        }
                        else if (rateItems.Count == 3)
                        {
                            selectedType = TaskAlertTypeEnum.DogJoyThirdEntry;
                        }
                        else
                        {
                            selectedType = TaskAlertTypeEnum.DogJoyFourthEntry;
                        }

                        alerts.Add(new TaskAlert
                        {
                            PetId = PetId,
                            DateCreated = DateTime.Now,
                            TaskAlertType = selectedType,
                            Description = String.Format("{0} - {1}", reportEvent.Report.Name, reportEvent.Event.Name),
                            DateFrom = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                            DateTo = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                            PeriodCode = String.Format("{0}-{1}", dateTo.ToString("ddMMyyyy"), dateTo.ToString("ddMMyyyy")),
                            Items = null
                        });
                    }
                    else
                    {
                        // Joy Rating

                        TaskAlertTypeEnum selectedTypeJoy = TaskAlertTypeEnum.None;

                        var lastJoyItem = dbContext.ActivityRates
                          .Where(x => x.Pet.Id == PetId &&
                                 x.ReportEventId == ReportEventId &&
                                 x.DateDeleted == null &&
                                 x.BulkLog == null)
                          .OrderByDescending(o => o.DateCreated)
                          .FirstOrDefault();

                        if (lastJoyItem != null)
                        {
                            var rateJoyItems = dbContext.ActivityRates
                                  .Where(x => x.Pet.Id == PetId &&
                                         x.ReportEventId == ReportEventId &&
                                         x.DateDeleted == null &&
                                         x.BulkLog == null)
                                  .Where(x => x.Id != lastJoyItem.Id)
                                  .OrderByDescending(o => o.DateCreated)
                                  .Take(4)
                                  .ToList();

                            if (lastJoyItem != null && rateJoyItems != null)
                            {
                                var totalValue = 0;
                                var lastJoyItemRate = dbContext.Rates.FirstOrDefault(x => x.Id == lastJoyItem.RateId);

                                foreach (var item in rateJoyItems)
                                {
                                    totalValue += (8 - item.Rate.Order);
                                }
                                var baseJoyIndex = Decimal.Divide(totalValue,4);


                                var changeValue = Decimal.Divide(((8 - lastJoyItemRate.Order) - baseJoyIndex), baseJoyIndex) * 100;

                                if (changeValue >= -15 && changeValue <= 15)
                                {
                                    selectedTypeJoy = TaskAlertTypeEnum.DogJoyNeutral15;
                                }
                                else if (changeValue >= -45 && changeValue <= -16)
                                {
                                    selectedTypeJoy = TaskAlertTypeEnum.DogJoyDecreasing1645;
                                }
                                else if (changeValue <= -46)
                                {
                                    selectedTypeJoy = TaskAlertTypeEnum.DogJoyDecreasingOver45;
                                }
                                else if (changeValue >= 16 && changeValue <= 45)
                                {
                                    selectedTypeJoy = TaskAlertTypeEnum.DogJoyImprovemenet1645;
                                }
                                else if (changeValue >= 46)
                                {
                                    selectedTypeJoy = TaskAlertTypeEnum.DogJoyImprovemenetOver45;
                                }


                                if (selectedTypeJoy != TaskAlertTypeEnum.None)
                                {
                                    alerts.Add(new TaskAlert
                                    {
                                        PetId = PetId,
                                        DateCreated = DateTime.Now,
                                        TaskAlertType = selectedTypeJoy,
                                        Description = String.Format("{0} - {1}", reportEvent.Report.Name, reportEvent.Event.Name),
                                        DateFrom = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                                        DateTo = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day),
                                        PeriodCode = String.Format("{0}-{1}", dateTo.ToString("ddMMyyyy"), dateTo.ToString("ddMMyyyy")),
                                        Items = null
                                    });
                                }

                            }
                        }

                    }

                    if (alerts != null && alerts.Count > 0)
                    {

                        using (var transactionContext = dbContext.Database.BeginTransaction())
                        {
                            try
                            {
                                foreach (TaskAlert task in alerts)
                                {
                                    if (!dbContext.TaskAlerts.Any(
                                        x => x.PetId == task.PetId &&
                                        x.TaskAlertType == task.TaskAlertType &&
                                        x.Description == task.Description &&
                                        x.PeriodCode == task.PeriodCode))
                                    {
                                        dbContext.TaskAlerts.Add(task);
                                        dbContext.SaveChanges();
                                    }
                                }
                                transactionContext.Commit();
                            }
                            catch (Exception e)
                            {

                            }
                        }

                    }

                }
            }
            catch (Exception e)
            {

            }
        }

        public List<int> CheckSeparationAnxiety(DoglogbookDbContext dbContext,int PetId, List<BehaviourRuleCriteria> criterias, DateTime dateFrom, DateTime dateTo)
        {
            return CheckBehaviourItems(dbContext, criterias, ProblematicBehaviourEnum.SeparationAnxiety, dateFrom, dateTo);
        }

        public List<int> CheckAggression(DoglogbookDbContext dbContext, int PetId, List<BehaviourRuleCriteria> criterias, DateTime dateFrom, DateTime dateTo)
        {
            var condItems = CheckBehaviourItems(dbContext, criterias, ProblematicBehaviourEnum.Aggression, dateFrom, dateTo);
            var condAttrs = dbContext.Set<AggressiveBehaviour>()
                 .Where(d => d.DateCreated >= dateFrom && d.DateCreated <= dateTo)
                 .Where(d => d.Pet.Id == PetId && d.DateDeleted == null)
                 .Where(x => x.NearResourceType != null)
                 .Select(x => x.Pet.Id)
                 .ToList();


            if (condItems.Count() > 0 && condAttrs.Count() > 0)
            {
                return condItems.Where(x => condAttrs.Contains(x)).ToList();
            }
            else
            {
                return null;
            }

        }

        public List<int> CheckFear(DoglogbookDbContext dbContext, int PetId, List<BehaviourRuleCriteria> criterias, DateTime dateFrom, DateTime dateTo)
        {
            string[] duringTypes = new string[] { "Thunderstorm", "Fireworks" };

            var condItems = CheckBehaviourItems(dbContext, criterias, ProblematicBehaviourEnum.Fear, dateFrom, dateTo);

            var condAttrs = dbContext.Set<FearRelatedBehaviour>()
                .Where(d => d.DateCreated >= dateFrom && d.DateCreated <= dateTo)
                .Where(d => d.Pet.Id == PetId && d.DateDeleted == null)
                .Where(x => duringTypes.Contains(x.BehaviourDuringType.Name))
                .GroupBy(g => new { g.Pet.Id, g.BehaviourDuringTypeId })
                .Select(s => new
                {
                    PetId = s.Key.Id,
                    BehaviourItemTypeId = s.Key.BehaviourDuringTypeId
                })
                .GroupBy(g => g.PetId)
                .Select(s => new
                {
                    PetId = s.Key,
                    Count = s.Count()
                })
                .Where(x => x.Count == duringTypes.Count())
                .Select(x => x.PetId)
                .ToList();

            if (condItems.Count() > 0 && condAttrs.Count() > 0)
            {
                return condItems.Where(x => condAttrs.Contains(x)).ToList();
            }
            else
            {
                return null;
            }

        }

        public List<int> CheckCanineCognitiveDecline(DoglogbookDbContext dbContext, int PetId, List<BehaviourRuleCriteria> criterias, DateTime dateFrom, DateTime dateTo)
        {
            var condItems = CheckBehaviourItems(dbContext, criterias, ProblematicBehaviourEnum.CanineCognitiveDecline, dateFrom, dateTo);

            var condAttrs = dbContext.Set<SeniorBehaviour>()
                .Where(d => d.DateCreated >= dateFrom && d.DateCreated <= dateTo)
                .Where(d => d.Pet.Id == PetId && d.DateDeleted == null)
                .Where(x => x.PaceUpAndDown == true ||
                            x.StareBlanklyAtWallsOrFloor == true ||
                            x.StuckBehindObjects == true ||
                            x.RecogniseFamiliar == true ||
                            x.WalkWallsOrDoors == true ||
                            x.WalkAwayWhileAvoindPatted == true ||
                            x.UrinateOrDefecateInAreaKeptClean == true ||
                            x.DifficultyFindingFoodDroppped == true)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => new
                {
                    PetId = s.Key.Id,
                    PaceUpAndDown = s.Sum(x => (x.PaceUpAndDown == true) ? 1 : 0),
                    StareBlanklyAtWallsOrFloor = s.Sum(x => (x.StareBlanklyAtWallsOrFloor == true) ? 1 : 0),
                    StuckBehindObjects = s.Sum(x => (x.StuckBehindObjects == true) ? 1 : 0),
                    RecogniseFamiliar = s.Sum(x => (x.RecogniseFamiliar == true) ? 1 : 0),
                    WalkWallsOrDoors = s.Sum(x => (x.WalkWallsOrDoors == true) ? 1 : 0),
                    WalkAwayWhileAvoindPatted = s.Sum(x => (x.WalkAwayWhileAvoindPatted == true) ? 1 : 0),
                    UrinateOrDefecateInAreaKeptClean = s.Sum(x => (x.UrinateOrDefecateInAreaKeptClean == true) ? 1 : 0),
                    DifficultyFindingFoodDroppped = s.Sum(x => (x.DifficultyFindingFoodDroppped == true) ? 1 : 0)
                })
                .Where(x =>
                        x.PaceUpAndDown >= 1 &&
                        x.StareBlanklyAtWallsOrFloor >= 1 &&
                        x.StuckBehindObjects >= 1 &&
                        x.RecogniseFamiliar >= 1 &&
                        x.WalkWallsOrDoors >= 1 &&
                        x.WalkAwayWhileAvoindPatted >= 1 &&
                        x.UrinateOrDefecateInAreaKeptClean >= 1 &&
                        x.DifficultyFindingFoodDroppped >= 1)
                .Select(s => s.PetId)
                .ToList();

            if (condItems.Count() > 0 && condAttrs.Count() > 0)
            {
                return condItems.Where(x => condAttrs.Contains(x)).ToList();
            }
            else
            {
                return null;
            }

        }

        public List<int> CheckFrustation(DoglogbookDbContext dbContext, int PetId, List<BehaviourRuleCriteria> criterias, DateTime dateFrom, DateTime dateTo)
        {
            var condItems = CheckBehaviourItems(dbContext, criterias, ProblematicBehaviourEnum.Frustration, dateFrom, dateTo);

            var condAttrs = dbContext.Set<DestructiveBehaviour>()
                .Where(d => d.DateCreated >= dateFrom && d.DateCreated <= dateTo)
                .Where(d => d.Pet.Id == PetId && d.DateDeleted == null)
                .Where(x => x.OwnerAtHome == false)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Key.Id)
                .ToList();

            if (condItems.Count() > 0 && condAttrs.Count() > 0)
            {
                return condItems.Where(x => condAttrs.Contains(x)).ToList();
            }
            else
            {
                return null;
            }

        }

        public List<int> CheckHealth(DoglogbookDbContext dbContext, int PetId, List<BehaviourRuleCriteria> criterias, DateTime dateFrom, DateTime dateTo)
        {
            var condItems = CheckBehaviourItems(dbContext, criterias, ProblematicBehaviourEnum.Health, dateFrom, dateTo);

            var condSeniorAttrs = dbContext.Set<SeniorBehaviour>()
                .Where(d => d.DateCreated >= dateFrom && d.DateCreated <= dateTo)
                .Where(d => d.Pet.Id == PetId && d.DateDeleted == null)
                .Where(x => x.PaceUpAndDown == true ||
                            x.StareBlanklyAtWallsOrFloor == true ||
                            x.StuckBehindObjects == true ||
                            x.RecogniseFamiliar == true ||
                            x.WalkWallsOrDoors == true ||
                            x.WalkAwayWhileAvoindPatted == true ||
                            x.UrinateOrDefecateInAreaKeptClean == true ||
                            x.DifficultyFindingFoodDroppped == true)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => new
                {
                    PetId = s.Key.Id,
                    PaceUpAndDown = s.Sum(x => (x.PaceUpAndDown == true) ? 1 : 0),
                    StareBlanklyAtWallsOrFloor = s.Sum(x => (x.StareBlanklyAtWallsOrFloor == true) ? 1 : 0),
                    StuckBehindObjects = s.Sum(x => (x.StuckBehindObjects == true) ? 1 : 0),
                    RecogniseFamiliar = s.Sum(x => (x.RecogniseFamiliar == true) ? 1 : 0),
                    WalkWallsOrDoors = s.Sum(x => (x.WalkWallsOrDoors == true) ? 1 : 0),
                    WalkAwayWhileAvoindPatted = s.Sum(x => (x.WalkAwayWhileAvoindPatted == true) ? 1 : 0),
                    UrinateOrDefecateInAreaKeptClean = s.Sum(x => (x.UrinateOrDefecateInAreaKeptClean == true) ? 1 : 0),
                    DifficultyFindingFoodDroppped = s.Sum(x => (x.DifficultyFindingFoodDroppped == true) ? 1 : 0)
                })
                .Where(x =>
                        x.PaceUpAndDown >= 1 &&
                        x.StareBlanklyAtWallsOrFloor >= 1 &&
                        x.StuckBehindObjects >= 1 &&
                        x.RecogniseFamiliar >= 1 &&
                        x.WalkWallsOrDoors >= 1 &&
                        x.WalkAwayWhileAvoindPatted >= 1 &&
                        x.UrinateOrDefecateInAreaKeptClean >= 1 &&
                        x.DifficultyFindingFoodDroppped >= 1)
                .Select(s => s.PetId)
                .ToList();

            var condAggressiveAttrs = dbContext.Set<AggressiveBehaviour>()
                .Where(d => d.DateCreated >= dateFrom && d.DateCreated <= dateTo)
                .Where(d => d.Pet.Id == PetId && d.DateDeleted == null)
                .Where(x => x.NearResourceType != null)
                .GroupBy(g => new { g.Pet.Id })
                .Select(s => s.Key.Id)
                .ToList();


            if (condItems.Count() > 0 && condSeniorAttrs.Count() > 0 && condAggressiveAttrs.Count() > 0)
            {
                return condItems
                    .Where(x => condSeniorAttrs.Contains(x))
                    .Where(x => condAggressiveAttrs.Contains(x))
                    .ToList();
            }
            else
            {
                return null;
            }

        }

        private List<int> CheckBehaviourItems(
            DoglogbookDbContext dbContext,
            List<BehaviourRuleCriteria> criterias,
            ProblematicBehaviourEnum problematicBehaviourEnum,
            DateTime dateFrom, DateTime dateTo)
        {
            List<int> behaviourItemTypesIds = new List<int>();

            behaviourItemTypesIds = criterias
              .Where(x => x.ProblematicBehaviours.Any(p => p == problematicBehaviourEnum))
              .Select(s => s.Id)
              .ToList();

            if (behaviourItemTypesIds.Count > 0)
            {

                List<int> condItems = dbContext.BehaviourItems
                    .Where(d => d.Behaviour.DateCreated >= dateFrom && d.Behaviour.DateCreated <= dateTo)
                    .Where(d => behaviourItemTypesIds.Contains(d.BehaviourItemTypeId))
                    .GroupBy(g => new { g.Behaviour.Pet.Id, g.BehaviourItemTypeId })
                    .Select(s => new
                    {
                        PetId = s.Key.Id,
                        BehaviourItemTypeId = s.Key.BehaviourItemTypeId
                    })
                    .GroupBy(g => g.PetId)
                    .Select(s => new
                    {
                        PetId = s.Key,
                        Count = s.Count()
                    })
                    .Where(x => x.Count == behaviourItemTypesIds.Count)
                    .Select(x => x.PetId)
                    .ToList();

                return condItems;
            }
            else
            {
                return null;
            }
        }
    }

}