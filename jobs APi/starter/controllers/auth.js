const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const {BadrequestError} = require('../errors')

const register = async (req, res) => {
    const{name, password, email}= req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const tempUser = {name, email, hashedPassword}
    const user = await User.create({...tempUser})
    res.status(StatusCodes.CREATED).json({user})
};


const login = async()=>{

}



module.exports = {
    login, register
}