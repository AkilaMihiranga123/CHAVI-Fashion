const express = require('express');
const router = express.Router();
const Product = require("../models/product"); 
const multer = require('multer');


var storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => { 
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => { 
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg') {
            return cb(res.status(400).end('only jpg, png, jpeg are allowed'), false);
        }
        cb(null, true);
    }
});

var upload = multer({ storage: storage }).single("file");


router.post("/uploadImage", (req, res) => {

    upload(req, res, err => {
        if (err) return res.json({ success: false, err })

        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    });

});


router.post("/upload-product", (req, res) => {

    const product = new Product(req.body);

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

module.exports = router;
