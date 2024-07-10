import db from "../connect/db.js";
import {validationUser,validationSignInUser} from "../hooks/validationUser.js";
import { generateAccessToken } from "../hooks/generateToken.js";

export const signIn = (req, res, next) => {
    const { error} = validationSignInUser(req.body);

    if(error && error!= undefined) return res.status(404).json({message : error.details[0].message})
    
    const values = [req.body.username,req.body.password]

    const q = "SELECT * FROM users WHERE username = ? AND password = ?"

    db.query(q,[values[0], values[1]],(err,result)=>{
        if(err) {
            const err = new Error({message: "Error"})
            err.status = 404
            return next(err)
        }
        

        const token = generateAccessToken(result[0].username)
        res.json({token, message : 'User authenticated successfully'})
    })

}

export const signUp = (req, res,next) => {
    const {error} = validationUser(req.body)

    if(error && error != undefined) return res.status(404).json({message : error.details[0].message})

    const values = [
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.role,
    ]

    db.query("SELECT * FROM users WHERE username = ?",[values[0]],(err,result)=>{
        if(result.length > 0) return res.status(404).json({message : 'User already exists'})

        const q = "INSERT INTO users (`username`, `password`, `email`, `role`) VALUES (?)"

        db.query(q,[values],(err,result)=>{
            if(err) {
                const err = new Error({message: "Error"})
                err.status = 404
                return next(err)
            }

            res.json({...result, message : 'User created successfully'})
        })
    }) 
}

export const getAllUsers = (req, res, next) => {
    db.query("SELECT * FROM users",(err,result)=>{
        if(err) {
            const err = new Error({message: "Error"})
            err.status = 404
            return next(err)
        }
    
        res.json(result)
    })
}