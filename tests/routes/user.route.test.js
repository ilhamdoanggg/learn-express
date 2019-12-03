import mockRequest from 'supertest'
import {app} from '../../src/app'
import {UserService} from "../../src/services";

let appTest
let service

describe('User route', ()=>{
    beforeAll(async ()=>{
        appTest = await app()
        service = new UserService()
        await  service.userRepository().clear()
    })
    beforeEach(async ()=>{
        await service.userRepository().clear()
    })
    it('post, should create a user', async ()=> {
        const respon = await mockRequest(appTest)
            .post('/user').send({username: 'john',email:"jhon@thor.com", fullname:"jhon thor"})
        expect(respon.statusCode).toEqual(201)
        expect(respon.body).toHaveProperty('id')
        expect(respon.body.username).toEqual('john')
    })
    it('get, should get all user data and return status 200', async ()=> {
        const respon=await mockRequest(appTest)
            .get('/users').set('Accept', 'application/json')
        expect(respon.statusCode).toBe(200)
    })
    it('get user data by id ', async ()=> {
        let userToSave = {
            username: 'ilham',
            fullname: 'doang',
            email: 'ilhamdoanggg@gmail.com',
        }
        await service.create(userToSave)
        const respons = await mockRequest(appTest)
            .get(`/user/${userToSave.id}`).set('Accept', 'application/json')
        expect(respons.statusCode).toEqual(200)
        expect(respons.body).toEqual(userToSave)
    })
    it('get all users data ', async ()=> {
        let userToSave = {
            username: 'ilham',
            fullname: 'doang',
            email: 'ilhamdoanggg@gmail.com',
        }
        let userToSave2 = {
            username: 'doang',
            fullname: 'sss',
            email: 'ilhamdoanggg@mail.com',
        }
        await service.create(userToSave)
        await service.create(userToSave2)
        const respons = await mockRequest(appTest)
            .get(`/users`).set('Accept', 'application/json')
        expect(respons.statusCode).toEqual(200)
        expect(respons.body).toHaveLength(2)
    })
})
