const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);