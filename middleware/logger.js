import * as colors from 'colors';

const logger = ((req,res,next)=>{

    const methodColors = {
        GET : 'green',
        POST :'blue',
        PUT : 'yellow',
        DELETE : 'red',
        PATCH : 'orange',
    }
    const method = methodColors[req.method] || white
    console.log(`${req.method} ${req.protocol}://${req.get('host')}:${req.originalUrl}`[method]);
    next()
})

export default logger;