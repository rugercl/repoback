const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const upload = require("../utils/multer");
const passport = require('passport')

const controllerUsers = require('../controllers/usuarios.controller')
const { LogoutUser, GetAllUsers, GetOneUser, ModifyOneUser, DeleteOneUSer, ImageUpload } = controllerUsers

router.post('/login', passport.authenticate('local-login', {}))
router.post('/register', passport.authenticate('local-register', {}))


router.get('/logout', auth(['true', 'false']), LogoutUser)

router.get('/', GetAllUsers)
router.get('/:id', GetOneUser)
router.put('/:id', ModifyOneUser)
router.delete('/:id', DeleteOneUSer)
router.post('/:userId/upload', upload.single("image"), ImageUpload);

module.exports = router;
