import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// authentication routing
const Login3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// project categories routing
const AddCategory = Loadable(lazy(() => import('views/project/AddProject'))); // Adjust the path as needed
const EditCategory = Loadable(lazy(() => import('views/project/EditProject'))); // Adjust the path as needed
const AddCategoryClient = Loadable(lazy(() => import('views/category/AddCategory'))); // Adjust the path as needed
const EditCategoryClient = Loadable(lazy(() => import('views/category/EditCategory'))); // Adjust the path as needed
const AddClient = Loadable(lazy(() => import('views/ManageClient/AddClient'))); // Adjust the path as needed
const EditClient = Loadable(lazy(() => import('views/ManageClient/EditClient'))); // Adjust the path as needed
const AddProject = Loadable(lazy(() => import('views/ManageProject/Add_project'))); // Adjust the path as needed
const EditProject = Loadable(lazy(() => import('views/ManageProject/Edit_project'))); // Adjust the path as needed

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <Login3 />  // Set Login3 as the default page
    },
    {
      path: 'dashboard',
      element: <MainLayout />,  // MainLayout as the wrapper
      children: [
        {
          path: '',
          element: <DashboardDefault />  // Dashboard content inside MainLayout
        }
      ]
    },
    {
      path: 'sample-page',
      element: <MainLayout />,  // MainLayout as the wrapper
      children: [
        {
          path: '',
          element: <SamplePage />  // Sample page content inside MainLayout
        }
      ]
    },
    {
      path: 'project',
      element: <MainLayout />,  // MainLayout as the wrapper
      children: [
        {
          path: 'add',
          element: <AddCategory />  // AddCategory page content inside MainLayout
        },
        {
          path: 'edit',  // The :id parameter allows editing specific categories
          element: <EditCategory />  // EditCategory page content inside MainLayout
        }
      ]
    },
    {
      path: 'category',
      element: <MainLayout />,  // MainLayout as the wrapper
      children: [
        {
          path: 'add',
          element: <AddCategoryClient />  // AddCategory page content inside MainLayout
        },
        {
          path: 'edit',  // The :id parameter allows editing specific categories
          element: <EditCategoryClient />  // EditCategory page content inside MainLayout
        }
      ]
    },
    {
      path: 'ManageClient',
      element: <MainLayout />,  // MainLayout as the wrapper
      children: [
        {
          path: 'add',
          element: <AddClient />  // AddCategory page content inside MainLayout
        },
        {
          path: 'edit',  // The :id parameter allows editing specific categories
          element: <EditClient />  // EditCategory page content inside MainLayout
        }
      ]
    },
    {
      path: 'ManageProject',
      element: <MainLayout />,  // MainLayout as the wrapper
      children: [
        {
          path: 'add',
          element: <AddProject />  // AddCategory page content inside MainLayout
        },
        {
          path: 'edit',  // The :id parameter allows editing specific categories
          element: <EditProject />  // EditCategory page content inside MainLayout
        }
      ]
    }
  ]
};

export default MainRoutes;
