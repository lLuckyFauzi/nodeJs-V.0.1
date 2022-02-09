const express = require('express');
const router = express.Router();
const UserController = require('../Controller/user');
const middleware = require('../middleware/middleware')


router.get('/msg', UserController.msg)

router.post('/createUser', UserController.createUser)

router.post('/login', UserController.login)

router.post('/register', middleware.middleware, UserController.register)

router.post('/userDetail', middleware.middleware, UserController.user)

router.get('/getUser', UserController.getUser)

router.put('/updateUser/:id', UserController.updateUser)

router.delete('/deleteUser/:id', UserController.deleteUser)

module.exports = router;