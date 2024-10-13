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
const verifyToken = require('../middleware/verifyToken'); // Import the token verification middleware

const router = express.Router();

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);

// Protect all the routes below with token verification

// Project Category Routes
router.post('/projectcategories', verifyToken, projectCategoryController.addProjectCategory);
router.get('/projectcategories', verifyToken, projectCategoryController.getProjectCategories);
router.get('/total-categories', verifyToken, projectCategoryController.getTotalCategories);
router.delete('/projectcategories/:id', verifyToken, projectCategoryController.deleteProjectCategory);
router.put('/projectcategories/:id', verifyToken, projectCategoryController.updateProjectCategory);

// Client Category Routes
router.post('/clientcategories', verifyToken, clientCategoryController.addClientCategory);
router.get('/clientcategories', verifyToken, clientCategoryController.getClientCategories);
router.get('/total-client-categories', verifyToken, clientCategoryController.getTotalClientCategories);
router.delete('/clientcategories/:id', verifyToken, clientCategoryController.deleteClientCategory);
router.put('/clientcategories/:id', verifyToken, clientCategoryController.updateClientCategory);
router.get('/clientcategories/all', verifyToken, clientCategoryController.getAllClientCategories);

// Client Routes
router.post('/clients', verifyToken, clientController.addClient);
router.get('/clients', verifyToken, clientController.getClients);
router.get('/total-clients', verifyToken, clientController.getTotalClients);
router.delete('/clients/:id', verifyToken, clientController.deleteClient);
router.put('/clients/:id', verifyToken, clientController.updateClient);

// Project Routes
router.post('/projects', verifyToken, projectController.addProject);
router.get('/projects', verifyToken, projectController.getProject);
router.get('/projects/count', verifyToken, projectController.getTotalProject);
router.delete('/projects/:id', verifyToken, projectController.deleteProject);
router.put('/projects/:id', verifyToken, projectController.updateProject);
router.get('/getProjectByClientID/:clientID', verifyToken, projectController.getProjectByClientID);

// Invoice Routes
router.post('/invoices', verifyToken, invoiceController.addInvoice);
router.get('/invoices', verifyToken, invoiceController.getInvoices);
router.get('/invoices/count', verifyToken, invoiceController.getTotalInvoices);
router.delete('/invoices/:id', verifyToken, invoiceController.deleteInvoice);
router.put('/invoices/:id', verifyToken, invoiceController.updateInvoice);

// Invoice Item Routes
router.post('/invoiceItem', verifyToken, invoiceItemController.addInvoiceItem);
router.get('/invoiceItem', verifyToken, invoiceItemController.getInvoiceItems);
router.get('/invoiceItem/:id', verifyToken, invoiceItemController.getInvoiceItemById);
router.put('/invoiceItem/:invtID', verifyToken, invoiceItemController.updateInvoiceItem);
router.delete('/invoiceItem/:invtID', verifyToken, invoiceItemController.deleteInvoiceItemByInvtID);
router.get('/getInvoiceItemByInvID/:invID', verifyToken, invoiceItemController.getInvoiceItemByInvID);

// Currency Routes
router.post('/currencies', verifyToken, currencyController.addCurrency);
router.get('/currencies', verifyToken, currencyController.getCurrency);
router.get('/currencies/:currencyID', verifyToken, currencyController.getCurrencyByID);
router.delete('/currencies/:id', verifyToken, currencyController.deleteCurrency);
router.put('/currencies/:id', verifyToken, currencyController.updateCurrency);

// Expense Routes
router.post('/Expense', verifyToken, expenseController.addExpense);
router.get('/Expense', verifyToken, expenseController.getExpense);
router.get('/Expense/:projectID', verifyToken, expenseController.getExpenseById);
router.delete('/Expense/:id', verifyToken, expenseController.deleteExpense);
router.put('/Expense/:id', verifyToken, expenseController.updateExpense);

module.exports = router;
