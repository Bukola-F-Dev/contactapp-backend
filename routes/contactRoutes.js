const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  searchContacts,
} = require('../controllers/contactController');

router.get('/', getContacts);
router.get('/search', searchContacts);
router.post('/', createContact);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);


module.exports = router;