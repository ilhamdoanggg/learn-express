import {getRepository, Like} from 'typeorm';
import User from '../models/user.model';

class UserService {
    userRepository() {
        return getRepository(User);
    }
    async findAll() {
        return await this.userRepository().find();
    }
    async findById(id) {
        let getUser = await this.userRepository().findOne({where: {id}})
        if (!getUser)throw {message:"gak nemu", status:404}
        return getUser
    }
    async create(user) {
        return await this.userRepository().save(user);
    }
    async update(user) {
        let updateUser = await this.findById(user.id)
        this.userRepository().merge(updateUser, user)
        return await this.userRepository().save(updateUser);
    }
    async delete(id) {
        const deleteUser = this.findById(user.id)
        return await this.userRepository().delete(id);
    }
    async findByUserName(name) {
        let user = this.userRepository().find({fullname:Like(`%${name}`)})
        if(user===undefined) { throw {message:"name not found", status:404}}
        return user
    }
    async findByEmail(email) {
        return await this.userRepository()
            .createQueryBuilder("users")
            .where("user.email = :email", {
                email: 1
            })
            .getOne()
    }

    getCriteria(keyword){
        let keywords = {};
        if (!(keyword.username === undefined)&&!(!keyword.username==="")){
            keywords = {...keywords,username:Like(`%${keyword.username}%`)}
        }
        if (!(keyword.email === undefined)&&!(!keyword.email ==="")){
            keywords = {...keywords,email:Like(`%${keyword.email}%`)}
        }
        if (!(keyword.fullname === undefined)&&!(!keyword.fullname ==="")){
            keywords = {...keywords,fullname:Like(`%${keyword.fullname}%`)}
        }
        return keywords;
    }
    async findByCreiteria(user){
        console.log("lewat sini")
        return this.userRepository().find(this.getCriteria(user))
    }
    // async findByCreiteria(criteria){
    //     console.log("lewat enggak?")
    //     // let criteriaBuilder = await this.userRepository().createQueryBuilder("select")
    //     //     .having("user.username = :username", {username:Like(`%${criteria}%`)})
    //     //     .orHaving("user.email= :email", {email:Like(`%${criteria}%`)})
    //     //     .orHaving("user.fullname= :fullname", {fullname:Like(`%${criteria}%`)})
    //
    //     // let criteriaBuilder = await this.userRepository().find(
    //     //     where:
    //     // )
    //     let criteriaBuilder = this.userRepository().find({where:[{username: Like(`%${criteria}%`), email: Like(`%${criteria}%`), fullname: Like(`%${criteria}%`)}]})
    //     if(!criteriaBuilder ===undefined) { throw  {message:"not found", status:404}}
    //     return criteriaBuilder
    // }
}

export default UserService;
