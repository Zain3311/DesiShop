using DesiShop.ManagementClasses;
using DesiShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Controllers.api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        IConfiguration config;
        public CategoriesController(IConfiguration configuration)
        {
            config = configuration;
        }

        [HttpPost]
        public async Task<ActionResult> AddCategory(Category category)
        {
            await Task.Delay(0);
           
            Response res = new Response();
            try
            {
                var Url = "";
                if(category.ParentCategory != null && category.ParentCategory !=0)
                {
                DataTable dataTable = database.GetDataTable($"select CategoryUrl from Categories where CategoryId='{category.ParentCategory}' and Status=1");
                    Url = dataTable.Rows[0]["CategoryUrl"].ToString() + "_"+ category.Title.Replace(" ", "-").ToLower() + "-" + Guid.NewGuid().ToString().Substring(0,4);
                }
                else
                {
                    Url = category.Title.Replace(" ", "-").ToLower() + "-" + Guid.NewGuid().ToString().Substring(0, 4);
                }

                var result = database.ExecNonQuery($"INSERT INTO Categories (Title,CategoryUrl,ParentCategory,Status,InsertedDateTime,InsertedbyId) VALUES('{category.Title}','{Url}','{category.ParentCategory}','1','{DateTime.Now}','{Request.UserId(config)}')");
                if(result > 0)
                {
                    res.message = "Category Inserted Successfully";
                }
                else
                {
                    res.message = "Category Insertion Failed";
                }
            }
            catch(Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }
        [HttpGet]
        public async Task<ActionResult> GetCategories()
        {
            await Task.Delay(0);
           
            Response res = new Response();
            try
            {

                res.data = database.GetDataTable("select cat.CategoryId,cat.Title,cat.CategoryUrl,cat.ParentCategory, ParentName = (select Title from Categories where Status=1 and CategoryId= cat.ParentCategory)  from Categories as cat where cat.Status=1");


            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }

        [HttpGet]
        public async Task<ActionResult> GetCategoryProduct()
        {
            await Task.Delay(0);
           

                var datatable = database.GetDataTable("select top(10) cat.CategoryId,cat.Title, cat.CategoryUrl, ProductCount = (select COUNT(CategoryId) from CategoryRegistration where Status = '1' and CategoryId = cat.CategoryId) from Categories as cat where cat.Status = '1'");

            return Ok(datatable);
        }
        [HttpPost("{Id}")]
        public async Task<ActionResult> UpdateCategory(string Id, dynamic cat)
        {
            await Task.Delay(0);
           
            Response res = new Response();
            try
            {

                var result = database.ExecNonQuery($"UPDATE Categories SET Title= '{cat.Title}', CategoryUrl= '{cat.Title.Replace(" ", "-").ToLower() + "-" + Guid.NewGuid().ToString()}' ParentCategory='{cat.ParentCategory}' WHERE CategoryId = '{Id}'");
                if (result > 0)
                {
                    res.data = new { Id = Id };
                    res.message = "Category Updated Successfully";
                }
                else
                {
                    res.message = "Category Updation Failed";
                }


            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }
        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteCategory(string Id)
        {
            await Task.Delay(0);
           
            Response res = new Response();
            try
            {

                var result = database.ExecNonQuery($"UPDATE Categories SET Status = '0' ,DeactiveDateTime = '{DateTime.Now}' ,DeactivebyId = '{Request.UserId(config)}' WHERE CategoryId = '{Id}'");
                if (result > 0)
                {
                    res.data = new { Id = Id};
                    res.message = "Category Deleted Successfully";
                }
                else
                {
                    res.message = "Category Delete Failed";
                }


            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }
        [HttpGet]
        public async Task<ActionResult> GetCategoryLogs()
        {
            await Task.Delay(0);
            var table = database.GetDataTable("select clog.Count, cat.Title from CategoriesLog as clog inner join Categories as cat on clog.CategoryId=cat.CategoryId where clog.Status=1 and cat.Status=1 order by clog.Count");
            return Ok(table);
        }
    }
}