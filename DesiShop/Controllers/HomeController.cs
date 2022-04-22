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
        public IActionResult Blog()
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
        public IActionResult Category(string url, string search)
        {
            ViewBag.search = search;
            var category = database.GetDataTable($"select * from Categories where CategoryUrl ='{url}' and Status=1");
            if (category.Rows.Count == 0)
            {
                return NotFound();
            }
            var products = database.GetDataTable($"select CTitle = '{category.Rows[0]["Title"]}',p.ProductId,p.Title,p.ImageUrl,p.Isfeatured,p.Discount,p.DiscountType,p.Price,p.ProductUrl from Products as p inner join CategoryRegistration as cat on cat.ProductId = p.ProductId where cat.Status=1 and cat.CategoryId='{category.Rows[0]["CategoryId"]}' and p.Status=1");
            ViewBag.products = products;
            ViewBag.category = category;
            var catLog = database.GetDataTable($"select * from CategoriesLog where CategoryId='{category.Rows[0]["CategoryId"]}' and Status=1");
            if (catLog.Rows.Count == 0)
            {
                database.ExecNonQuery($"insert into CategoriesLog (CategoryId,Count,Status,InsertedDateTime) values ('{category.Rows[0]["CategoryId"]}','1','1','{DateTime.Now}')");
            }
            else
            {
                database.ExecNonQuery($"update CategoriesLog set Count=Count+1 where Status=1 and CategoryId='{category.Rows[0]["CategoryId"]}'");
            }
            return View();
        }

        [Route("/logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("AccessToken");
            return Redirect("/Home/Account");
        }
        [Route("/post/{PostId}")]
        public IActionResult Post(string PostId)
        {
            var post = database.GetDataTable($"select BlogId,BlogTitle,BlogDescription,BlogContent,Picture, date from  Blogs where Status=1 and BlogId='{PostId}'");
            if(post.Rows.Count == 0)
            {
                return NotFound();
            }
            ViewBag.post = post;
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
