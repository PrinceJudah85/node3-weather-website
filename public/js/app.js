console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')// selecting the form element in the HTML
const search = document.querySelector('input') // selecting the input element in the HTML
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault() //preventing the refresh behavior of the submit button by passing the preventDefault() method from the event object 
  
  const location = search.value; //extracting the value provided by the user from the input element in the HTML 

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error
    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    }
  })
})
})