const Post = require('../models/post.model.js');

//create new post
exports.create = (req, res) => {
        const post = new Post({
            content: req.body.content
        });
        post.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};

//return all posts
exports.getAll = (req, res) => {
    Post.find()
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts"
        });
    });
};

//return a single post by id
exports.getOne = (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });            
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Some error occured while retrieving post"
        });
    });
};

//update a post by id
exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        content: req.body.content
    }, {new: true})
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post with id " + req.params.postId + " not found"
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post with id " + req.params.postId + " not found"
            });                
        }
        return res.status(500).send({
            message: "Error while updating"
        });
    });
};

//delete a post by id
exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post with id " + req.params.postId + " note found"
            });
        }
        res.send({message: "success"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Post with id " + req.params.postId + " not found"
            });                
        }
        return res.status(500).send({
            message: "Could not delete post"
        });
    });
};