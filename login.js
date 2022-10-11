const form = document.querySelector("#buttonShit")

const loginShit = async (data) => {
    const request = await fetch('http://localhost:3000/auth/login', {
         method:"GET",
         headers: {"Content-type": "application/json"}
     })
     const response = await request.json()
     window.location.reload();
     console.log(response)
 }

 const signupShit = async (data) => {
    const request = await fetch('http://localhost:3000/auth/signup', {
         method:"POST",
         headers: {"Content-type": "application/json"},
         body: JSON.stringify(data)
     })
     const response = await request.json()
     window.location.reload();
     console.log(response)
 }

 form.addEventListener("submit", (e) => {
    e.preventDefault();
 })