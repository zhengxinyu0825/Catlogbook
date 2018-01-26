using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using SmartSports.Data.I18N.Attributes;
using SmartSports.Data.I18N.Context;
using SmartSports.Data.I18N.Models;
using SmartSports.Mvc.I18N;
using System;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Users;

namespace doglogbook_web.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class ResearchLoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Passcode")]
        public string Passcode { get; set; }
    }

    public class RegisterViewModelResources : DisplayResourceType
    {
        private static IInternationalizationResourceContext I18N => GetContext("DogLogBook").GetChildContext("ViewModels:Register:");

        public static string UserRole => I18N.T("UserRole", "Role");
        public static string FirstName => I18N.T("FirstName", "First Name");
        public static string LastName => I18N.T("LastName", "Last Name");
    }

    [TranslateEnum("UserRoles")]
    public enum UserRole
    {
        [TranslateEnumKey("Owner", "Owner")]
        Owner,
        [TranslateEnumKey("Handler", "Handler")]
        Handler,
        [TranslateEnumKey("Researcher", "Researcher")]
        Researcher,
        [TranslateEnumKey("Trainer", "Trainer")]
        Trainer,
        [TranslateEnumKey("Vet", "Vet")]
        Vet
    }

    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [Display(Name = "UserRole", ResourceType = typeof(RegisterViewModelResources))]
        public UserRole UserRole { get; set; }

        [Required]
        [Display(Name = "FirstName", ResourceType = typeof(RegisterViewModelResources))]
        public string FirstName { get; set; }
        [Required]
        [Display(Name = "LastName", ResourceType = typeof(RegisterViewModelResources))]
        public string LastName { get; set; }

        public static void AutoMapper_CreateMaps(IMapperConfiguration config)
        {
            config.CreateMap<RegisterViewModel, Member>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Email))
                .ForMember(d => d.DateCreated, o => o.UseValue(DateTime.Now))
                .ForMember(d => d.DateOfBirth, o => o.UseValue(DateTime.Today));

        }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }


    public class ContactMessageModel
    {

        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Subject")]
        public string Subject { get; set; }

        [Required]
        [Display(Name = "How can we help you?")]
        public string Body { get; set; }
    }
}
