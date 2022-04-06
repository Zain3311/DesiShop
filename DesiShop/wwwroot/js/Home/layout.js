 $.get("/api/Categories/GetCategories", function (response) {
        $.each(response.data, function (ind, val) {
            $("#listCategories",).append(`<li class="menu-item"><a href="javascript:void;">${val.title}</a></li>`)
            $(".listCategories",).append(`<li class="menu-item"><a href="javascript:void;">${val.title}</a></li>`)
        })
 })