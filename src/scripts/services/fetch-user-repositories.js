import { Octokit, App } from "https://cdn.skypack.dev/octokit";
import { userRepositories } from "../objects/repositories.js"
import { renderRepositories } from "../render-on-screen.js"

const loadingContainers = document.querySelectorAll('.loading-container')

async function getUserRepositories(username){
    try {
        loadingContainers[3].classList.add('active')
        const octokit = await new Octokit({ })
        const response = await octokit.request(`GET /users/${username}/repos`, {
            per_page: 10
        });
        await userRepositories.setRepositories(response)
        renderRepositories()
    } catch(err) {
        console.error(err)
    } finally {
        loadingContainers[3].classList.remove('active')
    }
}




export { getUserRepositories }