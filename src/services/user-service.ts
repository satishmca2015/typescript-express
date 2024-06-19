import User from '../models/User';

export class UserService {
    constructor() {}

    async getUserById(id: string) {
        try {
            return await User.findByPk(id, {
                attributes: ['id', 'username', 'email']
            });
        } catch (error: any) {
            throw error;
        }
    }

    async getUsers(page:number,limit:number){
        const offset = (page - 1) * limit;
        const queryOptions = { offset,limit };
        return await User.findAll(queryOptions);
    }

    async updateUser(id: string, body: object) {
        try {
            const where = { where: { id: id } };
            return await User.update(body, where);
        } catch (error) {
            throw error;
        }
    }
}