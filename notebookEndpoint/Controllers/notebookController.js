const {v4} = require('uuid');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

const notes = [];

class Notes{
    constructor(ID, title, content, createdAt){
        this.ID = ID
        this.title = title,
        this.content = content,
        this.createdAt = createdAt
    }
}

const newNote = async(req, res)=>{
    try {
       const ID = v4() 

       const {title, content, createdAt} = req.body

        

        const pool = await mssql.connect(sqlConfig)
       
            const result = await pool.request()
            .input('ID', mssql.VarChar, ID)
            .input('title', mssql.VarChar, title)
            .input('content', mssql.VarChar, content)
            .input('createdAt', mssql.Date, createdAt)
            .execute('addNote')
            
            // console.log(result);
             if(result.rowsAffected[0]==1){  
             return res.status(200).json({
                 message: "Note added Succesfully",
             })}
             else{
                 return res.json({message: "Creation failed"})
             }
     
         
        
    } catch (error) {
        // createProjectsTable()
        return res.json({error})
    }   
}

const  getallnotes = async(req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))

        const allnotes = (await pool.request().execute('getAllnotes')).recordset

        return res.json({notes: allnotes})
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

const getoneNote = async(req, res)=>{
    try {
        const {ID} = req.params

        const pool = await mssql.connect(sqlConfig)

        const note = (await pool.request().input('ID', ID).execute('getanote')).recordset

        return res.status(200).json({
            note: note
        })
    } catch (error) {
        return res.json({error:error})
    }
}



const updateNote = async(req, res)=>{
    try {
        const {ID} = req.params

        const {title, content, createdAt} = req.body

        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
        .input('ID', mssql.VarChar, ID)
        .input('title', mssql.VarChar, title)
        .input('content', mssql.VarChar, content)
        .input('createdAt', mssql.Date, createdAt)
        .execute('updateNote'));

        console.log(result);

        if(result.rowsAffected == 1){
            res.status(200).json({
                message: 'note updated successfully'
            })
        }else{
            res.status(400).json({
                message: 'The note is not found'
            })
        }
    } catch (error) {
        return res.json({Error: error})
    }
}

const deleteNote = async(req, res)=>{
    try {
        const ID = req.params.ID

        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('ID', ID)
        .execute('deletenote')
      
        if(result.rowsAffected == 1){
            res.json({
                    message: 'note deleted successfully'
            })
        }else{
            res.json({
                message: 'note not found'
        })
        }
    } catch (error) {
        return res.json({Error: error})
    }
}



module.exports = {
    newNote,
    getallnotes,
    getoneNote,
    updateNote,
    deleteNote

}