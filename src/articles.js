var articleID = 2
const articleBank = {
        articles: [
            { id: 0, author: "Ben", text: 'lol here is some text', comments: [], cid: 0 },
            { id: 1, author: "Ben", text: 'another article', comments: [], cid: 0 },
            { id: 2, author: "Ben", text: 'what am i doing', comments: [], cid: 0 } 
        ]
    }

const getArticles = (req, res) => {
    console.log('Payload received:', req.body)
    if (req.params.id){
        // No id specified. Send all articles.
        res.send(articleBank)
    } else {
        const ids = req.params.id.split(',')
        const articles = []
        // Populate article list with articles that match on ids.
        ids.forEach(function(element) {
            articles.push( articleBank.find(({ id }) => {
                return id === element
            }))  
        }, this);

        res.send({ articles: articles })
    }
}

const updateArticles = (req, res) => {
    console.log('Payload received:', req.body)
    if (!req.user) {
        req.user = 'Dummy'
    }
    const requestedArticle = req.params.id ? req.params.user : req.user
    const article = articleBank.find(({ id }) => {
        return id === requestedArticle
    })
    
    if (!article) {
        res.sendStatus(404)
        return
    }

    if (req.body.commentId){
        // Update or post comment.
        if (req.body.commentId >= 0) {
            if (article.comments) {
                const comment = article.comments.find(({ commentId }) => {
                    return commentId === req.body.commentId
                })
                comment.text = req.body.text
            } else{
                res.sendStatus(404)
                return
            }
        } else{
            if (article.comments) {
                article.comments.push({ commentId: article.cid++, author: req.user, text: req.body.text })
            } else{
                article.comments = [{ commentId: article.cid++, author: req.user, text: req.body.text }]
            }
        }
    } else {
        // Update article.
        article.text = req.body.text
    }
    res.send({ article })
}

const postArticle = (req, res) => {
    console.log('Payload received:', req.body)
    if (!req.user) {
        req.user = 'Dummy'
    }
    // TODO: Image upload?
     const newArticle = { id: ++articleID, author: req.user, text: req.body.text}
     articleBank.articles.push(newArticle)
     res.send(newArticle)
}


module.exports = (app) => {
    app.get('/articles/:id*?', getArticles)
    app.put('/articles/:id', updateArticles)
    app.post('/article', postArticles)
}