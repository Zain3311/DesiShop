$.get("/api/Categories/GetCategoryProduct", function (response) {
    $.each(response, function (ind, val) {
        let productCount = val.productCount == 0 ? "No" : val.productCount;
        $(".product__catagory").append(`<a class="product__link" href="/category/${val.categoryUrl}"><div class="product__catagory--single"><div class="product__content product__content--catagory"><a class="product__link" href="/category/${val.categoryUrl}">${val.title}</a> <span class="product__items--text">${productCount} Products</span></div></div></a>`)
    })
})