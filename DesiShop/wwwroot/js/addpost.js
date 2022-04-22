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

createRichEditor("#blog-content");
async function tiny_image_upload_handler(blobInfo, success, failure) {
    FileUpload([blobInfo.blob()], blobInfo.filename()).then((res) => {
        success(res[0])
    })
        .catch((err) => {
            failure(err)
        })
};
document.getElementById("blog-picture").addEventListener("change", async function (event) {
    let imageUrl = await getDataUrl(event.target.files[0]);
    $("#blog-image").attr("src", imageUrl);
})
$("#btnSubmit").click(async function () {
    var title = $("#blog-title").val();
    var desc = $("#blog-desc").val();
    var imagefile = document.getElementById("blog-picture").files;
    var content = tinymce.get("blog-content").getContent();
    if (title.length == 0 || content.length == 0 || imagefile.length == 0) {

        toastr['warning']('Please Fill the Form', 'Warning!', {
            closeButton: true,
            tapToDismiss: true
        });
        return;
    }
    else {
        let imageUrl = await FileUpload(imagefile);
        var jsonObject = { blogTitle: title, blogDescription: desc, blogContent: content, picture: imageUrl[0] }

        Preloader("show");
        $.ajax({
            type: "POST",
            url: "/api/Blog/AddBlog",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {

                Preloader("hide");
                if (response.message === "Post Inserted Successfully") {
                    toastr['success'](response.message, 'Success!', {
                        closeButton: true,
                        tapToDismiss: false
                    });
                    window.location.reload();

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