const req = require('supertest')
const app = require('../index')
const { User, Photo, Comment } = require('../models')

describe("POST /comments", ()=>{
    let token
    let PhotoId
    let UserId

    beforeAll(async ()=>{
        try{
            const user = await User.create({
                full_name: "Admin admin",
                email: "admin@gmail.com",
                username: "admin",
                password: "admin",
                profile_image_url: "https://gambar.com",
                age:"22",
                phone_number:"085412356755"
              })
         
            token = await generateToken({
                id: user.id,
                email: user.email,
                username: user.username,
              })
            
              const photo = await Photo.create({
                title: "Gambar",
                caption: "Caption Gambar",
                poster_image_url: "https://gambar.com",
                UserId: user.id,
              })
              PhotoId = photo.id
              UserId = user.id
        }catch(err){
            throw err
        }
    })
})
    
it('should be response 201',(done)=>{
    req(app)
    .post('/comments/')
    .set({token})
    .send({
        UserId: UserId,
        PhotoId: PhotoId,
        comment: "Comment Gambar"
    })
    .expect(201)
    .end((err,res)=>{
        try{
        if (err){done(err)}
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("UserId")
        expect(res.body).toHaveProperty("PhotoId")
        expect(res.body).toHaveProperty("comment")
        }catch(err){
            err.message= `${err.message}`
            console.log(err);
        }
        done()
    })
})
