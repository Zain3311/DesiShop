$(document).ready(function () {

    var RoleId;

    RefreshUserRoles()

    $("#btnsubmit").click(function () {

        var RoleName = $("#role-name").val();
        if (RoleName.length == 0) {

            toastr['warning']('Please Fill the Form', 'Warning!', {
                closeButton: true,
                tapToDismiss: false
            });
            return;
        }
        $(this).hide();
        var jsonObject = { "roleName": RoleName };
        $.ajax({
            type: "POST",
            url: "/api/Roles/InsertUserRole",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                $("#btnsubmit").show();
                if (response.message == "Role Inserted Successfully") {

                    RefreshUserRoles();

                    $("#role-name").val('');
                    toastr['success']('User Role Inserted Successfully', 'Success!', {
                        closeButton: true,
                        tapToDismiss: false
                    });

                } else {


                    toastr['error'](response.mesaage, 'Error!', {
                        closeButton: true,
                        tapToDismiss: false
                    });
                }
            }
        });
    });

    function RefreshUserRoles()
    {
        $.get("/api/Roles/GetUserRoles", function (response) {
            if ($.fn.DataTable.isDataTable(datatable)) {
                datatable.clear().draw();
                datatable.destroy();
            }
            $.each(response, function (Index, value) {

                var RoleButton = '<div class="d-flex align-items-center col-actions">' +
                    '<a class="mr-1 editRolePermission" href="javascript:void(0);" id="editRolePermission' + value.roleId + '" data-toggle="tooltip" data-placement="top" title="Edit Role Permission">' +
                    feather.icons['lock'].toSvg({ class: 'font-medium-2' }) +
                    '</a>' +
                    '<a class="mr-1 EditRole" href="javascript:void(0);" id="EditRole' + value.roleId + '" data-toggle="tooltip" data-placement="top" title="Edit Role">' +
                    feather.icons['edit'].toSvg({ class: 'font-medium-2' }) +
                    '</a>' +
                    '<a class="mr-1 DeleteRole" href="javascript:void(0);" id="DeleteRole' + value.roleId + '" data-toggle="tooltip" data-placement="top" title="Delete Role">' +
                    feather.icons['trash-2'].toSvg({ class: 'font-medium-2' }) +
                    '</a>'
                '</div>';


                var RoleDate = ChangeDateTimeFormat(value.createdDateTime);

                $("#roleList").append("<tr><td> " + value.roleName + " </td><td>" + RoleDate + "</td><td>" + RoleButton + "</td></tr>");

            });
            Datatable_Net();
        });
    }

    $(document).on("click", ".editRolePermission", function () {

        RoleId = $(this).attr("id").replace("editRolePermission","");
       
        $.ajax({
            type: "GET",
            url: "/api/Permission/GetAllPermissionByRole/" + RoleId,
            contentType: "application/json",
            success: function (response) {
                $('#tblPermissions').html("");
                $.each(response, function (index, value) {
                    var Status = "";

                    if (value.assignedId !== null) {
                        Status = "checked='checked'";
                    }
                    else {
                        value.assignedId = 0;
                    }
                    $('#tblPermissions').append("<tr><td>" + value.permissionTitle + "</td><td>" + value.parent + "</td><td><div class='custom-control custom-checkbox'> <input type='checkbox' class='custom-control-input permissionCheck' id=" + value.permissionId + " permissionId='" + value.permissionId + "' " + Status + " assignedId='" + value.assignedId + "'> <label class='custom-control-label' for=" + value.permissionId + " ></label> </div></td></tr>");
                });
                $("#editRolePermissionModal").modal("show");
            }
        });

    });

    $(document).on("click", ".DeleteRole", function () {
        var Roleid = $(this).attr("id").replace("DeleteRole", "");
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
                }).then(function (result) {
                    if (result.value) {

                        $.ajax({
                            type: "GET",
                            url: "/api/RoleAPI/DeleteUserRole?RoleId=" + Roleid,
                            contentType: "application/json",
                            success: function (response) {
                                if (response.mesaage == "Role Deleted Successfully") {

                                    datatable.row($("#DeleteRole" + response.id).closest('tr')).remove().draw();

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Deleted!',
                                        text: 'User Role Deleted Successfully',
                                        customClass: {
                                            confirmButton: 'btn btn-success'
                                        }
                                    });
                                } else {

                                    Swal.fire({
                                        title: 'Cancelled',
                                        text: response.mesaage,
                                        icon: 'error',
                                        customClass: {
                                            confirmButton: 'btn btn-success'
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
           
        

    

    });

    $('#SavePermissions').click(function () {
        $(this).hide();
        var unAssigned = [];
        $(".permissionCheck:checkbox:checked[assignedId=0]").each(function (index, obj) {

            var permissionId = $(obj).attr('permissionId');

            var PermissionObject = { "permissionId": permissionId };
            unAssigned.push(PermissionObject);
        });
        var Assigned = [];
        $(".permissionCheck:checkbox:not(:checked)[assignedId!=0]").each(function (index, obj) {

            var assignedId = $(obj).attr('assignedId');

            var PermissionObject = { "assignedId": assignedId };
            Assigned.push(PermissionObject);
        });
        var data = { "roleId": RoleId, "unAssignedPermissionList": unAssigned, "AssignedPermissionList": Assigned }
    
        $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            url: "/api/Permission/ManagePermissionByRole",
            contentType: "application/json",
            success: function (response) {
                $("#SavePermissions").show();
                if (response.message == "Permissions Updated Successfully") {
                    toastr['success']('Permissions Updated Successfully', 'Success!', {
                        closeButton: true,
                        tapToDismiss: false
                    });

                } else {


                    toastr['error'](response.message, 'Error!', {
                        closeButton: true,
                        tapToDismiss: false
                    });
                }
                $("#editRolePermissionModal").modal("hide");
            }
        });
    
});
    var Id;
    $(document).on('click', '.EditRole', function () {
        Id = $(this).attr('id');
        Id = Id.replace("EditRole", "");

        var updateRole = $(this).closest('tr');
        var RoleName = $(updateRole).find('td').eq(0).text();
        $("#update-role-name").val(RoleName);

        $('#editRoleModal').modal('show');
    });

    $("#btnUpdate").click(function () {



        var RoleName = $("#update-role-name").val();
        if (RoleName.length == 0) {

            toastr['warning']('Please Fill the Form', 'Warning!', {
                closeButton: true,
                tapToDismiss: false
            });
            return;
        }
        $(this).hide();
        var jsonObject = { "roleId": Id, "roleName": RoleName};
        $.ajax({
            type: "POST",
            url: "/api/Roles/UpdateUserRole",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                $("#btnUpdate").show();
                if (response.message == "Role Updated Successfully") {

                    RefreshUserRoles();

                    $('#editRoleModal').modal('hide');

                    toastr['success']('Role Updated Successfully', 'Success!', {
                        closeButton: true,
                        tapToDismiss: false
                    });



                } else {


                    toastr['error'](response.message, 'Error!', {
                        closeButton: true,
                        tapToDismiss: false
                    });
                }
            }
        });
    });

});