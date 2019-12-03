import {
    Router
} from 'express'
import {
    UserService
} from '../services'

const userService = new UserService()
const UserRouter = Router()
    .get('/users', async (req, res) => {
        try {
            const users = await userService.findAll()
            res.json(users);
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })
    .get('/user/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})', async (req, res) => {
        try {
            const {id} = req.params;
            const user = await userService.findOne(id)
            res.json(user)
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })
    .get('/user/:email', async (req, res) => {
        try {
            let {
                params
            } = req
            const user = await userService.findByEmail(params.email)
            res.json(user);
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    })
    .get('/user/:fullname', async (req, res) => {
        try {
            let {
                params
            } = req
            const user = await userService.findByUserName(params.fullname)
            res.json(user)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    })
    .post('/user', async (req, res) => {
        try {
            let user = {...req.body}
            user = await userService.create(user)
            res.status(201).json(user)
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })
    .put('/user', async (req, res) => {
        try {
            let user = {...req.body}
            user = await userService.update(user)
            res.status(201).json(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })
    .delete('/user/:id', async (req, res) => {
        try {
            const {id} = req.params
            userService.delete(id)
            res.status(200).json(id)
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })
    .get('/user', async (req, res) => {
        try {
            const {body} = req;
            const user = await userService.findByCreiteria(body);
            await res.json(user)
        }catch (error) {
            res.status(error.status).send(error.message)
        }
    })

export default UserRouter
