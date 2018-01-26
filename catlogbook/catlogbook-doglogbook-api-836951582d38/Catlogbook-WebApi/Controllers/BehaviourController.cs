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
using Doglogbook.EntityFramework.Models.Commons;

namespace Doglogbook_WebApi.Controllers
{

    [Authorize]
    [RoutePrefix("api/Behaviour")]
    public class BehaviourController : ApiController
    {
        private DoglogbookDbContext DbContext { get; }

        public BehaviourController(DoglogbookDbContext dbContext)
        {
            DbContext = dbContext;
        }


        // GET /Types
        [Route("types"), HttpGet]
        public async Task<IHttpActionResult> GetTypes()
        {
            IQueryable<BehaviourType> query = DbContext.BehaviourTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<BehaviourTypeViewModel>();

            return Ok(result);
        }

        // GET :id/ItemTypes/
        [Route("{id:int}/itemTypes"), HttpGet]
        public async Task<IHttpActionResult> GetItemTypesById(int id)
        {
            IQueryable<BehaviourItemType> query = DbContext.BehaviourItemTypes
                .Where(o => o.BehaviourTypeId == id)
                .OrderBy(o => o.Name);

            var result = query.ProjectTo<BehaviourItemTypeViewModel>();

            return Ok(result);
        }


        // GET /ObservationTypes
        [Route("ObservationTypes"), HttpGet]
        public async Task<IHttpActionResult> GetObservationTypes()
        {
            IQueryable<ObservationType> query = DbContext.ObservationTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<ObservationTypeViewModel>();

            return Ok(result);
        }

        // GET /LocationTypes
        [Route("LocationTypes"), HttpGet]
        public async Task<IHttpActionResult> GetLocationTypes()
        {
            IQueryable<LocationType> query = DbContext.LocationTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<LocationTypeViewModel>();

            return Ok(result);
        }


        // GET /NearResources
        [Route("NearResources"), HttpGet]
        public async Task<IHttpActionResult> GetNearResourceTypes()
        {
            IQueryable<NearResourceType> query = DbContext.NearResourceTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<NearResourceTypeViewModel>();

            return Ok(result);
        }

        // GET /BehaviourDirectedTowards
        [Route("BehaviourDirectedTowards"), HttpGet]
        public async Task<IHttpActionResult> GetBehaviourDirectedTowards()
        {
            IQueryable<BehaviourDirectedToward> query = DbContext.BehaviourDirectedTowards.OrderBy(o => o.Name);

            var result = query.ProjectTo<BehaviourDirectedTowardViewModel>();

            return Ok(result);
        }


        // GET /DestroyedObjects
        [Route("DestroyedObjects"), HttpGet]
        public async Task<IHttpActionResult> GetDestroyedObjects()
        {
            IQueryable<DestroyedObject> query = DbContext.DestroyedObjects.OrderBy(o => o.Name);

            var result = query.ProjectTo<DestroyedObjectViewModel>();

            return Ok(result);
        }



        // GET /BehaviourDuringTypes
        [Route("BehaviourDuringTypes"), HttpGet]
        public async Task<IHttpActionResult> GetBehaviourDuringTypes()
        {
            IQueryable<BehaviourDuringType> query = DbContext.BehaviourDuringTypes.OrderBy(o => o.Name);

            var result = query.ProjectTo<BehaviourDuringTypeViewModel>();

            return Ok(result);
        }


    }
}