const express = require('express');
const router = express.Router();

const { getAllNotes,createNote,deleteNote,updateNote}=require('../controller/noteController');

router.route('/notes').get(getAllNotes);
router.route('/create').post(createNote);
router.route('/update/:id').put(updateNote);
router.route('/delete/:id').delete(deleteNote);

module.exports=router;