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
            if (database.ExecNonQuery("insert into Blogs (BlogTitle,BlogContent,Picture,Insetedbyid,deletedby,Status)values('" + blogs.BlogTitle + "','" + blogs.BlogContent + "','" + blogs.Picture + "','" + blogs.insetedbyId + "','" + blogs.deletedby + "','" + blogs.Status + "')") > 0)
            {
                res.message = "Inserted Successfully";
            }
            else
            {
                res.message = "Insertation Failed";
            }

            return Ok(res);
        }
        [HttpGet]
        public async Task<ActionResult> GetBlogs()
        {
            await Task.Delay(0);

            DataTable table = database.GetDataTable("select BlogId,BlogTitle,BlogContent,Picture from Blogs");
            return Ok(table);
        }
        [HttpPost("{BlogId}")]
        public async Task<ActionResult> DeleteBlog(int BlogId)
        {
            await Task.Delay(0);
            Response res = new Response();
            if (database.ExecNonQuery("delete from Blogs where BlogId='" + BlogId + "'") > 0)
            {
                res.message = "Delete Successflly";
            }
            else
            {
                res.message = "Deletation Failed";
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
            DataTable table = database.GetDataTable("select top(3) BlogId,BlogTitle,BlogContent,Picture from Blogs order by BlogId Desc");
            return Ok(table);
            
        }

    }
}
