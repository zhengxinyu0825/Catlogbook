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

namespace Doglogbook_WebApi.Controllers
{

    [Authorize]
    [RoutePrefix("api/Reports")]
    public class ReportsController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public ReportsController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }

        // GET /reports
        public async Task<IHttpActionResult> Get(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<Report> query = DbContext.Reports.OrderBy(o => o.Name);
            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<ReportViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }


        // GET /reports/:id
        [Route("{id:int}"), HttpGet]
        public async Task<IHttpActionResult> Get(int id)
        {
            var report = await DbContext.Reports
                .SingleOrDefaultAsync(p => p.Id.Equals(id));

            if (report == null)
                return NotFound();

            var model = Mapper.Map<ReportViewModel>(report);
            return Ok(model);
        }

        // GET /reports/:id/events
        [Route("{id:int}/Events"), HttpGet]
        public async Task<IHttpActionResult> GetEventsByReportId(int id , string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;

            IQueryable<ReportEvent> query = DbContext.ReportEvents
                .Include(o => o.Report)
                .Include(o => o.Event)
                .Where(o => o.ReportId == id)
                .OrderBy(o => o.Event.Name);

            if (search != null)
                query = query.Search(search.Split(' '), c => c.Event.Name);

            pageSize = pageSize ?? query.Count();
            var result = query.ProjectTo<ReportEventViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }

        // GET /reports/EventsByReportType
        [Route("{id:int}/EventsByReportType"), HttpGet]
        public async Task<IHttpActionResult> GetReportEventsByReportTypeId(int id)
        {
            IQueryable<ReportEvent> query = DbContext.ReportEvents
                .Include(o => o.Report)
                .Include(o => o.Event)
                .Where(o => o.Report.ReportTypeId == id)
                .OrderBy(o => o.Event.Name);
        
            var result = query.ProjectTo<ReportEventViewModel>();
       
            return Ok(result);
        }

        // GET /reports/types
        [Route("Types"), HttpGet]
        public async Task<IHttpActionResult> GetReportTypes(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<ReportType> query = DbContext.ReportTypes.OrderBy(o => o.Name);
            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<ReportTypeViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }

        // GET /reports/rates
        [Route("Rates"), HttpGet]
        public async Task<IHttpActionResult> GetReportRates()
        {
            IQueryable<Rate> query = DbContext.Rates.OrderBy(o => o.Order);

            var result = query.ProjectTo<RateViewModel>();

            return Ok(result);
        }


        // GET /reports/Sounds
        [Route("Sounds"), HttpGet]
        public async Task<IHttpActionResult> GetSounds()
        {
            IQueryable<Sound> query = DbContext.Sounds.OrderBy(o => o.Name);

            var result = query.ProjectTo<SoundViewModel>();

            return Ok(result);
        }


        // GET /reports/LifeExperiences
        [Route("LifeExperiences"), HttpGet]
        public async Task<IHttpActionResult> GetLifeExperiences()
        {
            IQueryable<LifeExperience> query = DbContext.LifeExperiences.OrderBy(o => o.Name);

            var result = query.ProjectTo<LifeExperienceViewModel>();

            return Ok(result);
        }

    }
}