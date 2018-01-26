using System.Linq;
using System.Web.Mvc;
using Doglogbook.EntityFramework.DAL;
using Doglogbook.EntityFramework.Models.RegistrationOfInterest;
using SmartSports.Data.I18N.Context;
using SmartSports.Mvc.I18N;

namespace doglogbook_web.Controllers
{
    public partial class HomeController : Controller
    {
        DoglogbookDbContext DbContext { get; }
        IInternationalizationResourceContext I18N { get; }

        public HomeController(DoglogbookDbContext dbContext, IInternationalizationResourceContext i18N)
        {
            DbContext = dbContext;
            I18N = i18N.GetChildContext("Controller:Home:");
        }

        public virtual ActionResult Index()
        {
            var model = new RegistrationOfInterest();
            ViewBag.Message = TempData["Message"] as string;

            return View(model);
        }

        public virtual ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public virtual ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public virtual ActionResult Register(RegistrationOfInterest model)
        {
            var i18N = I18N.GetChildContext("Action:Register:");

            // remove any email address errors so that we can revalidate
            ModelState.Remove("EmailAddress");

            if (ModelState.IsValid)
            {
                //check if user already registered
                if (DbContext.RegistrationsOfInterest.Any(m => m.EmailAddress.Equals(model.EmailAddress)))
                {
                    ModelState.AddModelError("EmailAddress", i18N.T("Error:EmailAlreadyRegistered", "Email address '{emailAddress}' is already registered.", args: new {emailAddress = model.EmailAddress}));
                }
                else
                {
                    DbContext.RegistrationsOfInterest.Add(model);
                    DbContext.SaveChanges();

                    TempData["Message"] = i18N.T("Message:Success", "You have successfully registered your interest.");
                }
            }

            return RedirectToAction(Actions.Index());
        }
    }
}