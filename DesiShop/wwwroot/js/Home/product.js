let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
let filterItems = cartItem.filter(obj => obj.id == $("#btnCart").attr("productId"));
if (filterItems.length > 0) {
    $("#btnCart").hide();
}
$("#btnCart").click(function () {
    let productId = $(this).attr("productId");
    let quantiy = $("#txtquantity").val();
    let oldCart = JSON.parse(localStorage.getItem("cartItem")) || [];
    oldCart.push({ id: productId, quantiy: quantiy });
    localStorage.setItem("cartItem", JSON.stringify(oldCart))
    $(this).hide();
})