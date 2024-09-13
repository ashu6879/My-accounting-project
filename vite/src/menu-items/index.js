import dashboard from './dashboard';
// import pages from './pages';
import project from './project';
import category from './category';
import manageClients from './manageClients';
import manageProject from './manageproject';
import manageInvoice from './manageInvoice';
import ProjectExpense from './ProjectExpense';
// import managecurrency from './ManageCurrency';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, project, category, manageClients,manageProject,manageInvoice,ProjectExpense]
};

export default menuItems;
