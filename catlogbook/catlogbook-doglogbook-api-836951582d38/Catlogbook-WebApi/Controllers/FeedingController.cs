using Doglogbook.EntityFramework.DAL;
using Doglogbook_WebApi.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using SmartSports.Data.Linq;
using AutoMapper.QueryableExtensions;
using Doglogbook.EntityFramework.Models.Feeding;

namespace Doglogbook_WebApi.Controllers
{

    [Authorize]
    [RoutePrefix("api/feeding")]
    public class FeedingController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public FeedingController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }

        // GET /FeedingTypes
        [Route("FeedingTypes"), HttpGet]
        public async Task<IHttpActionResult> GetFeedingTypes()
        {
            IQueryable<FeedingType> query = DbContext.FeedingTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<FeedingTypeViewModel>();

            return Ok(result);
        }

        // GET /FeedingUnits
        [Route("FeedingUnits"), HttpGet]
        public async Task<IHttpActionResult> GetFeedingUnits()
        {
            IQueryable<FeedingUnit> query = DbContext.FeedingUnits.OrderBy(o => o.Name);

            var result = query.ProjectTo<FeedingUnitViewModel>();

            return Ok(result);
        }

        // GET /FeedingTypes/:id/frecuencies
        [Route("FeedingTypes/{id:int}/frecuencies"), HttpGet]
        public async Task<IHttpActionResult> GetFeedingTypeFrecuencies(int id)
        {
            IQueryable<FeedingTypeFrecuency> query = DbContext.FeedingTypeFrecuencies
                .Where(x => x.FeedingTypeId == id)
                .OrderBy(o => o.Name);

            var result = query.ProjectTo<FeedingTypeFrecuencyViewModel>();

            return Ok(result);
        }

        // GET /FoodTypes
        [Route("FoodTypes"), HttpGet]
        public async Task<IHttpActionResult> GetFoodTypes()
        {
            IQueryable<FoodType> query = DbContext.FoodTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<FoodTypeViewModel>();

            return Ok(result);
        }


        // GET /FoodBrands
        [Route("FoodBrands"), HttpGet]
        public async Task<IHttpActionResult> GetFoodBrands(int countryId = 0)
        {
            IQueryable<FoodBrand> query;

            if (countryId > 0)
            {
                var country = DbContext.Countries.SingleOrDefault(p => p.Id.Equals(countryId));

                if (country == null)
                    return NotFound();

                query = DbContext.FoodBrands
                    .Where(x => x.CountryId == countryId)
                    .OrderBy(o => o.Name);

            }
            else {
                query = DbContext.FoodBrands
                    .OrderBy(o => o.Name);
            }

            var result = query.ProjectTo<FoodBrandViewModel>();

            return Ok(result);
        }

        // GET /FoodProducts
        [Route("FoodProducts"), HttpGet]
        public async Task<IHttpActionResult> GetFoodProducts(int brandId = 0,int foodTypeId = 0)
        {
            IQueryable<FoodProduct> query;

            if (brandId > 0 && foodTypeId > 0)
            {
                var brand = DbContext.FoodBrands.SingleOrDefault(p => p.Id.Equals(brandId));
                var foodtype = DbContext.FoodTypes.SingleOrDefault(p => p.Id.Equals(foodTypeId));

                if (brand == null || foodtype == null)
                    return NotFound();

                query = DbContext.FoodProducts
                    .Where(x => x.FoodBrandId == brandId && x.FoodTypeId == foodTypeId)
                    .OrderBy(o => o.Name);

            }
            else
            {
                query = DbContext.FoodProducts
                    .OrderBy(o => o.Name);
            }

            var result = query.ProjectTo<FoodProductViewModel>();

            return Ok(result);
        }




    }




}