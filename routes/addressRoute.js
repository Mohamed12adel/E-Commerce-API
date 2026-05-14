const express = require('express');
const authService = require('../controllers/authController');
const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../controllers/addressController');
const router = express.Router();
router.use(authService.protect, authService.allowedTo('user'));
router.route('/').post(addAddress).get(getLoggedUserAddresses);
router.delete('/:addressId', removeAddress);
module.exports = router;
