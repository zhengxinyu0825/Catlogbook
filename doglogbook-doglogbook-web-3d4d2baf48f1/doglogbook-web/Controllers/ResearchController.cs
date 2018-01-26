using Doglogbook.EntityFramework.DAL;
using Doglogbook.EntityFramework.DAL.User;
using Doglogbook.EntityFramework.Models;
using Doglogbook.EntityFramework.Models.Behaviour;
using doglogbook_web.Models;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace doglogbook_web.Controllers
{
    [Authorize]
    public partial class ResearchController : Controller
    {
        MemberManager MemberManager { get; }
        private IAuthenticationManager AuthenticationManager => HttpContext.GetOwinContext().Authentication;
        private DoglogbookDbContext DbContext { get; }
        private SignInManager<Member, int> _signInManager;
        private SignInManager<Member, int> SignInManager => (_signInManager = _signInManager ?? new SignInManager<Member, int>(MemberManager, AuthenticationManager));

        public ResearchController(MemberManager memberManager, DoglogbookDbContext dbContext)
        {
            MemberManager = memberManager;
            DbContext = dbContext;
        }

        public enum FeatureType
        {
            Activities = 1,
            AggressiveBehaviours = 2,
            AnxietyBehaviours = 3,
            DestructiveBehaviours = 4,
            EscapingEvadingBehaviours = 5,
            FearBehaviours = 6,
            OtherBehaviours = 7,
            RepetitiveBehaviours = 8,
            SeniorBehaviours = 9,
            ToiletingEliminationBehaviours = 10,
            VocalisingBehaviours = 11,
            Feeding = 12,
            Treatments = 13,
            Symptoms = 14,
            Seizures = 15,
            RespiratoryRates = 16
        }

        private static readonly IDictionary<int, int> FeatureIdMap = new Dictionary<int, int>()
        {
            // UI-ID    behaviourTypeID 
            { 2, 8 },
            { 3, 10 },
            { 4, 2 },
            { 5, 5 },
            { 6, 9 },
            { 7, 6 },
            { 8, 3 },
            { 9, 7 },
            { 10, 4 },
            { 11, 1 }
        };


        [AllowAnonymous]
        [HttpGet]
        public virtual ActionResult Index(string returnUrl)
        {
            Session["PasscodeAccess"] = null;

            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public virtual async Task<ActionResult> Index(ResearchLoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var ResearchersPasscode = WebConfigurationManager.AppSettings["ResearchersPasscode"];

            var user = await MemberManager.FindByEmailAsync(model.Email);
            if (user != null && !await MemberManager.IsEmailConfirmedAsync(user.Id))
            {
                ModelState.AddModelError("","You must have a confirmed email to log in.");

                return View(model);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, false, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    if (ResearchersPasscode == model.Passcode)
                    {
                        Session["PasscodeAccess"] = DateTime.Now;
                        return RedirectToLocal(returnUrl);
                    }
                    else {
                        ModelState.AddModelError("", "Invalid passcode.");
                        return View(model);
                    }
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid login attempt.");
                    return View(model);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Export");
        }

        [HttpGet]
        public ActionResult Export()
        {
            var PasscodeAccess = Session["PasscodeAccess"];
            if (PasscodeAccess == null) {
                return RedirectToAction("Index");
            }

            ViewBag.FeaturesSelect = this.FeaturesSelect;
            ViewBag.SexSelect = this.SexSelect;
            ViewBag.BreedPercentageSelect = this.BreedPercentageSelect;

            var Breeds = DbContext.Breeds
                .OrderBy(x => x.Name)
                .Select(x => new SelectListItem
                {
                    Text = x.Name,
                    Value = x.Id.ToString()
                }).ToList();
            Breeds.Insert(0, new SelectListItem
            {
                Text = "All",
                Value = null
            });

            ViewBag.Breeds = Breeds;

            List<SelectListItem> AgeSelect = new List<SelectListItem>();
            AgeSelect.Add(new SelectListItem { Text = "All", Value = null });
            for (int i = 0; i <= 30; i++)
            {
                AgeSelect.Add(new SelectListItem { Text = i.ToString(), Value = i.ToString() });
            }
            ViewBag.Ages = AgeSelect;

            #region Age Units
            ViewBag.AgeUnits = new List<SelectListItem> {
                new SelectListItem
                {
                    Text = "All",
                    Value = null
                },
                new SelectListItem
                {
                    Text = "year",
                    Value = "1"
                },
                new SelectListItem
                {
                    Text = "month",
                    Value = "2"
                }
            };
            #endregion

            #region Age Ranges
            ViewBag.AgeRanges = new List<SelectListItem> {
                new SelectListItem
                {
                    Text = "All",
                    Value = null
                },
                new SelectListItem
                {
                    Text = "+/- 1",
                    Value = "1"
                },
                new SelectListItem
                {
                    Text = "+/- 2",
                    Value = "2"
                },
                new SelectListItem
                {
                    Text = "+/- 3",
                    Value = "3"
                },
                new SelectListItem
                {
                    Text = "+/- 4",
                    Value = "4"
                },
                new SelectListItem
                {
                    Text = "+/- 5",
                    Value = "5"
                },
                new SelectListItem
                {
                    Text = "+/- 6",
                    Value = "6"
                },
                new SelectListItem
                {
                    Text = "+/- 7",
                    Value = "7"
                },
                new SelectListItem
                {
                    Text = "+/- 8",
                    Value = "8"
                },
                new SelectListItem
                {
                    Text = "+/- 9",
                    Value = "9"
                },
                new SelectListItem
                {
                    Text = "+/- 10",
                    Value = "10"
                },
                new SelectListItem
                {
                    Text = "+/- 11",
                    Value = "11"
                },
                new SelectListItem
                {
                    Text = "+/- 12",
                    Value = "12"
                }
            };
            #endregion

            return View();
        }

        [HttpPost]
        public ActionResult GenerateUsers()
        {
            var tempFilePath = System.IO.Path.GetTempFileName(); // Disposed of when we are done with it
            var fileInfo = new FileInfo(tempFilePath + ".xlsx");

            using (var package = new ExcelPackage(fileInfo))
            {
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;

                // Content
                worksheet.Cells[labelRow, 1].Value = "First Name";
                worksheet.Cells[labelRow, 2].Value = "Last Name";
                worksheet.Cells[labelRow, 3].Value = "Email";
                worksheet.Cells[labelRow, 4].Value = "Date Registered";

                var list = DbContext.Users.AsQueryable()
                     .ToList();

                for (int rowIndex = currentRow, index = 0;
                     index < list.Count();
                     index++, rowIndex++)
                {
                    var entity = list[index];

                    // Conent
                    worksheet.Cells[rowIndex, 1].Value = entity.FirstName;
                    worksheet.Cells[rowIndex, 2].Value = entity.LastName;
                    worksheet.Cells[rowIndex, 3].Value = entity.Email;
                    worksheet.Cells[rowIndex, 4].Value = entity.DateCreated.ToLocalTime().ToString();

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            // Set the file type to this really nasty thing
            Response.ContentType = XlsxContentType;

            var stream = fileInfo.OpenRead();
            var fileDownloadName = $"DLG-Users-{DateTime.Now.ToLocalTime().ToString()}.xlsx";
            using (var r = new MemoryStream())
            {
                stream.CopyTo(r);
                return File(r.ToArray(), XlsxContentType, fileDownloadName);
            }
        }

        private float? ConvertWeight(string type, string valueType, float? value = 0)
        {
            if (valueType != null && value != null)
            {
                if (type.ToLower().Equals(valueType.ToLower()))
                {
                    return value;
                }
                else
                {
                    if (type == "kg")
                    {
                        return value / .45f;
                    }
                    else if (type == "pounds")
                    {
                        return value * 2.2f;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }
            else
            {
                return 0;
            }
        }

        [HttpPost]
        public ActionResult Generate(
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeUnit = null,
            int? AgeRange = null,
            int? SexId = null)
        {
            var tempFilePath = System.IO.Path.GetTempFileName(); // Disposed of when we are done with it
            var fileInfo = new FileInfo(tempFilePath + ".xlsx");

            if (Age != null &&
                AgeUnit != null &&
                AgeRange != null) {
                if (AgeUnit == 1) {
                    AgeRange = AgeRange * 12;
                }
            }

            // Content

            if (FeatureType == FeatureType.Activities)
            {
                fileInfo = this.getActivities(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.AnxietyBehaviours ||
                     FeatureType == FeatureType.EscapingEvadingBehaviours ||
                     FeatureType == FeatureType.OtherBehaviours ||
                     FeatureType == FeatureType.RepetitiveBehaviours ||
                     FeatureType == FeatureType.ToiletingEliminationBehaviours ||
                     FeatureType == FeatureType.VocalisingBehaviours)
            {

                fileInfo = this.getBehavioursGeneral(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.DestructiveBehaviours)
            {
                fileInfo = this.getBehavioursDestructive(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.SeniorBehaviours)
            {
                fileInfo = this.getBehavioursSenior(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.FearBehaviours)
            {
                fileInfo = this.getBehavioursFear(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.AggressiveBehaviours)
            {
                fileInfo = this.getBehavioursAggresive(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.Feeding)
            {
                fileInfo = this.getFeeds(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.Treatments)
            {
                fileInfo = this.getTreatments(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.Symptoms)
            {
                fileInfo = this.getSymptoms(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.Seizures)
            {
                fileInfo = this.getSeizures(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else if (FeatureType == FeatureType.RespiratoryRates)
            {
                fileInfo = this.getRespirationRates(fileInfo, FeatureType, BreedId, BreedPercentage, Age, AgeRange, SexId);
            }
            else
            {
                fileInfo = getEmpty(fileInfo);
            }
            

            // Set the file type to this really nasty thing
            Response.ContentType = XlsxContentType;

            var stream = fileInfo.OpenRead();

            // Null checked at top of method
            var featureDisplayName = Enum.GetName(typeof(FeatureType), FeatureType);
            var fileDownloadName = $"DLG-{ featureDisplayName }-{DateTime.Now.ToLocalTime().ToString()}.xlsx";
            using (var r = new MemoryStream())
            {
                stream.CopyTo(r);
                return File(r.ToArray(), XlsxContentType, fileDownloadName);
            }
        }

        public FileInfo getBehavioursGeneral(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;
                var behaviourTypeId = FeatureIdMap[(int)FeatureType];
                var behaviourItemTypes = DbContext.BehaviourItemTypes.ToDictionary(o => o.Id, o => o.Name);

                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                
                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                // behaviour Items
                foreach (var item in behaviourItemTypes)
                {
                    worksheet.Cells[labelRow, currentColumn++].Value = item.Value;
                }


                var list = DbContext.Behaviours.AsQueryable()
                 .Where(x => x.BehaviourTypeId == behaviourTypeId && x.DateDeleted == null)
                 .OrderByDescending(t => t.DateRegistered)
                 .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Conent
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateRegistered;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.BehaviourType.Name;


                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateRegistered.Date).FirstOrDefault();
                    if (currentWeight == null) {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateRegistered.Date).FirstOrDefault();
                    }
                    if (currentWeight != null) {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg"; 
                    }
                    else {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;

                    // behaviour Items
                    foreach (var item in behaviourItemTypes)
                    {
                        bool exist = entity.BehaviourItems.Any(x => x.BehaviourItemTypeId == item.Key);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = exist;
                    }

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }

        public FileInfo getBehavioursDestructive(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;
                var behaviourTypeId = FeatureIdMap[(int)FeatureType];
                var behaviourItemTypes = DbContext.BehaviourItemTypes.ToDictionary(o => o.Id, o => o.Name);
                var destroyedObjects = DbContext.DestroyedObjects.ToDictionary(o => o.Id, o => o.Name);

                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";

                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                // Destructive Specific
                worksheet.Cells[labelRow, currentColumn++].Value = "Owner At Home";
                worksheet.Cells[labelRow, currentColumn++].Value = "Other";
                // Destroyed Objects
                foreach (var item in destroyedObjects)
                {
                    worksheet.Cells[labelRow, currentColumn++].Value = $"destroyed: { item.Value}";
                }

                // behaviour Items
                foreach (var item in behaviourItemTypes)
                {
                    worksheet.Cells[labelRow, currentColumn++].Value = item.Value;
                }

                var list = DbContext.Set<DestructiveBehaviour>()
                           .Where(x => x.BehaviourTypeId == behaviourTypeId && x.DateDeleted == null)
                           .OrderByDescending(t => t.DateRegistered)
                           .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Conent
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateRegistered;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.BehaviourType.Name;


                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateRegistered.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateRegistered.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;

                    // Destructive Specific
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.OwnerAtHome;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.OtherDestroyedObject;
                    // Destroyed Objects
                    foreach (var item in destroyedObjects)
                    {
                        bool exist = entity.DestroyedObjectItems.Any(x => x.DestroyedObjectId == item.Key);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = exist;
                    }


                    // Behaviour Items
                    foreach (var item in behaviourItemTypes)
                    {
                        bool exist = entity.BehaviourItems.Any(x => x.BehaviourItemTypeId == item.Key);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = exist;
                    }

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getBehavioursSenior(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;
                var behaviourTypeId = FeatureIdMap[(int)FeatureType];
                var behaviourItemTypes = DbContext.BehaviourItemTypes.ToDictionary(o => o.Id, o => o.Name);
   
                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";

                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                // Destructive Specific
                worksheet.Cells[labelRow, currentColumn++].Value = "PaceUpAndDown";
                worksheet.Cells[labelRow, currentColumn++].Value = "StareBlanklyAtWallsOrFloor";
                worksheet.Cells[labelRow, currentColumn++].Value = "StuckBehindObjects";
                worksheet.Cells[labelRow, currentColumn++].Value = "RecogniseFamiliar";
                worksheet.Cells[labelRow, currentColumn++].Value = "WalkWallsOrDoors";
                worksheet.Cells[labelRow, currentColumn++].Value = "WalkAwayWhileAvoindPatted";
                worksheet.Cells[labelRow, currentColumn++].Value = "UrinateOrDefecateInAreaKeptClean";
                worksheet.Cells[labelRow, currentColumn++].Value = "DifficultyFindingFoodDroppped";


                // behaviour Items
                foreach (var item in behaviourItemTypes)
                {
                    worksheet.Cells[labelRow, currentColumn++].Value = item.Value;
                }

                var list = DbContext.Set<SeniorBehaviour>()
                           .Where(x => x.BehaviourTypeId == behaviourTypeId && x.DateDeleted == null)
                           .OrderByDescending(t => t.DateRegistered)
                           .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Conent
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateRegistered;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.BehaviourType.Name;


                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateRegistered.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateRegistered.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;

                    // Senior Specific
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.PaceUpAndDown;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.StareBlanklyAtWallsOrFloor;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.StuckBehindObjects;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.RecogniseFamiliar;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.WalkWallsOrDoors;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.WalkAwayWhileAvoindPatted;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.UrinateOrDefecateInAreaKeptClean;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DifficultyFindingFoodDroppped;

                    // Behaviour Items
                    foreach (var item in behaviourItemTypes)
                    {
                        bool exist = entity.BehaviourItems.Any(x => x.BehaviourItemTypeId == item.Key);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = exist;
                    }

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getBehavioursAggresive(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;
                var behaviourTypeId = FeatureIdMap[(int)FeatureType];
                var behaviourItemTypes = DbContext.BehaviourItemTypes.ToDictionary(o => o.Id, o => o.Name);

                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";

                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                // Aggresive Specific
                worksheet.Cells[labelRow, currentColumn++].Value = "Near Resource";
                worksheet.Cells[labelRow, currentColumn++].Value = "Directed Toward";
                worksheet.Cells[labelRow, currentColumn++].Value = "Directed Toward Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Human Gender";
                worksheet.Cells[labelRow, currentColumn++].Value = "Dog Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Animal Species";

                // behaviour Items
                foreach (var item in behaviourItemTypes)
                {
                    worksheet.Cells[labelRow, currentColumn++].Value = item.Value;
                }

                var list = DbContext.Set<AggressiveBehaviour>()
                           .Where(x => x.BehaviourTypeId == behaviourTypeId && x.DateDeleted == null)
                           .OrderByDescending(t => t.DateRegistered)
                           .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Conent
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateRegistered;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.BehaviourType.Name;

                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateRegistered.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateRegistered.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;

                    // Aggresive Specific
                    if (entity.NearResourceType != null)
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.NearResourceType.Name;
                    else
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                    if (entity.BehaviourDirectedToward != null)
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.BehaviourDirectedToward.Name;
                    else
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                    var DirectedTowardTypeDisplay = Enum.GetName(typeof(RelationshipType), entity.BehaviourDirectedTowardType);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = DirectedTowardTypeDisplay;

                    if (entity.HumanGender != null)
                    {
                        var HumanGenderDisplay = Enum.GetName(typeof(HumanGender), entity.HumanGender);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = HumanGenderDisplay;
                    }
                    else {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";
                    }

                    if (entity.DogType != null)
                    {
                        var DogTypeDisplay = Enum.GetName(typeof(DogType), entity.DogType);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = DogTypeDisplay;
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";
                    }

                    if (entity.Species != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Species.Name;
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";
                    }


                    // Behaviour Items
                    foreach (var item in behaviourItemTypes)
                    {
                        bool exist = entity.BehaviourItems.Any(x => x.BehaviourItemTypeId == item.Key);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = exist;
                    }

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getBehavioursFear(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;
                var behaviourTypeId = FeatureIdMap[(int)FeatureType];
                var behaviourItemTypes = DbContext.BehaviourItemTypes.ToDictionary(o => o.Id, o => o.Name);

                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";

                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                // Fear Specific
                worksheet.Cells[labelRow, currentColumn++].Value = "Occur During";

                // behaviour Items
                foreach (var item in behaviourItemTypes)
                {
                    worksheet.Cells[labelRow, currentColumn++].Value = item.Value;
                }

                var list = DbContext.Set<FearRelatedBehaviour>()
                           .Where(x => x.BehaviourTypeId == behaviourTypeId && x.DateDeleted == null)
                           .OrderByDescending(t => t.DateRegistered)
                           .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Conent
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateRegistered;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.BehaviourType.Name;


                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateRegistered.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateRegistered.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;

                    // Senior Specific
                    if (entity.BehaviourDuringType != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.BehaviourDuringType.Name;
                    }
                    else {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";
                    }
       
                    // Behaviour Items
                    foreach (var item in behaviourItemTypes)
                    {
                        bool exist = entity.BehaviourItems.Any(x => x.BehaviourItemTypeId == item.Key);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = exist;
                    }

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getActivities(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;

                // Content
                worksheet.Cells[labelRow, 1].Value = "Date";
                worksheet.Cells[labelRow, 2].Value = "Type";
                worksheet.Cells[labelRow, 3].Value = "Event";
                worksheet.Cells[labelRow, 4].Value = "Rate";
                worksheet.Cells[labelRow, 5].Value = "Duration (mins)";

                // Dog Info
                worksheet.Cells[labelRow, 6].Value = "Name";
                worksheet.Cells[labelRow, 7].Value = "Breed";
                worksheet.Cells[labelRow, 8].Value = "Type";
                worksheet.Cells[labelRow, 9].Value = "Sub Type";
                worksheet.Cells[labelRow, 10].Value = "Age";
                worksheet.Cells[labelRow, 11].Value = "Sex";
                worksheet.Cells[labelRow, 12].Value = "Weight";
                worksheet.Cells[labelRow, 13].Value = "Insured";

                var list = DbContext.ActivityRates.AsQueryable()
                 .Where(x => x.BulkLog == null && x.DateDeleted == null)
                 .OrderByDescending(t => t.DateRegistered)
                 .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];

                    // Conent
                    worksheet.Cells[rowIndex, 1].Value = entity.DateRegistered;
                    worksheet.Cells[rowIndex, 2].Value = entity.ReportEvent.Report.Name;
                    worksheet.Cells[rowIndex, 3].Value = entity.ReportEvent.Event.Name;
                    worksheet.Cells[rowIndex, 4].Value = entity.Rate.Name;
                    worksheet.Cells[rowIndex, 5].Value = entity.Duration;

                    // Dog Info
                    worksheet.Cells[rowIndex, 6].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, 7].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, 8].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, 9].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, 10].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, 11].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateRegistered.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateRegistered.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, 12].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, 12].Value = "No Data";
                    }


                    worksheet.Cells[rowIndex, 13].Value = entity.Pet.Insured;
                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getFeeds(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;
                var FoodTypes = DbContext.FoodTypes.ToDictionary(o => o.Id, o => o.Name);
                var FeedingTypeFrecuencies = DbContext.FeedingTypeFrecuencies.ToDictionary(o => o.Id, o => o.Name);


                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";

                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                // Feed Items
                foreach (var item in FoodTypes)
                {
                    worksheet.Cells[labelRow, currentColumn++].Value = $"{item.Value}: Frecuency";
                    worksheet.Cells[labelRow, currentColumn++].Value = $"{item.Value}: Product Brand";
                    worksheet.Cells[labelRow, currentColumn++].Value = $"{item.Value}: Product Name";
                    worksheet.Cells[labelRow, currentColumn++].Value = $"{item.Value}: Unit";
                    worksheet.Cells[labelRow, currentColumn++].Value = $"{item.Value}: Amount";
                    worksheet.Cells[labelRow, currentColumn++].Value = $"{item.Value}: Other";
                }

                var list = DbContext.Feeds                           
                           .Where(x => x.DateDeleted == null)
                           .OrderByDescending(t => t.DateCreated)
                           .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Content
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateCreated;

                    if (entity.FeedingType != null)
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.FeedingType.Name;
                    else
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateCreated.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateCreated.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;


                    // Feed Items
                    foreach (var item in FoodTypes)
                    {
                        if (entity.FeedItems.Any(x => x.FoodType.Id == item.Key))
                        {
                            var feedItem = entity.FeedItems.FirstOrDefault(x => x.FoodType.Id == item.Key);
                            if (feedItem != null) {

                                if (feedItem.FeedingTypeFrecuencyId != null) {
                                   var frecuency = FeedingTypeFrecuencies.FirstOrDefault(x => x.Key == feedItem.FeedingTypeFrecuencyId);
                                    worksheet.Cells[rowIndex, currentContentColumn++].Value = frecuency.Value;
                                }
                                else
                                    worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                                if (feedItem.FoodProduct != null) {

                                    if (feedItem.FoodProduct.FoodBrand != null)
                                    {
                                        worksheet.Cells[rowIndex, currentContentColumn++].Value = feedItem.FoodProduct.FoodBrand.Name;
                                    }
                                    else {
                                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";
                                    }

                                    if (feedItem.FoodProduct.Name != null)
                                    {
                                        worksheet.Cells[rowIndex, currentContentColumn++].Value = feedItem.FoodProduct.Name;
                                    }
                                    else
                                    {
                                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";
                                    }                                   
                                }
                                else
                                {
                                    worksheet.Cells[rowIndex, currentContentColumn++].Value = "";
                                    worksheet.Cells[rowIndex, currentContentColumn++].Value = "";
                                }


                                if (feedItem.FeedingUnit != null)
                                {
                                    worksheet.Cells[rowIndex, currentContentColumn++].Value = feedItem.FeedingUnit.Name;
                                }
                                else
                                {
                                    worksheet.Cells[rowIndex, currentContentColumn++].Value = "";
                                }

                                worksheet.Cells[rowIndex, currentContentColumn++].Value = feedItem.Amount;
                                worksheet.Cells[rowIndex, currentContentColumn++].Value = feedItem.Other;

                            }
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                        }
                        else {
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                            worksheet.Cells[labelRow, currentColumn++].Value = "";
                        }
                    }

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getTreatments(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;

                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date Administered";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Custom Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Dose";
                worksheet.Cells[labelRow, currentColumn++].Value = "Instructions";

                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                var list = DbContext.Treatments
                           .Where(x =>  x.DateDeleted == null)
                           .OrderByDescending(t => t.DateCreated)
                           .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Content
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateAdministered;

                    if (entity.TreatmentType != null)
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.TreatmentType.Name;
                    else
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.CustomType;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Dose;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Instructions;

                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateAdministered.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateAdministered.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getSymptoms(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;

                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Frequency";

                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                var list = DbContext.Symptoms
                           .Where(x => x.DateDeleted == null)
                           .OrderByDescending(t => t.DateCreated)
                           .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Content
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateCreated;

                    if (entity.SymptomType != null)
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.SymptomType.Name;
                    else
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                    if (entity.SymptomFrequency != null)
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.SymptomFrequency.Name;
                    else
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateCreated.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateCreated.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getSeizures(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;
                var SeizureSignTypes = DbContext.SeizureSignTypes.ToDictionary(o => o.Id, o => o.Name);
                var SeizureAfterSignTypes = DbContext.SeizureAfterSignTypes.ToDictionary(o => o.Id, o => o.Name);


                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Duration (min)";
                worksheet.Cells[labelRow, currentColumn++].Value = "Body State";
                worksheet.Cells[labelRow, currentColumn++].Value = "Body State Position";

                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                // Seizure Sign Types
                foreach (var item in SeizureSignTypes)
                {
                    worksheet.Cells[labelRow, currentColumn++].Value = item.Value;
                }

                // Seizure After Sign Types
                foreach (var item in SeizureAfterSignTypes)
                {
                    worksheet.Cells[labelRow, currentColumn++].Value = item.Value;
                }

                var list = DbContext.Seizures
                           .Where(x => x.DateDeleted == null)
                           .OrderByDescending(t => t.DateCreated)
                           .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Content
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateCreated;

                    if (entity.SeizureType != null)
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.SeizureType.Name;
                    else
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Duration;

                    if (entity.SeizureBodyState != null)
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.SeizureBodyState.Name;
                    else
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                    if (entity.SeizureBodyStatePositions != null)
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.SeizureBodyStatePositions.Name;
                    else
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "";

                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateCreated.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateCreated.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;

                    // Seizure Sign Types
                    foreach (var item in SeizureSignTypes)
                    {
                        bool exist = entity.SeizureSigns.Any(x => x.SeizureSignTypeId == item.Key);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = exist;
                    }

                    // Seizure After Sign Types
                    foreach (var item in SeizureAfterSignTypes)
                    {
                        bool exist = entity.SeizureAfterSigns.Any(x => x.SeizureAfterSignTypeId == item.Key);
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = exist;
                    }

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getRespirationRates(
            FileInfo fileInfo,
            FeatureType FeatureType,
            int? BreedId = null,
            int? BreedPercentage = null,
            int? Age = null,
            int? AgeRange = null,
            int? SexId = null)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                #region header
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";
                #endregion

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 1;
                var currentRow = 2;
                var currentColumn = 1;
                var SeizureSignTypes = DbContext.SeizureSignTypes.ToDictionary(o => o.Id, o => o.Name);
                var SeizureAfterSignTypes = DbContext.SeizureAfterSignTypes.ToDictionary(o => o.Id, o => o.Name);


                // Content
                worksheet.Cells[labelRow, currentColumn++].Value = "Date";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breaths (per min)";
                worksheet.Cells[labelRow, currentColumn++].Value = "Comment";

                // Dog Info
                worksheet.Cells[labelRow, currentColumn++].Value = "Name";
                worksheet.Cells[labelRow, currentColumn++].Value = "Breed";
                worksheet.Cells[labelRow, currentColumn++].Value = "Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sub Type";
                worksheet.Cells[labelRow, currentColumn++].Value = "Age";
                worksheet.Cells[labelRow, currentColumn++].Value = "Sex";
                worksheet.Cells[labelRow, currentColumn++].Value = "Weight";
                worksheet.Cells[labelRow, currentColumn++].Value = "Insured";

                var list = DbContext.RespirationRates
                           .Where(x => x.DateDeleted == null)
                           .OrderByDescending(t => t.DateCreated)
                           .ToList();

                #region Filters

                if (list != null && BreedId != null)
                {
                    list = list
                          .Where(x => x.Pet.PetBreeds.Any(a => a.BreedId == BreedId))
                          .ToList();

                    if (list != null &&
                        list.Count() > 0 &&
                        BreedPercentage != null)
                    {
                        list = list
                            .Where(x => x.Pet.PetBreeds.Any(a => a.Percentage == BreedPercentage && a.BreedId == BreedId))
                            .ToList();
                    }
                }

                if (list != null && SexId != null)
                {
                    list = list
                        .Where(x => (int)x.Pet.Sex == SexId)
                        .ToList();
                }

                if (list != null && Age != null)
                {

                    if (AgeRange != null)
                    {
                        var months = (Age * 12);
                        var monthsFrom = months - AgeRange;
                        var monthsTo = months + AgeRange;

                        list = list
                        .Where(x => getDisplayMonths(x.Pet.DateOfBirth) >= monthsFrom &&
                                    getDisplayMonths(x.Pet.DateOfBirth) <= monthsTo)
                        .ToList();
                    }
                    else
                    {
                        list = list
                        .Where(x => getDisplayAge(x.Pet.DateOfBirth) == Age)
                        .ToList();
                    }
                }

                #endregion

                for (int rowIndex = currentRow, index = 0;
                 index < list.Count();
                 index++, rowIndex++)
                {
                    var entity = list[index];
                    var currentContentColumn = 1;

                    // Content
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.DateRegistered;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Breaths;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Comment;

                    // Dog Info
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayBreed(entity.Pet.PetBreeds);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.PetType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.PetSubType.Name;
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = getDisplayAge(entity.Pet.DateOfBirth);
                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Sex;

                    // Weight
                    var currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date == entity.DateRegistered.Date).FirstOrDefault();
                    if (currentWeight == null)
                    {
                        currentWeight = entity.Pet.TimeSeries.Where(x => x.DateCreated.Date < entity.DateRegistered.Date).FirstOrDefault();
                    }
                    if (currentWeight != null)
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = $"{ConvertWeight("kg", currentWeight.WeightUnits, currentWeight.Weight)} kg";
                    }
                    else
                    {
                        worksheet.Cells[rowIndex, currentContentColumn++].Value = "No Data";
                    }

                    worksheet.Cells[rowIndex, currentContentColumn++].Value = entity.Pet.Insured;

                    currentRow = rowIndex;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }

            return fileInfo;
        }


        public FileInfo getEmpty(FileInfo fileInfo)
        {

            using (var package = new ExcelPackage(fileInfo))
            {
                package.Workbook.Properties.Title = "Doglogbook Export";
                package.Workbook.Properties.Author = "Doglogbook";
                package.Workbook.Properties.Company = "Doglogbook";

                var worksheet = package.Workbook.Worksheets.Add("Data");
                var labelRow = 2;
                var currentRow = 3;

                // Table Header
                worksheet.Cells[1, 1].Value = "No Data";

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                package.Save();
            }


            return fileInfo;
        }

        public decimal getDisplayAge(DateTime DateOfBirth) {
            if (DateTime.Now.Year > DateOfBirth.Year)
            {
                return DateTime.Now.Year - DateOfBirth.Year;
            }
            else if ((DateTime.Now.Year == DateOfBirth.Year) &&
                    (DateTime.Now.Month > DateOfBirth.Month))
            {
                return  Decimal.Divide((DateTime.Now.Month - DateOfBirth.Month) ,10);
            }
            else {
                return -1;
            }
        }

        public string getDisplayBreed(ICollection<PetBreed> PetBreeds) {
            if (PetBreeds != null & PetBreeds.Count == 1)
            {
                return PetBreeds.FirstOrDefault().Breed.Name;
            }
            else if (PetBreeds != null & PetBreeds.Count > 1)
            {
                return "Mixed";
            }
            else {
                return "Not assigned";
            }
        }

        public decimal getDisplayMonths(DateTime DateOfBirth)
        {
            var years = getDisplayAge(DateOfBirth);
            if (years == -1)
                return years;
            else if (years > 0 && years < 1) {
                return years * 10;
            }
            else
            {
                return years * 12;
            }
        }

        private const string XlsxContentType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        private List<SelectListItem> FeaturesSelect = new List<SelectListItem>
            {
                new SelectListItem
                {
                    Text = "Activities",
                    Value = "1"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Aggressive",
                    Value = "2"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Anxiety-related",
                    Value = "3"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Destructive",
                    Value = "4"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Escaping/evading",
                    Value = "5"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Fear-related",
                    Value = "6"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Other",
                    Value = "7"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Repetitive",
                    Value = "8"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Senior",
                    Value = "9"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Toileting/Elimination-related",
                    Value = "10"
                },
                new SelectListItem
                {
                    Text = "Behaviours - Vocalising",
                    Value = "11"
                },
                new SelectListItem
                {
                    Text = "Feeding",
                    Value = "12"
                },
                new SelectListItem
                {
                    Text = "Treatments",
                    Value = "13"
                },
                new SelectListItem
                {
                    Text = "Symptoms",
                    Value = "14"
                },
                new SelectListItem
                {
                    Text = "Seizures",
                    Value = "15"
                },
                new SelectListItem
                {
                    Text = "Respiratory Rates",
                    Value = "16"
                }
        };

        private List<SelectListItem> SexSelect = new List<SelectListItem>
            {
                new SelectListItem
                {
                    Text = "All",
                    Value = null
                },
                new SelectListItem
                {
                    Text = "Unspecified",
                    Value = "0"
                },
                new SelectListItem
                {
                    Text = "Male",
                    Value = "1"
                },
                new SelectListItem
                {
                    Text = "Female",
                    Value = "2"
                }
            };

        private List<SelectListItem> StatusSelect = new List<SelectListItem>
            {
                new SelectListItem
                {
                    Text = "All",
                    Value = null
                },
                new SelectListItem
                {
                    Text = "Unspecified",
                    Value = "0"
                },
                new SelectListItem
                {
                    Text = "Male",
                    Value = "1"
                },
                new SelectListItem
                {
                    Text = "Female",
                    Value = "2"
                }
            };

        private List<SelectListItem> BreedPercentageSelect = new List<SelectListItem>
            {
                new SelectListItem
                {
                    Text = "All",
                    Value = null
                },
                new SelectListItem
                {
                    Text = "100%",
                    Value = "100"
                },
                new SelectListItem
                {
                    Text = "75%",
                    Value = "75"
                },
                new SelectListItem
                {
                    Text = "50%",
                    Value = "50"
                },
                new SelectListItem
                {
                    Text = "25%",
                    Value = "25"
                }
            };


    }
}