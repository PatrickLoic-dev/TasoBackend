const express = require('express');
const User = require('../models/user/user');
const authentification = require('../middlewares/authentification');
const upload = require('../middlewares/upload');
const { createUser, loginUser, logoutUser, deleteallTokens, getAllUsers, getProfile, getUserById, modifyCurrentUser, deleteUser, deleteAccount } = require('../controllers/user/userController');


const router = express.Router();

/* Ensembles de routes lié à l'utilisateur */
router.get('/user', authentification, getAllUsers)

.post('/user', createUser)

.post('/user/login', loginUser)

.post('/user/logout', authentification, logoutUser)

.post('/user/logoutAll', authentification, deleteallTokens)

.get('/user/me', authentification, getProfile)

.get('/user/:id', authentification, getUserById)

.put('/user/me', authentification, modifyCurrentUser)

.delete('/user/:id', authentification, deleteUser)

.delete('/user/me', authentification, deleteAccount);

module.exports = router;