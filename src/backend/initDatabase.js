import Contributor from "./models/Contributor"
import Project from "./models/Project"

const create = (model, objs) => Promise.all(objs.map(data => model.fullCreate(data)))

const contributorJoinProjectByIndex = (contributorIndex, projectIndex) =>
    Project.addContributor(projects[projectIndex], contributors[contributorIndex])
        .then(updated => {
            projects[projectIndex] = updated.project
            contributors[contributorIndex] = updated.contributor
            return Promise.resolve()
        })


let contributors = [
    {name: "Nicolas"},
    {name: "Emanuel"}
]

let projects = [
    {
        title: "Scraaaam",
        description: "Scraaaam-ception!",
        tasks: [
            {
                category: 'Milestone', title: 'Backend', description: 'Hacer el backend',
                tasks: [
                    {
                        category: 'Epic',
                        title: 'Tasks recursivas',
                        description: 'Funcion para la creacion de subtareas recursivamente',
                        tasks: [
                            {
                                category: 'Normal',
                                title: 'Test',
                                description: 'Funciona!'
                            }
                        ]
                    }
                ]
            },
            {
                category: 'Milestone', title: 'Frontend', description: 'Hacer el frontend'
            },
            {
                category: 'Epic', title: 'Model', description: 'Pensar el modelo'
            },
            {
                category: 'Spike',
                title: 'Angular 2',
                description: 'Investigar como no querer pegarse un tiro con Angular 2'
            }
        ]
    },
    {
        title: "FixJS",
        description: "Porque JS tambien necesita fix. Y monadas. Y amor, mucho amor."
    }
]

const initDatabase = () => {
    console.log('Initializing database...')
    return Promise.all([
        create(Contributor, contributors),
        create(Project, projects)
    ]).then(([savedContributors, savedProjects]) => {
        contributors = savedContributors
        projects = savedProjects
    }).then(_ => contributorJoinProjectByIndex(0, 0))
        .then(_ => contributorJoinProjectByIndex(1, 0))
        .then(_ => contributorJoinProjectByIndex(0, 1))
        .then(_ => console.log('Done!'))
}

function main() {
    const mongoose = require('mongoose')

    mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/projects')
        .then(mongoose.connection.dropDatabase())
        .then(_ => initDatabase())
        .then(_ => process.exit())
}

main()
