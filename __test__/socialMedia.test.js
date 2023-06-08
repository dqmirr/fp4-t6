const request = require('supertest')
const app = require('../index')
const { User, SocialMedia } = require('../models')
const { generateToken } = require('../helpers/jwt')
let token
let dataUser
let dataUser2
let dataSosmed
let dataSosmed2
let dataId


// Post Sosmed
describe("POST /socialmedias", () => {
    beforeAll(async () => {
        try {
            dataUser = await User.create({
                email: "admin@gmail.com",
                full_name: "Admin",
                username: "admin",
                password: "admin",
                profile_image_url: "admin.com",
                age: "20",
                phone_number: "081288324523"
            })

            token = generateToken({
                id: dataUser.id,
                email: dataUser.email,
                username: dataUser.username
            })

        } catch (error) {
            console.log(error);
        }
    })

    // Post social media test
    it('Should be response 201', (done) => {
        request(app)
            .post('/socialmedias/')
            .set({
                token
            })
            .send({
                name: "Admin Test",
                social_media_url: "Testing.com",
                UserId: dataUser.id
            })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);
                expect(res.body.token).not.toBeNull()
                expect(res.body).toHaveProperty('social_media')
                expect(res.body.social_media).toHaveProperty('id')
                expect(res.body.social_media).toHaveProperty('name')
                expect(res.body.social_media.name).toEqual('Admin Test')
                expect(res.body.social_media).toHaveProperty('social_media_url')
                expect(res.body.social_media.social_media_url).toEqual('Testing.com')
                expect(res.body.social_media).toHaveProperty('UserId')
                expect(res.body.social_media.UserId).toEqual(dataUser.id)
                expect(res.body.social_media).toHaveProperty('updatedAt')
                expect(res.body.social_media).toHaveProperty('createdAt')
                done()
            })
    })

    it('Should be response 401', (done) => {
        request(app)
            .post('/socialmedias/')
            .set({
                token: ""
            })
            .send({
                name: "Admin Test",
                social_media_url: "Testing.com",
                UserId: dataUser.id
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);
                expect(res.body).toHaveProperty('code')
                expect(res.body.code).toEqual(401)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Token not provided!')
                expect(typeof res.body.message).toEqual('string')
                done()
            })
    })

    it('Should be response 500', (done) => {
        request(app)
            .post('/socialmedias/')
            .set({
                token
            })
            .send({
                name: "",
                social_media_url: "Testing.com",
                UserId: dataUser.id
            })
            .expect(500)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);
                expect(res.body).toHaveProperty('status')
                expect(res.body.status).toEqual(500)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toHaveProperty('name')
                expect(res.body.message).toHaveProperty('errors')
                // expect(typeof res.body.message).toEqual('string')
                done()
            })
    })

    afterAll(async () => {
        // Destroy Data
        try {
            await User.destroy({ where: {} })
            await SocialMedia.destroy({ where: {} })

        } catch (error) {
            console.log(err);
        }
    })

})

