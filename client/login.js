const loginBtn = document.querySelector("#loginButton");
const signupBtn = document.querySelector("#signupButton");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const someform = document.querySelector("#someform");


const loginShit = async (data) => {
    const request = await fetch('http://localhost:3000/auth/login', {
         method:"GET",
         headers: {"Content-type": "application/json"}
     })
     const response = await request.json()
     console.log(response);
 }


 const signupShit = async (data) => {
    const request = await fetch('http://localhost:3000/auth/signup', {
         method:"POST",
         headers: {"Content-type": "application/json"},
         body: JSON.stringify(data)
     })
     const response = await request.json();
     console.log(response);
 }

 signupBtn.addEventListener("click", () => {
    const credentials = {
        userEmail: username.value,
        userPassword: password.value
    }

    signupShit(credentials);
 })

 loginBtn.addEventListener("click", () => {
    const credentials = {
        userEmail: username.value,
        userPassword: password.value
    }

    loginShit(credentials);
 })

 someform.addEventListener("submit", (e) => {
    e.preventDefault();
 })