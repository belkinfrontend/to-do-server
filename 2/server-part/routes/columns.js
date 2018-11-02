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
      title: req.body.title,
      text: req.body.text,
      data: req.body.data,
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
  console.log(req.params)
  columns = columns.filter(({ id }) => id !== req.params.columnId);
  //columns.remove({id: columnId})
  
  res.status(200).json({
    message: 'Уда'
  })
})
//   // ===============
  
// //   // http://localhost:5000/api/post (POST)
// // router.post('/columns/:columnId', async (req, res) => {
// //   const postData = {
// //     title: req.body.title,
// //     text: req.body.text
// //   }
// //   const columnId = req.params.columnId;
// //   /*
// //     - take column with id = columnId from DB
// //     - create new todo item
// //     - put new todo item into column
// //     - write column to DB
// //     - return in response this updated column
// //   */

// //   const post = new Post(postData)

// //   await post.save()
// //   res.status(201).json(post)
// // })


//   // ===============

//   const post = new Post(postData)

//   await post.save()
//   res.status(201).json(post)
// })

// // http://localhost:5000/api/post/23 (DELETE)
// router.delete('/:postId', async (req, res) => {
//   await Post.remove({_id: req.params.postId})
//   res.status(200).json({
//     message: 'Удалено'
//   })
// })


module.exports = router