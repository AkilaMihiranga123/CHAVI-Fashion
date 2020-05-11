const express = require('express');
const router = express.Router();
const StoreManager = require('../models/User');
const authenticate  = require('../middleware/authenticate');
const bcrypt = require('bcrypt');

//get all store managers
router.get('/',(req,res) => {
    StoreManager.find()
        .then(managers => {
            res.status(200).json({
                status: 'success',
                data: managers
            });
        })
        .catch(error => {
            res.status(400).json({
                status: 'error',
                error: error
            });
        });
});

//create store manager details update route
router.post('/update/:id', authenticate, (req, res) => {
    StoreManager.findByIdAndUpdate(req.params.id)
        .then(manager => {
                manager.first_Name = req.body.first_Name,
                manager.last_Name = req.body.last_Name,
                manager.email = req.body.email,
                manager.gender = req.body.gender,
                manager.contact_Number = req.body.contact_Number,
                manager.password = req.body.password,
                manager.userRole = 'storeManager'

            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(manager.password, salt, (err, hash) => {
                    if(err){
                        return res.status(400).json({
                            status: 'error',
                            error: 'Error occurred'
                        });
                    }
                    //Set updated password to hashed
                    manager.password = hash;
                    //updated store manager
                    manager.save()
                        .then(manager => {
                            res.status(200).json({
                                message: 'Account Updated Successfully',
                                data: manager
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

//store manager find by id
router.get('/:id',authenticate,(req, res) => {
    StoreManager.findById(req.params.id)
        .then(manager => {
            res.status(200).json({
                message: 'Store Manager find',
                data: manager
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

module.exports = router;