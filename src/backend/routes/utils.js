export const paramById = (router, clazz, property) => {
    router.param(property, (req, res, next, value) => {
        clazz.findById(value)
            .then(someObj => {
                if (!someObj) {
                    throw new Error(`Couldn't find ${property}: ${value}`)
                }
                req[property] = someObj
                next()
            })
            .catch(next)
    })
}

export const extendTask = task => {
    return task.populate('tasks project parent contributors comments').execPopulate()
        .then(populated => {
            const extended = populated.toObject()
            extended.allowedCategories = populated.allowedCategories
            extended.categoryDetail = populated.categoryDetail
            return extended
        })
}
