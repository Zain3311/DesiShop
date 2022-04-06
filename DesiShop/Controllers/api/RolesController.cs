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
    public class RolesController : ControllerBase
    {
        IConfiguration config;
        public RolesController(IConfiguration myconfig)
        {
            config = myconfig;
        }

        [HttpPost]
        public async Task<ActionResult> InsertUserRole(UserRole role)
        {
            await Task.Delay(0);
            Response res = new Response();
           
            try
            {
                var CheckRole = database.GetDataTable($"select * from UserRoles where RoleName='{role.RoleName}'");

                if (CheckRole.Rows.Count > 0)
                {
                    res.message = "Role Already Exist";
                    return Ok(res);
                }

                var result = database.ExecNonQuery($"INSERT INTO UserRoles(RoleName, Status ,CreatedDateTime ,CreatedBy) VALUES ('{role.RoleName}', '1','{DateTime.Now}', '{Request.UserId(config)}')");

                if (result > 0)
                {
                    res.message = "Role Inserted Successfully";
                }
                else
                {
                    res.message = "Role Insertion Failed";
                }
            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }

        [HttpGet]
        public async Task<ActionResult> GetUserRoles()
        {
            await Task.Delay(0);
           
            try
            {
                DataTable RoleList = database.GetDataTable("select RoleId, RoleName, CreatedDateTime from UserRoles where Status=1");


                return Ok(RoleList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        public async Task<ActionResult> UpdateUserRole(UserRole newrole)
        {
            await Task.Delay(0);
            Response res = new Response();
           
            try
            {
                var role = database.ExecNonQuery($"UPDATE UserRoles SET RoleName = '{newrole.RoleName}' WHERE RoleId = {newrole.RoleId}; ");
                if (role > 0)
                {
                    res.message = "Role Updated Successfully";
                }
                else
                {
                    res.message = "Role Updation Failed";
                }


            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }

        [HttpDelete("{RoleId}/{DeactiveBy}")]
        public async Task<ActionResult> DeleteUserRole(string RoleId,string DeactiveBy)
        {
            await Task.Delay(0);
            Response res = new Response();
           
            try
            {
                var role = database.ExecNonQuery($"UPDATE UserRoles SET Status = '{0}', DeactiveBy = '{DeactiveBy}', DeactiveDateTime= '{DateTime.Now}' WHERE RoleId = {RoleId}; ");
                if (role > 0)
                {
                    res.message = "Role Deleted Successfully";
                    res.data = new { Id = RoleId.ToString() };
                }
                else
                {
                    res.message = "Role Deletation Failed";
                }

            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }
    }
}
