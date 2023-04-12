import { getUserData } from "./services/fetch-user-data.js";
import { getUserRepositories } from "./services/fetch-user-repositories.js";
import { getUserEvents } from "./services/fetch-user-events.js";

const usernameInput = document.querySelector('#username-input')
const searchBtn = document.querySelector('#search-btn')
const loadingContainers = document.querySelectorAll('.loading-container')

function inputValidation(username) {
    if (username.length === 0) {
        window.alert('Digite um nome primeiro')
        return 'Does not exist'
    }

    if(username.match(/^ +/) === null) {
        return username
    } else if(username.match(/^ +/).index === 0) {
        username = username.replace(/^ +/, '')
        return username
    }
}

usernameInput.addEventListener('keyup', async function(event) {
    try {
        loadingContainers[0].classList.add('active')
        if(event.which === 13 || event.keyCode === 13) {
            let username = document.querySelector('#username-input').value
            if (await inputValidation(username) === 'Does not exist') return

            username = await inputValidation(username)
            await Promise.all([
                getUserData(username),
                getUserEvents(username),
                getUserRepositories(username)
            ])

        }
    } finally {
        loadingContainers[0].classList.remove('active')
    }
})

searchBtn.addEventListener('click', async function() {
    try {
        loadingContainers[0].classList.add('active')
        let username = document.querySelector('#username-input').value
        if (await inputValidation(username) === 'Does not exist') return
        
        username = await inputValidation(username)
        await Promise.all([
            getUserData(username),
            getUserEvents(username),
            getUserRepositories(username)
        ])
    } finally {
        loadingContainers[0].classList.remove('active')
    }
})