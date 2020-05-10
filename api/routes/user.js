const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User');
const authenticate  = require('../middleware/authenticate');

//get all users
router.get('/',(req,res) => {
    User.find()
        .then(users => {
            res.status(200).json({
                status: 'success',
                data: users
            });
        })
        .catch(error => {
            res.status(400).json({
                status: 'error',
                error: error
            });
        });
});

//Create User registration route
router.post('/register', (req, res) => {
    //find user
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user){
                //if email address already exists
                return res.status(400).json({
                    status: 'error',
                    message: 'Email Already Exists'
                })
            }else{
                //create new user
                const newUser = new User({
                    first_Name: req.body.first_Name,
                    last_Name: req.body.last_Name,
                    email: req.body.email,
                    gender: req.body.gender,
                    contact_Number: req.body.contact_Number,
                    password: req.body.password,
                    userRole: 'user'
                });

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err){
                            return res.status(400).json({
                                status: 'error',
                                error: 'Error occurred'
                            });
                        }
                        //Set password to hashed
                        newUser.password = hash;
                        //save new user
                        newUser.save()
                            .then(user => {
                                res.status(200).json({
                                    message: 'Account Created Successfully',
                                    data: user
                                });
                            })
                            .catch(error => {
                                res.status(400).json({
                                    error: error
                                });
                            });
                    }));

            }

        });

});

//create user login route
router.post('/login', (req, res) => {
    //find user
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user){
                //compare user entered password and hashed password
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err){
                        //not matched
                        return res.status(400).json({
                            status: 'error',
                            message: 'Login Failed'
                        })
                    }else{
                        if(result){
                            const payload = {
                                user_id: user._id,
                                //issued at
                                iat:  Math.floor(Date.now() / 1000) - 30,
                                //expires in
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60 * 24),
                            }
                            jsonWebToken.sign(payload, 'UserSecretKey', (error, token) => {
                                if(error){
                                    return res.status(400).JSON({
                                        status: 'error',
                                        message: 'Authentication Failed'
                                    });
                                }else{
                                    res.status(200).json({
                                        status: 'success',
                                        message: {
                                            user: {
                                                user_id: user._id,
                                                first_Name: user.first_Name,
                                                last_Name: user.last_Name,
                                                email: user.email,
                                                userRole: user.userRole
                                            },
                                            token: token
                                        }
                                    })
                                }
                            })
                        }else{
                            res.status(400).json({
                                status: 'error',
                                message: 'Incorrect Password'
                            });
                        }
                    }
                });

            }else{
                res.status(400).json({
                    status: 'error',
                    message: 'Email not exists'
                });
            }
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        })

});

router.post('/update/:id', authenticate, (req, res) => {
    User.findByIdAndUpdate(req.params.id)
        .then(user => {
            user.first_Name = req.body.first_Name,
            user.last_Name = req.body.last_Name,
            user.email = req.body.email,
            user.gender = req.body.gender,
            user.contact_Number = req.body.contact_Number,
            user.password = req.body.password

            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if(err){
                        return res.status(400).json({
                            status: 'error',
                            error: 'Error occurred'
                        });
                    }
                    //Set updated password to hashed
                    user.password = hash;
                    //updated user
                    user.save()
                        .then(user => {
                            res.status(200).json({
                                message: 'Account Updated Successfully',
                                data: user
                            });
                        })
                        .catch(error => {
                            res.status(400).json({
                                error: error
                            });
                        });
                }));
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        })
});


module.exports = router;