const db = require('../../model/index')
const USER = db.User

exports.getRegister = (req, res) => {
    res.render('auth/registration')
}

exports.postRegister = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.send("Please enter username and password")
    }
    const data = await USER.create({ ...req.body })
    res.send("Working post request")
    // res.redirect('/login')
}

exports.getLogin = (req, res) => {
    res.render('auth/login')
}

exports.postLogin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.send("Please enter email and password")
    }
    const data = await USER.findOne(
        {
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        }
    )

    if (data) {
        res.send("Login Success")
    } else {
        res.send("Login Failed")
    }


}