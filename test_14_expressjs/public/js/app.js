
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msgOne.textContent = 'loading...'
    msgTwo.textContent = ''
    if( searchInput ) {
        fetch('/weather?address='+searchInput.value).then((res)=>{
            res.json().then((data)=>{
                if(data.errorMsg) {
                    msgOne.innerHTML = data.errorMsg
                } else {
                    msgOne.innerHTML = data.location.location.country
                    msgTwo.innerHTML = data.location.current.weather_descriptions[0]
                }
            })
        })
    }
})




