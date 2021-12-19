$(document).ready(function() {
    var loginForm = $("form.login.ui.small.form");
    var emailInput = $("input#admin-email-input");
    var passwordInput = $("input#admin-password-input");

    $("#adminLoginBtn").on("click", function(event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            $('#emptyLoginAdmin').modal('show');
            return;
        }

        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function loginUser(email, password) {
        $.post("/api/admin-login", {
            email: email,
            password: password
        }).then(function(data) {
            window.location.replace(data);
        }).catch(function(err) {
            $('#incorrectLoginAdmin').modal('show');
            // console.log(err);
        });
    }

});