const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    todo:{
        type:String,
        required:[true, "todo is required"]
    },
    isDone:{
        type:Boolean,
        default:false
    } 
},{
    timestamps:true
})

module.exports = mongoose.model("Todo", todoSchema)