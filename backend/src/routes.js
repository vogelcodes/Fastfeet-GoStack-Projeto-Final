import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';
import PackageController from './app/controllers/PackageController';
import NotificationController from './app/controllers/NotificationController';
import DeliveryController from './app/controllers/DeliveryController';
import SigninController from './app/controllers/SigninController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/recipients', RecipientController.index);
routes.post('/signin', SigninController.post);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/recipients', RecipientController.store);
routes.post('/couriers', CourierController.store);

routes.post('/packages', PackageController.store);
routes.put('/packages', PackageController.update);
routes.get('/packages', PackageController.index);
routes.delete('/packages/:id', PackageController.delete);

routes.get('/couriers', CourierController.index);
routes.get('/courier/:id/deliveries', DeliveryController.index);
routes.put('/package/end', DeliveryController.update);
routes.post('/delivery/issues', DeliveryController.store);
routes.delete('/issue/:id/cancel-delivery', DeliveryController.delete);

routes.delete('/recipients', RecipientController.delete);
routes.put('/recipients', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
