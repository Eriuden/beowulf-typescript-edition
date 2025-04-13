const agentModel = require ("../Models/agent.model")
const jwt = require("jsonwebtoken")
const {signInErrors, signUpErrors} = require("../utils/error.utils")
const bcrypt = require("bcrypt")

const maxAge = 3*24*60*60*3600

const createToken = (id) => {
    return jwt.sign({id}), process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    }
}

module.exports.signUp = async(req, res) => {
    const {name, email, password} = req.body

    try {
        const agent = await agentModel.create({name, email, password})
        res.status(201).json({agent: agent._id})
    } catch (error) {
        const errors = signUpErrors(error)
        res.status(200).send({errors})
    }
}

module.exports.signIn = async(req, res) => {
    const {email, password} = req.body

    try {
        const agent = await agentModel.login(email, password)
        const token = createToken(agent._id)
        res.cookie("jwt", token, {httpOnly: true, maxAge})
        res.status(200).json({agent: agent._id})
    } catch (error) {
        const errors = signInErrors(error)
        res.status(200).send({errors})
    }
}

module.exports.logout = (res) => {
    res.cookie("jwt", {maxAge : 1})
    res.redirect("/")
}

module.exports.resetPasswordLink = async (req,res) => {
    const {email} = req.body.email

    if (!email){
        res.status(401).json({status: 401, message: "Veuillez entrer votre email"})
    }

    try {
        const agentfind = await agentModel.findOne({email:email})

        const token = jwt.sign({_id:agentfind._id}, process.env.TOKEN_SECRET, {
            expiresIn:"900s"
        })

        const setAgentToken = await agentModel.findByIdAndUpdate({_id:agentfind._id},
            {verifytoken:token}, {new:true})

            if (setAgentToken) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Lien pour modifier votre mot de passe",
                    text: `Ce lien n'est valide que durant 15 minutes
                    ${process.env.CLIENT_URL}/forgotpassword/${agentfind.id}/
                    ${setAgentToken.verifytoken}`
                }

                transport.sendMail(mailOptions, (error,info) => {
                    if(error){
                        console.log("error", error)
                        res.status(401).json({status:401, 
                        message: "Le mail n'a pas été envoyé"})
                    } else {
                        console.log("Email envoyé", info.response)
                        res.status(201).json({status:201, 
                        message: "Email envoyé avec succés"})
                    }
                })
            }
    } catch (error) {
        res.status(401).json({status:401, message:"Agent introuvable"})
    }
}

module.exports.forgotPasswordChecking = async (req,res) => {
    const {id,token} = req.params

    try {
        const validAgent = await agentModel.findOne({_id:id, verifytoken:token})
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)

        if(validAgent && verifyToken._id){
            res.status(201).json({status:201, validAgent})
        } else {
            res.status(401).json({status:401, message:"Agent introuvable"})
        }
    } catch (error) {
        res.status(401).json({status:401, error})
    }
}

module.exports.updatePassword = async(req,res) => {
    const {id,token} = req.params
    const {password} = req.body.password 

    try {
        const validAgent= await agentModel.findOne({_id:id, verifytoken:token})
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        
        if(validAgent && verifyToken._id){
            const newPassword = await bcrypt.hash(password,15)
            const setNewPassword = await agentModel.findByIdAndUpdate({_id:id},
            {password:newPassword})

            setNewPassword.save()
            res.status(201).json({status:201, setNewPassword})
        } else {
            res.status(401).json({status:401, message:"Agent introuvable"})
        }
    } catch (error) {
        res.status(401).json({status:401, error})
    }
}