const Notes = require('../model/Notes');
const { validationResult } = require('express-validator');

exports.new = async (req, res) => {

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
}