// assets
import { IconMoneybag } from '@tabler/icons-react';

// constant
const icons = {
    IconMoneybag
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const ProjectExpense = {
  id: 'ProjectExpense-group',
  type: 'group',
  children: [
    {
      id: 'Manage expense',
      title: 'projects Expense ',
      type: 'collapse',
      icon: icons.IconMoneybag,
      children: [
        {
          id: 'Manage projects expense',
          title: 'Add expense',
          type: 'item',
          url: '/ProjectExpense/add',
          target: false
        },
        {
          id: 'edit projects expense',
          title: 'Edit expense',
          type: 'item',
          url: '/ProjectExpense/edit',
          target: false
        }
      ]
    }
  ]
};

export default ProjectExpense;
