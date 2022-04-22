using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class Blogs
    {
        public string BlogTitle { get; set; }
        public string BlogDescription { get; set; }
        public string BlogContent { get; set; }
        public string Picture { get; set; }
        public string insetedbyId { get; set; }
        public string deletedby { get; set; }
        public int Status { get; set; }
    }
}
