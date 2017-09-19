import crypto from 'crypto'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import responseHandler from '../helpers/responseHelper';
import Sequelize from 'sequelize'

import * as UserController from '../controllers/UserController'

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());


  passport.use(new LocalStrategy((email, password, done) => {
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
    return global.database.User.findOne({
      where: {
        email: email,
        password: hashedPassword,
      },
      include: [{
          model: global.database.Company,
      }]
    }).then((user) => {
      if (!user) {
        return done(null, false);
      }
      let userProfile = user.toJSON();
      delete userProfile.password;
      return done(null, userProfile);
    }).catch((err)=>{
      return done(err)
    })
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    global.database.User.findOne({
      where: {
        id: id,
      },
      include: [{
          model: global.database.Company,
      }]
    }).then((userInstance) => {
      cb(null, userInstance);
    })
    .catch((err) => {
      return cb(err)
    })
  });

  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.json({
      user: req.user,
    })
  })

  app.get('/auth/logout', (req, res, next) => {
    req.logout()
    req.session.destroy()
    return responseHandler(res, 'Success', 'Logged Out');
  })

  app.post('/auth/create', (req, res, next) => {
    // create user here
    next()
  }, passport.authenticate('local'), (req, res) => {
    res.json({
      userId: req.user.id
    })
  })

  app.get('/auth/forgot', (req, res) => {
    UserController.ForgotPasswordRequest(req, res)
  })

  app.post('/auth/forgot', (req, res) => {
    UserController.ForgotPasswordUpdate(req, res)
  })


}
