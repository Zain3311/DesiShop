using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class ProductImages
    {
        public int ImageId { get; set; }
        public string ImageUrl { get; set; }
        public int ProductId { get; set; }
        public int Status { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public DateTime DeactiveDateTime { get; set; }
    }
}
