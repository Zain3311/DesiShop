using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class UserRole
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public int Status { get; } = 1;
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DeactiveDateTime { get; set; }
        public string DeactiveBy { get; set; }
    }
}
