//helper function
function accountExist(email) {  
    //fetch userDetails from local storage
    let USERDATA = JSON.parse(localStorage.getItem("USERDATA"));
    
        return USERDATA !== null && USERDATA[email] ?  true :  null;
    }

function validateComapnayName(name){
    //fetch userDetails from local storage
    let USERDATA = JSON.parse(localStorage.getItem("USERDATA"));
   
    if (USERDATA !== null) {
        for (let email in USERDATA) {
            if (USERDATA[email].name === name) {
                return true; // Company name already exists
            }else{
                return null;
            }
        }
    }
}
    
function signUP(e){
      e.preventDefault();
    
      let signUpData = document.forms["signUpData"];
         
        //getting the data through the formdata
        let data = new FormData(signUpData);
    
        let userinput = {
            name: data.get("name"),
            email: data.get("email")
            // age: data.get("userAge"),
            // password: data.get("password"),
        }

        if (validateComapnayName(data.get("name")) === true){
            console.log("name exist");
            alert("Company name already exist, Choose Another Name");
            return;
        }
    
        //checking if account exist
        if(accountExist(data.get("email")) === true){
            alert("account already exist")
            window.location.href = "login.html"
        }else{

            let storedUserData = JSON.parse(localStorage.getItem("USERDATA")) || {};

            storedUserData[data.get("email")] = userinput;

            // Store the updated userData object back in localStorage
            localStorage.setItem("USERDATA", JSON.stringify(storedUserData));
        
            //redirecting to login page
            alert("Account created successfully ");
            window.location.href = "login.html";

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
    
        if(accountExist(usermail) === null){
            alert("Account does not exist, Kindly Register!!");
            return;
        }
    
        //fetch userDetails from local storage
        let USERDATA = JSON.parse(localStorage.getItem("USERDATA"));
        //validating the password
        //USERDATA[usermail]["password"]

        if(data.get("password")!= 12345){
            alert("Incorrect email or password, try again!!");
            return;
        }
    
        //redirecting to dashboard
        alert("Login successful");
    
        //storing it in local storage
        localStorage.setItem("usermail",  usermail);
        window.location.href = "agentDashboard.html";  
    }
    
    
    
    function dashboard(){
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
    
    function recover(e){
        e.preventDefault();
    
        let recoverData = document.forms["recoverData"];
         
        //getting the data through the formdata
        let formdata = new FormData(recoverData);
    
        let usermail = formdata.get("email")
    
        if(accountExist(usermail) === null){
            alert("Account does not exist, verify and try again!!");
            return;
        }
    
        //fetch userDetails from local storage
        let USERDATA = JSON.parse(localStorage.getItem("USERDATA"));
    
        let storageData = USERDATA[usermail];
    
        if(formdata.get("email") == storageData['email'] && formdata.get("userName") == storageData['name'] && formdata.get("userAge") == storageData['age']){
            alert(storageData['password']);
            //mailUser(usermail, storageData['password'])
            recoverData.reset();
        } else{
            alert("Invalid Details, verify and try again.")
        }
    }
    
    
    
    
    function mailUser(rec, sub ){
    const recipient = rec;
    const subject = sub;
    const body = 'Your password on Student Page website ';
    
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    }
    
    
    

    
    
    
    
    
    
    
    
    
    