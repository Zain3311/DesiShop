using DesiShop.ManagementClasses;
using DesiShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Data;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Controllers
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

        public IActionResult Account()
        {
            return View();
        }
        public IActionResult Dashboard()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Account");
            }
            return View();
        } 
        public IActionResult Shop()
        {
            return View();
        }
        public IActionResult Cart()
        {
            return View();
        }
        [Route("/product/{url}")]
        public IActionResult Product(string url)
        {
           var product = database.GetDataTable($"select * from Products where Status ='1' and ProductUrl='{url}'");
            ViewBag.product = product.AsEnumerable();
            if(product.Rows.Count == 0)
            {
                return NotFound();
            }
            var productId = product.Rows[0]["ProductId"].ToString();
            var categories = database.GetDataTable($"select * from CategoryRegistration where Status ='1' and ProductId='{productId}'");
            ViewBag.categories = categories.AsEnumerable();
            var images = database.GetDataTable($"select * from ProductImages where Status ='1' and ProductId='{productId}'");
            ViewBag.images = images.AsEnumerable();

            return View();
        }

        public IActionResult Logout()
        {
            return Redirect("");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
