using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string CategoryURL { get; set; }
        public int? ParentCategory { get; set; } = null;
        public int Status { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public string InsertedbyId { get; set; }
        public DateTime DeactiveDateTime { get; set; }
        public string DeactivebyId { get; set; }
    }
}
