const { Comment,User,Photo} = require('../models')

class CommentController{
    static async AddComment(req,res){
        try {
            const {comment,PhotoId} = req.body
            const data = await Comment.create({
                comment,
                PhotoId,
                UserId: req.UserData.id
            })
            const response ={
                id :data.id,
                comment:data.comment,
                UserId : data.UserId,
                PhotoId : data.PhotoId,
                updatedAt: data.updatedAt,
                createdAt: data.createdAt
            }
            res.status(201).json({comment:response})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }
    static async EditComment(req,res){
        try {
            const {commentId} = req.params
            const {comment} = req.body
            const data = await Comment.update({
                comment
            },{
                where:{
                    id: commentId
                },
                returning:true
            })
            const response ={
                id :data[1][0].id,
                comment:data[1][0].comment,
                UserId : data[1][0].UserId,
                PhotoId : data[1][0].PhotoId,
                updatedAt: data[1][0].updatedAt,
                createdAt: data[1][0].createdAt
            }
            res.status(200).json({comment:response})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }
    static async showComment(req,res){
        try {
            const data = await Comment.findAll({
                where:{
                    UserId: req.UserData.id
                },
                include:[{
                    model : User,
                    attributes: ['id','username','profile_image_url','phone_number']
                },
                {
                    model : Photo,
                    attributes:['id','title','caption','poster_image_url']
                }
            ]
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }
    static async DeleteComment(req,res){
        try {
            const {commentId} = req.params
            const data = await Comment.destroy({
                where:{
                    id: commentId
                }
            })
            res.status(200).json({
                message: "Your Comment has been successfully deleted"
            })
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }
}

module.exports = CommentController