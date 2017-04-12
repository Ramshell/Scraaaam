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