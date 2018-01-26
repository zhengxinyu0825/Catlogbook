using Doglogbook.EntityFramework.DAL;
using Doglogbook.EntityFramework.Models;
using System.Web.Mvc;

namespace Doglogbook_WebApi.Controllers
{
    public class HomeController : Controller
    {

         

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
