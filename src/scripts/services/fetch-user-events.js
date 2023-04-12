import { Octokit, App } from "https://cdn.skypack.dev/octokit";
import { user } from "../objects/user.js"
import { renderEvents } from "../render-on-screen.js";

const loadingContainers = document.querySelectorAll('.loading-container')

async function getUserEvents(username) {
    try {
        loadingContainers[2].classList.add('active')
        const octokit = await new Octokit({ })
        const response = await octokit.request(`GET /users/${username}/events`, {})
        let events = []
        events = await response.data.filter((event) => event.type === 'CreateEvent' || event.type === 'PushEvent')
        while (events.length > 10) {
            events.pop()
        }
        await user.setEvents(events)
        await renderEvents()
    } catch(err) {
        console.error(err)
    } finally {
        loadingContainers[2].classList.remove('active')
    }
}

export { getUserEvents }