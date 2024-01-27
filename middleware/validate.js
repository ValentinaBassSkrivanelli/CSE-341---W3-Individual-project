const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    nombre: 'required|string',
    director: 'required|string',
    clasificacion: 'required|string',
  
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact
};