const jwt = require("jsonwebtoken")
const agentModel = require("../Models/agent.model")

module.exports.checkAgent = (req, res, next) => {
    const token = req.cookies.jwt 
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.agent = null 
                res.cookie("jwt", "", {maxAge: 1})
                next()
            } else {
                let agent = await agentModel.findByIdAndUpdate(decodedToken)
                res.locals.agent = agent
                next()
            }
        })
    } else {
        res.locals.agent = null 
        next()
    }
}

module.exports.requireAuth = (req, next) => {
    const token = req.cookies.jwt 
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err)
            } else {
                console.log(decodedToken.id)
                next()
            }
        })
    } else {
        console.log("Pas de token")
    }
}