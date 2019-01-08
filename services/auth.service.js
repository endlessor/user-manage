const { User } 	    = require('../models');
const validator     = require('validator');
const { to, TE }    = require('../services/util.service');

const createUser = async (userInfo) => {
    let auth_info, err;
    auth_info={};
    auth_info.status='create';
    [err, user] = await to(User.create(userInfo));
    if(err) TE('user already exists with that email or name');
    return user;
}
module.exports.createUser = createUser;

const authUser = async (userInfo) => {//returns token
    let auth_info = {};
    auth_info.status = 'login';
    if(!userInfo.password) TE('Please enter a password to login');
    let user;
    [err, user] = await to(User.findOne({where:{email:userInfo.email }}));
    if(err) TE(err.message);

    if(!user) TE('Invalid Credential.');
    [err, user] = await to(user.comparePassword(userInfo.password));
    if(err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;