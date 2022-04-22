using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class CheckOut
    {
        public string City { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        public  List<CProduct> Products { get; set; }
    }
    public class CProduct
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string Price { get; set; }
    }
}
