//const { htmlimports } = require("modernizr");

const getDataUrl = (img) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(img);
    });
};
function createRichEditor(selecter) {
    tinymce.init({
        selector: selecter,
        branding: false,
        height: 350,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste imagetools wordcount'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        images_upload_handler: tiny_image_upload_handler
    });
}

createRichEditor("#short-desc");
createRichEditor("#full-desc");
$.get("/api/Categories/GetCategories", function (response) {
    $.each(response.data, function (ind, val) {
        $("#catList").append(`<div class="custom-control custom-checkbox custom-control-inline m-1"> <input type="checkbox" class="custom-control-input cat-item" id="cat-${val.categoryId}"> <label class="custom-control-label" for="cat-${val.categoryId}">${val.title}</label> </div>`)
    })
})

async function tiny_image_upload_handler(blobInfo, success, failure) {
    FileUpload([blobInfo.blob()], blobInfo.filename()).then((res) => {
        success(res[0])
    })
        .catch((err) => {
            failure(err)
        })
};
document.getElementById("change-picture").addEventListener("change", async function (event) {
    let imageUrl = await getDataUrl(event.target.files[0]);
    $("#product-image").attr("src", imageUrl);
})



$("#btnSubmit").click(async function () {
    debugger;
    var title = $("#protitle").val();
    var price = $("#proprice").val();
    var shortDesc = tinymce.get("short-desc").getContent();
    var fullDesc = tinymce.get("full-desc").getContent();
    var isfeatured = document.getElementById("isfeatured");
    var proqua = $("#proqua").val();
    var proDistype = $("#pro-distype").val();
    var prodis = $("#prodis").val();
    var ImageFiles = Array.from(document.getElementById("product-images").files);
    var imagefile = document.getElementById("change-picture").files[0];
    ImageFiles.push(imagefile)
    var productImages = [];
    var categories = [];
    const varientTitle = [];
    $('input[name="vTitle[]"]').each(function () {
        
        varientTitle.push($(this).val());//code what you want on click of button
    });
    const varientPrice = [];
    $('input[name="vPrice[]"]').each(function () {
        int price = parseInt($(this).val());
        varientPrice.push(price);//code what you want on click of button
    });


    if (title.length == 0 || price.length == 0 || shortDesc.length == 0 || proqua.length == 0) {

        toastr['warning']('Please Fill the Form', 'Warning!', {
            closeButton: true,
            tapToDismiss: true
        });
        return;
    }
    else {
        if (prodis.length == 0 && proDistype != "null") {
            toastr['warning']('Please Fill the Form', 'Warning!', {
                closeButton: true,
                tapToDismiss: true
            });
            return;
        }
        productImages = await FileUpload(ImageFiles)
        imagefile = productImages[0];
        productImages.shift();
        $(".cat-item").each(function (ind, val) {
            if (val.checked)
                categories.push(val.id.replace("cat-", ""))
        })
        var product = { title: title, imageUrl: imagefile, shortDescription: shortDesc, description: fullDesc, price: price, stockQty: proqua, discount: prodis, discountType: proDistype, isfeatured: isfeatured.checked}
        var jsonObject = { product: product, productImages: productImages, categories: categories, varientTitle: varientTitle, varientPrice: varientPrice }

        Preloader("show");
        $.ajax({
            type: "POST",
            url: "/api/Product/AddProduct",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {

                Preloader("hide");
                if (response.message === "Product Added Successfully") {
                    window.location.reload();
                    toastr['success'](response.message, 'Success!', {
                        closeButton: true,
                        tapToDismiss: false
                    });

                }
                else {

                    toastr['error'](response.message, 'Error!', {
                        closeButton: true,
                        tapToDismiss: false
                    });
                }
            },

        });

    }

});

//$(document).ready(function () {

//    $("#btnAdd").click(function () {

//        $("#newRow").append('<div class="col-md-5 col-5"> <div class="form-group"> <label class="form-label" for="protitle">Product Title</label> <input type="text" class="form-control dt-full-name" id="protitle" placeholder="Enter Product Title" /> </div> </div> <div class="col-md-5 col-5"><div class="form-group"> <label class="form-label" for="proprice">Price</label> <input type="number" class="form-control dt-full-name" id="proprice" placeholder="Enter Price" /></div><div class="col-md-2 col-2"><div class="form-group"> <label class="form-label" for="proprice">Add Varients</label> <input type="button" class="btn btn-secondary" id="btnAdd" value="Add" /> </div>');

//    });

//});

