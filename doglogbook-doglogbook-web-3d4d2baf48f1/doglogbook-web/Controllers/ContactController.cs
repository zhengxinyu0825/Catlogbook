using doglogbook_web.Models;
using Microsoft.AspNet.Identity;
using Postal;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace doglogbook_web.Controllers
{
    public class ContactController : Controller
    {
        IEmailService EmailService { get; }

        public ContactController(IEmailService emailService)
        {
            EmailService = emailService;
        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public virtual async Task<ActionResult> Index(ContactMessageModel model)
        {
            if (ModelState.IsValid)
            {
                dynamic email = new Postal.Email("ContactMessage");
                email.To = ConfigurationManager.AppSettings["ContactUsClient"];
                email.Cc = ConfigurationManager.AppSettings["ContactUsInternal"];
                email.Subject = ConfigurationManager.AppSettings["ContactUsSubject"];
                email.FirstName = model.FirstName;
                email.LastName = model.LastName;
                email.Email = model.Email;
                email.Title = model.Subject;
                email.Message = model.Body;

                await EmailService.SendAsync(email);

                ViewBag.Message = "Thanks for your feedback.";

                return View(MVC.Shared.Views.Info);
            }

            return View(model);
        }
    }
}