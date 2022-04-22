using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Models
{
    public class AddProduct
    {
        public Product product { get; set; }
        public List<string> productImages { get; set; }
        public List<string> varientTitle { get; set; }
        public List<int> categories { get; set; }
        public List<int> varientPrice { get; set; }
    }
}
