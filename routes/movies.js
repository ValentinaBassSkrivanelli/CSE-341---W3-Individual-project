const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/movies');
// const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authentication');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

// router.post('/', validation.saveContact, contactsController.createContact);

router.put("/:id", isAuthenticated, contactsController.putInstructor);
// router.put('/:id', validation.saveContact, contactsController.updateContact);


router.delete('/:id', isAuthenticated, contactsController.deleteContact);

module.exports = router;
