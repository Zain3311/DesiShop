using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DesiShop.ManagementClasses;
using DesiShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DesiShop.Controllers.api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IConfiguration config;
        public OrderController(IConfiguration configuration)
        {
            config = configuration;
        }
        public async Task<ActionResult> Checkout(CheckOut checkOut)
        {
            await Task.Delay(0);
            Response res = new Response();
            if (string.IsNullOrEmpty(Request.UserId(config)))
            {
                res.message = "Please login/signup your account ";
                return Ok(res);
            }
            if(database.ExecNonQuery($"insert into Orders (UserId,OrderStatus,Status,InsertedDateTime,City,Address,PostalCode,PhoneNumber) values ('{Request.UserId(config)}','0','1','{DateTime.Now}','{checkOut.City}','{checkOut.Address}','{checkOut.PostalCode}','{checkOut.PhoneNumber}')") > 0)
            {
                var OrderID = database.GetDataTable($"SELECT MAX(OrderId) AS OrderId FROM Orders where Status=1 and UserId='{Request.UserId(config)}'");
                foreach (CProduct product in checkOut.Products)
                {
                    database.ExecNonQuery($"insert into OrderDetail (OrderId,ProductId,Quantity,Price,InsertedDateTime) values('{OrderID.Rows[0]["OrderId"]}','{product.ProductId}','{product.Quantity}','{product.Price}','{DateTime.Now}')");
                }
                res.message = "Checkout Successfull";
            }
            else
            {
                res.message = "Checkout Failed";
            }
            return Ok(res);
        }
        [Authorize]
        [HttpPost]
        //public async Task<Action> UserOrders()
        //{
        //    await Task.Delay(0);
        //    Response res = new Response();
        //    res.data = database.GetDataTable("");
        //    return Ok(Response);
        //}
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> OrderList()
        {
            await Task.Delay(0);
            Response res = new Response();
            res.data = database.GetDataTable("select o.*, u.Name,u.Email from Orders as o inner join Users  as u on u.UserId = o.UserId");
            return Ok(res);
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> TotalOrders()
        {
            await Task.Delay(0);
            var orders = database.GetDataTable("select Count(OrderId) as TotalOrders from Orders").Rows[0]["TotalOrders"];
            return Ok(orders);
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> TodayOrders()
        {
            await Task.Delay(0);
            var orders = database.GetDataTable("select COUNT(OrderId) as TotalOrders from Orders where InsertedDateTime >= GETDATE()").Rows[0]["TotalOrders"];
            return Ok(orders);
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> TotalSaleAmount()
        {
            await Task.Delay(0);
            var totalPrice = database.GetDataTable("select SUM(CONVERT(float,Price)) as TotalPrice from OrderDetail").Rows[0]["TotalPrice"];
            return Ok(totalPrice);
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> ReapetCustomer()
        {
            await Task.Delay(0);

            var table = database.GetDataTable($"select o.UserId,u.Name,COUNT(o.UserId) as Count from Orders as o inner join Users as u on u.UserId = o.UserId  Group by o.UserId,u.Name having COUNT(o.UserId) > 1");

            return Ok(table);
        }
    }
}
