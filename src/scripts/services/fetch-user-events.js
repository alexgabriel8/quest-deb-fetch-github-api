import { user } from "../objects/user.js"
import { renderEvents } from "../render-on-screen.js";

const loadingContainers = document.querySelectorAll('.loading-container')

async function getUserEvents(username) {
    try {
        loadingContainers[2].classList.add('active')
        const serializedResponse = await (await fetch(`https://api.github.com/users/${username}/events`)).json()
        let events = []
        events = await serializedResponse.filter((event) => event.type === 'CreateEvent' || event.type === 'PushEvent').slice(0, 10)
        await user.setEvents(events)
        await renderEvents()
    } catch(err) {
        console.error(err)
    } finally {
        loadingContainers[2].classList.remove('active')
    }
}

export { getUserEvents }