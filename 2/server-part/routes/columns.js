const express = require('express')
const router = express.Router()
// const Post = require('../models/Post')

let columns = [
  {
    name: "To Do",
    id: "000000",
    items: []
    
  },
  {
    name: "Done",
    id: "000001",
    items: []    
  }
];

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

router.post('/toggle', (req, res) => {
  const {
    srcColId,
    itemId,
    destColId
  } = req.body;

  console.log(`moving item ${itemId} from col ${srcColId} to ${destColId}`);
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
// remove column

router.delete('/:columnId', async (req, res) => {
  //console.log(req.params)
  columns = columns.filter(({ id }) => id !== req.params.columnId);
  
  res.status(200).json({
    message: 'Column was removed!'
  })
})

// remove post from column

router.delete('/:columnId/posts/:postId', async (req, res) => {
  const column = columns.find(({ id }) => id === req.params.columnId);
  column.items = column.items.filter(({ id }) => id !== req.params.postId);
  console.log(req.params);

  res.status(200).json({
    message: 'Post was removed!'
  })
})

// update post (PUT)
router.put('/:columnId/posts/:postId', async (req, res) => {
  console.log(req.params);
  const data = req.body;
  const column = columns
    .find((columnData) => columnData.id === req.params.columnId);

  column.items = column.items.map(item => {
    if (item.id === data.id) {
      return data;
    } else {
      return item;
    }
  })

  res.status(200).json({
    message: 'Updated!'
  })
})


module.exports = router