const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date().toDateString()
  },
  time: {
    type: Date,
    default: `${new Date().getHours()} hours  ${new Date().getMinutes()} minutes`
  }
})

module.exports = mongoose.model('posts', postSchema)