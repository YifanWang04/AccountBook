const mongoose = require(`mongoose`)

let AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: Date,
  type: {
    type: Number,
    default: -1
  },
  account: {
    type: Number,
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'  
  }
})

let AccountModel = mongoose.model(`accounts`, AccountSchema)

// Expose model object
module.exports = AccountModel