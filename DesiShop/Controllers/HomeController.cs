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
            if (Request.Cookies["AccessToken"] != null)
            {
                return Redirect("Dashboard");
            }
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
            if (product.Rows.Count == 0)
            {
                return NotFound();
            }
            var productId = product.Rows[0]["ProductId"].ToString();
            //var categories = database.GetDataTable($"select * from CategoryRegistration where Status ='1' and ProductId='{productId}'");
            //ViewBag.categories = categories.AsEnumerable();
            var images = database.GetDataTable($"select * from ProductImages where Status ='1' and ProductId='{productId}'");
            ViewBag.images = images.AsEnumerable();

            return View();
        }
        [Route("/category/{url}")]
        public IActionResult Category(string url)
        {
            var products = database.GetDataTable($"select CTitle = (select Title from Categories where CategoryUrl ='{url}' and Status=1),p.ProductId,p.Title,p.ImageUrl,p.Isfeatured,p.Discount,p.DiscountType,p.Price,p.ProductUrl from Products as p inner join CategoryRegistration as cat on cat.ProductId = p.ProductId where cat.Status=1 and cat.CategoryId=(select CategoryId from Categories where CategoryUrl ='{url}' and Status=1) and p.Status=1");
            if (products.Rows.Count == 0)
            {
                return NotFound();
            }
            ViewBag.products = products;
            return View();
        }

        [Route("/logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("AccessToken");
            return Redirect("/Home/Account");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
