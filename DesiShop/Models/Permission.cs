using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public string PermissionTitle { get; set; }
        public string PermissionUrl { get; set; }
        public string IconCode { get; set; }
        public bool IsMenu { get; set; }
        public int Status { get; set; }
        public int? ParentId { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public DateTime? DeactiveDateTime { get; set; }
    }
}
