console.log('Client Side Javascript Loaded up')

const weatherForm = document.querySelector('form')
const searchParam = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault()
    fetch('http://localhost:3000/weather?address='+searchParam.value).then((response)=>{response.json().then((data)=>{
        messageOne.textContent= data.forecast
        messageTwo.textContent = data.location
        messageThree.textContent = data.address
        // console.log(data.forecast)
        // console.log(data.location)
        // console.log(data.address)
})})   
})