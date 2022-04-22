using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using DesiShop.ManagementClasses;
using DesiShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DesiShop.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        IConfiguration config;
        public BlogController(IConfiguration configuration)
        {
            config = configuration;
        }
        [HttpPost]
        public async Task<ActionResult> AddBlog(Blogs blogs)
        {
            await Task.Delay(0);

            Response res = new Response();
            if (database.ExecNonQuery("insert into Blogs (BlogTitle,BlogDescription,BlogContent,Picture,Insetedbyid,Status)values('" + blogs.BlogTitle + "','" + blogs.BlogDescription + "','" + HttpUtility.HtmlEncode(blogs.BlogContent) + "','" + blogs.Picture + "','" + Request.UserId(config) + "','1')") > 0)
            {
                res.message = "Post Inserted Successfully";
            }
            else
            {
                res.message = "Post Insertation Failed";
            }

            return Ok(res);
        }
        [HttpGet]
        public async Task<ActionResult> GetBlogs()
        {
            await Task.Delay(0);

            DataTable table = database.GetDataTable("select BlogId,BlogTitle,BlogDescription,Picture from Blogs  where Status=1");
            return Ok(table);
        }
        [HttpDelete("{BlogId}")]
        public async Task<ActionResult> DeleteBlog(string BlogId)
        {
            await Task.Delay(0);
            Response res = new Response();
            if (database.ExecNonQuery($"update Blogs set Status=0 where BlogId='{BlogId}' and Status=1 ") > 0)
            {
                res.message = "Post Deleted Successfully";
                res.data = new { id = BlogId};
            }
            else
            {
                res.message = "Post Deletation Failed";
            }
            return Ok(res);
        }
        [HttpPost]
        public async Task<ActionResult> UpdateBlog(Blogs obj)
        {
            await Task.Delay(0);
            Response res = new Response();
            if (database.ExecNonQuery("update Blogs set BlogTitle='" + obj.BlogTitle + "', BlogContent='" + HttpUtility.HtmlEncode(obj.BlogContent) + "', Picture='" + obj.Picture + "'") > 0)
            {
                res.message = "Update Successfully";
            }

            else
            {
                res.message = "Updation failed";
            }
                return Ok(res);
        }

        [HttpGet]
        public async Task<ActionResult> TopBlogs()
        {
            await Task.Delay(0);
            DataTable table = database.GetDataTable("select top(3) BlogId,BlogTitle,BlogDescription,Picture from Blogs where Status=1 order by BlogId Desc");
            return Ok(table);
            
        }

    }
}
