const splitHref = window.location.href.split("?")
console.log(splitHref[1])

const form = document.querySelector("#form")
const title = document.querySelector("#title")
const country = document.querySelector("#country")
const place = document.querySelector("#place")
const dateFrom = document.querySelector("#date-from")
const dateTo = document.querySelector("#date-to")
const description = document.querySelector("#description")
const submit = document.querySelector('#submit')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const destination = {
        title: title.value,
        country:country.value,
        location:place.value,
        dateFrom: dateFrom.value,
        dateTo:dateTo.value,
        description:description.value
    }
    
    putData(destination)
    
    document.querySelectorAll('input').forEach(input => {
        input.id === "submit" 
        ? input.value ="Submit"
        : input.value = ""
    })
})

const putData = async (data) => {
    const request = await fetch(`http://localhost:3000/destination/${splitHref[1]}`,{
        method:"PUT",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(data)
    })
    const response = await request.json()
    window.location.reload();

}

let currentDestination ;
const getData  = async () => {
    const request = await fetch(`http://localhost:3000/destination/${splitHref[1]}`)
    const response = await request.json()
    currentDestination = await response[0]
    console.log(currentDestination)
    document.querySelector("#title").value = currentDestination.title;
    document.querySelector("#country").value = currentDestination.country;
    document.querySelector("#place").value = currentDestination.location;
    document.querySelector("#date-from").value = currentDestination.dateFrom;
    document.querySelector("#date-to").value = currentDestination.dateTo;
    document.querySelector("#description").value = currentDestination.description;
    showData()
}

const showData = () => {
    if (!currentDestination) return;
    console.log("no")
    const li = document.createElement("li")
    li.classList.add("list-item")
    li.innerHTML = `
    <a href='destination.html?${currentDestination._id}'>
    <h1>${currentDestination.title}</h1>
    <p><strong>description:</strong> ${currentDestination.description}</p>
    <p> <strong>from:</strong> ${currentDestination.dateFrom}</p>
    <p> <strong>to:</strong> ${currentDestination.dateTo}</p>
    <p><strong>country:</strong> ${currentDestination.country}</p>
    <p> <strong>location:</strong>${currentDestination.location}</p>
    </a>
    `
    document.querySelector('.list').append(li)
}


getData()


