$(document).ready(function () {

    Preloader("show");

    $.get("/api/User/GetUserData", function (response) {

        $.each(response, function (index, value) {

            $("#username").html(value.name);
            $("#userrole").html(value.roleName);
            $("#userimage").attr("src", value.imageUrl);

            GetMenuItem(value.roleId);
           
        });

    });
    function GetMenuItem(RoleId) {
        $.get("/api/Permission/GetPermissionsForRole/" + RoleId, function (response) {

            $.each(response, function (Index, value) {
                var code;
                if (value.subPermission.length == 0) {
                    code = "<li class='nav-item'> <a class='d-flex align-items-center' href=" + value.permissionUrl + ">" + feather.icons[value.iconCode].toSvg({ class: 'font-medium-2' }) + "<span class='menu-title text-truncate'>" + value.permissionTitle + "</span></a></li>";
                } else
                {
                    code = "<li class='nav-item has-sub'> <a class='d-flex align-items-center' href=" + value.permissionUrl + ">" + feather.icons[value.iconCode].toSvg({ class: 'font-medium-2' }) + "<span class='menu-title text-truncate'>" + value.permissionTitle + "</span></a><ul class='menu-content'>";
                    $.each(value.subPermission, function (Index, val) {

                        code += "<li class='nav-item'> <a class='d-flex align-items-center' href=" + val.permissionUrl + ">" + feather.icons[val.iconCode].toSvg({ class: 'font-small-4' }) + "<span class='menu-title text-truncate'>" + val.permissionTitle + "</span></a></li>";
                    });
                    code += "</ul></li>";
                }
                $("#main-menu-navigation").append(code);
            });
            addActiveClass();
            Preloader("hide");
        });
    }

   

});