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
    public class UserController : ControllerBase
    {
        IConfiguration config;
        public UserController(IConfiguration myconfig)
        {
            config = myconfig;
        }

        
        [HttpPost]
        public async Task<ActionResult> UserLogin(User userlogin)
        {
            await Task.Delay(0);
            Response res = new Response();
           
            try
            {

                userlogin.Password = EncryptionDecryption.Encrypt(userlogin.Password);

                DataTable table = database.GetDataTable($"select * from Users where Email='{userlogin.Email}' and Password='{userlogin.Password}'");

                if (table.Rows.Count == 0)
                {
                    res.message = "Incorrect Email and Password";
                }
                else
                {

                    res.message = "Login Successfully";
                    res.data = new { token = JWTs.GenerateJSONWebToken(table.Rows[0]["UserId"].ToString(), config)};


                }
            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }

            return Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult> InsertUser(User newuser)
        {
            await Task.Delay(0);

            Response res = new Response();
           
            try
            {
                var CheckEmail = database.GetDataTable($"select * from Users where Email='{newuser.Email}'");

                if (CheckEmail.Rows.Count > 0)
                {
                    res.message = "Email Already Exist";
                    return Ok(res);
                }

                var result = database.ExecNonQuery($"INSERT INTO Users(UserId ,Name ,Email ,Password ,ImageUrl ,RoleId ,Status ,CreatedDateTime ,CreatedBy) VALUES ('{newuser.UserId}', '{newuser.Name}', '{newuser.Email}', '{EncryptionDecryption.Encrypt(newuser.Password)}', '{newuser.ImageUrl}', '{newuser.RoleId}','{newuser.Status}', '{DateTime.Now}', '{newuser.CreatedBy}')");

                if(result > 0)
                {
                res.message = "User Inserted Successfully";
                }
                else
                {
                    res.message = "User Insertion Failed";
                }

            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }

            return Ok(res);
        }

        [HttpDelete("{UserId}/{DeactiveBy}")]
        public async Task<ActionResult> DeleteUser(string UserId, string DeactiveBy)
        {
            await Task.Delay(0);

            Response res = new Response();
           
            try
            {
                var user = database.ExecNonQuery($"UPDATE Users SET Status = '{0}', DeactiveBy = '{DeactiveBy}', DeactiveDateTime= '{DateTime.Now}' WHERE UserId = {UserId}; ");
                if (user > 0)
                {

                res.message = "User Deleted Successfully";
                }
                else
                {
                    res.message = "User Not Found";

                    return Ok(res);
                }

            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }

            return Ok(res);
        }

        [HttpGet]
        public async Task<ActionResult> GetUserData()
        {
            await Task.Delay(0);
           
            var UserId = Request.UserId(config);

            if(string.IsNullOrEmpty(UserId))
            {
                return Redirect("/Home/Logout");
            }

            var UserData = database.GetDataTable($"select u.UserId,u.Name,u.Email,u.ImageUrl, role.RoleName, role.RoleId from Users as u, UserRoles as role where u.UserId='{UserId}' and role.RoleId =u.RoleId and u.Status=1 ");

            return Ok(UserData);
        }

        [HttpGet]
        public async Task<ActionResult> GetUserList()
        {
            await Task.Delay(0);
           

            var UserId = Request.UserId(config);

            var UserList = database.GetDataTable($"select u.UserId,u.Name,u.Email,u.ImageUrl, role.RoleName from Users as u, UserRoles as role where u.UserId!='{UserId}' and role.RoleId =u.RoleId and u.Status=1 ");

            return Ok(UserList);
        }

    }
}