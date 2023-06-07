const {SocialMedia,User} = require('../models')

class SosMedController{
    static async AddSocialMedia(req,res){
        try {
            const UserId = req.UserData.id
            const{name, social_media_url} = req.body
            const data = await SocialMedia.create({
                name,
                social_media_url,
                UserId
            })
            res.status(201).json({social_media:data})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }
    static async GetAllSocialMedia(req,res){
        try {
            const data = await SocialMedia.findAll({where:{
                UserId: req.UserData.id
            },
            include: [
                {
                  model: User
                }
            ]})
            const response ={
                id: data[0].id,
                name: data[0].name,
                social_media_url: data[0].social_media_url,
                UserId: data[0].UserId,
                createdAt: data[0].createdAt,
                updatedAt: data[0].updatedAt,
                User: {
                    id: data[0].User.id,
                    username: data[0].User.username,
                    profile_image_url: data[0].User.profile_image_url
                }
            }
            res.status(200).json({social_media: response})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async EditSocialMedia(req,res){
        try {
            const {socialMediaId} = req.params
            const UserId = req.UserData.id
            const{name, social_media_url} = req.body
            const data = await SocialMedia.update({
                name,
                social_media_url,
                UserId
            },{
                where:{
                    id: socialMediaId
                },
                returning: true
            }) 
            res.status(200).json({social_media :data[1][0]})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async DeleteSocialMedia(req,res){
        try {
            const {socialMediaId} = req.params
            const data = await SocialMedia.destroy({
                where:{
                    id: socialMediaId
                }
            })
            res.status(200).json({
                message: "Your social media has been successfully deleted"
            })
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }
}

module.exports= SosMedController