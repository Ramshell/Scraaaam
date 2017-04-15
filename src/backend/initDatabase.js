import Contributor from "./models/Contributor"
import Project from "./models/Project"
import ProjectService from "./services/project.service"

const contributorJoinProjectByIndex = (contributorIndex, projectIndex) => {
    return ProjectService.addContributor(projects[projectIndex], contributors[contributorIndex])
        .then(updated => {
            projects[projectIndex] = updated.project
            contributors[contributorIndex] = updated.contributor
            return Promise.resolve('Success!')
        })
}

let contributors = [
    {name: "Nicolas"},
    {name: "Emanuel"}
]

let projects = [
    {title: "Scraaaam", description: "Scraaaam-ception!"},
    {title: "FixJS", description: "Porque JS tambien necesita fix. Y monadas. Y amor, mucho amor."}
]

const initDatabase = () => {
    console.log('Initializing database...')
    Promise.all([
        Contributor.create(contributors),
        Project.create(projects)
    ]).then(created => {
        contributors = created[0]
        projects = created[1]
    }).then(_ => contributorJoinProjectByIndex(0, 0))
        .then(_ => contributorJoinProjectByIndex(1, 0))
        .then(_ => console.log('Done!'))
}

export default initDatabase