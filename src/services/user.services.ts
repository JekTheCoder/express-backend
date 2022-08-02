import User from '../database/models/user.model';

export interface NewUser {
    username: string
    name: string
    password: string
}

export const getAllUsers = () => User.findAll().then(users => users.map(user => user.toSaveUser()));
export const createOneUser = async (newUser: NewUser) => (await User.create({...newUser})).toSaveUser();
export const getOneUser = (id: number) => User.findByPk(id).then(user => user?.toSaveUser());