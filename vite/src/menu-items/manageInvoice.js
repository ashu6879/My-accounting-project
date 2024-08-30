// assets
import { IconFileDollar } from '@tabler/icons-react';

// constant
const icons = {
    IconFileDollar
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const generateInvoice = {
  id: 'generateInvoice',
  // title: 'Manage Clients',
  type: 'group',
  children: [
    {
      id: 'Manage invoice',
      title: 'Generate Invoice',
      type: 'collapse',
      icon: icons.IconFileDollar,
      children: [
        {
          id: 'Manage ',
          title: 'Add Invoice',
          type: 'item',
          url: '/ManageInvoice/add',
          target: false
        },
        {
          id: 'edit-invoice',
          title: 'Edit invoice',
          type: 'item',
          url: '/ManageInvoice/edit',
          target: false
        }
      ]
    }
  ]
};

export default generateInvoice;
