import { Router } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';
import { PetModel } from '../models/pet.model.js';
import { generateMockPets } from '../utils/mocking.js';

const router = Router();

// Mocking de usuarios
const generateMockUsers = (count = 50) => {
    const users = [];
    const roles = ['user', 'admin'];
    const hashedPassword = bcrypt.hashSync('coder123', 10);
    
    for (let i = 0; i < count; i++) {
        users.push({
            name: `User${i}`,
            email: `user${i}@example.com`,
            password: hashedPassword,
            role: roles[Math.floor(Math.random() * roles.length)],
            pets: []
        });
    }
    return users;
};

// Endpoint GET para generar usuarios mock
router.get('/mockingusers', (req, res) => {
    const users = generateMockUsers(50);
    res.json(users);
});

// Endpoint POST para generar e insertar datos en la base de datos
router.post('/generateData', async (req, res) => {
    const { users = 50, pets = 50 } = req.body;
    
    try {
        const mockUsers = generateMockUsers(users);
        const mockPets = generateMockPets(pets);
        
        await UserModel.insertMany(mockUsers);
        await PetModel.insertMany(mockPets);
        
        res.json({ message: 'Datos generados e insertados correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar datos en la base de datos.' });
    }
});

// Migración del endpoint /mockingpets
router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(50);
    res.json(pets);
});

export default router;
