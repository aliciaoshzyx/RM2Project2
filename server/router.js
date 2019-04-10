const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/changePass', mid.requiresLogin, controllers.Account.changePassPage);
  app.post('/changePass', mid.requiresLogin, controllers.Account.changePassword);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Pokemon.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Pokemon.make);
  app.get('/community', mid.requiresLogin, controllers.Pokemon.communityPage);
  app.get('/info', mid.requiresLogin, controllers.Pokemon.infoPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', controllers.notFound);
};

module.exports = router;
