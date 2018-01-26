using AutoMapper;
using AutoMapper.QueryableExtensions;
using Doglogbook.EntityFramework.DAL;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Reports;
using Doglogbook.EntityFramework.Models.Tasks;
using Doglogbook.EntityFramework.Models.Users;
using Doglogbook.EntityFramework.Models.Vet;
using Doglogbook_WebApi.Models;
using Doglogbook_WebApi.Tasks;
using Microsoft.AspNet.Identity;
using PagedList;
using SmartSports.Data.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;

namespace Doglogbook_WebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/Owners")]
    public class OwnersController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public OwnersController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }

        [Route("userByEmail")]
        public async Task<IHttpActionResult> GetuserByEmail(string email)
        {
            var userId = User.Identity.GetUserId<int>();

            User resultUser = DbContext.Users
                 .Where(o => o.Id != userId && o.Email.Equals(email))
                 .FirstOrDefault();

            return Ok(Mapper.Map<UserLiteViewModel>(resultUser));
        }

        [Route("allUsers")]
        public async Task<IHttpActionResult> GetAllUsers(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            var userId = User.Identity.GetUserId<int>();

            IQueryable<User> query = DbContext.Users
                .Where(o => o.Id != userId).OrderBy(o => o.FirstName);

            var result = query.ProjectTo<UserLiteViewModel>();

            if (search != null)
                result = result.Search(search.Split(' '), c => c.Email);

            return Ok(result);
        }

        [Route("allPets")]
        public async  Task<IHttpActionResult> GetAllRelatedPets(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            var userId = User.Identity.GetUserId<int>();

            var user = await DbContext.Users
                .SingleOrDefaultAsync(o => o.Id.Equals(userId));

            if (user == null)
                return NotFound();

            List<int> sharePetIds =  DbContext.SharePets
                .Where(x => x.ShareUserPet.ShareUserId == userId)
                .Select(x => x.PetId)
                .ToList();
    
            IQueryable<Pet> query = DbContext.Pets
                .Where(x => x.DateDeleted == null)
                .Where(o => o.OwnerId == userId || sharePetIds.Contains(o.Id))
                .OrderBy(o => o.Name);

            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<PetViewModel>();

            return Ok(result);
        }


        [Route("users")]
        public async Task<IHttpActionResult> GetRelatedUsers(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            return Ok();
        }

      

        [Route("Pets")]
        public async Task<IHttpActionResult> GetPetsById(string search = null)
        {
            var userId = User.Identity.GetUserId<int>();

            IQueryable<Pet> query = DbContext.Pets
                .Where(x => x.DateDeleted == null)
                .Where(o => o.OwnerId == userId)
                .OrderBy(o => o.Name);

            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<PetViewModel>();

            return Ok(result);
        }
      

        [Route("Pets/alerts")]
        public async Task<IHttpActionResult> GetPetsAlertsById()
        {
            List<TaskAlertViewModel> taskAlerts = new List<TaskAlertViewModel>();

            var userId = User.Identity.GetUserId<int>();

            TaskService taskService = new TaskService(DbContext);
            taskService.ActivitiesA(DateTime.Now, userId);

            var pets = DbContext.Pets.Where(o => o.OwnerId == userId).Select(x => x.Id).ToList();

            var result = DbContext.TaskAlerts
                .Where(x => x.DateConfirmed == null)
                .Where(x => pets.Contains(x.PetId))
                .ToList();

            foreach (TaskAlert item in result)
            {
                var task = new TaskAlertViewModel
                {
                    Id = item.Id,
                    Title = PrepareTitle(item),
                    Msg = PrepareMsg(item),
                    Description = item.Description,
                    TaskAlertType = item.TaskAlertType,
                    DateCreated = item.DateCreated,
                    PetId = item.PetId,
                    Pet = Mapper.Map<PetViewModel>(item.Pet),
                    DateConfirmed = item.DateConfirmed,
                    DateTo = item.DateTo,
                    DateFrom = item.DateFrom
                };

                taskAlerts.Add(task);
            }

            return Ok(taskAlerts);
        }

        private string PrepareMsg(TaskAlert alert)
        {
            var msg = "";

            if (alert.TaskAlertType == TaskAlertTypeEnum.ProblematicBehaviour)
            {
                var itemsNames = alert.Items.Select(x => x.Name.ToString()).ToList();

                msg = ConfigurationManager.AppSettings["TaskMsgProblematicBehaviour"];
                msg = string.Format(msg, alert.Pet.Name, alert.Items.Count().ToString(), String.Join(", ", itemsNames.ToArray()));
                return msg;
    
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.ActivitiesHealthCheckA)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgActivitiesHealthCheckA"];
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.ActivitiesHealthCheckB)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgActivitiesHealthCheckB"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoyFirstEntry)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgDogJoyFirstEntry"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoySecondEntry)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgDogJoySecondEntry"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoyThirdEntry)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgDogJoyThirdEntry"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoyFourthEntry)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgDogJoyFourthEntry"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoyNeutral15)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgDogJoyDogJoyNeutral15"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoyDecreasing1645)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgDogJoyDecreasing1645"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoyDecreasingOver45)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgDogJoyDecreasingOver45"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoyImprovemenet1645)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgDogJoyImprovemenet1645"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoyImprovemenetOver45)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgDogJoyImprovemenetOver45"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.TaskMsgPuppySocialisation_1)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgPuppySocialisation_1"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.TaskMsgPuppySocialisation_2)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgPuppySocialisation_2"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.TaskMsgPuppySocialisation_3)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgPuppySocialisation_3"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.TaskMsgPuppySocialisation_4)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgPuppySocialisation_4"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.TaskMsgPuppySocialisation_5)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgPuppySocialisation_5"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.TaskMsgPuppySocialisation_6)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgPuppySocialisation_6"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.TaskMsgPuppySocialisation_7)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgPuppySocialisation_7"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.TaskMsgPuppySocialisation_8)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgPuppySocialisation_8"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.TaskMsgPuppySocialisation_9)
            {
                msg = ConfigurationManager.AppSettings["TaskMsgPuppySocialisation_9"];
                msg = string.Format(msg, alert.Pet.Name, alert.Description);
                return msg;
            }
            else
            {
                return "No Description";
            }

        }
        private string PrepareTitle(TaskAlert alert)
        {
            if (alert.TaskAlertType == TaskAlertTypeEnum.ProblematicBehaviour)
            {
                return "Problematic Behaviour";
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.ActivitiesHealthCheckA)
            {
                return "Health Check";
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.ActivitiesHealthCheckB)
            {
                return "Health Check";
            }
            else if (alert.TaskAlertType == TaskAlertTypeEnum.DogJoyFirstEntry ||
                alert.TaskAlertType == TaskAlertTypeEnum.DogJoySecondEntry ||
                alert.TaskAlertType == TaskAlertTypeEnum.DogJoyThirdEntry ||
                alert.TaskAlertType == TaskAlertTypeEnum.DogJoyFourthEntry ||
                alert.TaskAlertType == TaskAlertTypeEnum.DogJoyNeutral15 ||
                alert.TaskAlertType == TaskAlertTypeEnum.DogJoyDecreasing1645 ||
                alert.TaskAlertType == TaskAlertTypeEnum.DogJoyDecreasingOver45 ||
                alert.TaskAlertType == TaskAlertTypeEnum.DogJoyImprovemenet1645 ||
                alert.TaskAlertType == TaskAlertTypeEnum.DogJoyImprovemenetOver45 )
            {
                return "Dog Joy";
            }
            else
            {
                return "Alert";
            }    
        }


        [Route("Pets/alerts/bulkconfirm"), HttpPost]
        public async Task<IHttpActionResult> SetTaskAlertsBulkConfirm(List<int> alerts)
        {
            var userId = User.Identity.GetUserId<int>();

            var pets = DbContext.Pets.Where(o => o.OwnerId == userId).Select(x => x.Id).ToList();

            var ownerAlerts = DbContext.TaskAlerts
                .Where(x => x.DateConfirmed == null)
                .Where(x => pets.Contains(x.PetId))
                .Where(s => alerts.Contains(s.Id))
                .ToList();

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    foreach (var alert in ownerAlerts)
                    {
                        alert.DateConfirmed = DateTime.Now;
                        DbContext.Entry(alert).State = System.Data.Entity.EntityState.Modified;
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

        public async Task<IHttpActionResult> Get(int id)
        {
            var user = await DbContext.Users
                .SingleOrDefaultAsync(o => o.Id.Equals(id));

            if (user == null)
                return NotFound();

            var model = Mapper.Map<UserInfoViewModel>(user);
            return Ok(model);
        }

        // GET /owners/activityrate
        [Route("activityrate"), HttpGet]
        public async Task<IHttpActionResult> GetActivityRatesByOwnerId(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            var userId = User.Identity.GetUserId<int>();

            IQueryable<ActivityRate> query = DbContext.ActivityRates
                .Where(x => x.RecordedById == userId && x.BulkLog == null)
                .AsQueryable()
                .OrderByDescending(t => t.DateCreated);

            if (search != null)
                query = query.Search(search.Split(' '), c => c.ReportEvent.Event.Name);

            var result = query.ProjectTo<ActivityRateViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }

        // GET /owners/symptoms
        [Route("symptoms"), HttpGet]
        public async Task<IHttpActionResult> GetPetSymptoms(int? pageNumber = null, int? pageSize = null)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();

            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<Symptom> query = DbContext.Symptoms.AsQueryable()
                .OrderByDescending(t => t.DateCreated);

            var result = query.ProjectTo<SymptomViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }


        // POST /owners/ShareUserPet
        [Route("ShareUserPet"), HttpPost]
        public async Task<IHttpActionResult> AddShareUserPet(ShareUserPetViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();
            var user = await DbContext.Users
                .SingleOrDefaultAsync(o => o.Id.Equals(userId));

            var grantUser = await DbContext.Users
                .SingleOrDefaultAsync(o => o.Id.Equals(model.ShareUserId));

            var sharePetIds = model.SharePets.Select(x => x.PetId).ToList();

            var userPets = DbContext.Pets
                .Where(x => x.DateDeleted == null)
                .Where(o => o.OwnerId == userId)
                .Where(x => sharePetIds.Contains(x.Id))
                .ToList();

            var shareUserExist = user.ShareUserPets
                .Where(x => x.ShareUserId == model.ShareUserId && x.ShareUserType == model.ShareUserType)
                .SingleOrDefault();


            if (user == null ||
                grantUser == null ||
                user.Id == grantUser.Id ||
                sharePetIds.Count != userPets.Count)
            {
                return NotFound();
            }

            if (shareUserExist != null) {
                return BadRequest("The user is already associated with this account.");
            }

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var shareUserPet = Mapper.Map<ShareUserPet>(model);
                    user.ShareUserPets.Add(shareUserPet);

                    await DbContext.SaveChangesAsync();
                    transactionContext.Commit();

                    return Ok(Mapper.Map<ShareUserPetViewModel>(shareUserPet));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }

        // PUT /owners/ShareUserPet/:id
        [Route("ShareUserPet/{id:int}"), HttpPut]
        public async Task<IHttpActionResult> UpdateShareUserPet(int id, ShareUserPetViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();
            var user = await DbContext.Users
                .SingleOrDefaultAsync(o => o.Id.Equals(userId));

            var grantUser = await DbContext.Users
                .SingleOrDefaultAsync(o => o.Id.Equals(model.ShareUserId));

            var sharePetIds = model.SharePets.Select(x => x.PetId).ToList();

            var userPets = DbContext.Pets
                .Where(x => x.DateDeleted == null)
                .Where(o => o.OwnerId == userId)
                .Where(x => sharePetIds.Contains(x.Id))
                .ToList();

            if (user == null ||
                grantUser == null ||
                user.Id == grantUser.Id ||
                sharePetIds.Count != userPets.Count)
            {
                return NotFound();
            }

            var shareUser = user.ShareUserPets
                .SingleOrDefault(x => x.Id == id);

            if (shareUser == null)
            {
                return BadRequest("The user is not associated with this account.");
            }

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var shareUserPet = Mapper.Map<ShareUserPet>(model);

                    shareUser.SharePets.ToList().ForEach(r => shareUser.SharePets.Remove(r));

                    await DbContext.SaveChangesAsync();

                    shareUser.SharePets = shareUserPet.SharePets;

                    await DbContext.SaveChangesAsync();

                    transactionContext.Commit();

                    return Ok(Mapper.Map<ShareUserPetViewModel>(shareUserPet));
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
        }



        // GET /owners/ShareUserPet
        [Route("ShareUserPet"), HttpGet]
        public async Task<IHttpActionResult> GetShareUserPet()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();
            var user = await DbContext.Users
                    .SingleOrDefaultAsync(o => o.Id.Equals(userId));

            if (user == null)
                return NotFound();

            IQueryable<ShareUserPet> query = user.ShareUserPets.AsQueryable()
                .OrderByDescending(t => t.DateCreated);

            var result = query.ProjectTo<ShareUserPetViewModel>();

            return Ok(result);
        }

        // DELETE /owners/ShareUserPet/:id
        [Route("ShareUserPet/{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> RemoveShareUser(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();
            var user = await DbContext.Users
                .SingleOrDefaultAsync(o => o.Id.Equals(userId));


            if (user == null)
                return NotFound();

            var shareUser = user.ShareUserPets.SingleOrDefault(o => o.Id.Equals(id));

            if (shareUser == null)
            {
                return BadRequest("The user is not associated with this account.");
            }

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    DbContext.ShareUserPets.Remove(shareUser);
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


        // POST /owners/ShareUserPet/transfer
        [Route("ShareUserPet/transfer"), HttpPost]
        public async Task<IHttpActionResult> TransferShareUserPet(ShareUserPetViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();
            var user = await DbContext.Users
                .SingleOrDefaultAsync(o => o.Id.Equals(userId));

            var grantUser = await DbContext.Users
                .SingleOrDefaultAsync(o => o.Id.Equals(model.ShareUserId));

            var sharePetIds = model.SharePets.Select(x => x.PetId).ToList();

            var userPets = DbContext.Pets
                .Where(x => x.DateDeleted == null)
                .Where(o => o.OwnerId == userId)
                .Where(x => sharePetIds.Contains(x.Id))
                .ToList();

            if (user == null ||
                grantUser == null ||
                user.Id == grantUser.Id ||
                sharePetIds.Count != userPets.Count)
            {
                return NotFound();
            }

            var destinationUser = DbContext.Users
                .SingleOrDefault(x => x.Id == grantUser.Id);

            if (destinationUser == null)
            {
                return BadRequest("The user is not a member.");
            }

            using (var transactionContext = DbContext.Database.BeginTransaction())
            {
                try
                {
                    userPets.ForEach(r => r.OwnerId = destinationUser.Id);
                    await DbContext.SaveChangesAsync();

                    //removing all shared settings
                    await DbContext.SharePets
                        .Where(x => sharePetIds.Contains(x.PetId))
                        .ForEachAsync(e => DbContext.SharePets.Remove(e));
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

    }
}