import { getUserData } from "./services/fetch-user-data.js";
import { getUserRepositories } from "./services/fetch-user-repositories.js";
import { getUserEvents } from "./services/fetch-user-events.js";

const usernameInput = document.querySelector('#username-input')
const searchBtn = document.querySelector('#search-btn')
const loadingContainers = document.querySelectorAll('.loading-container')
let lastSearchedUser = null

// add variável currentUser que será usada pra testar se o usuário digitado é o mesmo que está sendo exibido na tela, se for, não execute a pesquisa.
// Colocar um switch para o resultado da função inputValidation para deixar o código mais limpo

function inputValidation(rawUsername) {
    if (rawUsername.length === 0) {
        window.alert('Digite um nome primeiro')
        return
    }

    if (rawUsername === lastSearchedUser) {
        const userWantsToSearch = window.confirm('O usuário digitado já está na tela. Deseja pesquisar mesmo assim?')
        if(userWantsToSearch === false) return
    }

    if(rawUsername.match(/^ +/) === null) {
        const username = rawUsername
        return username
    } else if(username.match(/^ +/).index === 0) {
        const username = rawUsername.replace(/^ +/, '')
        return username
    }
}

usernameInput.addEventListener('keyup', async function(event) {
    try {
        loadingContainers[0].classList.add('active')
        if(event.which === 13 || event.keyCode === 13) {
            let rawUsername = document.querySelector('#username-input').value

            const username = await inputValidation(rawUsername)
            if (username === null || username === undefined ) return

            lastSearchedUser = username
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
        let rawUsername = document.querySelector('#username-input').value

        const username = await inputValidation(rawUsername)
        if (username === null || username === undefined ) return

        lastSearchedUser = username
        await Promise.all([
            getUserData(username),
            getUserEvents(username),
            getUserRepositories(username)
        ])
    } finally {
        loadingContainers[0].classList.remove('active')
    }
})