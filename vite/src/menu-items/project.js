// assets
import { IconBrandProducthunt } from '@tabler/icons-react';

// constant
const icons = {
  IconBrandProducthunt
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const project = {
  id: 'project-group',
  // title: 'Project Categories',
  type: 'group',
  children: [
    {
      id: 'project-categories',
      title: 'Project Categories',
      type: 'collapse',
      icon: icons.IconBrandProducthunt,
      children: [
        {
          id: 'add-categories',
          title: 'Add Categories',
          type: 'item',
          url: '/project/add',
          target: false
        },
        {
          id: 'edit-categories',
          title: 'Edit Categories',
          type: 'item',
          url: '/project/edit',
          target: false
        }
      ]
    }
  ]
};

export default project;
