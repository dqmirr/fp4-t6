const req = require('supertest')
const app = require('../index')
const {User} = require('../models')

//register test
describe("POST /users/register",()=>{
    it('should be response 201',(done)=>{
        req(app)
        .post('/users/register')
        .send({
            full_name: "vinnie",
            email:"vinnie@mygram.com",
            username:"vinnie",
            password:"vinnie",
            profile_image_url:"https://github.com/nnvi",
            age: 20,
            phone_number:"088888888"
        })
        .expect(201)
        .end((err,res)=>{
            if(err){
                done(err)
            }

            expect(res.body).toHaveProperty('user')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user).toHaveProperty('full_name')
            expect(res.body.user).toHaveProperty('username')
            expect(res.body.user).toHaveProperty('profile_image_url')
            expect(res.body.user).toHaveProperty('age')
            expect(res.body.user).toHaveProperty('phone_number')

            done()
        })
    })

    it('should be response 500',(done)=>{
        req(app)
        .post('/users/register')
        .send({
            full_name: "admin",
            email:"admin@admin.com",
            username:"admin",
            // password:"admin1", -->if missing one property of login
            profile_image_url:"https://github.com/nnvi",
            age: 20,
            phone_number:"088888888"
        })
        .expect(500)
        .end((err,res)=>{
            if(err){
                done(err)
            }

            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('type')
            expect(res.body).toHaveProperty('path')
            expect(res.body).toHaveProperty('value')
            expect(res.body).toHaveProperty('instance')

            done()
        })
    })

    afterAll(async ()=>{
        try{
            await User.destroy({
                where:{}
            })
        }catch(err){
            console.log(err);
        }
    })
})

//login test
describe("POST /users/login",()=>{
    beforeAll(async () => {
        try {
          const data = await User.create({
            full_name: "vinnie",
            email:"vinnie@mygram.com",
            username:"vinnie",
            password:"vinnie",
            profile_image_url:"https://github.com/nnvi",
            age: 20,
            phone_number:"088888888"
          });
        } catch (error) {
          console.log(error);
        }
      })

      it('should be response 200',(done)=>{
        req(app)
        .post('/users/login')
        .send({
            email:"vinnie@mygram.com",
            password:"vinnie",
        })
        .expect(200)
        .end((err,res)=>{
            if(err){
                done(err)
            }

            expect(res.body).toHaveProperty("token")
            expect(res.body.token).not.toBeNull()
            expect(res.charset).toEqual('utf-8')
            expect(res.type).toEqual('application/json')
            expect(res.status).toEqual(200)
            
            done()
        })
    })

    it('should be response 404',(done)=>{
        req(app)
        .post('/users/login')
        .send({
            email:"vin1nie@mygram.com",
            password:"vinnie",
        })
        .expect(404)
        .end((err,res)=>{
            if(err){
                done(err)
            }

            expect(res.body).toHaveProperty("code")
            expect(res.body).toHaveProperty("message")
            expect(res.body.code).toEqual(404)
            expect(res.body.message).toEqual("User not found")
            expect(res.status).toEqual(404)
            
            done()
        })
    })

    afterAll(async ()=>{
        try{
            await User.destroy({
                where:{}
            })
        }catch(err){
            console.log(err);
        }
    })
})