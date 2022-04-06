$.get("/api/User/GetUserData", function (response) {

    $.each(response, function (index, value) {
        $("#username").html(value.name);
    });

});