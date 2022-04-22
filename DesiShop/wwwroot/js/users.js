let userList = [];
let updateUserId = 0;
function RefreshUsers() {
    $.get("/api/User/GetUserList", function (response) {
        userList = response;
        if ($.fn.DataTable?.isDataTable(datatable || "")) {
            datatable.clear().draw();
            datatable.destroy();
        }
        $.each(response, function (Index, value) {
            var UserButtons = '<div class="d-flex align-items-center col-actions">' +

                '<a class="mr-1 EditRole" href="javascript:void(0);" id="EditRole' + value.userId + '" data-toggle="tooltip" data-placement="top" title="Edit Role">' +
                feather.icons['lock'].toSvg({ class: 'font-medium-2' }) +
                '</a>' +
                '</div>'; 
            $("#userList").append("<tr><td> " + value.name + " </td><td> " + value.email + " </td><td> " + value.roleName + " </td><td> " + ChangeDateTimeFormat(value.createdDateTime) + " </td><td> " + UserButtons + " </td></tr>");


        });
        Datatable_NetById("datatables");
    });
}
RefreshUsers();
$.get("/api/Roles/GetUserRoles", function (response) {
    $.each(response, function (Index, value) {

        $("#userRole").append(`<option value="${value.roleId}">${value.roleName}</option>`);


    });
    Datatable_Net();
});

$(document).on("click", ".EditRole", function () {
    updateUserId = $(this).attr("id").replace("EditRole", "");
    let user = userList.filter((obj) => obj.userId == updateUserId)[0];
    $("#userRole option[value='" + user.roleId + "']").attr("selected", "selected");

    $("#userUpdate").modal("show")
})

$("#btnUserProduct").click(function () {
    let userRole = $('#userRole option:selected').val();
    $.ajax({
        type: "POST",
        url: "/api/User/UpdateRole/" + updateUserId + "/" + userRole,
        contentType: 'application/json',
        success: function (response) {
            if (response.message === "User Update Successfully") {
                RefreshUsers();
                toastr['success'](response.message, 'Success!', {
                    closeButton: true,
                    tapToDismiss: false
                });
                $("#userUpdate").modal("hide")
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