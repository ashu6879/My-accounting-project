// assets
import { IconMoneybag } from '@tabler/icons-react';

// constant
const icons = {
    IconMoneybag
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const managecurrency = {
  id: 'clientCategory-group',
  // title: 'Manage Clients',
  type: 'group',
  children: [
    {
      id: 'Manage Currency',
      title: 'Manage Currency',
      type: 'collapse',
      icon: icons.IconMoneybag,
      children: [
        {
          id: 'Manage Currency',
          title: 'Add Currency',
          type: 'item',
          url: '/ManageCurrency/add',
          target: false
        },
        {
          id: 'edit-Currency',
          title: 'Edit Currency',
          type: 'item',
          url: '/ManageCurrency/edit',
          target: false
        }
      ]
    }
  ]
};

export default managecurrency;
