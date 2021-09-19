const express = require('express')

const { users: ctrl } = require('../../controllers')
const { controllerWrapper, authenticate } = require('../../middlewares')

const router = express.Router()

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.getUser))

router.get('/:verifyToken', controllerWrapper(ctrl.verify))

router.post('/', controllerWrapper(ctrl.repeatEmail))

module.exports = router
