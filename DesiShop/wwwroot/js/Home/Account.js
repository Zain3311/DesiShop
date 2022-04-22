$(document).ready(function () {


    $("#btnLogin").click(function () {

        var Email = $("#login-email").val();
        var Password = $("#login-password").val();
        if (Email.length == 0 || Password.length == 0) {

            alert('Please Fill the Form');
            return;
        }
        $(this).attr("disabled", true);
        var jsonObject = { "email": Email, "password": Password };
        $.ajax({
            type: "POST",
            url: "/api/User/UserLogin",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                if (response.message == "Login Successfully") {

                    Cookies.set('AccessToken', response.data.token, { expires: 7 });
                    window.location.href = "/Home/Dashboard";

                } else {

                    $("#btnlogin").removeAttr("disabled");
                   alert(response.message)
                }
            }
        });
    });

    $("#btnRegister").click(function () {

        var Name = $("#register-name").val();
        var Email = $("#register-email").val();
        var DOB = $("#register-dob").val();
        var Password = $("#register-password").val();
        if (Name.length == 0 || DOB.length == 0 || Email.length == 0 || Password.length == 0) {

            alert('Please Fill the Form');
            return;
        }
        $(this).attr("disabled", true);
        var jsonObject = { "name": Name, "email": Email, "dob": DOB, "password": Password };
        $.ajax({
            type: "POST",
            url: "/api/User/Signup",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                if (response.message == "Signup Successfully") {
                    $("#register-name").val('');
                    $("#register-email").val('');
                    $("#register-dob").val('');
                    $("#register-password").val('');
                    alert(response.message)
                    $("#btnRegister").removeAttr("disabled");

                } else {

                    $("#btnRegister").removeAttr("disabled");
                    $("#register-password").val('');
                   alert(response.message)
                }
            }
        });
    });


});