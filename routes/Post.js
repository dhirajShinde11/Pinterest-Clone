const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    imagetext: {
        type: String,
        
    },
    image:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes: {
        type: Array,
        default: []  
    },
    createdAt: {
        type: Date,
        default: Date.now  
    },
    
  
});

module.exports = mongoose.model('Post', postSchema);

// Export Post model

