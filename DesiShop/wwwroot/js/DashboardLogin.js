$(document).ready(function () {


    $("#btnlogin").click(function () {


        

        var Email = $("#login-email").val();
        var Password = $("#login-password").val();
        if (Email.length == 0 || Password.length == 0) {

            toastr['warning']('Please Fill the Form', 'Warning!', {
                closeButton: true,
                tapToDismiss: false
            });
            return;
        }
        $(this).hide();
        var jsonObject = { "email": Email, "password": Password };
        $.ajax({
            type: "POST",
            url: "/api/User/UserLogin",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                if (response.message == "Login Successfully") {
                   

                    toastr['success']('Login Successfully', 'Success!',{
                        closeButton: true,
                        tapToDismiss: false
                    });

                    Cookies.set('AccessToken', response.data.token, { expires: 7 });
                        window.location.href = "/Dashboard";
                    
                } else {
                    $("#btnlogin").show();
                    toastr['error'](response.message, 'Error!', {
                        closeButton: true,
                        tapToDismiss: false
                    });
                }
            }
        });
    });


});