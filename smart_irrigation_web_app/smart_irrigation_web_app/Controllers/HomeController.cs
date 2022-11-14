using Microsoft.AspNetCore.Mvc;
using smart_irrigation_web_app.Models;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using System.Web;
using smart_irrigation_web_app.Data;

namespace smart_irrigation_web_app.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [Authorize]
        public IActionResult myGarden()
        {
            using (var db = new smartIrriigationDBContext())
            {
                var defaultMoisture = db.tbl_gardens.Where(o => o.id == 1).FirstOrDefault();
                ViewBag.moisture = defaultMoisture.last_moisture_level ?? 0;
                return View();
            }
        }

        [HttpPost]
        public JsonResult sendMoisture(MoistureModel model) //Raspberry pi will use this api to send data to server
        {
            using (var cont = new smartIrriigationDBContext())
            {
                var rec = cont.tbl_gardens.Where(i => i.id == model.gardenid).FirstOrDefault();
                rec.last_moisture_level = model.moisture;

                if (rec.prefered_moisture_level.HasValue)
                {
                    if (model.moisture < rec.prefered_moisture_level)  //trigger pump if below prefered moisture level
                    {
                        rec.pump_trigger_status = true;
                    }
                    else
                    {
                        rec.pump_trigger_status = false;
                    }
                }

                cont.Update(rec);
                cont.SaveChanges();
            }
            return new JsonResult("Success");
        }

        [HttpGet]
        public JsonResult togglePump(PumpModel model)
        {
            using (var db = new smartIrriigationDBContext())
            {
                var rec = db.tbl_gardens.Where(i => i.id == model.gardenid).FirstOrDefault();
                //web app can force trigger the pump
                if (model.forcetogglepump.HasValue)
                {
                    rec.pump_trigger_status = (bool)model.forcetogglepump;
                    db.Update(rec);
                    db.SaveChanges();
                }

                //send pre set pump status to rpsberrry pi
                if ((bool)rec.pump_trigger_status)
                {
                    return new JsonResult("onn");
                }
                else {
                    return new JsonResult("off");
                }
            }
        }

        [HttpGet]
        public JsonResult getGardenMoisture(MoistureModel model) 
        {
            using (var db = new smartIrriigationDBContext()) 
            {
                var rec = db.tbl_gardens.Where(i => i.id == model.gardenid).FirstOrDefault();
                if (rec != null) 
                {
                    return new JsonResult(rec.last_moisture_level);
                }
                return new JsonResult("Error Occured");
            }
        }

        [HttpPut]
        public JsonResult updatePreferedMoistureLevel(MoistureModel model) //Raspberry pi will use this api to send data to server
        {
            using (var cont = new smartIrriigationDBContext())
            {
                if (model.preferredMoistureLevel < 0 || model.preferredMoistureLevel > 100)
                {
                    return new JsonResult("Error Occured");
                }
                var rec = cont.tbl_gardens.Where(i => i.id == model.gardenid).FirstOrDefault();
                rec.prefered_moisture_level = model.preferredMoistureLevel;

                cont.Update(rec);
                cont.SaveChanges();
            }
            return new JsonResult("Success");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}