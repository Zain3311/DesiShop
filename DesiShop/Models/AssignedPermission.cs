using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class AssignedPermission
    {
        public int AssignedId { get; set; }
        public int? RoleId { get; set; }
        public int? PermissionId { get; set; }
        public int? Status { get; set; }
        public DateTime? InsertedDateTime { get; set; }
        public DateTime? DeactiveDateTime { get; set; }
    }
}
