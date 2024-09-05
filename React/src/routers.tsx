import { createBrowserRouter } from 'react-router-dom';
import  Login  from '../src/components/Share/login.tsx';
import Header from './components/Share/Header.tsx';
import Register from './components/Share/register.tsx';
import Products from './components/User/products.tsx';
import Home from '../src/components/User/home.tsx';
import AllProduct from '../src/components/Admin/allProducts.tsx';
import AllUsers from '../src/components/Admin/allUsers.tsx';

const Root = () => (
    <Header />
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Login />,
      },{
        path:'/register',
        element: <Register />,
      },{
        path:'/products',
        element: <Products />,
      },{
        path:'/userHome',
        element: <Home />,
      },{
        path:'/allProducts',
        element: <AllProduct />,
      },{
        path:'/allUsers',
        element: <AllUsers />,
      },{
        path:'/login',
        element: <Login />,
      }
    ],
  },
  {
    path: '*',
    element: <div style={{ color: 'red' }}>404 - Page not found</div>,
  },
]);
