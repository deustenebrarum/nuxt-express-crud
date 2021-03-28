module.exports = (app) => {
    const notes = require('../controllers/post.controller.js');

    app.post('/api/posts', notes.create);

    app.get('/api/posts', notes.getAll);

    app.get('/api/posts/:postId', notes.getOne);

    app.put('/api/posts/:postId', notes.update);

    app.delete('/api/posts/:postId', notes.delete);
}