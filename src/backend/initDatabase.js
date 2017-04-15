import Contributor from "./models/Contributor"
import Project from "./models/Project"

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
                    projects[0].contributors.push(...contributors)
                    projects[0].save()
                        .then(saved => {
                            projects[0] = saved
                            Promise.all(contributors.map(contributor => {
                                contributor.projects.push(projects[0])
                                return contributor.save()
                            })).then(saved => {
                                contributors = saved
                                console.log(contributors)
                                console.log(projects)
                                console.log('Done!')
                            })
                        })
                })
        })
}

export default initDatabase