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


//ROUTE 2: creating a new user of the USER WHO IS LOGGED IN    localhost/api/notes/new-note,    AUTHENTICATION/LOGIN REQUIRED
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

        const { title, description, tag } = req.body;

        const note = await new Notes({
            title, description, tag, user: req.user.id
        });


        note.save().catch(err => console.log(err));
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error has occured");
    }
});


module.exports = router;