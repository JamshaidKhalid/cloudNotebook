const Notes = require('../model/Notes');

exports.update = async (req, res) => {

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
}