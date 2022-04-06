function RefreshProducts() {
    $.get("/api/Product/GetProducts", function (response) {
        $("#productList").html("");
        $.each(response, function (ind, val) {
            $("#productList").append(`<div class="card ecommerce-card"> <div class="item-img text-center">  <img class="img-fluid card-img-top" src="${val.imageUrl}" alt="img-placeholder"/></div><div class="card-body"> <div class="item-wrapper"> <div class="item-cost"> <h6 class="item-price" style="margin-left: 85px;">Rs${val.price}</h6> </div></div><h6 class="item-name"> <span class="text-body" href="app-ecommerce-details.html">${val.title}</span></h6> </div><div class="item-options text-center"> <div class="item-wrapper"> <div class="item-cost"> <h4 class="item-price">Rs${val.price}</h4> </div></div><a href="/Dashboard/UpdateProduct/${val.productId}" style="width:100%;" class="btn btn-light"> <i data-feather="edit"></i> <span>Edit</span> </a> <a href="javascript:void(0)" style="width:100%;" class="btn btn-danger btn-delete" id="btn-delete-${val.productId}"> <i data-feather="trash-2"></i> <span class="add-to-cart">Delete</span> </a> </div></div>`);
        });
    });
}

RefreshProducts();
$(document).on("click", ".btn-delete", function () {
    let productId = $(this).attr("id").replace("btn-delete-", "");

    $.ajax({
        type: "DELETE",
        url: "/api/Product/DeleteProduct/" + productId,
        contentType: 'application/json',
        success: function (response) {
            if (response.message === "Product Delete Successfully") {

                toastr['success'](response.message, 'Success!', {
                    closeButton: true,
                    tapToDismiss: false
                });
                RefreshProducts();
            }
            else {

                toastr['error'](response.message, 'Error!', {
                    closeButton: true,
                    tapToDismiss: false
                });
            }
        },

    });
})