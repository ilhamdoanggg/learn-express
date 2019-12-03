import {Router} from 'express'
import {PostService} from '../services/index'

const postService = new PostService();

const PostRouter = Router()
    .get('/posts', async (req, res) => {
        try {
            const posts = await postService.findAll()
             res.json(posts);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    })
    .post('/post', async (req, res) => {
        try {
            let post = {...req.body}
            post = await postService.create(post)
            res.status(201).json(post);
        } catch (e) {
            res.status(500).json({message : error.message});
        }
    })

export default PostRouter