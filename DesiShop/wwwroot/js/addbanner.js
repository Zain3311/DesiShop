const getDataUrl = (img) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(img);
    });
};
document.getElementById("banner-picture").addEventListener("change", async function (event) {
    let imageUrl = await getDataUrl(event.target.files[0]);
    $("#blog-image").attr("src", imageUrl);
})
$("#btnSubmit").click(async function () {
    var title = $("#banner-title").val();
    var link = $("#banner-link").val();
    var desc = $("#banner-desc").val();
    var imagefile = document.getElementById("banner-picture").files;
    if (title.length == 0 || imagefile.length == 0) {

        toastr['warning']('Please Fill the Form', 'Warning!', {
            closeButton: true,
            tapToDismiss: true
        });
        return;
    }
    else {
        let imageUrl = await FileUpload(imagefile);
        var jsonObject = { title: title, description: desc, link: link, picture: imageUrl[0] }

        Preloader("show");
        $.ajax({
            type: "POST",
            url: "/api/Banner/Add",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {

                Preloader("hide");
                if (response.message === "Banner Added") {
                    toastr['success'](response.message, 'Success!', {
                        closeButton: true,
                        tapToDismiss: false
                    });
                    setTimeout(() => {
                    window.location.reload();
                    },1000)

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

})