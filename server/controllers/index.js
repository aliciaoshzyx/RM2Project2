module.exports.Account = require('./Account.js');
module.exports.Pokemon = require('./Pokemon.js');

const notFound = (req, res) => {
    res.render('notFound');
  };

  module.exports.notFound = notFound;