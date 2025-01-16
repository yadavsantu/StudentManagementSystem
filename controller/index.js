exports.getAbout = (req, res) => {
   res.render("about", {meroName: "suman"})
}

exports.getHome = (req, res) => {
   res.render("home", {meroName: "rita"})
}

exports.postData = (req, res) => {
    console.log(req.body);
    res.send("Data received")
}
