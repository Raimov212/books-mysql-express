import jwt from 'jsonwebtoken'

const accessToken = (req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) return res.status(401).json({message : 'Token not provided'});

    jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.status(403).json({message : 'Invalid token'});
        req.user = decoded;
        next();
    })
}

export default accessToken;