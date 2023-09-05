import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from '../../Screen/Home/HomeScreen';
import LanguagesScreen from '../../Screen/Languages/LanguagesScreen';
import UserScreen from '../../Screen/User/UserScreen';
import RoleAccessScreen from '../../Screen/RoleAccess/RoleAccessScreen';
import LayoutScreen from '../../Screen/Layout/LayoutScreen';
import UserDetailScreen from '../../Screen/User/UserDetailScreen';
import RoleAccessDetailScreen from '../../Screen/RoleAccess/RoleAccessDetailScreen';
import { useSelector } from 'react-redux';

const ToHome = () => {
  const refreshPath = useSelector(({ auth: { refreshPath } }) => refreshPath);
  const path = refreshPath.replace('login', 'dashboard').split('/').slice(0, 4).join('/');
  return <Navigate to={path} replace={true} />;
};

const ScreenNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutScreen />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/dashboard" element={<HomeScreen />} />
          <Route path="/language" element={<LanguagesScreen />} />
          { /** <Route path="/series" element={<SeriesScreen />} /> */}
          <Route path="/user" element={<UserScreen />} />
          <Route path="/user/:pageState/:username" element={<UserDetailScreen />} />
          <Route path="/roleaccess" element={<RoleAccessScreen />} />
          <Route path="/roleaccess/:pageState/:roleid" element={<RoleAccessDetailScreen />} />
          <Route path="/*" element={<ToHome />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default ScreenNavigation;
