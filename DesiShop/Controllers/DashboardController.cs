using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
        public IActionResult Login()
        {
            if (Request.Cookies["AccessToken"] != null)
            {
                return Redirect("Index");
            }
            return View();
        }
        public IActionResult RoleList()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
        public IActionResult PermissionList()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }

        public IActionResult ProductList()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
        public IActionResult AddProduct()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
        public IActionResult CreatePost()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
        public IActionResult ManageCategories()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
        public IActionResult BlogsList()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
        public IActionResult Orders()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        } 
        public IActionResult ManageUsers()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
        public IActionResult AddBanner()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
        public IActionResult BannerList()
        {
            if (Request.Cookies["AccessToken"] == null)
            {
                return Redirect("Login");
            }
            return View();
        }
    }
}

