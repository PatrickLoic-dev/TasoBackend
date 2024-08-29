const mongoose = require('mongoose');
const User = require('../../models/user/user');


const createUser = async (req, res) => {
    const user = new User(req.body);

    try {
        const saveUser = await user.save();
        res.status(200).send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

const loginUser = async (req, res) => {
    try {
    const user = await User.findUser(req.body.email, req.body.password);
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({user, authToken});
    } catch (error) {
    res.status(400).send(error);
    }
}

const logoutUser = async (req, res) => {
    try {
        req.user.authTokens = req.user.authTokens.filter((authToken) => {
        return authToken.authToken !== req.authToken;
    });
    
    await req.user.save();
    res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getProfile =async (req, res, next) => {
    const users = await User.findOne(req.user._id)
    res.send(users);
}

const getUserById =  async (req, res, next) => {
    const userId = req.params.id;
    
    try {
        const user = await User.findById(userId);
        
        if(!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteallTokens = async (req, res) => {
    try {
        req.user.authTokens = []
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}

const modifyCurrentUser = async (req, res, next) => {
    const updatedInfo = Object.keys(req.body);


    try {

        updatedInfo.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();

        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
}

// const uploadAvatar = async (req, res, next) => {
//     try {
//         req.user.avatar = req.file.path; // Set the avatar field to the file path
//         await req.user.save();

//         res.send(req.user);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// }

const deleteUser =  async (req, res, next) =>{
    const userId = req.params.id;
    
    try {
        const user = await User.findByIdAndDelete(userId);
        
        if(!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteAccount = async (req, res, next) =>{

    try {
        await req.user.remove();
    
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createUser,
    loginUser,
    logoutUser,
    deleteallTokens,
    getAllUsers,
    getProfile,
    getUserById,
    modifyCurrentUser,
    deleteUser,
    deleteAccount
};