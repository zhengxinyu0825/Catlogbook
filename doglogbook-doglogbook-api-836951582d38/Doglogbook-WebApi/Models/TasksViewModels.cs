using AutoMapper;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Tasks;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Doglogbook_WebApi.Models
{
    public class TaskAlertViewModel
    {
        public int? Id { get; set; }

        [Required]
        public TaskAlertTypeEnum TaskAlertType { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public int PetId { get; set; }
        public virtual PetViewModel Pet { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime DateFrom { get; set; }

        [Required]
        public DateTime DateTo { get; set; }

        public DateTime? DateConfirmed { get; set; }

        public string Title { get; set; }
        public string Msg { get; set; }

        public virtual ICollection<TaskAlertItemViewModel> Items { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TaskAlertViewModel, TaskAlert>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<TaskAlert, TaskAlertViewModel>();
        }
    }

    public class TaskAlertItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<TaskAlertItemViewModel, TaskAlertItem>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<TaskAlertItem, TaskAlertItemViewModel>();
        }
    }
}