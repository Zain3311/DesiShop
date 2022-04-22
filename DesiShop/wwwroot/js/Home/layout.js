 $.get("/api/Categories/GetCategories", function (response) {
        $.each(response.data, function (ind, val) {
            $("#listCategories",).append(`<li class="menu-item"><a href="/category/${val.categoryUrl}">${val.title}</a></li>`)
            $(".listCategories",).append(`<li class="menu-item"><a href="/category/${val.categoryUrl}">${val.title}</a></li>`)
        })
 })
let cartItem2 = JSON.parse(localStorage.getItem("cartItem")) || [];
setTimeout(() => {
    document.querySelectorAll("#cartCount").forEach((el) => {
        el.innerHTML = cartItem2.length;
    })
},1000)