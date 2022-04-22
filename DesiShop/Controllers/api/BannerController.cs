using DesiShop.ManagementClasses;
using DesiShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Controllers.api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        IConfiguration config;
        public BannerController(IConfiguration myconfig)
        {
            config = myconfig;
        }
        [HttpPost]
        public async Task<ActionResult> Add(Banner banner)
        {
            await Task.Delay(0);
            Response res = new Response();
            var result = database.ExecNonQuery($"insert into Banners (Title,Description, Picture, link,CreateDatetime,Status) values('{banner.Title}','{banner.Description}','{banner.Picture}','{banner.Link}','{DateTime.Now}','1')");

            if (result > 0)
            {
                res.message = "Banner Added";
            }
            else
            {
                res.message = "Banner Insertion Failed";
            }
            return Ok(res);
        }
        [HttpPut]
        public async Task<ActionResult> Update(Banner banner)
        {
            await Task.Delay(0);
            Response res = new Response();
            var result = database.ExecNonQuery($"update Banners set Title='{banner.Title}',Description='{banner.Description}',Picture='{banner.Picture}',link='{banner.Link}' where BannerId='' and Status=1");

            if (result > 0)
            {
                res.message = "Banner Updated";
            }
            else
            {
                res.message = "Banner Updation Failed";
            }
            return Ok(res);
        }
        [Authorize]
        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(string Id)
        {
            await Task.Delay(0);
            Response res = new Response();
            var result = database.ExecNonQuery($"update Banners set Status=0, DeletedBy='{Request.UserId(config)}' where BannerId='{Id}'");

            if (result > 0)
            {
                res.message = "Banner Delete Successfully";
                res.data = new { Id =Id };
            }
            else
            {
                res.message = "Banner Deletion Failed";
            }
            return Ok(res);
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            await Task.Delay(0);
            var result = database.GetDataTable($"select BannerId,Title,Description, Picture, link from Banners where Status=1");
            return Ok(result);
        }
    }
}
