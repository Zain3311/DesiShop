$.get("/api/User/GetUserData", function (response) {

    $.each(response, function (index, value) {
        $("#username").html(value.name);
        $("#txtName").val(value.name);
        $("#txtEmail").val(value.email);
    });

});

$("#btnSaveChange").click(function () {
    let name = $("#txtName").val();
    let email = $("#txtEmail").val();
    let newPassword = $("#newPassword").val();
    let confirmPassword = $("#confirmPassword").val();

    if (name.length == 0 || email.length == 0 || newPassword.length == 0 || confirmPassword.length == 0) {
        alert('Please Fill the Form');
        return;
    }
    else if (newPassword !== confirmPassword) {
        alert("Passwords are not matched");
        return;
    }
    var jsonObject = { "name": name, "email": email, "password": newPassword };

    Preloader("show");
    $.ajax({
        type: "POST",
        url: "/api/User/UpdateUserAccount",
        data: JSON.stringify(jsonObject),
        contentType: 'application/json',
        success: function (response) {
            Preloader("hide");
            if (response.message == "User Update Successfully") {

                alert("Account Updated");

            } else {

                alert(response.message)
            }
        }
    });
})