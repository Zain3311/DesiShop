using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class CheckOut
    {
        public  List<CProduct> Products { get; set; }
    }
    public class CProduct
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string Price { get; set; }
    }
}
