using Doglogbook.EntityFramework.DAL;
using Doglogbook_WebApi.Models;
using PagedList;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper.QueryableExtensions;
using Doglogbook.EntityFramework.Models.Reports;
using SmartSports.Data.Linq;

namespace Doglogbook_WebApi.Controllers
{

    [Authorize]
    [RoutePrefix("api/Events")]
    public class EventsController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public EventsController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }

        // GET /events
        public async Task<IHttpActionResult> Get(string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<Event> query = DbContext.Events.OrderBy(o => o.Name);

            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<EventViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }
    }
}