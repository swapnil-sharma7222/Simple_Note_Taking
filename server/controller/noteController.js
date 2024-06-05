const Notes = require('../models/noteModel');
const getAllNotes = async (req, res) => {

  try {
    const notes = await Notes.find();
    // Send tasks as a response
    return res.status(200).json({ notes });
  }
  catch (error) {
    console.error('Error ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
};
const createNote = async (req, res) => {
  try {
    const { text, color } = req.body;
    console.log(req.body);

    if (!text) {
      res.status(400).json({
        message: "Note is required"
      });
      return
    }
    const newNote = await Notes.create({ 
      note:text,
      color: color
    });
    return res.status(201).json({
      data: newNote,
    })
  } catch (error) {
    console.error('Error creating Note:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
};

const updateNote = async (req, res) => {
  try {
    const currentNote = await Notes.findOneAndUpdate(
      { _id: req.params.id }, {
      $set: {
        note: req.body.text,
        color: req.body.color
      },
    }
    )
    return res.status(200).json({ message: `update title` })
  } catch (error) {
    console.log('Error in updating note:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Notes.findOneAndDelete({ _id: req.params.id })
    return res
      .status(200)
      .json({ message: `deleted note` })
  } catch (error) {
    console.error('Error in deleting note:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}


module.exports = { getAllNotes,createNote,updateNote,deleteNote };