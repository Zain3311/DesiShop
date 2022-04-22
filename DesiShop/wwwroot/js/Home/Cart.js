function getFields(input, field) {
    var output = [];
    for (var i = 0; i < input.length; ++i)
        output.push(input[i][field]);
    return output;
}
let totalPrice = [];
let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
if (cartItem.length > 0) {
    var result = getFields(cartItem, "id").join(",");
    $.get("/api/Product/GetCartProduct/" + result, function (res) {
        $.each(res, function (ind, val) {
            let productQuantity = cartItem.filter(OBJ => OBJ.id == val.productId)[0].quantiy;
            totalPrice.push({ price: val.price, id: val.productId, quantiy: productQuantity })
            $("#tblCart").append(`<tr> <td class="product-name">${val.title}</td><td class="product-price-cart"><span class="amount">Rs${val.price}</span></td><td class="product-quantities"> <div class="quantity d-inline-block"> <input type="number" price="${val.price}" productId="${val.productId}" class="cart-quantity" min="1" step="1" value="1" max="${val.stockQty}"> </div></td><td class="product-subtotal">Rs${parseInt(val.price * productQuantity)}</td><td class="product-remove" id="product-remove-${val.productId}"> <a href="#"><i class="fa fa-times"></i></a> </td></tr>`);
            RefreshPrice();
        })
    })
}
$(document).on("change", ".cart-quantity", function () {
    $(this).closest("tr").children(".product-subtotal").html(`Rs${parseInt($(this).attr("price") * this.value)}`);
    let productId = $(this).attr("productId");
    totalPrice[totalPrice.indexOf(totalPrice.filter(OBJ => OBJ.id == productId)[0])].quantiy = this.value;
    let cartData = JSON.parse(localStorage.getItem("cartItem")) || [];
    cartData[cartData.indexOf(cartData.filter(OBJ => OBJ.id == productId)[0])].quantiy = this.value;
    cartData[cartData.indexOf(cartData.filter(OBJ => OBJ.id == productId)[0])].price = $(this).attr("price");
    localStorage.setItem("cartItem", JSON.stringify(cartData))
    RefreshPrice()
})
$(document).on("click", ".product-remove", function () {
    let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    let productId = $(this).attr("id").replace("product-remove-", "");
    $(this).closest("tr").remove();
    let product = cartItem.filter(OBJ => OBJ.id == productId)[0];
    cartItem.splice(cartItem.indexOf(product), 1);
    localStorage.setItem("cartItem", JSON.stringify(cartItem))
    document.querySelectorAll("#cartCount").forEach((el) => {
        el.innerHTML = cartItem.length;
    })
})
function RefreshPrice() {
    let price = 100;
    totalPrice.forEach((val) => {
        price += val.price * val.quantiy;
    })
    $('#lblTotal').html("Rs" + price)
    $('#totalPrice').html("Rs" + price - 100)
}
$("#btnCheckout").click(function () {
    let phone = $("#txtPhone").val();
    let city = $("#txtCity").val();
    let zipcode = $("#txtZipcode").val();
    let address = $("#txtAddress").val();
    let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];

    if (cartItem.length == 0) {
        alert("Please add to cart product");
        return;
    }

    if (phone.length == 0 || city.length == 0 || zipcode.length == 0 || address.length == 0) {
        alert("Please Fill the Form");
        return;
    }

    let products = cartItem.map((product) => {
        return { ProductId: product.id, Quantity: product.quantiy, Price: product.price }
    })
    var jsonObject = { phoneNumber: phone, city: city, address: address, PostalCode: zipcode, products: products }
    Preloader("show");
    $.ajax({
        type: "POST",
        url: "/api/Order/CheckOut",
        data: JSON.stringify(jsonObject),
        contentType: 'application/json',
        success: function (response) {
            Preloader("hide");
            if (response.message === "Checkout Successfull") {

                alert("Your order has been submitted successfully");
                localStorage.setItem("cartItem", JSON.stringify([]))
                document.querySelectorAll("#cartCount").forEach((el) => {
                    el.innerHTML = 0;
                })
                window.location.href = "/Home/Shop";
            }
            else {

                alert(response.message);
            }
        },

    });
})