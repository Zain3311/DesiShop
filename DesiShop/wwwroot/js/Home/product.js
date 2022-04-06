let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
let filterItems = cartItem.filter(obj => obj.id == $("#btnCart").attr("productId"));
if (filterItems.length > 0) {
    $("#btnCart").addClass("product-remove");
    $("#btnCart").attr("id", "product-remove-" + $("#btnCart").attr("productId"));
}
$("#btnCart").click(function () {
    let productId = $(this).attr("productId");
    let quantiy = $("#txtquantity").val();
    let oldCart = JSON.parse(localStorage.getItem("cartItem")) || [];
    oldCart.push({ id: productId, quantiy: quantiy });
    localStorage.setItem("cartItem", JSON.stringify(oldCart))
    $(this).hide();
})
$(document).on("click", ".product-remove", function () {
    let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    let productId = $(this).attr("id").replace("product-remove-", "");
    let product = cartItem.filter(OBJ => OBJ.id == productId)[0];
    cartItem.splice(cartItem.indexOf(product), 1);
    localStorage.setItem("cartItem", JSON.stringify(cartItem))
    $(this).removeClass
        ("product-remove");
    $(this).attr("id", "btnCart");
})