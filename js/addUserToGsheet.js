/*************************************************
 * SUBMITTING VISITOR INFO DATA TO GOOGLE SHEET
 *************************************************/
document.getElementById('success_message').style.display = "none";

document.getElementById("send").addEventListener("click", returnSuccessMessage);

function returnSuccessMessage() {
    //loader animation
    document.getElementById('spinner').classList.add("loader");
    setTimeout(
        function(){document.getElementById('spinner').classList.remove("loader")}, 
        2000);
    
    //toggle success message
    var successMessage = document.getElementById('success_message');
    setTimeout(function(){ successMessage.style.display = "inline"}, 2010); 
    setTimeout(function(){fadeOut('success_message', 100)}, 3000); 
}

function fadeOut(id, speed) {
    var s = document.getElementById(id).style;
    s.opacity = 1;
    (function fade() {(s.opacity-=.1)<.1?s.display="none":setTimeout(fade,speed)})();
}
    
function postToGoogle() {
    //reference the form fields
    var usernameField = document.getElementById("username");
    var emailField = document.getElementById("email");    

    //get the form fields values and save them
    var username = usernameField.value;
    var email = emailField.value;
    
    validateFormFields(usernameField, emailField);

    var databaseFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdRe097z9lHxFEcCjsu67Ovl9hA4Bx8IVBNAoR8EWiuhOpANw/formResponse?";

    $.ajax({
        url: databaseFormUrl,
        data: {"entry.1641757221": username, "entry.214500059": email},
        type: "POST",
        dataType: "xml",
        // serialize your form's elements.
        data: $("#userDetailForm").serialize(), 
    });
    clearFormFields(usernameField, emailField);
    // avoid to execute the actual submit of the form.
    return false;

    /*
        This function validates the form fields before submission
    */
    function validateFormFields(nameField, emailField) {
        if(nameField == ""){
            alert('Please Fill In Your Name');
            nameField.focus();
            return false;
        }

        if(emailField == ""){
            alert('Please Fill In Your Email');
            emailField.focus();
            return false;
        } 
    }

    /*
        This function clears the form fields after submission
    */
    function clearFormFields(nameField, emailField) {
        nameField.value = "";
        emailField.value = "";   
    }
}

