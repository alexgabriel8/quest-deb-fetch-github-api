import { user } from "./objects/user.js";
import { userRepositories } from "./objects/repositories.js"

const profileContainer = document.querySelector('.profile')
function renderUser() {
    profileContainer.innerHTML = `
    <img src="${user.avatar}" class="profile-picture" alt="Foto de perfil" />

    <div class="data">
        <a href="${user.link}"><h2 class="profile-name">${user.name}</h2></a>
        <p class="bio">${user.bio}</p>
        <p>Seguidores: <strong>${user.followers}</strong> Seguindo: <strong>${user.following}</strong></p>
    </div>`
}

const eventsContainer = document.querySelector('.events')
function renderEvents() {
    if (user.events.length === 0) {
        eventsContainer.innerHTML = `<h2 class="title">Eventos</h2>
        <p>Usuário não possui eventos.</p>` 
    } else {
        let eventList = ''
        user.events.forEach(event => {
            eventList += `<li><a href="${event.link}" class="event"><strong>${event.name}</strong></a> - ${event.description}</li>`
        })
    
        eventsContainer.innerHTML = `<h2 class="title">Eventos</h2>
        <ul>${eventList}</ul>` 
    }
}


const repositoriesContainer = document.querySelector('#repositories')
function renderRepositories() {
    if (userRepositories.repositories.length === 0) {
        repositoriesContainer.innerHTML = `<h2 class="title">Repositórios</h2>
        <p>Usuário não possui repositórios.</p>`
    } else {
        let repos = ''
        userRepositories.repositories.forEach(repo => {
            repos += `<a href="${repo.link}">${repo.name}
            <li>
            <br>
            <div class="repo-info forks"><i class="fa-solid fa-code-fork"></i>${repo.forks}</div>
            <div class="repo-info stars"><i class="fa-sharp fa-solid fa-star"></i>${repo.stars}</div>
            <div class="repo-info watchers"><i class="fa-solid fa-eye"></i>${repo.watchers}</div>
            <br>
            <div class="repo-info language"><i class="fa-solid fa-code"></i>${repo.language}</div>
            </li></a>`
        })
    
        repositoriesContainer.innerHTML = `<h2 class="title">Repositórios</h2>
        <ul class="repository-list">${repos}</ul>`
    }
}

export { renderUser, renderEvents, renderRepositories }