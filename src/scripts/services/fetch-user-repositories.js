
import { userRepositories } from "../objects/repositories.js"
import { renderRepositories } from "../render-on-screen.js"

const loadingContainers = document.querySelectorAll('.loading-container')

async function getUserRepositories(username){
    try {
        loadingContainers[3].classList.add('active')
        const serializedResponse = await (await fetch(`https://api.github.com/users/${username}/repos`)).json()
        await userRepositories.setRepositories(serializedResponse)
        renderRepositories()
    } catch(err) {
        console.error(err)
    } finally {
        loadingContainers[3].classList.remove('active')
    }
}




export { getUserRepositories }