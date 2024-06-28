import db from "../connect/db.js";

export const allBooks = (req, res) => {
    if(!isNaN(req.query.limit) && (req.query.limit) > 0) {
        const limitQ = `SELECT * FROM books LIMIT ${req.query.limit}`
        db.query(limitQ, (err,data) => {
            if(err) res.json(err);
            res.send(data);
        })
    } else{
        const q = `SELECT * FROM books`
        db.query(q, (err,data) => {
            if(err) res.json(err);
            res.send(data);
        })
    }
}

export const searchBooks = (req,res,next)=>{
    console.log("req.",req.params.search);
    const searchQ = `SELECT * FROM books WHERE title LIKE '%${req.params.search}%'`
    db.query(searchQ, (err,data) => {
        if(err) res.json(err);
        res.send(data);
    })
}


export const addBook = (req, res,next) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    if(req.body.cover === "" ){
        const err = new Error("cover is required")
        err.status = 404
        return next(err)
    }

    if(typeof req.body.cover == "number"){
        const err = new Error("the cover value must be a string only")
        err.status = 404
        return next(err)
    }

    if(typeof req.body.title == "number"){
        const err = new Error("the title value must be a string only")
        err.status = 404
        return next(err)
    }

    if(req.body.title === ""){
        const err = new Error("title is required")
        err.status = 404
        return next(err)
    } 
    
    if(req.body.desc === ""){
        const err = new Error("description is required")
        err.status = 404
        return next(err)
    }

    if(typeof req.body.desc == "number"){
        const err = new Error("the description value must be a string only")
        err.status = 404
        return next(err)
    }


    db.query(q,[values], (err,data) => {
        if(err) {
            const err = new Error(err)
            err.status = 404
             return next(err)
        };
        res.send(data);
    })
}

export const singleBook = (req, res,next) => {
    const q = `SELECT * FROM books WHERE id = ${req.params.id}`
    db.query(q, (err,data) => {
        if(err) {
            const err = new Error("Couldn't find book")
            err.status = 404
           return next(err)
        };
        if(data.length == 0){
            const err = new Error("Invalid book")
            err.status = 404
            return next(err)
        }
        return res.send(data);
    })
} 

export const deleteBook = (req, res,next) => {
    const q = `DELETE FROM books WHERE id = ${req.params.id}`
    db.query(q, (err,data) => {
        if(err) {
            const err = new Error(err)
            err.status = 404
            return next(err)
        }else{
            return res.json("Book has been deleted successfully");
        }
        // if(data.length == 0){
        //     const err = new Error("Invalid book")
        //     err.status = 404
        //     return next(err)
        // }
    })
}

export const updateBook = (req, res, next) => {
    const iD = req.params.id

    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q,[...values,iD], (err,data) => {
        if(err) {
            res.json(err)
        }else{
            return res.status(200).json(data);
        };
        
    })
}

