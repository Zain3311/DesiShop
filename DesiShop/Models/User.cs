using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class User
    {
        public string UserId { get; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ImageUrl { get; set; }
        public int RoleId { get; set; }
        public int Status { get; } = 1;
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DeactiveDateTime { get; set; }
        public string DeactiveBy { get; set; }
    }
}
