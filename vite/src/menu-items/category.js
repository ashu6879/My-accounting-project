// assets
import { IconCategoryFilled } from '@tabler/icons-react';

// constant
const icons = {
  IconCategoryFilled
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const category = {
  id: 'client-group',
  // title: 'Client Categories',
  type: 'group',
  children: [
    {
      id: 'Client-categories',
      title: 'Client Categories',
      type: 'collapse',
      icon: icons.IconCategoryFilled,
      children: [
        {
          id: 'add-category',
          title: 'Add category',
          type: 'item',
          url: '/category/add',
          target: false
        },
        {
          id: 'edit-category',
          title: 'Edit category',
          type: 'item',
          url: '/category/edit',
          target: false
        }
      ]
    }
  ]
};

export default category;
