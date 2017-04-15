let service = {}

service.addContributor = (aProject, aContributor) => {
    let contributor = aContributor
    contributor.projects.push(aProject)
    return contributor.save()
        .then(savedContributor => {
            contributor = savedContributor
            aProject.contributors.push(contributor)
            return aProject.save()
        })
        .then(savedProject => {
            return {project: savedProject, contributor: contributor}
        })
}

export default service