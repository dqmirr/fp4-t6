const {User,Photo,SocialMedia,Comment} = require('../models')

function userAuthorization(req,res,next){
    const {id} = req.params
    const data = req.UserData
    User.findByPk(id)
    .then((result) => {
        if(result == null || result =="" || result == undefined){
            return res.status(404).json({
                error : "User Not Found",
                Message: `User with id "${id}" not found!`,
            })
        }
        if (result.id !== data.id){
            return res.status(403).json({
                error: "Authorization Error",
                Message: `Can't Access id "${id}"! It's not your Id!`,
            })
        }else{
            next()
        }
    }).catch((err) => {
        return res.status(500).json(err)        
    });
}

function PhotoAuthorization(req,res,next){
    const {photoId} = req.params
    const data = req.UserData
    Photo.findByPk(photoId)
    .then((result) => {
        if(result == null || result =="" || result == undefined){
            return res.status(404).json({
                error : "Photo Not Found",
                Message: `Photo with id "${photoId}" not found!`,
            })
        }
        if (result.UserId !== data.id){
            return res.status(403).json({
                error: "Authorization Error",
                Message: `Can't Access Photo with id "${photoId}"! It's not your photo!`,
            })
        }else{
            next()
        }
    }).catch((err) => {
        return res.status(500).json(err)        
    });
}

function CommentAuthorization(req,res,next){
    const {commentId} = req.params
    const data = req.UserData
    Comment.findByPk(commentId)
    .then((result) => {
        if(result == null || result =="" || result == undefined){
            return res.status(404).json({
                error : "Comment Not Found",
                Message: `Comment with id "${commentId}" not found!`,
            })
        }
        if (result.UserId !== data.id){
            return res.status(403).json({
                error: "Authorization Error",
                Message: `Can't Access Comment with id "${commentId}"! It's not your Comment!`,
            })
        }else{
            next()
        }
    }).catch((err) => {
        return res.status(500).json(err)        
    });
}

function SocialMediaAuthorization(req,res,next){
    const {socialMediaId} = req.params
    const data = req.UserData
    SocialMedia.findByPk(socialMediaId)
    .then((result) => {
        if(result == null || result =="" || result == undefined){
            return res.status(404).json({
                error : "Social Media Not Found",
                Message: `Social Media with id "${socialMediaId}" not found!`,
            })
        }
        if (result.UserId !== data.id){
            return res.status(403).json({
                error: "Authorization Error",
                Message: `Can't Access Social Media with id "${socialMediaId}"! It's not your Social Media!`,
            })
        }else{
            next()
        }
    }).catch((err) => {
        return res.status(500).json(err)        
    });
}
module.exports= {userAuthorization,PhotoAuthorization,CommentAuthorization,SocialMediaAuthorization}