import User from '../models/User';
import bcrypt from 'bcryptjs';

export class AuthService {
    async signUp(username: string, email: string, password: string) {
        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) throw new Error('Email already exists');

            const hashedPassword = await bcrypt.hash(password, 10);
            return await User.create({ username, email, password: hashedPassword });
        } catch (error: any) {
            throw error;
        }
    }

    async signIn(email: string, password: string) {
        const user = await User.findOne({ where: { email }, attributes: ['id', 'username', 'email', 'password'] });
        if (!user) throw new Error('Invalid email or password');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid email or password');

        const { id, username } = user;
        const userWithoutPassword = { id, username, email };
        return userWithoutPassword;
    }

}

