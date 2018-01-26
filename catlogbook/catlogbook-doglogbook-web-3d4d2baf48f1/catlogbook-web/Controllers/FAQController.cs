using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace doglogbook_web.Controllers
{
    public partial class FAQController : Controller
    {
        // GET: Guide
        public virtual ActionResult Guide()
        {
            return View();
        }

        // GET: FAQ
        public virtual ActionResult Index()
        {
            return View();
        }

        // GET: FAQ Terms
        public virtual ActionResult Terms()
        {
            return View();
        }
    }
}