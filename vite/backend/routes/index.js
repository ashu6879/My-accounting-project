const express = require('express');
const { signup, login } = require('../controllers/authController');
const projectCategoryController = require('../controllers/projectCategoryController');
const clientCategoryController = require('../controllers/clientCategoryController');
const clientController = require('../controllers/clientController');
const projectController = require('../controllers/projectController');
const invoiceController = require('../controllers/invoiceController');
const invoiceItemController = require('../controllers/invoiceItemController');
const currencyController = require('../controllers/currencyController');
const expenseController = require('../controllers/projectExpense');

const router = express.Router();

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);

// Protect all the routes below with token verification

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
router.get('/clientcategories/all', clientCategoryController.getAllClientCategories);

// Client Routes
router.post('/clients', clientController.addClient);
router.get('/clients', clientController.getClients);
router.get('/total-clients', clientController.getTotalClients);
router.delete('/clients/:id', clientController.deleteClient);
router.put('/clients/:id', clientController.updateClient);

// Project Routes
router.post('/projects', projectController.addProject);
router.get('/projects', projectController.getProject);
router.get('/projects/count', projectController.getTotalProject);
router.delete('/projects/:id', projectController.deleteProject);
router.put('/projects/:id', projectController.updateProject);
router.get('/getProjectByClientID/:clientID', projectController.getProjectByClientID);

// Invoice Routes
router.post('/invoices', invoiceController.addInvoice);
router.get('/invoices', invoiceController.getInvoices);
router.get('/invoices/count', invoiceController.getTotalInvoices);
router.delete('/invoices/:id', invoiceController.deleteInvoice);
router.put('/invoices/:id', invoiceController.updateInvoice);

// Invoice Item Routes
router.post('/invoiceItem', invoiceItemController.addInvoiceItem);
router.get('/invoiceItem', invoiceItemController.getInvoiceItems);
router.get('/invoiceItem/:id', invoiceItemController.getInvoiceItemById);
router.put('/invoiceItem/:invtID', invoiceItemController.updateInvoiceItem);
router.delete('/invoiceItem/:invtID', invoiceItemController.deleteInvoiceItemByInvtID);
router.get('/getInvoiceItemByInvID/:invID', invoiceItemController.getInvoiceItemByInvID);

// Currency Routes
router.post('/currencies', currencyController.addCurrency);
router.get('/currencies', currencyController.getCurrency);
router.get('/currencies/:currencyID', currencyController.getCurrencyByID);
router.delete('/currencies/:id', currencyController.deleteCurrency);
router.put('/currencies/:id', currencyController.updateCurrency);

// Expense Routes
router.post('/Expense', expenseController.addExpense);
router.get('/Expense', expenseController.getExpense);
router.get('/Expense/:projectID', expenseController.getExpenseById);
router.delete('/Expense/:id', expenseController.deleteExpense);
router.put('/Expense/:id', expenseController.updateExpense);

module.exports = router;
