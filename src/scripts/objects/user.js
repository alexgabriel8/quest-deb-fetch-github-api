let user = {
    avatar: '',
    name: '',
    bio: '',
    events: [],
    followers: '',
    following: '',
    setInfo(gitHubUser) {
        if (gitHubUser.avatar_url === undefined || gitHubUser.avatar_url === null) {
            this.avatar = 'Usuário sem imagem de perfil.'
        } else {
            this.avatar = gitHubUser.avatar_url
        }
        
        if (gitHubUser.name === undefined || gitHubUser.name === null) {
            this.name = 'Usuário sem nome cadastrado.'
        } else {
            this.name = gitHubUser.name
        }

        if (gitHubUser.bio === undefined || gitHubUser.bio ===  null) {
            this.bio = 'Usuário sem bio cadastrada.'
        } else {
            this.bio = gitHubUser.bio
        }

        this.link = gitHubUser.url
        this.link = this.link.replace(/api\./, '')
        this.link = this.link.replace(/\/users/, '')

        this.followers = gitHubUser.followers
        this.following = gitHubUser.following
    },
    setEvents(recievedEvents) {
        this.events = []
        recievedEvents.forEach(event => {
            let eventItem = {}
            eventItem.name = event.repo.name
            eventItem.link = event.repo.url
            eventItem.link = eventItem.link.replace(/api\./, '')
            eventItem.link = eventItem.link.replace(/\/repos/, '')

            if (event.payload.commits === undefined) {
                eventItem.description = 'Sem descrição do evento.'
            } else {
                eventItem.description = event.payload.commits[0].message
            }
            this.events.push(eventItem)
        })
    }
}

export { user }