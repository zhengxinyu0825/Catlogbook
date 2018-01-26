using AutoMapper;
using Doglogbook.EntityFramework.DAL;
using Doglogbook.EntityFramework.Models;
using Doglogbook_WebApi.Models;
using StatsOne.Components.AssetService;
using PagedList;
using System;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Configuration;
using SmartSports.Data.Linq;
using AutoMapper.QueryableExtensions;
using Doglogbook.EntityFramework.Models.Reports;
using Doglogbook.EntityFramework.Models.Vet;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using Doglogbook.EntityFramework.Models.Behaviour;
using Doglogbook.EntityFramework.Models.Sessions;
using Doglogbook.EntityFramework.Models.Commons;
using Doglogbook.EntityFramework.Models.Feeding;
using Doglogbook_WebApi.Tasks;

namespace Doglogbook_WebApi.Controllers
{

    [Authorize]
    [RoutePrefix("api/Pets")]
    public class PetsController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public PetsController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }

        // GET /pets
        public async Task<IHttpActionResult> Get(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<Pet> query = DbContext.Pets
                .Where(x => x.DateDeleted == null)
                .OrderBy(o => o.Name);
            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<PetViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }

        // GET /pets/:id
        [Route("{id:int}"), HttpGet]
        public async Task<IHttpActionResult> Get(int id)
        {
            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var model = Mapper.Map<PetViewModel>(pet);
            return Ok(model);
        }

        // DELETE /pets/:id
        [Route("{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> RemovePet(int id, int deleteStatusId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            var obj = await DbContext.PetDeleteStatus
                .SingleOrDefaultAsync(p => p.Id.Equals(deleteStatusId));

            if (pet.OwnerId != userId)
            {
                return BadRequest("The user is not the owner.");
            }

            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    pet.DateDeleted = DateTimeOffset.Now;
                    pet.PetDeleteStatusId = deleteStatusId;

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // GET /pets/DeleteStatus
        [Route("DeleteStatus"), HttpGet]
        public async Task<IHttpActionResult> GetPetDeleteStatuses()
        {

            IQueryable<PetDeleteStatus> query = DbContext.PetDeleteStatus.OrderBy(o => o.Name);

            var result = query.ProjectTo<PetDeleteStatusViewModel>();

            return Ok(result);
        }

        // GET /pets/:id/avatar
        [Route("{id:int}/Avatar"), HttpGet]
        public IHttpActionResult GetAvatar(int id)
        {
            var pet = DbContext.Pets
                .SingleOrDefault(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var photoLink = DbContext.Pets.Where(u => u.Id == id).Select(u => u.PhotoLink).Single();
            var service = Assets.Service;

            return Ok(new { url = service.FetchImageUrl(photoLink) });
        }

        private string GetPetProfile(int id)
        {
            var service = Assets.Service;
            var profile = ConfigurationManager.AppSettings["CloudinaryPetProfile"];
            return profile + service.EncodeUserHash(id);
        }

        // PUT /pets/:id/avatar
        [Route("{id:int}/Avatar"), HttpPut]
        public async Task<IHttpActionResult> SetAvatar(int id, PetAvatarViewModel model)
        {
            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var service = Assets.Service;
            var bytes = Convert.FromBase64String(model.Data.Trim());

            using (var stream = new MemoryStream(bytes))
            {
                var image = Image.FromStream(stream);

                var result = service.UploadImage(GetPetProfile(pet.Id), bytes, image.RawFormat);
                if (result.StatusCode == HttpStatusCode.OK)
                {
                    pet.PhotoLink = result.SecureUrl;
                    await DbContext.SaveChangesAsync();
                    return Ok(new
                    {
                        success = true,
                        url = service.FetchImageUrl(result.SecureUrl, 150, 150)
                    });
                }

                ModelState.AddModelError(string.Empty, $"{result.StatusCode}: Unknown error");
            }
            return BadRequest(ModelState);
        }

        // PUT /pets/:id/weight
        [Route("{id:int}/weight"), HttpPut]
        public async Task<IHttpActionResult> PutWeightById(int id, WeightBindingModel entry)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
            .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            //get latest timeseries
            var timeSeries = await DbContext.TimeSeries.OrderByDescending(t => t.DateCreated)
                .FirstOrDefaultAsync(t => t.PetId.Equals(pet.Id))
                ?? new TimeSeries { PetId = pet.Id };

            //map from model
            Mapper.Map(entry, timeSeries);

            //insert new row if changed
            if (DbContext.Entry(timeSeries).State != EntityState.Unchanged)
            {
                DbContext.Entry(timeSeries).State = EntityState.Detached;
                timeSeries.Id = 0;
                timeSeries.DateCreated = DateTime.UtcNow;

                DbContext.TimeSeries.Add(timeSeries);
                await DbContext.SaveChangesAsync();
            }

            return Ok(new { success = true });
        }

        // GET /pets/:id/weight
        [Route("{id:int}/weight"), HttpGet]
        public async Task<IHttpActionResult> GetWeightById(int id)
        {
            var pet = await DbContext.Pets
                        .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var timeSeries = await DbContext.TimeSeries.OrderByDescending(t => t.DateCreated)
                .Where(o => o.Weight != null)
                .FirstOrDefaultAsync(t => t.PetId.Equals(pet.Id));

            var model = Mapper.Map<WeightViewModel>(timeSeries);
            if (model?.Weight == null)
                model = null;

            return Ok(model);
        }

        // POST /pets
        [HttpPost]
        public async Task<IHttpActionResult> Post(PetViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = Mapper.Map<Pet>(model);
            pet.OwnerId = userId;

            DbContext.Pets.Add(pet);

            await DbContext.SaveChangesAsync();

            return Ok(Mapper.Map<PetViewModel>(pet));

        }

        [Route("{id:int}"), HttpPut]
        public async Task<IHttpActionResult> Put(int id, PetUpdateViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Pet pet = await DbContext.Pets
                .FirstOrDefaultAsync(p => p.Id.Equals(id));

            model.OwnerId = pet.OwnerId;
            Mapper.Map(model, pet);

            DbContext.Entry(pet).State = System.Data.Entity.EntityState.Modified;
            DbContext.SaveChanges();
            return Ok(Mapper.Map<PetViewModel>(pet));
        }

        // GET /pets/types
        [Route("Types"), HttpGet]
        public async Task<IHttpActionResult> GetTypes(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<PetType> query = DbContext.PetTypes.OrderBy(o => o.Name);
            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<PetTypeViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }

        // GET /pets/types
        [Route("Subtypes"), HttpGet]
        public async Task<IHttpActionResult> GetSubTypes(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<PetSubType> query = DbContext.PetSubTypes.OrderBy(o => o.Name);
            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<PetSubTypeViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }

        // GET /pets/types/:id/subtypes
        [Route("Types/{id:int}/Subtypes"), HttpGet]
        public async Task<IHttpActionResult> GetSubTypesByTypeId(int id, string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<PetSubType> query = DbContext.PetSubTypes
                .Where(o => o.PetTypeId == id)
                .OrderBy(o => o.Name);

            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<PetSubTypeViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }

        // GET /pets/breeds
        [Route("Breeds"), HttpGet]
        public async Task<IHttpActionResult> GetBreeds(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<Breed> query = DbContext.Breeds.OrderBy(o => o.Name);
            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<BreedViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }


        // POST /pets/:id/bulkactivityrate
        [Route("{id:int}/bulkactivityrate"), HttpPost]
        public async Task<IHttpActionResult> SetPetBulkActivityRates(int id, List<ActivityRateViewModel> models)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var initalActivitiesToDelete = DbContext.ActivityRates
                        .Where(x => x.Pet.Id == pet.Id && x.BulkLog == true && x.DateDeleted == null)
                        .ToList();

                    initalActivitiesToDelete.ForEach(x => x.DateDeleted = DateTimeOffset.Now);
                    await DbContext.SaveChangesAsync();


                    foreach (var model in models)
                    {
                        var activityRate = Mapper.Map<ActivityRate>(model);

                        // setting user
                        activityRate.RecordedById = userId;
                        activityRate.BulkLog = true;
                        activityRate.DateRegistered = DateTime.Now;

                        pet.ActivityRates.Add(activityRate);
                    }

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }



        // POST /pets/:id/activityrate
        [Route("{id:int}/activityrate"), HttpPost]
        public async Task<IHttpActionResult> SetPetActivityRate(int id, ActivityRateViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var activityRate = Mapper.Map<ActivityRate>(model);

            // setting user
            activityRate.RecordedById = userId;

            pet.ActivityRates.Add(activityRate);

            await DbContext.SaveChangesAsync();


            TaskService taskService = new TaskService(DbContext);
            taskService.ActivitiesB(DateTime.Now, pet.Id, activityRate.ReportEventId);
            taskService.DogJoyRating(DateTime.Now, pet.Id, activityRate.ReportEventId);

            return Ok();

        }


        // GET /pets/:id/activityrate
        [Route("{id:int}/activityrate"), HttpGet]
        public async Task<IHttpActionResult> GetActivityRatesByPetId(int id, string search = null, PeriodType period = PeriodType.SixMonths)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var days = Common.getDaysbyPeriodType(period);

            if (days == -1)
            {
                // No date filter
                IQueryable<ActivityRate> query = pet.ActivityRates.AsQueryable()
                    .Where(x => x.BulkLog == null && x.DateDeleted == null)
                    .OrderByDescending(t => t.DateRegistered);
                if (search != null)
                    query = query.Search(search.Split(' '), c => c.ReportEvent.Event.Name);

                var result = query.ProjectTo<ActivityRateViewModel>();

                return Ok(result);
            }
            else
            {
                IQueryable<ActivityRate> query = pet.ActivityRates.AsQueryable()
                     .Where(x => x.BulkLog == null && x.DateDeleted == null)
                     .Where(x => x.DateRegistered >= DateTime.Now.AddDays(-days))
                     .OrderByDescending(t => t.DateRegistered);

                if (search != null)
                    query = query.Search(search.Split(' '), c => c.ReportEvent.Event.Name);

                var result = query.ProjectTo<ActivityRateViewModel>();

                return Ok(result);
            }
        }

        // GET /pets/:id/activityrate/lastentry
        [Route("{id:int}/activityrate/lastentry"), HttpGet]
        public async Task<IHttpActionResult> GetActivityRatesByPetIdLastEntry(int id, int reportEventId = -1)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            // No date filter
            ActivityRate query = pet.ActivityRates.AsQueryable()
                .Where(x => x.DateDeleted == null)
                .Where(x => x.BulkLog == null)
                .Where(x => x.ReportEventId == reportEventId)
                .OrderByDescending(t => t.DateCreated)
                .FirstOrDefault();

            var result = Mapper.Map<ActivityRateViewModel>(query);

            return Ok(result);    
        }

        // DELETE /pets/:petId/activityrate/:id
        [Route("{petId:int}/activityrate/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> SetPetTreatmentReminder(int petId,int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(petId));

            var obj = await DbContext.ActivityRates
                .SingleOrDefaultAsync(p => p.Id.Equals(id));


            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    obj.DateDeleted = DateTimeOffset.Now;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }



        // POST /pets/:id/treatment
        [Route("{id:int}/treatment"), HttpPost]
        public async Task<IHttpActionResult> SetPetTreatment(int id, TreatmentViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var treatment = Mapper.Map<Treatment>(model);

            // setting user
            treatment.AdministeredById = userId;
 
            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    pet.Treatments.Add(treatment);

                    await DbContext.SaveChangesAsync();

                    var result = await DbContext.Treatments
                            .Include(o => o.TreatmentType)
                            .SingleOrDefaultAsync(p => p.Id.Equals(treatment.Id));

                    transactionContext.Commit();

                    return Ok(Mapper.Map<TreatmentViewModel>(result));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // PUT /pets/:id/treatment
        [Route("{id:int}/treatment/{treatmentId:int}"), HttpPut]
        public async Task<IHttpActionResult> UpdatePetTreatment(int id, int treatmentId, TreatmentViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            var treatment = await DbContext.Treatments
                .SingleOrDefaultAsync(p => p.Id.Equals(treatmentId));

            if (pet == null || treatment == null || !pet.Treatments.Contains(treatment))
                return NotFound();

            Mapper.Map(model, treatment);
            treatment.TreatmentTypeId = model.TreatmentTypeId;
            treatment.TreatmentType = await DbContext.TreatmentTypes.SingleOrDefaultAsync(p => p.Id.Equals(model.TreatmentTypeId));

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    DbContext.Entry(treatment).State = System.Data.Entity.EntityState.Modified;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<TreatmentViewModel>(treatment));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }


        // GET /pets/:id/treatment
        [Route("{id:int}/treatment"), HttpGet]
        public async Task<IHttpActionResult> GetPetTreatments(int id, PeriodType period = PeriodType.SixMonths)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var days = Common.getDaysbyPeriodType(period);

            if (days == -1)
            {
                // No date filter
                IQueryable<TreatmentViewModel> result = pet.Treatments
                    .Select(x => { x.Reminders = DbContext.TreatmentReminders.Where(o => o.TreatmentId == x.Id).Count(); return x; })
                    .AsQueryable()
                    .Where(x => x.DateDeleted == null)
                    .OrderByDescending(t => t.DateAdministered)
                    .ProjectTo<TreatmentViewModel>();

                return Ok(result);
            }
            else
            {
                IQueryable<TreatmentViewModel> result = pet.Treatments
                    .Select(x => { x.Reminders = DbContext.TreatmentReminders.Where(o => o.TreatmentId == x.Id).Count(); return x; })
                    .AsQueryable()
                    .Where(x => x.DateDeleted == null)
                    .Where(x => x.DateAdministered >= DateTime.Now.AddDays(-days))
                    .OrderByDescending(t => t.DateAdministered)
                    .ProjectTo<TreatmentViewModel>();

                return Ok(result);
            }
        }

        // DELETE /pets/:treatment/feed/:id
        [Route("{petId:int}/treatment/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> RemoveTreatment(int petId, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(petId));

            var obj = await DbContext.Treatments
                .SingleOrDefaultAsync(p => p.Id.Equals(id));


            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    obj.DateDeleted = DateTimeOffset.Now;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // GET /pets/:id/treatment/:treatmentId
        [Route("{id:int}/treatment/{treatmentId:int}"), HttpGet]
        public async Task<IHttpActionResult> GetPetTreatment(int id, int treatmentId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            var treatment = await DbContext.Treatments
                .SingleOrDefaultAsync(p => p.Id.Equals(treatmentId));

            if (pet == null || treatment == null || !pet.Treatments.Contains(treatment))
                return NotFound();

            var result = Mapper.Map<TreatmentViewModel>(treatment);

            return Ok(result);
        }



        // POST /pets/:id/treatment/:treatmentId/reminder
        [Route("{id:int}/treatment/{treatmentId:int}/reminder"), HttpPost]
        public async Task<IHttpActionResult> SetPetTreatmentReminder(int id, int treatmentId, TreatmentReminderViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            var treatment = await DbContext.Treatments
                .SingleOrDefaultAsync(p => p.Id.Equals(treatmentId));

            if (pet == null || treatment == null || !pet.Treatments.Contains(treatment))
                return NotFound();


            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var treatReminder = Mapper.Map<TreatmentReminder>(model);

                    // setting TreatmentId
                    treatReminder.TreatmentId = treatment.Id;

                    DbContext.TreatmentReminders.Add(treatReminder);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<TreatmentReminderViewModel>(treatReminder));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }


        // DELETE /pets/:id/treatment/:treatmentId/reminder/:reminderId
        [Route("{id:int}/treatment/{treatmentId:int}/reminder/{reminderId:int}"), HttpDelete]
        public async Task<IHttpActionResult> SetPetTreatmentReminder(int id, int treatmentId,int reminderId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            var treatment = await DbContext.Treatments
                .SingleOrDefaultAsync(p => p.Id.Equals(treatmentId));

            var reminder = await DbContext.TreatmentReminders
                .SingleOrDefaultAsync(p => p.Id.Equals(reminderId));

            if (pet == null || treatment == null || reminder == null || 
                !pet.Treatments.Contains(treatment) || 
                !reminder.TreatmentId.Equals(treatment.Id))
                return NotFound();


            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    DbContext.Entry(reminder).State = EntityState.Deleted;

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }



        // POST /pets/:id/treatment/:treatmentId/bulkreminders
        [Route("{id:int}/treatment/{treatmentId:int}/bulkreminders"), HttpPost]
        public async Task<IHttpActionResult> SetPetTreatmentBulkReminders(int id, int treatmentId, List<TreatmentReminderViewModel>  models)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            var treatment = await DbContext.Treatments
                .SingleOrDefaultAsync(p => p.Id.Equals(treatmentId));

            if (pet == null || treatment == null || !pet.Treatments.Contains(treatment))
                return NotFound();


            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    foreach (var model in models)
                    {
                        var treatReminder = Mapper.Map<TreatmentReminder>(model);

                        // setting TreatmentId
                        treatReminder.TreatmentId = treatment.Id;

                        DbContext.TreatmentReminders.Add(treatReminder);
                    }

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // GET /pets/:id/treatment/:treatmentId/reminders
        [Route("{id:int}/treatment/{treatmentId:int}/reminders"), HttpGet]
        public async Task<IHttpActionResult> GetPetTreatmentRemindersById(int id, int treatmentId)
        {
            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            var treatment = await DbContext.Treatments
                .SingleOrDefaultAsync(p => p.Id.Equals(treatmentId));
            
            if (pet == null || treatment == null || !pet.Treatments.Contains(treatment))
                return NotFound();

            IQueryable<TreatmentReminderViewModel> result = DbContext.TreatmentReminders
                .Where(o => o.TreatmentId == treatment.Id)
                .OrderByDescending(t => t.DoseDateTime)
                .ProjectTo<TreatmentReminderViewModel>();


            return Ok(result);
        }


        // GET /pets/:id/treatment/reminders
        [Route("{id:int}/treatment/reminders"), HttpGet]
        public async Task<IHttpActionResult> GetPetTreatmentReminders(int id)
        {
            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var listOfTreatmentId = pet.Treatments.Select(r => r.Id);
 
            IQueryable<TreatmentReminderViewModel> result = DbContext.TreatmentReminders
                .Where(o => listOfTreatmentId.Contains(o.TreatmentId))
                .OrderByDescending(t => t.DoseDateTime)
                .ProjectTo<TreatmentReminderViewModel>();


            return Ok(result);
        }

        // POST /pets/:id/symptom
        [Route("{id:int}/symptom"), HttpPost]
        public async Task<IHttpActionResult> SetPetSymptom(int id, SymptomViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var symptom = Mapper.Map<Symptom>(model);

            // setting user
            symptom.EnteredById = userId;

            pet.Symptoms.Add(symptom);

            await DbContext.SaveChangesAsync();
            return Ok();

        }

        // GET /pets/:id/symptoms
        [Route("{id:int}/symptoms"), HttpGet]
        public async Task<IHttpActionResult> GetPetSymptoms(int id, PeriodType period = PeriodType.SixMonths)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var days = Common.getDaysbyPeriodType(period);

            if (days == -1)
            {
                // No date filter
                var result = pet.Symptoms.AsQueryable()
                    .Where(x => x.DateDeleted == null)
                    .OrderByDescending(t => t.DateCreated)
                    .ProjectTo<SymptomViewModel>();

                return Ok(result);
            }
            else
            {
                var result = pet.Symptoms.AsQueryable()
                    .Where(x => x.DateDeleted == null)
                    .Where(x => x.DateCreated >= DateTime.Now.AddDays(-days))
                    .OrderByDescending(t => t.DateCreated)
                    .ProjectTo<SymptomViewModel>();

                return Ok(result);
            }
        }

        // DELETE /pets/:symptoms/feed/:id
        [Route("{petId:int}/symptoms/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> RemoveSymptom(int petId, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(petId));

            var obj = await DbContext.Symptoms
                .SingleOrDefaultAsync(p => p.Id.Equals(id));


            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    obj.DateDeleted = DateTimeOffset.Now;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // POST /pets/:id/respirationRate
        [Route("{id:int}/respirationRate"), HttpPost]
        public async Task<IHttpActionResult> SetPetRespirationRate(int id, RespirationRateViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var respirationRate = Mapper.Map<RespirationRate>(model);

            // setting user
            respirationRate.RegisteredById = userId;

            pet.RespirationRates.Add(respirationRate);

            await DbContext.SaveChangesAsync();
            return Ok();

        }

        // GET /pets/:id/respirationRate
        [Route("{id:int}/respirationRate"), HttpGet]
        public async Task<IHttpActionResult> GetPetRespirationRate(int id, PeriodType period = PeriodType.SixMonths)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var days = Common.getDaysbyPeriodType(period);

            if (days == -1)
            {
                // No date filter
                var result = pet.RespirationRates.AsQueryable()
                    .Where(x => x.DateDeleted == null)
                    .OrderByDescending(t => t.DateCreated)
                    .ProjectTo<RespirationRateViewModel>();

                return Ok(result);

            }
            else
            {
                var result = pet.RespirationRates.AsQueryable()
                    .Where(x => x.DateDeleted == null)
                    .Where(x => x.DateCreated >= DateTime.Now.AddDays(-days))
                    .OrderByDescending(t => t.DateCreated)
                    .ProjectTo<RespirationRateViewModel>();

                return Ok(result);
            }
        }

        // DELETE /pets/:petId/respirationRate/:id
        [Route("{petId:int}/respirationRate/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> RemoveRespirationRate(int petId, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(petId));

            var obj = await DbContext.RespirationRates
                .SingleOrDefaultAsync(p => p.Id.Equals(id));


            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    obj.DateDeleted = DateTimeOffset.Now;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }


        // GET /pets/:id/timeline
        [Route("{id:int}/timeline"), HttpGet]
        public async Task<IHttpActionResult> GetPetTimeline(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            List<TimelineViewModel> timeline = new List<TimelineViewModel>();

            var activitieRates = pet.ActivityRates.AsQueryable()
                .Where(x => x.DateDeleted == null)
                .OrderByDescending(t => t.DateCreated).Take(5);

            var behaviours = pet.Behaviours.AsQueryable()
                .Where(x => x.DateDeleted == null)
                .OrderByDescending(t => t.DateCreated).Take(5);

            var symptoms = pet.Symptoms.AsQueryable()
                .Where(x => x.DateDeleted == null)
                .OrderByDescending(t => t.DateCreated).Take(5);

            var treatments = pet.Treatments.AsQueryable()
                .Where(x => x.DateDeleted == null)
                .OrderByDescending(t => t.DateCreated).Take(5);

            var seizures = pet.Seizures.AsQueryable()
                .Where(x => x.DateDeleted == null)
                .OrderByDescending(t => t.DateCreated).Take(5);

            var respirationRates = pet.RespirationRates.AsQueryable()
                .Where(x => x.DateDeleted == null)
                .OrderByDescending(t => t.DateCreated).Take(5);

            var type = "Activity";
            foreach (var item in activitieRates)
            {
                timeline.Add(new TimelineViewModel { Date = item.DateCreated, Name = item.ReportEvent.Event.Name + " - " + item.ReportEvent.Report.Name, Type = type });
            }

            type = "Behaviour";
            foreach (var item in behaviours)
            {
                timeline.Add(new TimelineViewModel { Date = item.DateCreated, Name = item.BehaviourType.Name, Type = type });
            }

            type = "Symptom";
            foreach (var item in symptoms)
            {
                timeline.Add(new TimelineViewModel { Date = item.DateCreated, Name =  item.SymptomType.Name , Type = type });
            }

            type = "Treatment";
            foreach (var item in treatments)
            {
                timeline.Add(new TimelineViewModel { Date = item.DateCreated, Name = item.TreatmentType.Name, Type = type });
            }

            type = "Seizure";
            foreach (var item in seizures)
            {
                timeline.Add(new TimelineViewModel { Date = item.DateCreated, Name = item.SeizureType.Name, Type = type });
            }

            type = "RespirationRate";
            foreach (var item in respirationRates)
            {
                timeline.Add(new TimelineViewModel { Date = item.DateCreated, Name = "Respiration Rate", Type = type });
            }

            var result = timeline.OrderByDescending(t => t.Date);
            
            return Ok(result);
        }

        // PUT /pets/:id/petseizure
        [Route("{id:int}/petseizure"), HttpPut]
        public async Task<IHttpActionResult> UpdatePetSeizure(int id, PetSeizureViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    pet.PetSeizure = Mapper.Map<PetSeizure>(model);

                    DbContext.Entry(pet).State = System.Data.Entity.EntityState.Modified;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<PetSeizureViewModel>(pet.PetSeizure));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // GET /pets/:id/seizure
        [Route("{id:int}/seizure"), HttpGet]
        public async Task<IHttpActionResult> GetSeizures(int id, PeriodType period = PeriodType.SixMonths)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var days = Common.getDaysbyPeriodType(period);

            if (days == -1)
            {
                IQueryable<SeizureViewModel> result = pet.Seizures
                        .AsQueryable()
                        .Where(x => x.DateDeleted == null)
                        .OrderByDescending(t => t.DateCreated)
                        .ProjectTo<SeizureViewModel>();

                return Ok(result);
            }
            else
            {
                IQueryable<SeizureViewModel> result = pet.Seizures
                        .AsQueryable()
                        .Where(x => x.DateDeleted == null)
                        .Where(x => x.DateCreated >= DateTime.Now.AddDays(-days))
                        .OrderByDescending(t => t.DateCreated)
                        .ProjectTo<SeizureViewModel>();

                return Ok(result);
            }

        }

        // POST /pets/:id/seizure
        [Route("{id:int}/seizure"), HttpPost]
        public async Task<IHttpActionResult> Setseizure(int id, SeizureViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var seizure = Mapper.Map<Seizure>(model);

            // setting user
            seizure.EnteredById = userId;

            pet.Seizures.Add(seizure);

            await DbContext.SaveChangesAsync();

            var result = await DbContext.Seizures
                    .SingleOrDefaultAsync(p => p.Id.Equals(seizure.Id));

            return Ok(Mapper.Map<SeizureViewModel>(result));
        }


        // DELETE /pets/:petId/seizure/:id
        [Route("{petId:int}/seizure/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> RemoveSeizure(int petId, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(petId));

            var obj = await DbContext.Seizures
                .SingleOrDefaultAsync(p => p.Id.Equals(id));


            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    obj.DateDeleted = DateTimeOffset.Now;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }
        // GET /pets/:id/socialisation
        [Route("{id:int}/socialisation"), HttpGet]
        public async Task<IHttpActionResult> GetSocialisation(int id, PeriodType period = PeriodType.SixMonths)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var days = Common.getDaysbyPeriodType(period);

            if (days == -1)
            {
                // No date filter
                var result = pet.Socialisations.AsQueryable()
                    .Where(x => x.DateDeleted == null)
                    .OrderByDescending(t => t.DateCreated);

                return Ok(result);
            }
            else
            {
                var result = pet.Socialisations.AsQueryable()
                    .Where(x => x.DateDeleted == null)
                    .Where(x => x.DateCreated >= DateTime.Now.AddDays(-days))
                    .OrderByDescending(t => t.DateCreated);

                return Ok(result);
            }
        }

        // POST /pets/:id/socialisation
        [Route("{id:int}/socialisation"), HttpPost]
        public async Task<IHttpActionResult> SetSocialisation(int id, SocialisationViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var socialisation = Mapper.Map<Socialisation>(model);

                    pet.Socialisations.Add(socialisation);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    if (model.pTask == true) {
                        TaskService taskService = new TaskService(DbContext);
                        taskService.PuppySocialisationPoints(DateTime.Now, pet.Id);
                    }

                    return Ok(Mapper.Map<SocialisationViewModel>(socialisation));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }

        // DELETE /pets/:petId/socialisation/:id
        [Route("{petId:int}/socialisation/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> RemoveSocialisation(int petId, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(petId));

            var obj = await DbContext.Socialisations
                .SingleOrDefaultAsync(p => p.Id.Equals(id));


            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    obj.DateDeleted = DateTimeOffset.Now;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // GET /pets/:id/behaviour
        [Route("{id:int}/behaviour"), HttpGet]
        public async Task<IHttpActionResult> GetBehaviours(int id, PeriodType period = PeriodType.SixMonths)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var days = Common.getDaysbyPeriodType(period);

            try
            {
                if (days == -1)
                {
                    // No date filter
                    var result = pet.Behaviours
                        .AsQueryable()
                        .Where(x => x.DateDeleted == null)
                        .OrderByDescending(t => t.DateRegistered);

                    return Ok(result);
                }
                else
                {

                    var result = pet.Behaviours.AsQueryable()
                        .Where(x => x.DateDeleted == null)
                        .Where(x => x.DateRegistered >= DateTime.Now.AddDays(-days))
                        .OrderByDescending(t => t.DateRegistered);

                    return Ok(result);
                }
            }
            catch (Exception e)
            {

                throw;
            }

        }

        // POST /pets/:id/behaviour
        [Route("{id:int}/behaviour"), HttpPost]
        public async Task<IHttpActionResult> SetBehavioure(int id, BehaviourViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var behaviour = Mapper.Map<Behaviour>(model);

                    pet.Behaviours.Add(behaviour);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    TaskService taskService = new TaskService(DbContext);
                    taskService.ProblematicBehaviour(DateTime.Now, pet.Id);

                    return Ok(Mapper.Map<BehaviourViewModel>(behaviour));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }

        // DELETE /pets/:petId/behaviour/:id
        [Route("{petId:int}/behaviour/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> Removebehaviour(int petId, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(petId));

            var obj = await DbContext.Behaviours
                .SingleOrDefaultAsync(p => p.Id.Equals(id));


            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    obj.DateDeleted = DateTimeOffset.Now;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // POST /pets/:id/behaviour/destructive
        [Route("{id:int}/behaviour/destructive"), HttpPost]
        public async Task<IHttpActionResult> SetBehavioureDestructive(int id, DestructiveBehaviourViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var behaviour = Mapper.Map<DestructiveBehaviour>(model);

                    pet.Behaviours.Add(behaviour);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    TaskService taskService = new TaskService(DbContext);
                    taskService.ProblematicBehaviour(DateTime.Now, pet.Id);

                    return Ok(Mapper.Map<DestructiveBehaviourViewModel>(behaviour));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }


        // POST /pets/:id/behaviour/senior
        [Route("{id:int}/behaviour/senior"), HttpPost]
        public async Task<IHttpActionResult> SetBehavioureSenior(int id, SeniorBehaviourViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var behaviour = Mapper.Map<SeniorBehaviour>(model);

                    pet.Behaviours.Add(behaviour);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    TaskService taskService = new TaskService(DbContext);
                    taskService.ProblematicBehaviour(DateTime.Now, pet.Id);

                    return Ok(Mapper.Map<SeniorBehaviourViewModel>(behaviour));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // POST /pets/:id/behaviour/fearrelated
        [Route("{id:int}/behaviour/fearrelated"), HttpPost]
        public async Task<IHttpActionResult> SetBehavioureFearRelated(int id, FearRelatedBehaviourViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var behaviour = Mapper.Map<FearRelatedBehaviour>(model);

                    pet.Behaviours.Add(behaviour);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    TaskService taskService = new TaskService(DbContext);
                    taskService.ProblematicBehaviour(DateTime.Now, pet.Id);

                    return Ok(Mapper.Map<FearRelatedBehaviourViewModel>(behaviour));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // POST /pets/:id/behaviour/aggresive
        [Route("{id:int}/behaviour/aggresive"), HttpPost]
        public async Task<IHttpActionResult> SetBehaviourAggresive(int id, AggressiveBehaviourViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var behaviour = Mapper.Map<AggressiveBehaviour>(model);

                    pet.Behaviours.Add(behaviour);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    TaskService taskService = new TaskService(DbContext);
                    taskService.ProblematicBehaviour(DateTime.Now, pet.Id);

                    return Ok(Mapper.Map<AggressiveBehaviourViewModel>(behaviour));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }


        // GET /pets/:id/sessions
        [Route("{id:int}/sessions"), HttpGet]
        public async Task<IHttpActionResult> GetPetSessions(int id,PeriodType period = PeriodType.SixMonths)
        {
            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();


            var days = Common.getDaysbyPeriodType(period);

            if (days == -1)
            {
                // No date filter
                var result = pet.Sessions.AsQueryable()
                 .Where(x => x.DateDeleted == null)
                 .OrderByDescending(t => t.DateCreated)
                 .ProjectTo<SessionViewModel>();

                return Ok(result);
            }
            else {
                var result = pet.Sessions.AsQueryable()
                 .Where(x => x.DateDeleted == null)
                 .Where(x => x.DateCreated >= DateTime.Now.AddDays( - days))
                 .OrderByDescending(t => t.DateCreated)
                 .ProjectTo<SessionViewModel>();

                return Ok(result);
            }
 
        }

        // DELETE /pets/:petId/sessions/:id
        [Route("{petId:int}/sessions/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> RemoveSessions(int petId, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(petId));

            var obj = await DbContext.Sessions
                .SingleOrDefaultAsync(p => p.Id.Equals(id));


            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    obj.DateDeleted = DateTimeOffset.Now;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // POST /pets/:id/guideseeing/training
        [Route("{id:int}/guideseeing/training"), HttpPost]
        public async Task<IHttpActionResult> SetGuideSeeingTrainingSession(int id, GuideSeeingTrainingSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<GuideSeeingTrainingSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<GuideSeeingTrainingSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }

        // POST /pets/:id/guideseeing/assessment
        [Route("{id:int}/guideseeing/assessment"), HttpPost]
        public async Task<IHttpActionResult> SetGuideSeeingAssessmentSession(int id, GuideSeeingAssessmentSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<GuideSeeingAssessmentSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<GuideSeeingAssessmentSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }


        // POST /pets/:id/livestock/training
        [Route("{id:int}/livestock/training"), HttpPost]
        public async Task<IHttpActionResult> SetLivestockTrainingSession(int id, LivestockHerdingTrainingSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<LivestockHerdingTrainingSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<LivestockHerdingTrainingSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }


        // POST /pets/:id/livestock/assessment
        [Route("{id:int}/livestock/assessment"), HttpPost]
        public async Task<IHttpActionResult> SetLivestockAssessmentSession(int id, LivestockHerdingAssessmentSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<LivestockHerdingAssessmentSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<LivestockHerdingAssessmentSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }


        // POST /pets/:id/protectionguard/training
        [Route("{id:int}/protectionguard/training"), HttpPost]
        public async Task<IHttpActionResult> SetProtectionGuardTrainingSession(int id, ProtectionGuardTrainingSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<ProtectionGuardTrainingSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<ProtectionGuardTrainingSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }

        // POST /pets/:id/protectionguard/assessment
        [Route("{id:int}/protectionguard/assessment"), HttpPost]
        public async Task<IHttpActionResult> SetProtectionGuardAssessmentSession(int id, ProtectionGuardAssessmentSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<ProtectionGuardAssessmentSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<ProtectionGuardAssessmentSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }






        // POST /pets/:id/racinggreyhound/training
        [Route("{id:int}/racinggreyhound/training"), HttpPost]
        public async Task<IHttpActionResult> SetRacinggreyhoundTrainingSession(int id, RacingGreyhoundTrainingSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<RacingGreyhoundTrainingSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<RacingGreyhoundTrainingSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }

        // POST /pets/:id/racinggreyhound/assessment
        [Route("{id:int}/racinggreyhound/assessment"), HttpPost]
        public async Task<IHttpActionResult> SetRacingGreyhoundAssessmentSession(int id, RacingGreyhoundAssessmentSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<RacingGreyhoundAssessmentSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<RacingGreyhoundAssessmentSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }



        // POST /pets/:id/scentdetection/training
        [Route("{id:int}/scentdetection/training"), HttpPost]
        public async Task<IHttpActionResult> SetScentdetectionTrainingSession(int id, ScentDetectionTrainingSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<ScentDetectionTrainingSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<ScentDetectionTrainingSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }

        // POST /pets/:id/scentdetection/assessment
        [Route("{id:int}/scentdetection/assessment"), HttpPost]
        public async Task<IHttpActionResult> SetScentdetectionAssessmentSession(int id, ScentDetectionAssessmentSessionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var session = Mapper.Map<ScentDetectionAssessmentSession>(model);
                    session.ExecutedById = userId;

                    pet.Sessions.Add(session);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<ScentDetectionAssessmentSessionViewModel>(session));

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        // GET /pets/:id/feed
        [Route("{id:int}/feed"), HttpGet]
        public async Task<IHttpActionResult> GetPetFeeds(int id, PeriodType period = PeriodType.SixMonths)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var days = Common.getDaysbyPeriodType(period);

            if (days == -1)
            {
                // No date filter
                IQueryable<Feed> query = pet.Feeds.AsQueryable()
                    .Where(x => x.DateDeleted == null)
                    .OrderByDescending(t => t.DateCreated);

                var result = query.ProjectTo<FeedViewModel>();

                return Ok(result);
            }
            else
            {
                IQueryable<Feed> query = pet.Feeds.AsQueryable()
                     .Where(x => x.DateDeleted == null)
                     .Where(x => x.DateCreated >= DateTime.Now.AddDays(-days))
                     .OrderByDescending(t => t.DateCreated);

                var result = query.ProjectTo<FeedViewModel>();

                return Ok(result);
            }
        }

        // POST /pets/:id/feed
        [Route("{id:int}/feed"), HttpPost]
        public async Task<IHttpActionResult> SetPetFeed(int id, FeedViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var feed = Mapper.Map<Feed>(model);
                    feed.RecordedById = userId;

                    pet.Feeds.Add(feed);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<FeedViewModel>(feed));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }

        // DELETE /pets/:petId/feed/:id
        [Route("{petId:int}/feed/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> RemoveFeed(int petId, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(petId));

            var obj = await DbContext.Feeds
                .SingleOrDefaultAsync(p => p.Id.Equals(id));


            if (pet == null || obj == null)
                return NotFound();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    obj.DateDeleted = DateTimeOffset.Now;
                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

        }

        private float? ConvertWeight(string type, string valueType , float? value = 0) {
            if (valueType != null && value != null)
            {
                if (type.ToLower().Equals(valueType.ToLower()))
                {
                    return value;
                }
                else
                {
                    if (type == "kg")
                    {
                        return value / .45f;
                    }
                    else if (type == "pounds")
                    {
                        return value * 2.2f;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }
            else {
                return 0;
            }
        }


        // GET /pets/:id/weighthistory
        [Route("{id:int}/weighthistory"), HttpGet]
        public async Task<IHttpActionResult> GetWeightHistory(int id,string type = "kg", PeriodType period = PeriodType.Month)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            var days = Common.getDaysbyPeriodType(period);

            if (days == -1)
            {
                // No date filter
                IQueryable<TimeSeries> query = pet.TimeSeries
                    .AsQueryable()
                    .Select(s => new TimeSeries {
                        Id = s.Id,
                        Pet = s.Pet,
                        PetId = s.PetId,
                        DateCreated = s.DateCreated,
                        Timestamp = s.Timestamp,
                        Weight = ConvertWeight(type,s.WeightUnits, s.Weight),
                        WeightUnits = type
                    })
                    .OrderByDescending(t => t.DateCreated);

                var result = query.ProjectTo<TimeSeriesViewModel>();

                return Ok(result);
            }
            else
            {
                IQueryable<TimeSeries> query = pet.TimeSeries.AsQueryable()
                     .Where(x => x.DateCreated >= DateTime.Now.AddDays(-days))
                     .Select(s => new TimeSeries
                     {
                        Id = s.Id,
                        Pet = s.Pet,
                        PetId = s.PetId,
                        DateCreated = s.DateCreated,
                        Timestamp = s.Timestamp,
                        Weight = ConvertWeight(type, s.WeightUnits, s.Weight),
                        WeightUnits = type
                     })
                     .OrderByDescending(t => t.DateCreated);

                var result = query.ProjectTo<TimeSeriesViewModel>();

                return Ok(result);
            }
        }

        // GET /pets/:id/activityComparision
        [Route("{id:int}/activityComparision"), HttpGet]
        public async Task<IHttpActionResult> GetActivityComparision(
            int id,
            int ReportEventId,
            int BreedId = -1,
            int BreedPercentage = -1,
            int AgeRange = -1,
            int PetSex = -1,
            PeriodType period = PeriodType.Month)
        {
            double otherResult = -1;

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

           

            try
            {
                var days = Common.getDaysbyPeriodType(period);


                IQueryable<ActivityRate> petActivities = pet.ActivityRates.AsQueryable()
                    .Where(x => x.Pet.Id == id)
                    .Where(X => X.ReportEventId == ReportEventId)
                    .Where(x => !x.Rate.Name.ToUpper().Equals("NOT APPLICABLE"))
                    .Where(x => x.DateDeleted == null)
                    .Where(x => x.BulkLog == null);

                if (petActivities != null && days != -1)
                {
                    petActivities = petActivities.Where(x => x.DateCreated >= DateTime.Now.AddDays(-days));
                }

                if (petActivities != null && petActivities.Count() > 0)
                {
                    var petResult = petActivities
                                   .GroupBy(g => g.ReportEventId)
                                   .Select(s => s.Average(x => (8 - x.Rate.Order)))
                                   .FirstOrDefault();

                    // Option filters for others
                    IQueryable<ActivityRate> othersActivities = DbContext.ActivityRates.AsQueryable()
                        .Where(X => X.ReportEventId == ReportEventId)
                        .Where(x => !x.Rate.Name.ToUpper().Equals("NOT APPLICABLE"))
                        .Where(x => x.DateDeleted == null)
                        .Where(x => x.BulkLog == null);

                    if (othersActivities != null && days != -1)
                    {
                        var dateFilterFrom = DateTime.Now.AddDays(-days);
                        othersActivities = othersActivities
                            .Where(x => x.DateCreated >= dateFilterFrom);
                    }

                    if (othersActivities != null && BreedId != -1)
                    {
                        othersActivities = othersActivities
                              .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId));

                        if (othersActivities != null &&
                            othersActivities.Count() > 0 &&
                            BreedPercentage != -1)
                        {
                            othersActivities = othersActivities
                                .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId));
                        }
                    }

                    if (othersActivities != null && AgeRange != -1)
                    {
                        var dateFrom = pet.DateOfBirth.AddMonths(-AgeRange);
                        var dateTo = pet.DateOfBirth.AddMonths(AgeRange);

                        if (dateFrom != null && dateTo != null) {
                            othersActivities = othersActivities
                                .Where(x => x.Pet.DateOfBirth >= dateFrom &&
                                            x.Pet.DateOfBirth <= dateTo);
                        }
                    }

                    if (othersActivities != null && PetSex != -1)
                    {
                        othersActivities = othersActivities
                            .Where(x => (int)x.Pet.Sex == PetSex);
                    }



                    if (othersActivities != null && othersActivities.Count() > 0)
                    {
                        otherResult = othersActivities
                                       .GroupBy(g => g.ReportEventId)
                                       .Select(s => s.Average(x => (8 - x.Rate.Order)))
                                       .FirstOrDefault();
                    }





                    return Ok(new
                    {
                        ReportEventId = ReportEventId,
                        PetResult = petResult,
                        OtherResult = otherResult
                    });

                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception e)
            {

                return InternalServerError(e);
            }


        }


        // GET /pets/:id/weightComparision
        [Route("{id:int}/weightComparision"), HttpGet]
        public async Task<IHttpActionResult> GetWeightComparision(
            int id,
            string type = "kg",
            int BreedId = -1,
            int BreedPercentage = -1,
            int AgeRange = -1,
            int PetSex = -1)
        {
            var otherResult = -1;

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = await DbContext.Pets
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (pet == null)
                return NotFound();

            try
            {
                var petSerie = pet.TimeSeries.AsQueryable()
                    .Where(x => x.Pet.Id == id)
                    .Where(x => x.WeightUnits != null && x.Weight != null)
                    .OrderByDescending(o => o.DateCreated)
                    .Select(s => new TimeSeries
                    {
                        Id = s.Id,
                        Pet = s.Pet,
                        PetId = s.PetId,
                        DateCreated = s.DateCreated,
                        Timestamp = s.Timestamp,
                        Weight = ConvertWeight(type, s.WeightUnits, s.Weight),
                        WeightUnits = type
                    })
                    .FirstOrDefault();

                if (petSerie != null)
                {
                    // Option filters for others
                    IQueryable<TimeSeries> othersSeries = DbContext.TimeSeries.AsQueryable()
                        .Where(x => x.WeightUnits != null && x.Weight != null);

                    if (othersSeries != null && BreedId != -1)
                    {
                        othersSeries = othersSeries
                              .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId));

                        if (othersSeries != null &&
                            othersSeries.Count() > 0 &&
                            BreedPercentage != -1)
                        {
                            othersSeries = othersSeries
                                .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId));
                        }
                    }

                    if (othersSeries != null && AgeRange != -1)
                    {
                        var dateFrom = pet.DateOfBirth.AddMonths(-AgeRange);
                        var dateTo = pet.DateOfBirth.AddMonths(AgeRange);

                        if (dateFrom != null && dateTo != null)
                        {
                            othersSeries = othersSeries
                                .Where(x => x.Pet.DateOfBirth >= dateFrom &&
                                            x.Pet.DateOfBirth <= dateTo);
                        }
                    }

                    if (othersSeries != null && PetSex != -1)
                    {
                        othersSeries = othersSeries
                            .Where(x => (int)x.Pet.Sex == PetSex);
                    }

                    if (othersSeries != null && othersSeries.Count() > 0)
                    {

                        var totalValue = 0;
                        foreach (var item in othersSeries)
                        {
                            var weightValue = ConvertWeight(type, item.WeightUnits, item.Weight);
                            if (weightValue != null) {
                                totalValue += (int)weightValue;
                            }
                        }
                        otherResult = totalValue / othersSeries.Count();

                        return Ok(new
                        {
                            PetResult = petSerie.Weight,
                            OtherResult = otherResult
                        });
                    }
                    else
                    {
                        return Ok();
                    }
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception e)
            {

                return InternalServerError(e);
            }


        }
    }
}