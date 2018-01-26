using AutoMapper;
using Doglogbook.EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Doglogbook_WebApi.Models
{
    public class SpeciesTypeViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SpeciesTypeViewModel, SpeciesType>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SpeciesType, SpeciesTypeViewModel>();
        }
    }


    public class SpeciesViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public int SpeciesTypeId { get; set; }
        public virtual SpeciesTypeViewModel SpeciesType { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SpeciesViewModel, Species>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Species, SpeciesViewModel>();
        }
    }


}