using AutoMapper;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Doglogbook_WebApi.Models
{

    public class GrantUserViewModel
    {
        [Required]
        public int UserId { get; set; }
    }

    public class UserLiteViewModel
    {
        public int? Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<UserLiteViewModel, User>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<User, UserLiteViewModel>();
        }
    }

    public class UserViewModel
    {
        public int? Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<PetViewModel> Pets { get; set; }
        public virtual ICollection<Animal> Animals { get; set; }

        public virtual ICollection<UserViewModel> Handlers { get; set; }
        public virtual ICollection<UserViewModel> Vets { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<UserViewModel, User>()
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<User, UserViewModel>();
        }
    }

    public class ShareUserPetViewModel
    {
        public int? Id { get; set; }

        [Required]
        public ShareUserType ShareUserType { get; set; }

        [Required]
        public int ShareUserId { get; set; }
        public virtual UserLiteViewModel ShareUser { get; set; }

        public DateTimeOffset DateCreated { get; set; }

        public virtual ICollection<SharePetViewModel> SharePets { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<ShareUserPetViewModel, ShareUserPet>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<ShareUserPet, ShareUserPetViewModel>();
        }
    }


    public class SharePetViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int PetId { get; set; }
        public PetViewModel Pet { get; set; }

        public DateTimeOffset DateCreated { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<SharePetViewModel, SharePet>()
                .ForMember(d => d.DateCreated, o => o.MapFrom(x => DateTimeOffset.Now))
                .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<SharePet, SharePetViewModel>();
        }
    }


}