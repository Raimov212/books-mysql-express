import express from 'express';
import {addBook,allBooks,singleBook,deleteBook,updateBook,searchBooks} from '../controllers/booksController.js'

const router = express.Router()

router.route('/').get(allBooks).post(addBook)
router.route('/:id').get(singleBook).delete(deleteBook).put(updateBook)
router.route('/search/:search').get(searchBooks)

export default router;

