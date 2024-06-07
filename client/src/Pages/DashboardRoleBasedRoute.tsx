// // src/components/RoleBasedRoute.tsx
// import React, { Suspense, useContext } from 'react';
// import { Route, Redirect, RouteProps } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

// const AdminDashboard = React.lazy(() => import('../views/AdminDashboard'));
// const ManagerDashboard = React.lazy(() => import('../views/ManagerDashboard'));
// const EmployeeDashboard = React.lazy(
//   () => import('../views/EmployeeDashboard')
// );
// const ClientDashboard = React.lazy(() => import('../views/ClientDashboard'));
// const ViewerDashboard = React.lazy(() => import('../views/ViewerDashboard'));

// const RoleBasedRoute: React.FC<RouteProps> = ({ ...rest }) => {
//   const { userRole } = useContext(UserContext);

//   const renderComponent = () => {
//     switch (userRole) {
//       case 'admin':
//         return <AdminDashboard />;
//       case 'manager':
//         return <ManagerDashboard />;
//       case 'employee':
//         return <EmployeeDashboard />;
//       case 'client':
//         return <ClientDashboard />;
//       case 'viewer':
//         return <ViewerDashboard />;
//       default:
//         return <Redirect to="/login" />;
//     }
//   };

//   return (
//     <Route
//       {...rest}
//       render={() => (
//         <Suspense fallback={<div>Loading...</div>}>
//           {renderComponent()}
//         </Suspense>
//       )}
//     />
//   );
// };

// export default RoleBasedRoute;
