

var home= (req,res)=>{
    console.log(req.cookies);
    res.cookie('security','505Biatch')
    return res.render('home',{title : 'home Page'})
}

module.exports = home