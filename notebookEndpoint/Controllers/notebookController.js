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
        const result = (await pool.request()
        .query(`INSERT INTO notesTable(ID, title, content, createdAt) VALUES(${ID}, ${title}, ${content}, ${createdAt})`)
        )

        res.json({
            message: "The new note is created succesfully",
            note: newnote
        })
    } catch (error) {
        return res.json({error})
    }
}

const  getallnotes = async(req, res)=>{
    try {
        res.json({notes: notes})
    
    } catch (error) {
        return res.json({error})
    }
}

const getoneNote = async(req, res)=>{
    try {
        const ID = req.params.ID

        console.log(ID);

        const note = notes.filter(el =>el.ID == ID)

        res.json({
            note
        })
    } catch (error) {
        return res.json({error})
    }
}



const updateNote = async(req, res)=>{
    try {
        const ID = req.params.ID

        const {title, content, createdAt} = req.body

        const notePosition = notes.findIndex(note => note.ID == ID)

        if (notePosition <0) {
            res.json('note not found')
        }
        else{
            notes[notePosition] = new Notes(ID, title, content, createdAt)
        }
        res.json({
            message: "Project updated successfully",
            note: notes[notePosition]
        })
    } catch (error) {
        return res.json({Error: error})
    }
}

const deleteNote = async(req, res)=>{
    try {
        const ID = req.params.ID

        let notePosition = notes.findIndex(note => note.ID==ID)

        if(notePosition< 0){
            res.json({message: 'note not found'})
        }
        else{
            notes.splice(notePosition, 1)
        }

        return res.json({
            message: 'deleted successfully'
        })
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