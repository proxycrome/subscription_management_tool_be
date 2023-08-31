import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
import _ from 'lodash';
import { User } from '../model/userModel.js'
import mailgun from "mailgun-js";
const DOMAIN = 'sandboxf7a576aecc2f40d9b65a7198dcd5f380.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});


//initialize env


const AuthController = {

    signUp: async(req, res) => {
        try{
            const { firstName, lastName, email, password, country } = req.body;

            if(!firstName || !lastName || !email || !password || !country) {
                return res.status(400).json({status: 'fail', message: "Please fill all fields"})
            }

            // Find if email alredy exists

            const emailExist = await User.findOne({email});

            if(emailExist) {
                return res.status(400).json({status: 'fail', message: "User already exist"})
            }


            //password hash 
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            if(hashedPassword){
                const newUser = new User({firstName, lastName, email, password: hashedPassword, country})
                const savedUser = await newUser.save();
                
                if(savedUser) {
                    jwt.sign({id:savedUser._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                        if(err) {
                            throw err;
                        }
                    
                        res.status(200).json({status: "success", data: {
                            token: 'Bearer ' + token,
                            id: savedUser._id,
                            firstName: savedUser.firstName,
                            lastName: savedUser.lastName,
                            email: savedUser.email,
                            country: savedUser.country,
                            userId: savedUser.userId
                        }, message: "successful"});
                    }); 
                }
            }
        }catch(error){
            res.status(500).json({status: "fail", message: "server err", error});
        }
        
    },

    login:  async(req, res) => {
        try{
            const {email, password} = req.body;

            if(!email || !password) {
                return res.status(400).json({status: 'fail', message: "Provide email and password"});
            }

            const isUser = await User.findOne({email});

            if(!isUser) {
                res.status(404).json({status: 'fail', message: "record not found"})
            }

            // validate user password

            const match = await bcrypt.compare(password, isUser.password);

            if(!match) {
                return res.status(400).json({status: 'fail', message: "email or password is incorrect"});
            }


            jwt.sign({id: isUser._id}, process.env.JWT_SECRET,{expiresIn: 86400}, (err, token) => {
                    
                if(err) {
                    throw err;
                }
        
                return res.status(200).json({status: "success", data: {
                    token: "Bearer " + token,
                    id: isUser._id,
                    firstName: isUser.firstName,
                    lastName: isUser.lastName,
                    email: isUser.email,
                    country: isUser.country,
                    userId: isUser.userId,
                    phone: isUser.phone,
                    photo: isUser.photo
                }, message: "successful"});
            });
        }catch(error){
            res.status(500).json({status: "fail", message: "server err", error});
        }
    },

    forgetPassword: async (req, res) => {
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({status: 'fail', message: "User with this email does not exist"});
        }

        const token = jwt.sign({id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});
        const data = {
            from: '<noreply@hello.com>',
            to: email,
            subject: 'Reset Password Link',
            html: `
                <h2>Please click on the given link to reset your password</h2>
                <p>Please copy the link below and paste on the browser to change your password</p>
                <a href="${process.env.CLIENT_URL}/resetpassword/${token}">${process.env.CLIENT_URL}/resetpassword/${token}</a>
            `
        };
        User.findOneAndUpdate({email}, {resetLink: token}, (err, success) => {
            if(err){
                return res.status(400).json({status: 'fail', message: 'reset password link error'});
            }
            mg.messages().send(data, function (error, body) {
                if(error){
                    return res.json({err: error.message})
                }
                
                return res.status(200).json({message: "Email has been sent, check your email and kindly follow the instructions"})
            });
        })

    },
    
    resetPassword: async (req, res) => {
        const {resetLink, newPassword} = req.body;
        if(resetLink){
            jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, async(err, decoded) => {
                if(err){
                    return res.status(401).json({status: 'fail', message: 'incorrect Token or Token Expired'});
                }

                let user = await User.findOne({resetLink})

                if(!user){
                    return res.status(401).json({status: 'fail', message: 'user with this token does not exist'});
                }

                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(newPassword, salt);

                if(hashedPassword){
                    const obj = {
                        password: hashedPassword,
                        resetLink: ""
                    }
                    user = _.extend(user, obj);
                    user.save((err, result) => {
                        if(err){
                            return res.status(400).json({status: 'fail', message: 'reset password link error'});
                        }        
                        return res.status(200).json({status:"success", message: "Your password has been changed"});
                    });
                }
            })
        }else{
            return res.status(401).json({status: "fail", message: "Authentication error!!!"})
        }
    },
        
};

export default AuthController; 