let userRepositories = {
    repositories: [],
    async setRepositories(recievedRepos) {
        this.repositories = []
        await recievedRepos.data.forEach((repository) => {
            const repo = {}
            repo.name = repository.name
            repo.forks = repository.forks_count
            repo.stars = repository.stargazers_count
            repo.watchers = repository.watchers_count
            if (repository.language === undefined || repository.language === null) {
                repo.language = 'Não informado'
            } else {
                repo.language = repository.language
            }
            repo.link = repository.html_url
            userRepositories.repositories.push(repo)
        })
    }
}

export { userRepositories }