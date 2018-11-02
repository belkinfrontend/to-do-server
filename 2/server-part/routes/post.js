const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// http://localhost:5000/api/post (GET)
router.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json(posts)
})

// http://localhost:5000/api/post (POST)
router.post('/', async (req, res) => {
  const postData = {
    title: req.body.title,
    text: req.body.text
  }


  // ===============
  
//   // http://localhost:5000/api/post (POST)
// router.post('/columns/:columnId', async (req, res) => {
//   const postData = {
//     title: req.body.title,
//     text: req.body.text
//   }
//   const columnId = req.params.columnId;
//   /*
//     - take column with id = columnId from DB
//     - create new todo item
//     - put new todo item into column
//     - write column to DB
//     - return in response this updated column
//   */


  // ===============

  const post = new Post(postData)

  await post.save()
  res.status(201).json(post)
})

// http://localhost:5000/api/post/23 (DELETE)
router.delete('/:columnId', async (req, res) => {
  await postData.remove({_id: req.params.columnId})
  res.status(200).json({
    message: 'Удалено'
  })
})


module.exports = router