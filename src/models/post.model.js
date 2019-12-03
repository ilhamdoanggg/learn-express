export default class Post {
    constructor(id, title, content, author, createAt, updateAt) {
        this.id = id
        this.title = title
        this.content = content
        this.author = author
        this.createAt = createAt
        this.updateAt = updateAt
    }
}