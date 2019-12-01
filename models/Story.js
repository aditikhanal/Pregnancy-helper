var mongoose = require('mongoose')

const StorySchema = mongoose.Schema({
    username: String,
    useremail:String,
   
    // condition: String,
    description: String,
    imagename: String,
    createdDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Story', StorySchema)
