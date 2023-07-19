import { user } from "../objects/user.js"
import { renderUser } from "../render-on-screen.js";

const loadingContainers = document.querySelectorAll('.loading-container')

async function userExists(username){
    const serializedResponse = await (await fetch(`https://api.github.com/users/${username}`)).json()
    if(serializedResponse.message === 'Not Found') {
        window.alert(`O usuário ${username} não existe no GitHub!`)
        return false
    }
}

async function getUserData(username) {
    try {
        loadingContainers[1].classList.add('active')
        if (await userExists(username) === false) return
        const serializedResponse = await (await fetch(`https://api.github.com/users/${username}`)).json()
        user.setInfo(serializedResponse)
        await renderUser()
    } catch(err) {
        console.error(err)
    } finally {
        loadingContainers[1].classList.remove('active')
    }
}

export { getUserData }