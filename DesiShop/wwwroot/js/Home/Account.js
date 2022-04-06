$(document).ready(function () {


    $("#btnlogin").click(function () {




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

                    $("#btnlogin").removeAttr("attr");
                   alert(response.message)
                }
            }
        });
    });


});