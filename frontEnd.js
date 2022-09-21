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

postData(destination)
})

const postData = async (data) => {
   const request = await fetch('http://localhost:3000', {
        method:"POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    })
    const response = await request.json()
    console.log(response)
}

let destinations;

const getData = async () => {
const response = await fetch("http://localhost:3000")
const data = await response.json()
destinations = await data
console.log(destinations)

populatePage()
}


const populatePage = () => {
    if(!destinations) {
        console.log("empty")
        return 
    }
    destinations.forEach(destination => {
        const li = document.createElement("li")
        li.classList.add("list-item")
        li.innerHTML = `
        <a href='destination.html?${destination._id}'>
        <h1>${destination.title}</h1>
        <p><strong>description:</strong> ${destination.description}</p>
        <p> <strong>from:</strong> ${destination.dateFrom}</p>
        <p> <strong>to:</strong> ${destination.dateTo}</p>
        <p><strong>country:</strong> ${destination.country}</p>
        <p> <strong>location:</strong>${destination.location}</p>
        </a>
        `
        document.querySelector('.list').append(li)
    })
}


getData()



