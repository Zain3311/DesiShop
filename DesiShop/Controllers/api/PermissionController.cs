using DesiShop.ManagementClasses;
using DesiShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Controllers.api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        IConfiguration config;
        public PermissionController(IConfiguration myconfig)
        {
            config = myconfig;
        }

        [HttpPost]
        public async Task<ActionResult> InsertPermission(Permission permission)
        {
            await Task.Delay(0);
            Response res = new Response();
           
            try
            {
                if(permission.ParentId == 0 || permission.ParentId == null){
                    permission.ParentId = null;
                }

                var result = database.ExecNonQuery($"insert into Permissions (PermissionTitle,PermissionUrl,IconCode, IsMenu,ParentId,Status,InsertedDateTime) values('{permission.PermissionTitle}','{permission.PermissionUrl}','{permission.IconCode}','{permission.IsMenu}','{permission.ParentId}','{1}','{DateTime.Now}')");

                if(result > 0)
                {
                res.message = "Permission Inserted Successfully";
                }
                else
                {
                    res.message = "Permission Insertion Failed";
                }


            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }

        [HttpGet]
        public async Task<ActionResult> GetPermissions()
        {
            await Task.Delay(0);
           
            try
            {
                var PermissionList = database.GetDataTable($"select * from Permissions where Status=1");

                PermissionList.Columns.Add("Parent", typeof(DataTable));

                foreach (DataRow permission in PermissionList.Rows)
                {
                    var parentId = Convert.ToInt32(permission["ParentId"].ToString());
                    if (parentId != 0)
                    {
                        permission["Parent"] = database.GetDataTable($"select * from Permissions where Status=1 and Id='{parentId}'");
                    }
                    else
                    {
                        permission["Parent"] = null;
                    }
                }


                return Ok(PermissionList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //[HttpPost]
        //public async Task<ActionResult> UpdatePermissions(Permission newpermission)
        //{
        //    await Task.Delay(0);
        //    Response res = new Response();
        //    try
        //    {
        //        var permission = db.Permisions.Where(u => u.Id == newpermission.Id).SingleOrDefault();
        //        permission.PermissionTitle = newpermission.PermissionTitle;
        //        permission.PermissionUrl = newpermission.PermissionUrl;
        //        permission.IconCode = newpermission.IconCode;
        //        permission.IsMenu = newpermission.IsMenu;
        //        permission.ParentId = newpermission.ParentId;
        //        db.Permisions.Update(permission);
        //        db.SaveChanges();
        //        res.Status = "Permission Updated Successfully";


        //    }
        //    catch (Exception ex)
        //    {
        //        res.Status = ex.Message;
        //    }
        //    return Ok(res);
        //}

        [HttpDelete("{PermissionId}")]
        public async Task<ActionResult> DeletePermission(int PermissionId)
        {
            await Task.Delay(0);
            Response res = new Response();
           
            try
            {
                var role = database.ExecNonQuery($"UPDATE Permissions SET Status = '{0}', DeactiveDateTime= '{DateTime.Now}' WHERE Id = {PermissionId}; ");
                if (role > 0)
                {
                    res.message = "Permission Deleted Successfully";
                    res.data = new { Id = PermissionId.ToString() };
                }
                else
                {
                    res.message = "Permission Deletation Failed";
                }


            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }

        [HttpGet("{RoleId}")]
        public async Task<ActionResult> GetAllPermissionByRole(int RoleId)
        {
            await Task.Delay(0);
           

            var PermissionList = database.GetDataTable($"select perm.Id as PermissionId, perm.ParentId, perm.PermissionTitle, permAssign.AssignedId from Permissions as perm left join (select * from AssignedPermission where Status=1 and RoleId ='{RoleId}') as permAssign  on perm.Id = permAssign.PermissionId where perm.Status=1");

            PermissionList.Columns.Add("Parent", typeof(String));
            foreach (DataRow permission in PermissionList.Rows)
            {
                var parentId = Convert.ToInt32(permission["ParentId"].ToString());
                if (parentId != 0)
                {
                    permission["Parent"] = database.GetDataTable($"select * from Permissions where Status=1 and Id='{parentId}'").Rows[0]["PermissionTitle"];
                }
                else
                {
                    permission["Parent"] = "No Parent Permission";
                }
            }
            PermissionList.Columns.Remove("ParentId");

            return Ok(PermissionList);
        }

        [HttpGet("{RoleId}")]
        public async Task<ActionResult> GetPermissionsForRole(int RoleId)
        {
            await Task.Delay(0);
           

            //var PermissionList = (from perm in db.Permisions
            //                      where (perm.Status == 1 && AssignedPermissions.Contains(perm.Id) && perm.Parent == null)
            //                      join permAssign in db.PermissionAssignToRole.Where(r => r.RoleId == RoleId && r.Status == 1)
            //                      on perm.Id equals permAssign.PermissionId
            //                      select new
            //                      {
            //                          Id = perm.Id,
            //                          PermissionTitle = perm.PermissionTitle,
            //                          IconCode = perm.IconCode,
            //                          PermissionUrl = perm.PermissionUrl,
            //                          SubPermission = perm.SubPermission.Where(perm => perm.Status == 1 && AssignedPermissions.Contains(perm.Id)).ToList()
            //                      }).ToList();
           var PermissionList = database.GetDataTable($"select perm.* from Permissions as perm inner join (select * from AssignedPermission where Status=1 and RoleId ='{RoleId}') as permAssign on perm.Id = permAssign.PermissionId where perm.Status=1 and perm.ParentId = 0");

            PermissionList.Columns.Add("SubPermission", typeof(DataTable));
            foreach (DataRow permission in PermissionList.Rows)
            {
                var Id = Convert.ToInt32(permission["Id"].ToString());
                if (Id != 0)
                {
                    permission["SubPermission"] = database.GetDataTable($"select perm.* from Permissions as perm inner join (select * from AssignedPermission where Status=1 and RoleId ='{RoleId}') as permAssign on perm.Id = permAssign.PermissionId where perm.Status=1 and perm.ParentId='{Id}'");
                }
                else
                {
                    permission["Parent"] = null;
                }
            }

            return Ok(PermissionList);
        }

        [HttpPost]
        public async Task<ActionResult> ManagePermissionByRole(PermissionManagement obj)
        {
            await Task.Delay(0);
            Response res = new Response();
           
            try
            {

                foreach (UnAssignedPermissions unA in obj.UnAssignedPermissionList)
                {
                    database.ExecNonQuery($"insert into AssignedPermission (RoleId,PermissionId,Status,InsertedDateTime) values ('{obj.RoleId}','{unA.PermissionId}','1','{DateTime.Now}')");
                }
                List<int> Assigned = obj.AssignedPermissionList.Select(s => s.AssignedId).ToList();

                foreach (AssignedPermissions passign in obj.AssignedPermissionList)
                {
                    database.ExecNonQuery($"update AssignedPermission set Status=0, DeactiveDateTime='{DateTime.Now}' where AssignedId='{passign.AssignedId}'");
                }

                res.message = "Permissions Updated Successfully";


            }
            catch (Exception ex)
            {
                res.message = ex.Message;
            }
            return Ok(res);
        }
    }
}
