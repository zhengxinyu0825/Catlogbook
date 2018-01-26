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

namespace Doglogbook_WebApi.Controllers
{

    [Authorize]
    [RoutePrefix("api/vets")]
    public class VetsController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public VetsController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }

        // GET /vets/treatmentTypes
        [Route("treatmentTypes"), HttpGet]
        public async Task<IHttpActionResult> GetTreatmentTypes()
        {
            IQueryable<TreatmentType> query = DbContext.TreatmentTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<TreatmentTypeViewModel>();

            return Ok(result);
        }

        // GET /vets/symptomfrequencies
        [Route("symptomfrequencies"), HttpGet]
        public async Task<IHttpActionResult> GetSymptomFrequencies()
        {
            IQueryable<SymptomFrequency> query = DbContext.SymptomFrequencies.OrderBy(o => o.Name);

            var result = query.ProjectTo<SymptomFrequencyViewModel>();

            return Ok(result);
        }

        // GET /vets/symptomtypes
        [Route("symptomtypes"), HttpGet]
        public async Task<IHttpActionResult> GetSymptomTypes()
        {
            IQueryable<SymptomType> query = DbContext.SymptomTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<SymptomTypeViewModel>();

            return Ok(result);
        }


        // GET /vets/diagnosis
        [Route("diagnosis"), HttpGet]
        public async Task<IHttpActionResult> GetSeizureDiagnosis()
        {
            IQueryable<SeizureDiagnosis> query = DbContext.SeizureDiagnosis.OrderBy(o => o.Name);

            var result = query.ProjectTo<SeizureDiagnosisViewModel>();

            return Ok(result);
        }

        // GET /vets/seizuretesttypes
        [Route("seizuretesttypes"), HttpGet]
        public async Task<IHttpActionResult> GetSeizuretesttypes()
        {
            IQueryable<SeizureTestType> query = DbContext.SeizureTestTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<SeizureTestTypeViewModel>();

            return Ok(result);
        }

        // GET /vets/seizureTypes
        [Route("seizureTypes"), HttpGet]
        public async Task<IHttpActionResult> GetSeizureTypes()
        {
            IQueryable<SeizureType> query = DbContext.SeizureTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<SeizureTypeViewModel>();

            return Ok(result);
        }

        // GET /vets/seizureSignTypes
        [Route("seizureSignTypes"), HttpGet]
        public async Task<IHttpActionResult> GetSeizureSignTypes()
        {
            IQueryable<SeizureSignType> query = DbContext.SeizureSignTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<SeizureSignTypeViewModel>();

            return Ok(result);
        }


        // GET /vets/seizureBodyStates
        [Route("seizureBodyStates"), HttpGet]
        public async Task<IHttpActionResult> GetSeizureBodyStates()
        {
            IQueryable<SeizureBodyState> query = DbContext.SeizureBodyStates.OrderBy(o => o.Name);

            var result = query.ProjectTo<SeizureBodyStateViewModel>();

            return Ok(result);
        }

        // GET /vets/seizureBodyStatePositions
        [Route("seizureBodyStatePositions"), HttpGet]
        public async Task<IHttpActionResult> GetSeizureBodyStatePositions()
        {
            IQueryable<SeizureBodyStatePosition> query = DbContext.SeizureBodyStatePositions.OrderBy(o => o.Name);

            var result = query.ProjectTo<SeizureBodyStatePositionViewModel>();

            return Ok(result);
        }

        // GET /vets/seizureAfterSignTypes
        [Route("seizureAfterSignTypes"), HttpGet]
        public async Task<IHttpActionResult> GetSeizureAfterSignTypes()
        {
            IQueryable<SeizureAfterSignType> query = DbContext.SeizureAfterSignTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<SeizureAfterSignTypeViewModel>();

            return Ok(result);
        }




    }
}