const express = require('express')
const router = express.Router()
// const Post = require('../models/Post')

let columns = [];

// http://localhost:5000/api/columns (GET)
router.get('/', async (req, res) => {
  res.status(200).json(columns);
})

// http://localhost:5000/api/columns (POST)
router.post('/', async (req, res) => {
  const columnData = {
    name: req.body.name,
    id: req.body.id,
    items: req.body.items
  }
  columns.push(columnData);

  res.sendStatus(200);

});

router.post('/:columnId', (req, res) => {
  try {
    console.log(req.body);
    const postData = {
      id: req.body.id,
      title: req.body.title,
      text: req.body.text,
      date: req.body.date,
      time: req.body.time
    }
    columns.find(({ id }) => id === req.params.columnId).items.push(postData);
  } catch(err) {
    console.log('ERROR OCURRED!');
    res.sendStatus(403);
  }

  res.sendStatus(200);
});


// http://localhost:5000/api/columns (DELETE)
router.delete('/:columnId', async (req, res) => {
  //console.log(req.params)
  columns = columns.filter(({ id }) => id !== req.params.columnId);
  
  res.status(200).json({
    message: 'Удалено'
  })
})

router.delete('/deleteItem/:columnId/:postId', async (req, res) => {
  //columns = columns.items.filter(({ id }) => id !== req.params.postId);
  console.log(req.params);

  res.status(200).json({
    message: 'Удалено'
  })
})


module.exports = router