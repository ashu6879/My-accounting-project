// assets
import { IconBriefcaseFilled } from '@tabler/icons-react';

// constant
const icons = {
    IconBriefcaseFilled
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const manageProject = {
  id: 'projectCategory-group',
  // title: 'Manage Clients',
  type: 'group',
  children: [
    {
      id: 'Manage projects',
      title: 'Manage projects',
      type: 'collapse',
      icon: icons.IconBriefcaseFilled,
      children: [
        {
          id: 'Manage projects',
          title: 'Add project',
          type: 'item',
          url: '/ManageProject/add',
          target: false
        },
        {
          id: 'edit-Client',
          title: 'Edit project',
          type: 'item',
          url: '/ManageProject/edit',
          target: false
        }
      ]
    }
  ]
};

export default manageProject;
