import jwt from 'jsonwebtoken'

export const generateAccessToken = (username)=>{
    return jwt.sign({username : username}, process.env.TOKEN_SECRET, {expiresIn: 1800})
}