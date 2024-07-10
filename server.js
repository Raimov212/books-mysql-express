import express from 'express';
import loggerHandler from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFoundHandler from './middleware/notFound.js'
import booksRoute from './routes/booksRoute.js'
import fileRoute from './routes/fileRoute.js' 
import usersRoute from './routes/usersRoute.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(loggerHandler)

app.use('/books',booksRoute);
app.use('/upload',fileRoute);
app.use('/auth',usersRoute)

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});