//helper function
function accountExist(email) {
    //fetch userDetails from local storage
    let USERDATA = JSON.parse(localStorage.getItem("USERDATA"));

    return USERDATA !== null && USERDATA[email] ? true : null;
}

function validateComapnayName(name) {
    //fetch userDetails from local storage
    let USERDATA = JSON.parse(localStorage.getItem("USERDATA"));

    if (USERDATA !== null) {
        for (let email in USERDATA) {
            if (USERDATA[email].name === name) {
                return true; // Company name already exists
            } else {
                return null;
            }
        }
    }
}

function signUP(e) {
    e.preventDefault();

    let signUpData = document.forms["signUpData"];
    const companyName = document.getElementById("name")
    const companyEmail = document.getElementById("email")
    const registerButton = document.getElementById("register-button")

    //getting the data through the formdata
    let data = new FormData(signUpData);

    let userinput = {
        name: data.get("name"),
        email: data.get("email")
        // age: data.get("userAge"),
        // password: data.get("password"),
    }

    //Validate empty company name field
    if (companyName.value === "") {
        throwEmptyFieldError("name", "1", companyEmail, "1.25rem", "0.1rem");
        return
    }
    //Validate empty company name field
    if (companyEmail.value === "") {
        throwEmptyFieldError("email", "2", registerButton, "2.25rem", "1.1rem");
        return
    }

    if (validateComapnayName(data.get("name")) === true) {
        console.log("name exist");
        alert("Company name already exist, Choose Another Name");
        return;
    }

    //checking if account exist
    if (accountExist(data.get("email")) === true) {
        alert("account already exist")
        companyName.value = ""
        companyEmail.value = ""
        // window.location.href = "login.html"
    } else {

        let storedUserData = JSON.parse(localStorage.getItem("USERDATA")) || {};

        storedUserData[data.get("email")] = userinput;

        // Store the updated userData object back in localStorage
        localStorage.setItem("USERDATA", JSON.stringify(storedUserData));

        //redirecting to login page
        alert("Account created successfully ");
        companyName.value = ""
        companyEmail.value = ""
        window.location.href = "./signup-admin.html";

    }



    //validating the password
    // if(data.get("password").length < 8 ){
    //     alert("Password must be at least 8 characters");
    //     return;
    // }else if(data.get("password") != data.get("confirm-password")){
    //     alert("Password does not match");
    //     return;
    // }


}



function login(e) {
    e.preventDefault();

    console.log("login");

    let loginData = document.forms["loginData"];

    //getting the data through the formdata
    let data = new FormData(loginData);

    let usermail = data.get("email")
    const companyEmail = document.getElementById("email")
    const adminPassword = document.getElementById("password")
    const rememberMe = document.getElementById("remember-me")
    const passwordDiv = document.getElementById("password-div")

    //Validate empty company name field
    if (companyEmail.value === "") {
        throwEmptyFieldError("email", "1", passwordDiv, "1.5rem", "0.3rem");
        return
    }
    //Validate empty company name field
    if (adminPassword.value === "") {
        throwEmptyFieldError("password", "2", rememberMe, "0.5rem", "-0.05rem");
        return
    }

    if (accountExist(usermail) === null) {
        alert("Account does not exist, Kindly Register!!");
        return;
    }

    //fetch userDetails from local storage
    let USERDATA = JSON.parse(localStorage.getItem("USERDATA"));
    //validating the password
    //USERDATA[usermail]["password"]

    if (data.get("password") != 12345) {
        alert("Incorrect email or password, try again!!");
        return;
    }

    //redirecting to dashboard
    alert("Login successful");

    //storing it in local storage
    localStorage.setItem("usermail", usermail);
    window.location.href = "agentDashboard.html";
}



function dashboard() {
    //fetch usermail from local storage
    let usermail = localStorage.getItem("usermail")

    //fetch userDetails from local storage
    let USERDATA = JSON.parse(localStorage.getItem("USERDATA"));

    //get the table
    let dashboardContent = document.getElementById("dashboardContent")

    //creating a row in the table
    let row = dashboardContent.insertRow();

    let data = Object.values(USERDATA[usermail]);

    //iterate through each of the form element
    data.forEach((datium, index) => {
        let newCell = row.insertCell()

        newCell.textContent = datium;

        // Check if this is the last element
        //masked the password from being displayed
        if (index === data.length - 1) {
            maskedPassword = datium.replace(/./g, '*');
            newCell.textContent = maskedPassword;
        }
    })

}

function recover(e) {
    e.preventDefault();

    let recoverData = document.forms["recoverData"];

    //getting the data through the formdata
    let formdata = new FormData(recoverData);

    let usermail = formdata.get("email")

    if (accountExist(usermail) === null) {
        alert("Account does not exist, verify and try again!!");
        return;
    }

    //fetch userDetails from local storage
    let USERDATA = JSON.parse(localStorage.getItem("USERDATA"));

    let storageData = USERDATA[usermail];

    if (formdata.get("email") == storageData['email'] && formdata.get("userName") == storageData['name'] && formdata.get("userAge") == storageData['age']) {
        alert(storageData['password']);
        //mailUser(usermail, storageData['password'])
        recoverData.reset();
    } else {
        alert("Invalid Details, verify and try again.")
    }
}




function mailUser(rec, sub) {
    const recipient = rec;
    const subject = sub;
    const body = 'Your password on Student Page website ';

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
}


//When the input fields are empty
function throwEmptyFieldError(inputId, textId, label, labelValue1, labelValue2) {
    const inputField = document.getElementById(`${inputId}`)
    const emptyField = document.getElementById(`empty-field-error-text-${textId}`)
    inputField.style.borderColor = '#DB1818'
    emptyField.style.display = 'block'
    label.style.marginTop = labelValue2
    // emptyField.style.visibility = 'visible'
    const displayInterval = setInterval(() => {
        emptyField.style.display = 'none'
        label.style.marginTop = labelValue1
        // emptyField.style.visibility = 'hidden'
        inputField.style.borderColor = '#A9A9A9'
        clearInterval(displayInterval)
    }, 1000);

}


function showPassword(inputId, toggleId) {
    const inputField = document.getElementById(`${inputId}`)
    const eyeToggle = document.getElementById(`eye-toggle-${toggleId}`)
    const eyeToggleSlash = document.getElementById(`eye-toggle-slash-${toggleId}`)
    console.log(inputField);
    if (inputField.type === 'password') {
        inputField.type = 'text'
        eyeToggle.style.display = 'none'
        eyeToggleSlash.style.display = 'inline-block';
    }
}

function hidePassword(inputId, toggleId) {
    const inputField = document.getElementById(`${inputId}`)
    const eyeToggle = document.getElementById(`eye-toggle-${toggleId}`)
    const eyeToggleSlash = document.getElementById(`eye-toggle-slash-${toggleId}`)
    if (inputField.type === 'text') {
        inputField.type = 'password'
        eyeToggle.style.display = 'inline-block'
        eyeToggleSlash.style.display = 'none'
    }

}







