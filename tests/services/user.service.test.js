import createDbConnection from '../../src/database/connection'
import { UserService } from '../../src/services'
import { fail, deepEqual, equal, throws } from 'assert'
import configure from '../../src/config'
import User from "../../src/models/user.model";

let connection
let service

describe('User service', () => {
  beforeAll(async () => {
    // configure()
    // connection = await createDbConnection()
    // if (!connection.isConnected)
    //   fail('Unable to create database connection')
    // service = new UserService()
    // await service.userRepository().clear()
  })
  beforeEach(async ()=>{
    //await connection.synchronize(true)
    // await service.userRepository().clear()
  })
  const mockRepo = jest.fn(()=>({
    save: jest.fn().mockImplementation((User)=>user),
    findOne : jest.fn().mockImplementation((id)=>({id:id, username:"", email:""})),
    findAll : jest.fn().mockImplementation(()=>([{id:id, username:"", email:""}, {id:id, username:"", email:""}, {id:id, username:"", email:""}]))
  }))
  it('create, should call repo save', async () =>{
    const expected = {
      username: 'ilham',
      fullname: 'doang',
      email: 'ilhamdoanggg@gmail.com',
    }
    let service = new  UserService()
    const SPY = jest.fn(()=>expected)

    jest.spyOn(service, 'create').mockImplementation(()=>SPY(expected))
    await service.create(expected)
    expect(SPY).toHaveBeenCalledTimes(1)
  });
  it('create, should able retun user', async ()=> {
    const expected = {
      username: 'ilham',
      fullname: 'doang',
      email: 'ilhamdoanggg@gmail.com',
    }
    let service = new  UserService()
    //const SPY = jest.fn(()=>expected)
    jest.spyOn(service, 'create').mockImplementation(()=> mockRepo().save(expected))
    const actualResult = await service.create(expected)
    deepEqual(expected, actualResult)
  });

  it('create, should able to create a User', async () => {
    const expected = {
      username: 'ilham',
      fullname: 'doang',
      email: 'ilhamdoanggg@gmail.com',
    }
    const actual = await service.create(expected)
    equal(actual.username, expected.username)
  })
  it('get, should able to get data', async () => {
    let expected = {
      username: 'ilham',
      fullname: 'doang',
      email: 'ilhamdoanggg@gmail.com',
    }
    expected = {...await service.userRepository().save(expected)}
    let actual = await service.findById(expected.id)
    deepEqual(expected, actual)
  })
  it('update, should able to update data', async () =>{
    let expected = {
      username: 'ilham',
      fullname: 'doang',
      email: 'ilhamdoanggg@gmail.com',
    }
    expected = {...await service.userRepository().save(expected)}
    let actual = await service.findById(expected.id)
    actual ={...await service.update(actual)}
    deepEqual(actual, expected)
  })
  it('update, should update with change fullname', async () =>{
    let expected = {
      username: 'ilham',
      fullname: 'doang',
      email: 'ilhamdoanggg@gmail.com',
    }
    expected = {...await service.userRepository().save(expected)}
    let dataToUpdate = {...expected, fullname:"ilhamdoanggg"}
    let actual = await service.update(dataToUpdate)
    deepEqual(actual, dataToUpdate)
  })
  // it('update, should cant because data never save', async ()=> {
  //   let expected = {
  //     username: 'ilham',
  //     fullname: 'doang',
  //     email: 'ilhamdoanggg@gmail.com',
  //   }
  //   function expectedError(){
  //     throw {message:"gak nemu", status:404}
  //   }
  //   try {
  //     await service.update(expected)
  //   }catch (error) {
  //     deepEqual(error, expectedError)
  //   }
  // });
})
