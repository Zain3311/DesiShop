$(document).ready(function () {

    $.get("/api/Blog/GetBlogs", function (response) {

        if ($.fn.DataTable.isDataTable(datatable)) {
            datatable.clear().draw();
            datatable.destroy();
        }
        $.each(response, function (Index, value) {

            var BlogButtons = '<div class="d-flex align-items-center col-actions">' +

                '<a class="mr-1 DeleteBlog" href="javascript:void(0);" id="DeleteBlog' + value.blogId + '" data-toggle="tooltip" data-placement="top" title="Delete Post">' +
                feather.icons['trash-2'].toSvg({ class: 'font-medium-2' }) +
                '</a>'
            '</div>';

            $("#categoryList").append("<tr><td> " + value.blogTitle + " </td><td> <img src='" + value.picture + "' width='90' height='70' </td><td>" + BlogButtons + "</td></tr>");


        });
        Datatable_Net();
    });

});

$(document).on('click', '.DeleteBlog', function () {
    var id = $(this).attr('id');
    id = id.replace("DeleteBlog", "");

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "DELETE",
                url: "/api/BLog/DeleteBlog/" + id,
                contentType: 'application/json',
                success: function (response) {


                    if (response.message === "Post Deleted Successfully") {

                        toastr['success'](response.message, 'Success!', {
                            closeButton: true,
                            tapToDismiss: false
                        });
                        $("#DeleteBlog" + response.data.id).closest('tr').remove();

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

});
