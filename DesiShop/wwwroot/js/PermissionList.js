$(document).ready(function () {

    var updatePermission;
    RefreshPermissions();

    $("#btnsubmit").click(function () {



        var PermissionTitle = $("#permission-title").val();
        var PermissionUrl = $("#permission-url").val();
        var PermissionCode = $("#icon-code").val();
        var PermissionIsmenu = $("#ismenuitem option:selected").val();

        var ParentMenuId = $("#parentmenu option:selected").val();
        if (ParentMenuId == "Select Parent Permission") {

            ParentMenuId = null;
        } 

        if (PermissionTitle.length == 0 || PermissionUrl.length == 0 || PermissionCode.length == 0) {

            toastr['warning']('Please Fill the Form', 'Warning!', {
                closeButton: true,
                tapToDismiss: false
            });
            return;
        }
        $(this).hide();
        var jsonObject = { "permissionTitle": PermissionTitle, "permissionUrl": PermissionUrl, "iconCode": PermissionCode, "isMenu": PermissionIsmenu, "parentId": ParentMenuId };
        $.ajax({
            type: "POST",
            url: "/api/Permission/InsertPermission",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                $("#btnsubmit").show();
                if (response.message == "Permission Inserted Successfully") {

                    RefreshPermissions();

                    $("#permission-title").val('');
                    $("#permission-url").val('');
                    $("#icon-code").val('');

                    $("#parentmenu option:selected").prop("selected", false);
                    $("#ismenuitem option:selected").prop("selected", false);

                    toastr['success']('Permission Inserted Successfully', 'Success!', {
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

    function RefreshPermissions() {

        $.get("/api/Permission/GetPermissions", function (response) {

            if ($.fn.DataTable.isDataTable(datatable)) {
                datatable.clear().draw();
                datatable.destroy();
            }

            $("#parentmenu").html('');
            $("#update-parentmenu").html('');
            $("#parentmenu").append('<option value="Select Parent Permission" selected>Select Parent Permission</option>');
            $("#update-parentmenu").append('<option value="Select Parent Permission" selected>Select Parent Permission</option>');
            $.each(response, function (Index, value) {

                var PermissionButton = '<div class="d-flex align-items-center col-actions">' +

                    '<a class="mr-1 EditPermission" href="javascript:void(0);" id="EditPermission' + value.id + '" data-toggle="tooltip" data-placement="top" title="Edit Permission">' +
                    feather.icons['edit'].toSvg({ class: 'font-medium-2' }) +
                    '</a>' +
                    '<a class="mr-1 DeletePermission" href="javascript:void(0);" id="DeletePermission' + value.id + '" data-toggle="tooltip" data-placement="top" title="Delete Permission">' +
                    feather.icons['trash-2'].toSvg({ class: 'font-medium-2' }) +
                    '</a>'
                '</div>';

                var Ismenuitem = "";
                if (value.isMenu == true) {

                    Ismenuitem = "Yes";
                } else {
                    Ismenuitem = "No";
                }
                var parentpermissionTitle = "";
                var parentpermissionId = "";
                if (value.parent == null) {
                    parentpermissionTitle = "No Parent Permission";
                    parentpermissionId = null;
                } else
                {
                    parentpermissionTitle = value.parent[0].permissionTitle;
                    parentpermissionId = value.parent[0].id
                }
                $("#permissionList").append("<tr><td> " + value.permissionTitle + " </td><td id=" + parentpermissionId + "> " + parentpermissionTitle + " </td><td iconCode=" + value.iconCode + ">" +
                    feather.icons[value.iconCode].toSvg({ class: 'font-medium-5' }) + "</td><td>" + value.permissionUrl + "</td><td>" + Ismenuitem + "</td><td>" + PermissionButton + "</td></tr>");

                $("#parentmenu").append("<option value='" + value.id + "'>" + value.permissionTitle + " </option>");

                $("#update-parentmenu").append("<option value='" + value.id + "'>" + value.permissionTitle + " </option>");

            });
            Datatable_Net();
        });

    }
    var Id;
    $(document).on('click', '.EditPermission', function () {
        Id = $(this).attr('id');
        Id = Id.replace("EditPermission", "");

        updatePermission = $(this).closest('tr');
        var PermissionTitle = $(updatePermission).find('td').eq(0).html();
        var ParentPermission = $(updatePermission).find('td').eq(1).attr('id');
        var IconCode = $(updatePermission).find('td').eq(2).attr("iconCode");
        var PermissionUrl = $(updatePermission).find('td').eq(3).html();
        var IsMenuItem = $(updatePermission).find('td').eq(4).html();
        $("#update-permission-title").val(PermissionTitle);
        $("#update-permission-url").val(PermissionUrl);
        $("#update-icon-code").val(IconCode);

        if (ParentPermission != null) {


            $("#update-parentmenu option[value=" + ParentPermission + "]").prop("selected", true);
        }
        else {
            $("#update-parentmenu option[value='Select Parent Permission']").prop("selected", false);
        }

        if (IsMenuItem == "Yes") {

            $("#update-ismenuitem option[value='true']").prop("selected", false);
        } else if (IsMenuItem == "No") {
            $("#update-ismenuitem option[value='false']").prop("selected", false);
        }
        $('#editPermissionModal').modal('show');
    });

    $("#btnUpdate").click(function () {



        var PermissionTitle = $("#update-permission-title").val();
        var PermissionUrl = $("#update-permission-url").val();
        var PermissionCode = $("#update-icon-code").val();
        var PermissionIsmenu = $("#update-ismenuitem option:selected").val();

        var ParentMenuId = $("#update-parentmenu option:selected").val();
        if (ParentMenuId == "Select Parent Permission") {

            ParentMenuId = null;
        }

        if (PermissionTitle.length == 0 || PermissionUrl.length == 0 || PermissionCode.length == 0) {

            toastr['warning']('Please Fill the Form', 'Warning!', {
                closeButton: true,
                tapToDismiss: false
            });
            return;
        }
        $(this).hide();
        var jsonObject = { "id": Id, "permissionTitle": PermissionTitle, "permissionUrl": PermissionUrl, "iconCode": PermissionCode, "isMenu": PermissionIsmenu, "parentId": ParentMenuId };
        $.ajax({
            type: "POST",
            url: "/api/PermissionApi/UpdatePermissions",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                $("#btnUpdate").show();
                if (response.status == "Permission Updated Successfully") {

                    RefreshPermissions();

                    $('#editPermissionModal').modal('hide');

                    toastr['success']('Permission Updated Successfully', 'Success!', {
                        closeButton: true,
                        tapToDismiss: false
                    });



                } else {


                    toastr['error'](response.status, 'Error!', {
                        closeButton: true,
                        tapToDismiss: false
                    });
                }
            }
        });
    });

    $(document).on("click", ".DeletePermission", function () {
        var Permissionid = $(this).attr("id").replace("DeletePermission", "");
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
                    type: "Post",
                    url: "/api/PermissionApi/DeletePermission?PermissionId=" + Permissionid,
                    contentType: "application/json",
                    success: function (response) {
                        if (response.status == "Permission Deleted Successfully") {

                            datatable.row($("#DeletePermission" + response.id).closest('tr')).remove().draw();

                            Swal.fire({
                                icon: 'success',
                                title: 'Deleted!',
                                text: 'Permission Deleted Successfully',
                                customClass: {
                                    confirmButton: 'btn btn-success'
                                }
                            });
                        } else {

                            Swal.fire({
                                title: 'Cancelled',
                                text: response.status,
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
});