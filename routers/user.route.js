const express = require('express');
const userController = require('../controllers/user.controller');
const multer = require('multer');

const router = express.Router();
// Set up storage using Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
  });
  
  upload = multer({ storage: storage ,limits: { fileSize: 1024 * 1024 }});
router.route('/').post(userController.validateUser(),userController.createUser).get(userController.userList);
router.route("/:id").delete(userController.deleteUser).patch(userController.updateUser).get(userController.userDetail);
router.route("/upload/:id").patch(upload.single('image'),userController.uploadImage)
module.exports = router;