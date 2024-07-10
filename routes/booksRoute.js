import express from 'express';
import {addBook,allBooks,singleBook,deleteBook,updateBook,searchBooks} from '../controllers/booksController.js'
import accessToken from '../middleware/accessToken.js';

const router = express.Router()

router.route('/').get(accessToken,allBooks).post(addBook)
router.route('/:id').get(accessToken,singleBook).delete(accessToken,deleteBook).put(accessToken,updateBook)
router.route('/search/:search').get(accessToken,searchBooks)

export default router;

