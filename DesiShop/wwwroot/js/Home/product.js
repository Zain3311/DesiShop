let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
let filterItems = cartItem.filter(obj => obj.id == $("#btnCart").attr("productId"));
if (filterItems.length > 0) {
    $("#btnCart").hide()
}
$("#btnCart").click(function () {
    let productId = $(this).attr("productId");
    let productPrice = $(this).attr("price");
    let quantiy = $("#txtquantity").val();
    let oldCart = JSON.parse(localStorage.getItem("cartItem")) || [];
    oldCart.push({ id: productId, quantiy: quantiy, price: productPrice });
    localStorage.setItem("cartItem", JSON.stringify(oldCart))
    $(this).hide();
    cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    document.querySelectorAll("#cartCount").forEach((el) => {
        el.innerHTML = cartItem.length;
    })
})