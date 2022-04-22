using DesiShop.ManagementClasses;
using DesiShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace DesiShop.Controllers.api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        IConfiguration config;
        public readonly IWebHostEnvironment _environment;
        public ProductController(
            IWebHostEnvironment environment, IConfiguration configuration)
        {
            config = configuration;
            _environment = environment;
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(AddProduct obj)
        {
            await Task.Delay(0);

            Response res = new Response();
            try
            {
                var product = obj.product;
                var productImages = obj.productImages;
                var categories = obj.categories;
                var title = obj.varientTitle;
                var price = obj.varientPrice;

                var productUrl = product.Title.Replace(" ", "-").ToLower() + "-" + Guid.NewGuid().ToString().Substring(0, 4);
                var result = database.ExecNonQuery($"insert into Products (Title,ShortDescription,Description,Price,ImageUrl,ProductUrl,StockQty,Isfeatured,Discount,DiscountType,Status,InsertedDateTime,InsertedById) values ('{product.Title}','{HttpUtility.HtmlEncode(product.ShortDescription)}','{HttpUtility.HtmlEncode(product.Description)}','{product.Price}','{product.ImageUrl}','{productUrl}','{product.StockQty}','{product.FeaturedProduct}','{product.Discount}','{product.DiscountType}','1','{DateTime.Now}','{Request.UserId(config)}')");

                if (result > 0)
                {
                    var productId = database.GetDataTable($"select ProductId from Products where ProductUrl = '{productUrl}'").Rows[0]["ProductId"];
                    foreach (string image in productImages)
                    {
                        var imageresult = database.ExecNonQuery($"insert into ProductImages (ImageUrl,ProductId,Status,InsertedDateTime) values('{image}','{productId}','1','{DateTime.Now}')");
                    }
                    foreach (int category in categories)
                    {
                        var imageresult = database.ExecNonQuery($"insert into CategoryRegistration (ProductId,CategoryId,Status,InsertedDateTime) values('{productId}','{category}','1','{DateTime.Now}')");
                    }
                    foreach (string variet in title)
                    {
                         var varientresult = database.ExecNonQuery($"insert into Varient (varientTitle,ProductId) values('{variet}','{productId}')");
                        //if (varientresult > 0)
                        //{
                        //    foreach (string VarientPrice in price)
                        //    {
                        //        var Price = database.ExecNonQuery("update Varient set Price='" + VarientPrice + "' where  ProductId='" + productId + "'");
                        //    }
                        //}
                    }
                    foreach (int variet in price)
                    {
                        // var intPrice = Convert.ToInt32(variet);
                        var Price = database.ExecNonQuery("update Varient set Price='" + variet + "' where  ProductId='" + productId + "'");
                    }

                    res.message = "Product Added Successfully";
                }
                else
                {
                    res.message = "Product Insertion Failed";
                }
            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }

            return Ok(res);
        }
        [HttpGet]
        public async Task<ActionResult> GetProducts()
        {
            await Task.Delay(0);


            var datatable = database.GetDataTable("select ProductId,Title,ImageUrl,Isfeatured,Discount,DiscountType,Price,ProductUrl from Products where Status ='1'");
            return Ok(datatable);
        }
        [HttpGet]
        public async Task<ActionResult> GetFeaturedProducts()
        {
            await Task.Delay(0);


            var datatable = database.GetDataTable("select ProductId,Title,ImageUrl,Isfeatured,Discount,DiscountType,Price,ProductUrl from Products where Status ='1' and Isfeatured ='1'");
            return Ok(datatable);
        }
        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteProduct(string Id)
        {
            await Task.Delay(0);
            Response res = new Response();
            try
            {
                var result = database.ExecNonQuery($"update Products set Status ='0', DeactiveById = '{Request.UserId(config)}', DeactiveDateTime ='{DateTime.Now}' where ProductId ='{Id}'");
                if (result > 0)
                {
                    database.ExecNonQuery($"update CategoryRegistration set Status ='0', DeactiveDateTime ='{DateTime.Now}' where ProductId ='{Id}'");
                    database.ExecNonQuery($"update ProductImages set Status ='0', DeactiveDateTime ='{DateTime.Now}' where ProductId ='{Id}'");
                    res.message = "Product Delete Successfully";
                }
                else
                {
                    res.message = "Product Deletation Failed";
                }
            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }
        [HttpPost("{Id}")]
        public async Task<ActionResult> UpdateShortProduct(string Id, ProductUpdate product)
        {
            await Task.Delay(0);
            Response res = new Response();
            try
            {
                var result = database.ExecNonQuery($"update Products set  Discount='{product.Discount}', DiscountType='{product.DiscountType}',Isfeatured='{product.IsFeatured}' where ProductId='{Id}'");
                if (result > 0)
                {
                    res.message = "Product Update Successfully";
                }
                else
                {
                    res.message = "Product Updation Failed";
                }
            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }
        [HttpGet("{Ids}")]
        public async Task<ActionResult> GetCartProduct(string Ids)
        {
            await Task.Delay(0);
            var dataTabel = database.GetDataTable($"select ProductId,Title, Price, StockQty from Products where Status='1' and ProductId in ({Ids})");

            return Ok(dataTabel);
        }
        [HttpGet]
        public async Task<ActionResult> NewProducts()
        {
            await Task.Delay(0);


            var datatable = database.GetDataTable("select top(10) ProductId,Title,ImageUrl,Isfeatured,Discount,DiscountType,Price,ProductUrl from Products where Status ='1' order by ProductId Desc");
            return Ok(datatable);
        }
        [HttpGet]
        public async Task<ActionResult> TopSaleProducts()
        {
            await Task.Delay(0);


            var datatable = database.GetDataTable("select top(10) ProductId,Title,ImageUrl,Isfeatured,Discount,DiscountType,Price,ProductUrl from Products where Status ='1' order by ProductId Desc");
            return Ok(datatable);
        }
        [Authorize]
        [HttpPost("{ProductId}")]
        public async Task<ActionResult> UpdateProductImage(long ProductId, IFormFile file)
        {
            await Task.Delay(0);
            Response res = new Response();
            _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

            if (file != null)
            {
                string BAsePath = _environment.WebRootPath + "/UserFiles/";
                string UniqueId = Guid.NewGuid().ToString();
                string FileExtention = Path.GetExtension(file.FileName);

                string FileCompletePath = BAsePath + UniqueId + FileExtention;


                using (var FileUploadingStream = new FileStream(FileCompletePath, FileMode.Create))
                {
                    file.CopyTo(FileUploadingStream);
                }
                var filePath = "/UserFiles/" + UniqueId + FileExtention;

                if (database.ExecNonQuery($"update Products set ImageUrl='{filePath}' where ProductId='{ProductId}'") > 0)
                {
                    res.message = "Product Image Updated";
                }
                else
                {
                    res.message = "Image Updation Failed";
                }
            }
            else
            {
                res.message = "Your Images is null";
            }
            return Ok(res);
        }
    }
}
