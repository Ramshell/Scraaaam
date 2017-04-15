import Contributor from "./models/Contributor"
import Project from "./models/Project"
import ProjectService from "./services/project.service"

const initDatabase = () => {
    console.log('Initializing database...')

    let contributors = [
        {name: "Nicolas"},
        {name: "Emanuel"}
    ]
    Contributor.create(contributors)
        .then(saved => {
            contributors = saved
            let projects = [
                {title: "Scraaaam", description: "Scraaaam-ception!"},
                {title: "FixJS", description: "Porque JS tambien necesita fix. Y monadas. Y amor, mucho amor."}
            ]
            Project.create(projects)
                .then(saved => {
                    projects = saved
                    ProjectService.addContributor(projects[0], contributors[0])
                        .then(updated => {
                            projects[0] = updated.project
                            contributors[0] = updated.contributor
                            ProjectService.addContributor(projects[0], contributors[1])
                                .then(updated => {
                                    projects[0] = updated.project
                                    contributors[1] = updated.contributor
                                    console.log('Done!')
                                })
                        })
                })
        })
}

export default initDatabase