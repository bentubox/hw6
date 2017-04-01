const following = [
    
]

const getFollowing = (req, res) => {

}

const addFollowing = (req, res) => {

}

const removeFollowing = (req, res) => {

}

module.exports = (app) => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', addFollowing)
    app.delete('/following/:user', removeFollowing)
}