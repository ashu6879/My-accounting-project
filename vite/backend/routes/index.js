const express = require('express');
const { signup, login } = require('../controllers/authController');
const projectCategoryController = require('../controllers/projectCategoryController');
const clientCategoryController = require('../controllers/clientCategoryController');
const clientController = require('../controllers/clientController'); // Import the client controller
const projectController = require('../controllers/projectController');

const router = express.Router();

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);

// Project Category Routes
router.post('/projectcategories', projectCategoryController.addProjectCategory);
router.get('/projectcategories', projectCategoryController.getProjectCategories);
router.get('/total-categories', projectCategoryController.getTotalCategories);
router.delete('/projectcategories/:id', projectCategoryController.deleteProjectCategory);
router.put('/projectcategories/:id', projectCategoryController.updateProjectCategory);

// Client Category Routes
router.post('/clientcategories', clientCategoryController.addClientCategory);
router.get('/clientcategories', clientCategoryController.getClientCategories);
router.get('/total-client-categories', clientCategoryController.getTotalClientCategories);
router.delete('/clientcategories/:id', clientCategoryController.deleteClientCategory);
router.put('/clientcategories/:id', clientCategoryController.updateClientCategory);
router.get('/clientcategories/all', clientCategoryController.getAllClientCategories);  // Without pagination

// Client Routes
router.post('/clients', clientController.addClient);
router.get('/clients', clientController.getClients);
router.get('/total-clients', clientController.getTotalClients);
router.delete('/clients/:id', clientController.deleteClient);
router.put('/clients/:id', clientController.updateClient);

//project routes
router.post('/projects', projectController.addProject);
router.get('/projects', projectController.getProject);
router.get('/projects/count', projectController.getTotalProject);
router.delete('/projects/:id', projectController.deleteProject);
router.put('/projects/:id', projectController.updateProject);

module.exports = router;
