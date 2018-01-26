using AutoMapper;
using AutoMapper.QueryableExtensions;
using Doglogbook.EntityFramework.DAL;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Reports;
using Doglogbook_WebApi.Models;
using Microsoft.AspNet.Identity;
using PagedList;
using SmartSports.Data.Linq;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;


namespace Doglogbook_WebApi.Controllers
{

    [Authorize]
    [RoutePrefix("api/Users")]
    public class UserController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public UserController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }

        // GET /users/pets
        [Route("{id:int}/Pets")]
        public async Task<IHttpActionResult> GetPetsById(int id, string search = null, int? pageNumber = null, int? pageSize = null)
        {
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 50;

            IQueryable<Pet> query = DbContext.Pets.Where(o => o.OwnerId == id).OrderBy(o => o.Name);

            if (search != null)
                query = query.Search(search.Split(' '), c => c.Name);

            var result = query.ProjectTo<PetViewModel>()
                .ToPagedList(pageNumber.Value, pageSize.Value);

            return Ok(result);
        }





    }
}