$(document).ready(function () {

    $.get("/api/UserApi/GetUserList", function (response) {

        if ($.fn.DataTable.isDataTable(datatable)) {
            datatable.clear().draw();
            datatable.destroy();
        }
        $.each(response, function (Index, value) {

            var UserButtons = '<div class="d-flex align-items-center col-actions">' +

                '<a class="mr-1 EditUser" href="javascript:void(0);" id="EditUser' + value.id + '" data-toggle="tooltip" data-placement="top" title="Edit User">' +
                feather.icons['edit'].toSvg({ class: 'font-medium-2' }) +
                '</a>' +
                '<a class="mr-1 DeleteUser" href="javascript:void(0);" id="DeleteUser' + value.id + '" data-toggle="tooltip" data-placement="top" title="Delete User">' +
                feather.icons['trash-2'].toSvg({ class: 'font-medium-2' }) +
                '</a>'
            '</div>';

            var RollNo = "";
            if (value.rollNo == null || value.rollNo == 0) {

                RollNo = "No RollNo";
            } else {
                RollNo = value.rollNo;
            }

            $("#userList").append("<tr><td> " + value.name + " </td><td> " + value.fatherName + " </td><td> " + value.email + " </td><td> " + RollNo + " </td><td>" +
                value.role.roleTitle + "</td><td><div class='avatar avatar-lg'> <img src=" + value.imageUrl + "></div></td><td>" + ChangeDateTimeFormat(value.insertedDateTime) + "</td><td>" + UserButtons + "</td></tr>");

           
        });
        Datatable_Net();
    });

});