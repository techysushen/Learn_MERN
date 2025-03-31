import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Abhishek Kumar',
        email: 'findabhishekcom',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Test User',
        email: 'test@example.com',
        password: bcrypt.hashSync('123456', 10),

    }
]

export default users;