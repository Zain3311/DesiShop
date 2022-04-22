using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class ProductUpdate
    {
        public string Discount { get; set; }
        public string DiscountType { get; set; }
        public bool IsFeatured { get; set; }
    }
}
