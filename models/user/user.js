const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Model mongo db pour les utilisateurs
const userSchema = new mongoose.Schema({
    name : {
        type: String, 
        required: true,
        unique: true, 
        trim: true
    },
    surname : {
        type: String, 
        required: true,
        unique: true, 
        trim: true
    },
    telephone : {
        type : Number, 
        required: true, 
        maxLength: 20,
        trim: true
    },
    email :{
        type: String, 
        required: true,
        unique: true, 
        trim: true, 
        validate(v){
            if(!validator.isEmail(v)) throw new Error('Email non valide!');
        }
    }, 
    password : {
        type: String,
        required: true
    },
    estAdmin : {
        type : Boolean, 
        default : false
    }, 
    authTokens: [{
        authToken : {
            type: String, 
            required: true
        }
    }]
},  
{timestamps : true});

//Méthode pour ne garder que les informations utiles à l'affichage
userSchema.methods.toJSON = function() {
    const user = this.toObject();

    delete user.password;
    delete user.authTokens; 
    delete user.estAdmin; 


    return user;
}

//Méthode de génération des Tokens d'accès utilisateur
userSchema.methods.generateAuthTokenAndSaveUser = async function(){
    const authToken = jwt.sign({_id: this._id.toString()}, 'foo');
    this.authTokens.push({ authToken });
    await this.save();
    return authToken;
}


userSchema.statics.findUser = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error('Erreur, impossible de se connecter');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new Error('Erreur, impossible de se connecter');
    return user;
}

//Précondition à la sauvegarde des utilisateurs, ici le cryptage du mot de passe
userSchema.pre('save', async function(){
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
})


const User = mongoose.model('User', userSchema);

module.exports = User;