const express = require('express');
const router = express.Router();
const Notes = require('../model/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');



//ROUTE 1: getting all notes of the USER WHO IS LOGGED IN    localhost/api/notes/all-notes,    AUTHENTICATION/LOGIN REQUIRED
router.get('/all-notes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ userId: req.user.id });
        res.send(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


//ROUTE 2: creating a new note of the USER WHO IS LOGGED IN    localhost/api/notes/new-note,    AUTHENTICATION/LOGIN REQUIRED
router.post('/new-note', fetchUser, [
    body('title').not().isEmpty().withMessage('Title is required').isLength({ min: 3 }),
    body('description').not().isEmpty().withMessage('Description is required, MIN: 5').isLength({ min: 5 })
], async (req, res) => {

    try {
        /**
        before creating the notes instance to be send in database,
        the following lines will check the errors produced in the 3rd argument of the post method
        if the array is not empty i.e there are erros then it will send the errors in the response
        and nothing will be send to database
        */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        

        const note = await new Notes({
            title: req.body.title, 
            description: req.body.description, 
            tag: req.body.tag, 
            user: req.user.id       //this is coming from middleware which gives userdetails using authtoken
        });

        res.send('Note saved successfully');
        await note.save().catch(err => console.log(err));
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error has occured");
    }
});




//ROUTE 3: upadating an existing note of the USER WHO IS LOGGED IN    localhost/api/notes/update-note,    AUTHENTICATION/LOGIN REQUIRED
router.put('/update-note/:id', fetchUser, async (req, res) => {

    try {
        const {title, description, tag} = req.body;
        const note = await Notes.findById(req.params.id);


        /** 
         The following lines mean that if title is give in body to be updated then it will update the title using the instance note.title
         similarly for others
         */
        const newNote = {};
        if(title) {newNote.title = title;}
        if(description) {newNote.description = description;}
        if(tag) {newNote.tag = tag;}




        //if the the request note doens't exist then it will send an error
        if(!note) {
            return res.status(404).send('Note not found');
        }

        //if the user who is logged in is not the owner of the note then it will send an error
        //fetchUser will give the userID of the logged in user and the userID of the note is stored in the userId field of the note
        //we will compare these both

        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Unauthorized');
        }


        //if the user who is logged in is the owner of the note then it will update the note
        await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})     


        res.send('Note updated successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error has occured");
    }
});


//ROUTE 4: deleting an existing note of the USER WHO IS LOGGED IN    localhost/api/notes/delete-note,    AUTHENTICATION/LOGIN REQUIRED
router.delete('/delete-note/:id', fetchUser, async (req, res) => {

    try {
        const note = await Notes.findById(req.params.id);


        //if the the request note doens't exist then it will send an error
        if(!note) {
            return res.status(404).send('Note not found');
        }

        //if the user who is logged in is not the owner of the note then it will send an error
        //fetchUser will give the userID of the logged in user and the userID of the note is stored in the userId field of the note
        //we will compare these both

        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Unauthorized');
        }


        //if the user who is logged in is the owner of the note then it will update the note
        await Notes.findByIdAndDelete(req.params.id); 
        res.send('Note deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error has occured");
    }
});

module.exports = router;