// Get Sosmed
describe("GET /socialmedias", () => {
    beforeAll(async () => {
        try {
            dataUser = await User.create({
                email: "admin@gmail.com",
                full_name: "Admin",
                username: "admin",
                password: "admin",
                profile_image_url: "admin.com",
                age: "20",
                phone_number: "081288324523"
            })

            token = generateToken({
                id: dataUser.id,
                email: dataUser.email,
                username: dataUser.username
            })

            dataSosmed = await SocialMedia.create({
                name: "Admin Test",
                social_media_url: "Testing.com",
                UserId: dataUser.id
            })
        } catch (error) {
            console.log(error);
        }
    })

    it('Should be response 200', (done) => {
        request(app)
            .get('/socialmedias/')
            .set({ token })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                // console.log(res.body)
                expect(res.body.token).not.toBeNull()
                expect(res.body).toHaveProperty('social_media')
                expect(res.body.social_media).toHaveProperty('id')
                expect(res.body.social_media).toHaveProperty('name')
                expect(res.body.social_media.name).toEqual('Admin Test')
                expect(res.body.social_media).toHaveProperty('social_media_url')
                expect(res.body.social_media.social_media_url).toEqual('Testing.com')
                expect(res.body.social_media).toHaveProperty('UserId')
                expect(res.body.social_media.UserId).toEqual(dataUser.id)
                expect(res.body.social_media).toHaveProperty('updatedAt')
                expect(res.body.social_media).toHaveProperty('createdAt')
                done()
            })
    })

    it('Should be response 401', (done) => {
        request(app)
            .get('/socialmedias/')
            .set({
                token: ""
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);
                expect(res.body).toHaveProperty('code')
                expect(res.body.code).toEqual(401)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Token not provided!')
                // expect(res.body.message).toHaveProperty('errors')
                expect(typeof res.body.message).toEqual('string')
                done()
            })
    })

    afterAll(async () => {
        // Destroy Data Users
        try {
            await User.destroy({ where: {} })
            await SocialMedia.destroy({ where: {} })

        } catch (error) {
            console.log(error);
        }
    })
})

// Update Sosmed
describe("PUT /socialmedias/:socialMediaId", () => {
    beforeAll(async () => {
        try {
            dataUser = await User.create({
                email: "admin@gmail.com",
                full_name: "Admin",
                username: "admin",
                password: "admin",
                profile_image_url: "admin.com",
                age: "20",
                phone_number: "081288324523"
            })

            token = generateToken({
                id: dataUser.id,
                email: dataUser.email,
                username: dataUser.username
            })

            dataSosmed = await SocialMedia.create({
                name: "Admin Test",
                social_media_url: "Testing.com",
                UserId: dataUser.id
            })

            dataId = dataUser.id + 1
        } catch (error) {
            console.log(error)
        }
    })

    it('Should be response 200', (done) => {
        request(app)
            .put('/socialmedias/' + dataSosmed.id)
            .set({ token })
            .send({
                name: "Admin Test 2",
                social_media_url: "Testingg.com"
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);
                expect(res.body.token).not.toBeNull()
                expect(res.body).toHaveProperty('social_media')
                expect(res.body.social_media).toHaveProperty('id')
                expect(res.body.social_media).toHaveProperty('name')
                expect(res.body.social_media.name).toEqual('Admin Test 2')
                expect(res.body.social_media).toHaveProperty('social_media_url')
                expect(res.body.social_media.social_media_url).toEqual('Testingg.com')
                expect(res.body.social_media).toHaveProperty('UserId')
                expect(res.body.social_media.UserId).toEqual(dataUser.id)
                expect(res.body.social_media).toHaveProperty('updatedAt')
                expect(res.body.social_media).toHaveProperty('createdAt')
                done()
            })
    })

    it('Should be response 401', (done) => {
        request(app)
            .put('/socialmedias/' + dataSosmed.id)
            .set({ token: "" })
            .send({
                name: "Admin Test 2",
                social_media_url: "Testingg.com"
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.body).toHaveProperty('code')
                expect(res.body.code).toEqual(401)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Token not provided!')
                // expect(res.body.message).toHaveProperty('errors')
                expect(typeof res.body.message).toEqual('string')
                done()
            })
    })

    it('Should be response 404', (done) => {
        request(app)
            .put('/socialmedias/' + dataId)
            .set({ token })
            .send({
                name: "Admin Test 2",
                social_media_url: "Testingg.com",
            })
            .expect(404)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);
                expect(res.body).toHaveProperty('error')
                expect(res.body.error).toEqual('Social Media Not Found')
                expect(res.body).toHaveProperty('Message')
                expect(typeof res.body.error).toEqual('string')
                expect(typeof res.body.Message).toEqual('string')
                done()
            })
    })

    it('Should be response 500', (done) => {
        request(app)
            .put('/socialmedias/' + dataSosmed.id)
            .set({ token })
            .send({
                name: "",
                social_media_url: ""
            })
            .expect(500)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);
                expect(res.body).toHaveProperty('status')
                expect(res.body.status).toEqual(500)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toHaveProperty('name')
                expect(res.body.message).toHaveProperty('errors')
                done()
            })
    })

    afterAll(async () => {
        // Destroy Data Users
        try {
            await User.destroy({ where: {} })
            await SocialMedia.destroy({ where: {} })

        } catch (error) {
            console.log(error);
        }
    })
})

