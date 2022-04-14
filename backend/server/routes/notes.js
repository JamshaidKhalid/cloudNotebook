const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body } = require('express-validator');
const allNotes = require('../controller/allNotes');
const newNote = require('../controller/newNote');
const updateNote = require('../controller/updateNote');
const deleteNote = require('../controller/deleteNote');


//ROUTE 1: getting all notes of the USER WHO IS LOGGED IN    localhost/api/notes/all-notes,    AUTHENTICATION/LOGIN REQUIRED
router.get('/all-notes', fetchUser, allNotes.all);


//ROUTE 2: creating a new note of the USER WHO IS LOGGED IN    localhost/api/notes/new-note,    AUTHENTICATION/LOGIN REQUIRED
router.post('/new-note', fetchUser, [
    body('title').not().isEmpty().withMessage('Title is required').isLength({ min: 3 }),
    body('description').not().isEmpty().withMessage('Description is required, MIN: 5').isLength({ min: 5 })
], newNote.new);




//ROUTE 3: upadating an existing note of the USER WHO IS LOGGED IN    localhost/api/notes/update-note,    AUTHENTICATION/LOGIN REQUIRED
router.put('/update-note/:id', fetchUser, updateNote.update);


//ROUTE 4: deleting an existing note of the USER WHO IS LOGGED IN    localhost/api/notes/delete-note,    AUTHENTICATION/LOGIN REQUIRED
router.delete('/delete-note/:id', fetchUser, deleteNote.delete);

module.exports = router;