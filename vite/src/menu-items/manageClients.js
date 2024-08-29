// assets
import { IconUsers } from '@tabler/icons-react';

// constant
const icons = {
    IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const manageClients = {
  id: 'clientCategory-group',
  // title: 'Manage Clients',
  type: 'group',
  children: [
    {
      id: 'Manage Clients',
      title: 'Manage Clients',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'Manage Clients',
          title: 'Add Client',
          type: 'item',
          url: '/ManageClient/add',
          target: false
        },
        {
          id: 'edit-Client',
          title: 'Edit Client',
          type: 'item',
          url: '/ManageClient/edit',
          target: false
        }
      ]
    }
  ]
};

export default manageClients;
