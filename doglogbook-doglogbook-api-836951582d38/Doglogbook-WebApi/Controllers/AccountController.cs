using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Doglogbook_WebApi.Models;
using Doglogbook_WebApi.Providers;
using Doglogbook_WebApi.Results;
using Doglogbook.EntityFramework.DAL.User;
using Doglogbook.EntityFramework.Models;
using AutoMapper;
using Postal;
using Doglogbook.EntityFramework.DAL;
using System.Data.Entity;
using Doglogbook.EntityFramework.Models.Users;

namespace Doglogbook_WebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";

        private IEmailService EmailService { get; set; }

        public AccountController(IEmailService emailService)
        {
            EmailService = emailService;
        }

        private DoglogbookDbContext DbContext => Request.GetOwinContext().Get<DoglogbookDbContext>();

        private MemberManager _userManager;
        public MemberManager UserManager
        {
            private get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<MemberManager>();
            }
            set
            {
                _userManager = value;
            }
        }

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        // GET api/Account/UserInfo
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("UserInfo")]
        public async Task<IHttpActionResult> GetUserInfo()
        {
            var userId = User.Identity.GetUserId<int>();
            var user = await DbContext.Users.SingleAsync(u => u.Id == userId);

            return Ok(Mapper.Map<UserInfoViewModel>(user));
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer), HttpPost]
        [Route("UserInfo")]
        public async Task<IHttpActionResult> UpdateUserInfo(UserInfoBindingModel model)
        {
            if (ModelState.IsValid)
            {
                var userId = User.Identity.GetUserId<int>();
                var user = DbContext.Users.Find(userId);
                Mapper.Map(model, user);

                await DbContext.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Route("UserQuestion"),HttpGet]
        public async Task<IHttpActionResult> GetUserQuestion()
        {
            var userId = User.Identity.GetUserId<int>();
            var user = await DbContext.Users.SingleAsync(u => u.Id == userId);

            return Ok(Mapper.Map<UserQuestionViewModel>(user));
        }

        [Route("UserQuestion"), HttpPost]
        public async Task<IHttpActionResult> UpdateUserQuestion(UserQuestionViewModel model)
        {
            Country country = null;

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.Identity.GetUserId<int>();
            var user = DbContext.Users.Find(userId);

            if (model.CountryId != null)
            {
                country = DbContext.Countries.Find(model.CountryId);
            }
            

            if (user != null && country != null)
            {

                // updating profile 
                user.CountryId = country.Id;
                user.Children13 = model.Children13;
                user.Teens = model.Teens;
                user.Adults = model.Adults;
                user.Seniors = model.Seniors;
                user.PostCode = model.PostCode;

                await DbContext.SaveChangesAsync();
                return Ok(Mapper.Map<UserQuestionViewModel>(user));
            }
            else
            {
                return BadRequest(ModelState);
            }

        }



        [Route("UserCountry/{id:int}"), HttpPost]
        public async Task<IHttpActionResult> UpdateUserCountry(int id)
        {
            var userId = User.Identity.GetUserId<int>();
            var user = DbContext.Users.Find(userId);
            var country = DbContext.Countries.Find(id);

            if (user != null && country != null) {

                // updating country 
                user.CountryId = country.Id;
                await DbContext.SaveChangesAsync();
                return Ok(Mapper.Map<UserInfoViewModel>(user));
            }
            else {
                return BadRequest(ModelState);
            }

        }

        // POST api/Account/Logout
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }

        // GET api/Account/ManageInfo?returnUrl=%2F&generateState=true
        [Route("ManageInfo"), HttpGet]
        public async Task<ManageInfoViewModel> GetManageInfo(string returnUrl, bool generateState = false)
        {
            var user = await
                    DbContext.Users.SingleAsync(u => u.Id == (User.Identity.GetUserId<int>()));
            if (user == null)
            {
                return null;
            }

            List<UserLoginInfoViewModel> logins = new List<UserLoginInfoViewModel>();

            foreach (var linkedAccount in user.Logins)
            {
                logins.Add(new UserLoginInfoViewModel
                {
                    LoginProvider = linkedAccount.LoginProvider,
                    ProviderKey = linkedAccount.ProviderKey
                });
            }

            if (user.PasswordHash != null)
            {
                logins.Add(new UserLoginInfoViewModel
                {
                    LoginProvider = LocalLoginProvider,
                    ProviderKey = user.UserName,
                });
            }

            return new ManageInfoViewModel
            {
                LocalLoginProvider = LocalLoginProvider,
                Email = user.UserName,
                Logins = logins,
                ExternalLoginProviders = GetExternalLogins(returnUrl, generateState)
            };
        }

        // POST api/Account/ChangePassword
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId<int>(), model.OldPassword,
                model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/SetPassword
        [Route("SetPassword")]
        public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await UserManager.AddPasswordAsync(User.Identity.GetUserId<int>(), model.NewPassword);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/AddExternalLogin
        [Route("AddExternalLogin")]
        public async Task<IHttpActionResult> AddExternalLogin(AddExternalLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            AuthenticationTicket ticket = AccessTokenFormat.Unprotect(model.ExternalAccessToken);

            if (ticket == null || ticket.Identity == null || (ticket.Properties != null
                && ticket.Properties.ExpiresUtc.HasValue
                && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
            {
                return BadRequest("External login failure.");
            }

            ExternalLoginData externalData = ExternalLoginData.FromIdentity(ticket.Identity);

            if (externalData == null)
            {
                return BadRequest("The external login is already associated with an account.");
            }

            IdentityResult result = await UserManager.AddLoginAsync(User.Identity.GetUserId<int>(),
                new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/RemoveLogin
        [Route("RemoveLogin")]
        public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result;

            if (model.LoginProvider == LocalLoginProvider)
            {
                result = await UserManager.RemovePasswordAsync(User.Identity.GetUserId<int>());
            }
            else
            {
                result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId<int>(),
                    new UserLoginInfo(model.LoginProvider, model.ProviderKey));
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("ExternalLogin", Name = "ExternalLogin")]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            if (error != null)
            {
                return Redirect(Url.Content("~/") + "#error=" + Uri.EscapeDataString(error));
            }

            if (!User.Identity.IsAuthenticated)
            {
                return new ChallengeResult(provider, this);
            }

            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            if (externalLogin.LoginProvider != provider)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                return new ChallengeResult(provider, this);
            }

            var user = await UserManager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider,
                externalLogin.ProviderKey));

            bool hasRegistered = user != null;

            if (hasRegistered)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

                ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(UserManager,
                   OAuthDefaults.AuthenticationType);
                ClaimsIdentity cookieIdentity = await user.GenerateUserIdentityAsync(UserManager,
                    CookieAuthenticationDefaults.AuthenticationType);

                AuthenticationProperties properties = ApplicationOAuthProvider.CreateProperties(user.UserName);
                Authentication.SignIn(properties, oAuthIdentity, cookieIdentity);
            }
            else
            {
                IEnumerable<Claim> claims = externalLogin.GetClaims();
                ClaimsIdentity identity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
                Authentication.SignIn(identity);
            }

            return Ok();
        }

        // GET api/Account/ExternalLogins?returnUrl=%2F&generateState=true
        [AllowAnonymous]
        [Route("ExternalLogins")]
        public IEnumerable<ExternalLoginViewModel> GetExternalLogins(string returnUrl, bool generateState = false)
        {
            IEnumerable<AuthenticationDescription> descriptions = Authentication.GetExternalAuthenticationTypes();
            List<ExternalLoginViewModel> logins = new List<ExternalLoginViewModel>();

            string state;

            if (generateState)
            {
                const int strengthInBits = 256;
                state = RandomOAuthStateGenerator.Generate(strengthInBits);
            }
            else
            {
                state = null;
            }

            foreach (AuthenticationDescription description in descriptions)
            {
                ExternalLoginViewModel login = new ExternalLoginViewModel
                {
                    Name = description.Caption,
                    Url = Url.Route("ExternalLogin", new
                    {
                        provider = description.AuthenticationType,
                        response_type = "token",
                        client_id = Startup.PublicClientId,
                        redirect_uri = new Uri(Request.RequestUri, returnUrl).AbsoluteUri,
                        state = state
                    }),
                    State = state
                };
                logins.Add(login);
            }

            return logins;
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = Mapper.Map<User>(model);
            IdentityResult result = await UserManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            // Email Confirmation  
            await Task.Run(() => SendEmailConfirmation(user.Id, model.Email, UserManager.GenerateEmailConfirmationToken(user.Id)));


            return Ok();
        }


        // POST api/Account/RegisterExternal
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("RegisterExternal")]
        public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var info = await Authentication.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return InternalServerError();
            }

            var user = new User { UserName = model.Email, Email = model.Email, DateOfBirth = model.DateOfBirth, DateCreated = DateTime.Now };
            IdentityResult result = await UserManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            result = await UserManager.AddLoginAsync(user.Id, info.Login);
            if (!result.Succeeded)
            {
                return GetErrorResult(result); 
            }
            return Ok();
        }


        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> ForgotPassword(string userName)
        {
            var user = await UserManager.FindByNameAsync(userName);

            if (user == null)
                ModelState.AddModelError("userName", "User does not exist");
            else
            {
                var token = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                await Task.Run(() => SendForgotPasswordEmail(user, token));
            }

            return Ok(new
            {
                Message = "An email has been sent to you so that you may recover your account. " +
                          "Please check your inbox or junk mail folder and follow the instructions. " +
                          "Once you have completed the process, you will be able to login into Doglogbook with your new credentials. "
            });
        }

        private void SendEmailConfirmation(int userId, string emailAddress, string token)
        {
            dynamic config = new Formo.Configuration();
            var callbackUrl = config.DoglogbookWebAddress + $"/Account/ConfirmEmail?userId={userId}&code={HttpUtility.UrlEncode(token)}";
            UserManager.SendEmail(userId, "Confirm your account", $"Please confirm your account by clicking <a href=\"{callbackUrl}\">here</a>");
        }

        private void SendForgotPasswordEmail(Member user, string token)
        {
            dynamic config = new Formo.Configuration();
            var callbackUrl = config.DoglogbookWebAddress +
                           $"/Account/ForgotPassword?userId={user.Id}&token={HttpUtility.UrlEncode(token)}";
            UserManager.SendEmail(user.Id, "Reset Password", $"Please reset your password by clicking <a href=\"{callbackUrl}\">here</a>");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }

        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }

            public IList<Claim> GetClaims()
            {
                IList<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

                if (UserName != null)
                {
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                }

                return claims;
            }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
                    || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name)
                };
            }
        }

        private static class RandomOAuthStateGenerator
        {
            private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits % bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                }

                int strengthInBytes = strengthInBits / bitsPerByte;

                byte[] data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        #endregion
    }
}
