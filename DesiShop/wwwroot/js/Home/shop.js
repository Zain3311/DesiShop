$.get("/api/Product/GetProducts", function (response) {
    $(response).each(function (ind, val) {
        let discountCode = "";
        let featuredCode = "";
        if (val.discountType == "null") {
            discountCode = "";
        }
        else if (val.discountType == "f") {
            discountCode = `<span class="product__label product__label--sale-dis">Rs${val.discount}</span>`;
        }
        else if (val.discountType == "p") {
            discountCode = `<span class="product__label product__label--sale-dis">${val.discount}%</span>`;
        }
        if (val.isfeatured == 1) {
            featuredCode = `<span class="product__label product__label--sale-dis ml-2">Featured</span>`;
        }
        else {
            featuredCode = "";
        }

        $("#productList").append(`<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12"> <div class="product__box product__default--single text-center"> <div class="product__img-box pos-relative"> <a href="/product/${val.productUrl}" class="product__img--link"> <img class="product__img img-fluid" src="${val.imageUrl}" width="237"  height="237" alt=""> </a> ${discountCode} ${featuredCode} <ul class="product__action--link pos-absolute"> <li><a href="#modalAddCart" data-toggle="modal"><i class="icon-shopping-cart"></i></a></li></ul> </div><div class="product__content m-t-20"><a href="/product/${val.productUrl}" class="product__link">${val.title}</a> <div class="product__price m-t-5"> <span class="product__price">Rs${val.price}</span> </div></div></div></div>`)
    })
})