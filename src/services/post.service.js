import { getRepository } from 'typeorm'
import Post from '../models/post.model'

class PostService {
  postRepository() {
    return getRepository(Post)
  }

  async create(post) {
    return await this.postRepository.create(post)
  }

  async findAll() {
    return await this.postRepository().find()
  }

  async findById(id) {
    const post = await this.postRepository.findOne(id)
    if (post !== undefined) {
      return post
    } else {
      throw {
        message: 'Sory, post not found',
        status: 404,
      }
    }
  }

  async delete(id) {
    const deletePost = this.findById(user.id)
    return await this.postRepository.delete(id)
  }

  async update(id) {
    let updatePost = await this.findById(id)
    this.postRepository().merge(updatePost)
    return await this.postRepository().save(updatePost)
  }
}

export default PostService
