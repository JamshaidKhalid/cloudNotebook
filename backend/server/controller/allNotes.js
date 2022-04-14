const Notes = require('../model/Notes');

exports.all = async (req, res) => {
    try {
        const notes = await Notes.find({ userId: req.user.id });
        res.send(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}