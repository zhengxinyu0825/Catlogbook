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
using Doglogbook.EntityFramework.Models.Commons;
using Doglogbook.EntityFramework.Models.Sessions;

namespace Doglogbook_WebApi.Controllers
{

    [Authorize]
    [RoutePrefix("api/Common")]
    public class CommonController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public CommonController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }


        // GET /Countries
        [Route("Countries"), HttpGet]
        public async Task<IHttpActionResult> GetCountries()
        {
            IQueryable<Country> query = DbContext.Countries.OrderBy(o => o.Name);

            var result = query.ProjectTo<CountryViewModel>();

            return Ok(result);
        }

        // GET /SpeciesTypes
        [Route("speciesTypes"), HttpGet]
        public async Task<IHttpActionResult> GetSpeciesTypes()
        {
            IQueryable<SpeciesType> query = DbContext.SpeciesTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<SpeciesTypeViewModel>();

            return Ok(result);
        }


        // GET /Species
        [Route("species"), HttpGet]
        public async Task<IHttpActionResult> GetSpecies()
        {
            IQueryable<Species> query = DbContext.Species.OrderBy(o => o.Name);

            var result = query.ProjectTo<SpeciesViewModel>();

            return Ok(result);
        }


        // GET /SurfaceObstacles
        [Route("SurfaceObstacles"), HttpGet]
        public async Task<IHttpActionResult> GetSurfaceObstacles()
        {
            IQueryable<SurfaceObstacle> query = DbContext.SurfaceObstacles.OrderBy(o => o.Name);

            var result = query.ProjectTo<SurfaceObstacleViewModel>();

            return Ok(result);
        }

        // GET /TransportationTypes
        [Route("TransportationTypes"), HttpGet]
        public async Task<IHttpActionResult> GetTransportationTypes()
        {
            IQueryable<TransportationType> query = DbContext.TransportationTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<TransportationTypeViewModel>();

            return Ok(result);
        }


        // GET /LocationSubTypes
        [Route("LocationSubTypes"), HttpGet]
        public async Task<IHttpActionResult> GetLocationSubTypes()
        {
            IQueryable<LocationSubType> query = DbContext.LocationSubTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<LocationSubTypeViewModel>();

            return Ok(result);
        }


    }
}
