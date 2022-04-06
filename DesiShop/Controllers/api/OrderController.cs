using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DesiShop.ManagementClasses;
using DesiShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DesiShop.Controllers.api
{
    [Route("api/[controller]")]
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
            if(database.ExecNonQuery($"insert into Orders (UserId,Status,InsertedDateTime) values ('{Request.UserId(config)}','1','{DateTime.Now}')") > 0)
            {
                if(database.ExecNonQuery($"insert into OrderDetail (OrderId,ProductId,Quantity,Price,InsertedDateTime) values('','','','','','','')") > 0)
                {

                }
            }
            return Ok();
        }
    }
}
