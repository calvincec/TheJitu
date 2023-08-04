const {Router} = require('express');
const { newNote, getallnotes, getoneNote, updateNote, deleteNote } = require('../Controllers/notebookController');
// const { createProject, getProjects, getOneProject, updateProject, deleteProject } = require('../Controllers/projectsController');

const notingrouter = Router();

notingrouter.post('/', newNote);
notingrouter.get('/', getallnotes);
notingrouter.get('/:ID', getoneNote);
notingrouter.put('/:ID', updateNote);
notingrouter.delete('/:ID', deleteNote)
;

module.exports = {
    notingrouter 
}
