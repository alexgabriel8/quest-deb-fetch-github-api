import { Octokit, App } from "https://cdn.skypack.dev/octokit";
import { user } from "../objects/user.js"
import { renderUser } from "../render-on-screen.js";

const loadingContainers = document.querySelectorAll('.loading-container')

async function userExists(username){
    const response = await (await fetch(`https://api.github.com/users/${username}`)).json()
    if(response.message === 'Not Found') {
        window.alert(`O usuário ${username} não existe no GitHub!`)
        return false
    }
}

async function getUserData(username) {
    try {
        loadingContainers[1].classList.add('active')
        if (await userExists(username) === false) return
        const octokit = await new Octokit({ })
        const response = await octokit.request(`GET /users/${username}`, {})
        user.setInfo(response.data)
        await renderUser()
    } catch(err) {
        console.error(err)
    } finally {
        loadingContainers[1].classList.remove('active')
    }
}

export { getUserData }