// Delete Sosmed
describe("DELETE /socialmedias/:socialMediaId", () => {
    beforeAll(async () => {
        try {
            dataUser = await User.create({
                email: "admin@gmail.com",
                full_name: "Admin",
                username: "admin",
                password: "admin",
                profile_image_url: "admin.com",
                age: "20",
                phone_number: "081288324523"
            })

            dataUser2 = await User.create({
                email: "aadmin@gmail.com",
                full_name: "Aadmin",
                username: "aadmin",
                password: "aadmin",
                profile_image_url: "aadmin.com",
                age: "21",
                phone_number: "081284224523"
            })

            token = generateToken({
                id: dataUser.id,
                email: dataUser.email,
                username: dataUser.username
            })

            dataSosmed = await SocialMedia.create({
                name: "Admin Test",
                social_media_url: "Testing.com",
                UserId: dataUser.id
            })

            dataSosmed2 = await SocialMedia.create({
                name: "Aadmin Test",
                social_media_url: "Teesting.com",
                UserId: dataUser2.id
            })

            dataId = dataUser.id + 1
        } catch (error) {
            console.log(error)
        }
    })

    it('Should be response 200', (done) => {
        request(app)
            .delete('/socialmedias/' + dataSosmed.id)
            .set({ token })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Your social media has been successfully deleted')
                expect(res.body).not.toHaveProperty('social_media')
                expect(res.body).not.toHaveProperty('id')
                expect(res.body).not.toHaveProperty('name')
                expect(res.body).not.toHaveProperty('social_media_url')
                expect(res.body).not.toHaveProperty('UserId')
                expect(res.body).not.toHaveProperty('updatedAt')
                expect(res.body).not.toHaveProperty('createdAt')
                done()
            })
    })

    it('Should be response 401', (done) => {
        request(app)
            .delete('/socialmedias/' + dataSosmed.id)
            .set({ token: "" })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);

                expect(res.body).toHaveProperty('code')
                expect(res.body.code).toEqual(401)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Token not provided!')
                expect(typeof res.body.message).toEqual('string')
                done()
            })
    })

    it('Should be response 404', (done) => {
        request(app)
            .delete('/socialmedias/' + dataId)
            .set({ token })
            .expect(404)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                // console.log(res.body);

                expect(res.body).toHaveProperty('error')
                expect(res.body.error).toEqual('Social Media Not Found')
                expect(res.body).toHaveProperty('Message')
                expect(typeof res.body.error).toEqual('string')
                expect(typeof res.body.Message).toEqual('string')
                done()
            })
    })

    it('Should be response 403', (done) => {
        request(app)
            .delete('/socialmedias/' + dataSosmed2.id)
            .set({ token })
            .expect(403)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                console.log(res.body);

                expect(res.body).toHaveProperty('error')
                expect(res.body.error).toEqual('Authorization Error')
                expect(res.body).toHaveProperty('Message')
                expect(typeof res.body.error).toEqual('string')
                expect(typeof res.body.Message).toEqual('string')
                done()
            })
    })

    afterAll(async () => {
        // Destroy Data Users
        try {
            await User.destroy({ where: {} })
            await SocialMedia.destroy({ where: {} })

        } catch (error) {
            console.log(error);
        }
    })
})