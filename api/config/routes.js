import * as AdminController from '../controllers/AdminController'
import * as CompanyController from '../controllers/CompanyController';
import * as DealController from '../controllers/DealController';
import * as DashboardController from '../controllers/DashboardController';
import * as SearchController from '../controllers/SearchController';
import * as NotificationController from '../controllers/NotificationController';
import * as NewsController from '../controllers/NewsController'
import * as LabController from '../controllers/LabController';
import * as LookupController from '../controllers/LookupController';
import * as MatchController from '../controllers/MatchController';
import * as TeamController from '../controllers/TeamController';
import * as UserController from '../controllers/UserController';

exports.routes = (app, callback) => {

  // Test
  // app.get('/api/test', passport.authenticate('local', { failureRedirect: '/login' }), (req, res, next) => {
  //   res.send('Test Worked')
  // });
  // app.get('/api/test/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res, next) => {
  //   res.send('Test Worked')
  // });
  app.get('*', (req, res, next) => {
    if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https') && process.env.NODE_ENV === 'production') {
        res.redirect('https://platform.' + req.get('Host') + req.url);
    } else {
      next()
    }
  });

// Experimental Test routes
app.post('/api/lab/upload', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  LabController.uploadTest(req, res)
});
app.get('/api/lab/download', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  LabController.downloadTest(req, res)
});

// Admin routes
app.post('/api/admin/companies/get', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  AdminController.getCompanies(req, res)
});
app.post('/api/admin/activate', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  AdminController.activateCompany(req, res)
});
app.post('/api/admin/uploadcsv', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  AdminController.uploadCompanyProfiles(req, res)
});
app.get('/api/admin/fixtypes', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  AdminController.updatePlatformTypes(req, res)
});
app.delete('/api/admin/company', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  AdminController.deleteCompany(req, res)
});
app.delete('/api/admin/deal', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  AdminController.deleteDeal(req, res)
});
// ====

// Company Routes
  app.get('/api/company', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    CompanyController.getCompany(req, res)
  });
// ====
  app.post('/api/company/edit', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    CompanyController.editCompany(req, res)
  });
// ====
  app.post('/api/company/create', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    CompanyController.createCompany(req, res)
  });
// ====
  app.post('/api/company/search', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    SearchController.CompanySearch(req, res);
  });
// ====
  app.post('/api/search/save', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    SearchController.SaveFilters(req, res);
  });
// ====
  app.post('/api/search/delete', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    SearchController.DeleteFilter(req, res);
  });
// ====
  app.get('/api/search/get', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    SearchController.GetSavedFilterList(req, res);
  });
// ====
  app.get('/api/search/load', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    SearchController.LoadSavedFIlter(req, res);
  });
// ====
app.post('/api/deal/search', (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  SearchController.DealSearch(req, res);
});

// Deal Routes
  app.get('/api/deal', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    DealController.getDeal(req, res);
  });
// ====
  app.post('/api/deal/create', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    DealController.createDeal(req, res);
  });
// ====
  app.post('/api/deal/edit', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    DealController.editDeal(req, res);
  });
// ====
  app.post('/api/deal/search/filters', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    DealController.getFilters(req, res);
  });
// ====
  app.get('/api/deal/list/active', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    DealController.getActiveDealList(req, res);
  });
// ====
  app.get('/api/deal/matchdropdown', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    DealController.getMatchDropdown(req, res);
  });

  // Match Routes
  app.post('/api/match/create', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    MatchController.createMatch(req, res);
  });
// ====
  app.post('/api/match/lendermanager', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    MatchController.initLenderManager(req, res);
  });
  // ====
  app.get('/api/match/deallist', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    MatchController.getDealMatchList(req, res);
  });
  // ====
  app.get('/api/match/list', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    MatchController.getCounterPartyList(req, res);
  });
  // ====
  app.post('/api/match/update', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    MatchController.updateMatch(req, res);
  });
  // ====
  app.get('/api/match/messages', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    MatchController.getMatchMessages(req, res);
  });
  // ====
  app.post('/api/match/messages', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    MatchController.sendMatchMessage(req, res);
  });


// Search Routes
  app.get('/api/search/autodeallist', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    SearchController.autoDealList(req, res);
  });
// ====
app.get('/api/search/autolenderlist', (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  SearchController.autoLenderList(req, res);
});
// ====

// Lookup Routes
app.get('/api/epilogue/lookups/all', (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  LookupController.getAllLookups(req, res);
});
// ====
app.post('/api/lookups/new', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  LookupController.newLookup(req, res);
});
// ====
app.post('/api/lookups/delete', (req, res, next) => {
  if(req.isAuthenticated() && req.user.get().admin === true) {
    next()
  } else {
    res.status(403).send('not authed')
  }
}, (req, res, next) => {
  LookupController.deleteLookups(req, res);
});
// ====

  // Notification Routes
  app.get('/api/notifications/unread', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    NotificationController.getUnreadNotifications(req, res);
  });
// ====
  app.post('/api/notifications/dismiss', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    NotificationController.dismissNotification(req, res);
  });
// ====

  // News Routes
  app.get('/api/news', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    NewsController.getNews(req, res);
  });

  // Team Routes
  app.get('/api/team', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    TeamController.getTeam(req, res);
  });
  // ====

  // User Routes
  app.post('/api/user/register', (req, res, next) => {
    UserController.registerUser(req, res)
  });
  app.post('/api/user/helpmessage', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    UserController.helpMessage(req, res)
  });
  app.post('/api/signup', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    UserController.createUser(req, res)
  });
  app.post('/api/account/edit', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    UserController.edit(req, res)
  });
  app.get('/api/account', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    UserController.accountInit(req, res)
  });
  app.get('/api/user/checkemail', (req, res, next) => {
    UserController.checkEmail(req, res)
  });
// ====
  app.get('/api/dashboard/init', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    DashboardController.init(req, res)
  });
  app.get('/api/userinfo', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    UserController.userInfo(req, res)
  });
  app.get('/api/user/signed_terms', (req, res, next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.status(403).send('not authed')
    }
  }, (req, res, next) => {
    UserController.signTerms(req, res)
  });
  app.get('/api/authcheck', (req, res, next) => {
    if(req.isAuthenticated()) {
      let userInfo = req.user.get()
      delete userInfo.password
      let showTerms = false
      let initialSetup = false
      if(userInfo.signed_terms === false){
        showTerms = true
      }
      if(userInfo.initial_setup_complete === false){
        initialSetup = true
      }
      res.json({auth: true, user: userInfo, showTerms: showTerms, initialSetup: initialSetup})
    } else {
      res.status(403).send('not authed')
    }
  });
// ====

  return callback(app);
};
