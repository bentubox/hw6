const profile = { 
            username: 'Dummy',
            following: [
               'Jimmy',
               'Timmy',
               'Kimmy'
            ]
        }

const following = [ 
    profile
]

const getFollowing = (req, res) => {
    if (!req.user) {
        req.user = 'Dummy'
    }

    const requestedUser = req.params.user ? req.params.user : req.user
    const user = following.find(({ username }) => {
        return username === requestedUser
    })

    res.send({ username: user.username, following: user.following })
}

const addFollowing = (req, res) => {
    profile.following.push(req.params.user)
    res.send({ username: profile.username, following: profile.following })
}

const removeFollowing = (req, res) => {
    profile.following.filter((element) => {
        return element != req.params.user
    })
}

module.exports = (app) => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', addFollowing)
    app.delete('/following/:user', removeFollowing)
}