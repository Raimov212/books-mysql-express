import db from "../connect/db.js";
import fs from 'fs'

export const uploadImg = (req, res,next) => {
    const file = req.file;
    const fileName = file.originalname;
    const filePath = file.path

    const q = "INSERT INTO files (filename, filepath) VALUES (?,?)"
    const values = [fileName, filePath]
    db.query(q, values,(err, data) => {
        if (err) {
            const err= new Error('Error uploading file')
            err.status = 404
            return next(err)
        } else {
            res.json({message : 'File uploaded successfully'});
        }
    })
}


export const deleteFile = (req,res,next) => {
    const values = [req.params.id]

    const selectQuery = "SELECT filepath FROM files WHERE id = ?"

    db.query(selectQuery, [values], (err, data) => {
        if(err) {
            const err = new Error('Error retrieving file path')
            err.status = 404
            return next(err)
        }

        if(data.length === 0){
            const err = new Error("Invalid file ID")
            err.status = 404
            return next(err)
        }

        const filepath = data[0].filepath

        const q = "DELETE FROM files WHERE id = ?"
        db.query(q, [values], (err, data) => {
            if(err) {
                const err = new Error('Error deleting image record from database')
                err.status = 404
                return next(err)
            }else{
            fs.unlink(filepath,(err_fs)=>{
                if(err_fs){
                    const err = new Error('Error deleting file')
                    err.status = 404
                    return next(err)
                }else{
                    return res.json({message : "File has been deleted successfully"});
                }
             })  
            }
        })
    })
}