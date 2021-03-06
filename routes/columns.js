const express = require('express');
const router = express.Router();

let columns = [
  {
    name: "To Do",
    id: "000000",
    items: [
      {
        date: "20 November 2018",
        day: 20,
        id: "47fcb2",
        rawDate: "2018-11-20T10:19:17.824Z",
        text: "Buy some veggies for dinner",
        time: "18:19",
        title: "Buy some veggies"
      },
      {
        date: "19 November 2018",
        day: 19,
        id: "40fcb2",
        rawDate: "2018-11-19T10:19:17.824Z",
        text: "Repair bike",
        time: "18:19",
        title: "Repair bike, fix gears"
      }
    ]
  },
  {
    name: "Done",
    id: "000001",
    items: [
      {
        date: "15 November 2018",
        day: 15,
        id: "49fcb2",
        isDone: true,
        rawDate: "2018-11-15T10:19:17.824Z",
        text: "watch come animations",
        time: "18:19",
        title: "Watch Brickleberry"
      }
    ]
  }
];

// http://localhost:5000/api/columns (GET)
router.get('/', async (req, res) => {
  res.status(200).json(columns);
})

router.get('/items', async (req, res) => {
  const items = columns.reduce((acc, next) => acc.concat(next.items), []);

  res.status(200).json(items);
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
        
  try {
    const currentColumn = columns.find(({ id }) => id === srcColId);
    const destColumn = columns.find(({ id }) => id === destColId);
    const item = currentColumn.items.find(({ id }) => id == itemId);
    item.isDone = true;
    currentColumn.items = currentColumn.items.filter(({ id }) => id !== itemId);
    destColumn.items.push(item);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
  res.status(200).json(columns);
});

router.post('/:columnId', (req, res) => {
  if (req.body.text.length > 240) {
    res.status(500).json({
      message: 'Maximum text size exceeded'
    });
  } else {
    try {
      console.log(req.body);
      const postData = {
        id: req.body.id,
        title: req.body.title,
        text: req.body.text,
        day: req.body.day,
        date: req.body.date,
        time: req.body.time,
        rawDate: req.body.rawDate
      }
      columns.find(({ id }) => id === req.params.columnId).items.push(postData);
    } catch(err) {
      console.log('ERROR OCURRED!');
      res.sendStatus(500);
    }
    res.sendStatus(200);
  }
});

// http://localhost:5000/api/columns (DELETE)
// remove column
router.delete('/:columnId', async (req, res) => {
  if (['000000', '000001'].includes(req.params.columnId)) {
    res.status(403).json({
      error: true,
      message: 'Cannot delete basic column'
    });
  } else {
    try {
      columns = columns.filter(({ id }) => id !== req.params.columnId);
    }
    catch(err) {
      console.log('ERROR OCURRED!');
      res.sendStatus(500);
    }
    
    res.status(200).json({
      message: 'Column was removed!'
    });
  }
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

  try {
    column.items = column.items.map(item => {
      if (item.id === data.id) {
        return data;
      } else {
        return item;
      }
    })
  } catch(e) {
    res.status(500).json({ message: e.message });
  }

  res.status(200).json({
    message: 'Updated!'
  })
})


module.exports = router;