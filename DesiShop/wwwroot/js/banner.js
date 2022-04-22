$(document).ready(function () {

    $.get("/api/Banner/Get", function (response) {

        if ($.fn.DataTable.isDataTable(datatable)) {
            datatable.clear().draw();
            datatable.destroy();
        }
        $.each(response, function (Index, value) {

            var BannerButtons = '<div class="d-flex align-items-center col-actions">' +

                '<a class="mr-1 DeleteBanner" href="javascript:void(0);" id="DeleteBanner' + value.bannerId + '" data-toggle="tooltip" data-placement="top" title="Delete Banner">' +
                feather.icons['trash-2'].toSvg({ class: 'font-medium-2' }) +
                '</a>'
            '</div>';

            $("#bannerList").append("<tr><td> " + value.title + " </td><td> " + value.description + " </td><td> <img src='" + value.picture + "' width='90' height='70' </td><td>" + BannerButtons + "</td></tr>");


        });
        Datatable_Net();
    });

});

$(document).on('click', '.DeleteBanner', function () {
    var id = $(this).attr('id');
    id = id.replace("DeleteBanner", "");

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
                url: "/api/Banner/Delete/" + id,
                contentType: 'application/json',
                success: function (response) {


                    if (response.message === "Banner Delete Successfully") {

                        toastr['success'](response.message, 'Success!', {
                            closeButton: true,
                            tapToDismiss: false
                        });
                        $("#DeleteBanner" + response.data.id).closest('tr').remove();

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
