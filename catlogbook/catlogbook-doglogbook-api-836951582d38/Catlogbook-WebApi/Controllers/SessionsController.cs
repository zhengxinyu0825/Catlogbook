using AutoMapper;
using Doglogbook.EntityFramework.DAL;
using Doglogbook_WebApi.Models;
using PagedList;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper.QueryableExtensions;
using Doglogbook.EntityFramework.Models.Reports;
using SmartSports.Data.Linq;
using Doglogbook.EntityFramework.Models.Vet;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Sessions;

namespace Doglogbook_WebApi.Controllers
{

    [Authorize]
    [RoutePrefix("api/Session")]
    public class SessionsController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public SessionsController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }

        // GET /SessionsTypes
        [Route("sessionsTypes"), HttpGet]
        public async Task<IHttpActionResult> GetSessionTypes()
        {
            IQueryable<SessionType> query = DbContext.SessionTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<SessionTypeViewModel>();

            return Ok(result);
        }

        // GET /VerbalCommands
        [Route("VerbalCommands"), HttpGet]
        public async Task<IHttpActionResult> GetVerbalCommands()
        {
            IQueryable<VerbalCommand> query = DbContext.VerbalCommands.OrderBy(o => o.Name);

            var result = query.ProjectTo<VerbalCommandViewModel>();

            return Ok(result);
        }

        // GET /HandGesturalCommands
        [Route("HandGesturalCommands"), HttpGet]
        public async Task<IHttpActionResult> GetHandGesturalCommands()
        {
            IQueryable<HandGesturalCommand> query = DbContext.HandGesturalCommands.OrderBy(o => o.Name);

            var result = query.ProjectTo<HandGesturalCommandViewModel>();

            return Ok(result);
        }


        // GET /WhistleLaserCommands
        [Route("WhistleLaserCommands"), HttpGet]
        public async Task<IHttpActionResult> GetWhistleLaserCommands()
        {
            IQueryable<WhistleLaserCommand> query = DbContext.WhistleLaserCommands.OrderBy(o => o.Name);

            var result = query.ProjectTo<WhistleLaserCommandViewModel>();

            return Ok(result);
        }


        // GET /PetSkills
        [Route("PetSkills"), HttpGet]
        public async Task<IHttpActionResult> GetPetSkills()
        {
            IQueryable<PetSkill> query = DbContext.PetSkills.OrderBy(o => o.Name);

            var result = query.ProjectTo<PetSkillViewModel>();

            return Ok(result);
        }


        // GET /PetDeviceMethods
        [Route("PetDeviceMethods"), HttpGet]
        public async Task<IHttpActionResult> GetPetDeviceMethods()
        {
            IQueryable<PetDeviceMethod> query = DbContext.PetDeviceMethods.OrderBy(o => o.Name);

            var result = query.ProjectTo<PetDeviceMethodViewModel>();

            return Ok(result);
        }


        // GET /Rewards
        [Route("Rewards"), HttpGet]
        public async Task<IHttpActionResult> GetRewards()
        {
            IQueryable<Reward> query = DbContext.Rewards.OrderBy(o => o.Name);

            var result = query.ProjectTo<RewardViewModel>();

            return Ok(result);
        }

        // GET /CorrectionDevices
        [Route("CorrectionDevices"), HttpGet]
        public async Task<IHttpActionResult> GetCorrectionDevices()
        {
            IQueryable<CorrectionDevice> query = DbContext.CorrectionDevices.OrderBy(o => o.Name);

            var result = query.ProjectTo<CorrectionDeviceViewModel>();

            return Ok(result);
        }


        // GET /SessionLevels
        [Route("SessionLevels"), HttpGet]
        public async Task<IHttpActionResult> GetSessionLevels()
        {
            IQueryable<SessionLevel> query = DbContext.SessionLevels.OrderBy(o => o.Name);

            var result = query.ProjectTo<SessionLevelViewModel>();

            return Ok(result);
        }

        // GET /DevelopmentWorkBehaviours
        [Route("DevelopmentWorkBehaviours"), HttpGet]
        public async Task<IHttpActionResult> GetDevelopmentWorkBehaviours()
        {
            IQueryable<DevelopmentWorkBehaviour> query = DbContext.DevelopmentWorkBehaviours.OrderBy(o => o.Name);

            var result = query.ProjectTo<DevelopmentWorkBehaviourViewModel>();

            return Ok(result);
        }

        // GET /LivestockHerdingWorkTypes
        [Route("LivestockHerdingWorkTypes"), HttpGet]
        public async Task<IHttpActionResult> GetLivestockHerdingWorkTypes()
        {
            IQueryable<LivestockHerdingWorkType> query = DbContext.LivestockHerdingWorkTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<LivestockHerdingWorkTypeViewModel>();

            return Ok(result);
        }

        // GET /RacingGreyhoundActivities
        [Route("RacingGreyhoundActivities"), HttpGet]
        public async Task<IHttpActionResult> GetRacingGreyhoundActivities()
        {
            IQueryable<RacingGreyhoundActivity> query = DbContext.RacingGreyhoundActivities.OrderBy(o => o.Name);

            var result = query.ProjectTo<RacingGreyhoundActivityViewModel>();

            return Ok(result);
        }

        // GET /RacingGreyhoundActivityElements
        [Route("RacingGreyhoundActivityElements"), HttpGet]
        public async Task<IHttpActionResult> GetRacingGreyhoundActivityElements()
        {
            IQueryable<RacingGreyhoundActivityElement> query = DbContext.RacingGreyhoundActivityElements.OrderBy(o => o.Name);

            var result = query.ProjectTo<RacingGreyhoundActivityElementViewModel>();

            return Ok(result);
        }


        // GET /ScentDetectionOdours
        [Route("ScentDetectionOdours"), HttpGet]
        public async Task<IHttpActionResult> GetScentDetectionOdours()
        {
            IQueryable<ScentDetectionOdour> query = DbContext.ScentDetectionOdours.OrderBy(o => o.Name);

            var result = query.ProjectTo<ScentDetectionOdourViewModel>();

            return Ok(result);
        }

    }
}