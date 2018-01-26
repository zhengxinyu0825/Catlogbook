using AutoMapper;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Doglogbook_WebApi.Models
{
    // Models returned by AccountController actions.

    public class UserQuestionViewModel
    {
        public int? Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PostCode { get; set; }
        public int? Children13 { get; set; }
        public int? Teens { get; set; }
        public int? Adults { get; set; }
        public int? Seniors { get; set; }

        public int? CountryId { get; set; }
        public virtual CountryViewModel Country { get; set; }


        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<UserQuestionViewModel, User>()
                 .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<User, UserQuestionViewModel>();
        }
    }

    public class UserInfoViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        public int? CountryId { get; set; }
        public virtual CountryViewModel Country { get; set; }

        public RoleModel Roles { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<User, UserInfoViewModel>()
                .ForMember(d => d.Roles, o => o.Ignore());
        }
    }

    public class CountryViewModel
    {
        public int? Id { get; set; }

        [Required, MaxLength(50)]
        public string Name { get; set; }

        [Required, MaxLength(5)]
        public string Code { get; set; }

        [MaxLength(12)]
        public string PhoneCode { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<CountryViewModel, Country>()
            .ForMember(d => d.Id, o => o.Ignore());

            Mapper.CreateMap<Country, CountryViewModel>();
        }
    }

    public class UserInfoBindingModel
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        public int? CountryId { get; set; }
        public virtual CountryViewModel Country { get; set; }

        public RoleModel Roles { get; set; }

        public static void AutoMapper_CreateMaps()
        {
            Mapper.CreateMap<UserInfoBindingModel, User>()
                .ForMember(d => d.Roles, o => o.Ignore());
        }
    }

    public class ExternalLoginViewModel
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public string State { get; set; }
    }

    public class ManageInfoViewModel
    {
        public string LocalLoginProvider { get; set; }

        public string Email { get; set; }

        public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }

        public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }
    }

    public class UserLoginInfoViewModel
    {
        public string LoginProvider { get; set; }

        public string ProviderKey { get; set; }
    }
}
