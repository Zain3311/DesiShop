$.get("/api/Categories/GetCategoryProduct", function (response) {
    $.each(response, function (ind, val) {
        let productCount = val.productCount == 0 ? "No" : val.productCount;
        $(".product__catagory").append(`<a class="product__link" href="/category/${val.categoryUrl}"><div class="product__catagory--single"><div class="product__content product__content--catagory"><a class="product__link" href="/category/${val.categoryUrl}">${val.title}</a> <span class="product__items--text">${productCount} Products</span></div></div></a>`)
    })
})
$.get("/api/Product/GetFeaturedProducts", function (response) {
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

        $("#featuredProduct").append(`<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6"> <div class="product__box product__default--single text-center"> <div class="product__img-box pos-relative"> <a href="/product/${val.productUrl}" class="product__img--link"> <img class="product__img img-fluid" src="${val.imageUrl}" width="237"  height="237" alt=""> </a> ${discountCode} ${featuredCode} <ul class="product__action--link pos-absolute"> <li><a href="#" data-toggle="modal"><i class="icon-shopping-cart"></i></a></li></ul> </div><div class="product__content m-t-20"><a href="/product/${val.productUrl}" class="product__link">${val.title}</a> <div class="product__price m-t-5"> <span class="product__price">Rs${val.price}</span> </div></div></div></div>`)
    })
})
$.get("/api/Product/NewProducts", function (response) {
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

        $("#newProducts").append(`<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6"> <div class="product__box product__default--single text-center"> <div class="product__img-box pos-relative"> <a href="/product/${val.productUrl}" class="product__img--link"> <img class="product__img img-fluid" src="${val.imageUrl}" width="237"  height="237" alt=""> </a> ${discountCode} ${featuredCode} <ul class="product__action--link pos-absolute"> <li><a href="#" data-toggle="modal"><i class="icon-shopping-cart"></i></a></li></ul> </div><div class="product__content m-t-20"><a href="/product/${val.productUrl}" class="product__link">${val.title}</a> <div class="product__price m-t-5"> <span class="product__price">Rs${val.price}</span> </div></div></div></div>`)
    })
})
$.get("/api/Blog/TopBlogs", function (response) {
    $(response).each(function (ind, val) {

        $("#latestNews").append(`<div class="col-4"><div class="blog-feed"> <div class="blog-feed__img-box"> <a href="" class="blog-feed__img--link blog__img"> <img class="img-fluid" src="${val.picture}" alt=""> </a> </div><div class="blog-feed__content "> <a href=/post/${val.blogId}" class="blog-feed__link">${val.blogTitle}</a><p class="blog-feed__excerpt">${val.blogDescription.substring(0,87)+ "..."}</p><a href="/post/${val.blogId}" class="btn btn--small btn--radius btn--green btn--green-hover-black font--regular text-uppercase text-capitalize">Continue Reading</a> </div></div></div>`)
    })
})