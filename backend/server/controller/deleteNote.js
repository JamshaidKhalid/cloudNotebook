const Notes = require('../model/Notes');


exports.delete = async (req, res) => {

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


        //if the user who is logged in is the owner of the note then it will delete the note
        await Notes.findByIdAndDelete(req.params.id); 
        res.send('Note deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error has occured");
    }
}