using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string ImageUrl { get; set; }
        public string ProductUrl { get; set; }
        public string Discount { get; set; } = null;
        public string DiscountType { get; set; } = null;
        public int StockQty { get; set; }
        public int FeaturedProduct { get; set; }
        public int Status { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public string InsertedbyId { get; set; }
        public DateTime DeactiveDateTime { get; set; }
        public string DeactivebyId { get; set; }
    }
}
