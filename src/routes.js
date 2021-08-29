import { Router } from 'express';
import cors from 'cors';

import GrowdeverController from './app/controllers/GrowdeverController';
import UserController from './app/controllers/UserController';
import ClassController from './app/controllers/ClassController';
import AuthController from './app/controllers/AuthController';

import userValidator from './app/validators/user';
import growdeverValidator from './app/validators/growdever';
import classValidator from './app/validators/class';

import AuthMiddleware from './app/middlewares/auth';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => {
  res.json({ result: 'teste API' });
});

// AUTH ROUTES (PUBLIC)
routes.post('/login', AuthController.store);
routes.post('/users', userValidator, UserController.store);

// ------ FROM HERE, PRIVATE ROUTES ------//
routes.use(AuthMiddleware);

// CLASS ROUTES (PRIVATE)
routes.post('/classes', classValidator, ClassController.store);
routes.get('/classes', ClassController.index);
routes.get('/classes/:uid', ClassController.show);
routes.put('/classes/:uid', classValidator, ClassController.update);
routes.delete('/classes/:uid', ClassController.delete);

// USER ROUTES (PRIVATE)
routes.get('/users', UserController.index);
routes.get('/users/:uid', UserController.show);
routes.put('/users/:uid', userValidator, UserController.update);

// GROWDEVER ROUTES (PRIVATE)
routes.post('/growdevers', growdeverValidator, GrowdeverController.store);
routes.get('/growdevers', GrowdeverController.index);
routes.get('/growdevers/:uid', GrowdeverController.show);
routes.put('/growdevers/:uid', growdeverValidator, GrowdeverController.update);
routes.delete('/growdevers/:uid', GrowdeverController.delete);

export default routes;
