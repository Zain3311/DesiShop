using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class PermissionManagement
    {
        public int RoleId { get; set; }
        public List<UnAssignedPermissions> UnAssignedPermissionList { get; set; }
        public List<AssignedPermissions> AssignedPermissionList { get; set; }
    }

    public class UnAssignedPermissions
    {
        public int PermissionId { get; set; }
    }
    public class AssignedPermissions
    {
        public int AssignedId { get; set; }
    }
}
