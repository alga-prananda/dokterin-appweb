$(document).ready(function() {
    var loginForm = $("form.login.ui.small.form");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            $('#emptyLogin').modal('show');
            return;
        }

        if (userData.email.endsWith(`@admin.com`)) {
            $('#adminUser').modal('show');
            return;
        }

        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function(data) {
            window.location.replace(data);
        }).catch(function(err) {
            $('#incorrectLogin').modal('show');
            console.log(err);
        });
    }
});