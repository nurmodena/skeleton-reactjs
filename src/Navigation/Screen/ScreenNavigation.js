import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from '../../Screen/Home/HomeScreen';
import LanguagesScreen from '../../Screen/Languages/LanguagesScreen';
import BrandScreen from '../../Screen/ManageBrand/Brand/BrandScreen';
import CategoryScreen from '../../Screen/ManageBrand/Category/CategoryScreen';
import SubCategoryScreen
  from '../../Screen/ManageBrand/SubCategory/SubCategoryScreen';
import ModelScreen from '../../Screen/ManageBrand/Model/ModelScreen';
import SeriesScreen from '../../Screen/ManageBrand/Series/SeriesScreen';
import UserScreen from '../../Screen/User/UserScreen';
import RoleAccessScreen from '../../Screen/RoleAccess/RoleAccessScreen';
import InstallationScreen from '../../Screen/Installation/InstallationScreen';
import TroubleShootingScreen
  from '../../Screen/TroubleShooting/TroubleShootingScreen';
import FAQScreen from '../../Screen/FAQ/FAQScreen';
import LayoutScreen from '../../Screen/Layout/LayoutScreen';
import ModelDetailScreen from '../../Screen/ManageBrand/Model/ModelDetailScreen';
import UserDetailScreen from '../../Screen/User/UserDetailScreen';
import RoleAccessDetailScreen from '../../Screen/RoleAccess/RoleAccessDetailScreen';
import TroubleShootingDetailScreen from '../../Screen/TroubleShooting/TroubleShootingDetailScreen';
import TroubleShootingContentScreen from '../../Screen/TroubleShooting/TroubleShootingContentScreen';
import InstallationDetailScreen from '../../Screen/Installation/InstallationDetailScreen';
import InstallationContentScreen from '../../Screen/Installation/InstallationContentScreen';
import FAQDetailScreen from '../../Screen/FAQ/FAQDetailScreen';
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
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/dashboard" element={<HomeScreen />} />
          <Route path="/language" element={<LanguagesScreen />} />
          <Route path="/brand" element={<BrandScreen />} />
          <Route path="/category" element={<CategoryScreen />} />
          <Route path="/subcategory" element={<SubCategoryScreen />} />
          <Route path="/model" element={<ModelScreen />} />
          <Route path="/model/:pageState/:modelid" element={<ModelDetailScreen />} />
          { /** <Route path="/series" element={<SeriesScreen />} /> */}
          <Route path="/user" element={<UserScreen />} />
          <Route path="/user/:pageState/:username" element={<UserDetailScreen />} />
          <Route path="/roleaccess" element={<RoleAccessScreen />} />
          <Route path="/roleaccess/:pageState/:roleid" element={<RoleAccessDetailScreen />} />
          <Route path="/installation" element={<InstallationScreen />} />
          <Route path="/installation/:pageState/:dataid" element={<InstallationDetailScreen />} />
          <Route path="/installation/:pageState/:dataid/content/:contentState/:contentid" element={<InstallationContentScreen />} />
          <Route path="/troubleshoot" element={<TroubleShootingScreen />} />
          <Route path="/troubleshoot/:pageState/:dataid" element={<TroubleShootingDetailScreen />} />
          <Route path="/troubleshoot/:pageState/:dataid/content/:contentState/:contentid" element={<TroubleShootingContentScreen />} />
          <Route path="/faq" element={<FAQScreen />} />
          <Route path="/faq/:pageState/:dataid" element={<FAQDetailScreen />} />
          <Route path="/*" element={<ToHome />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default ScreenNavigation;
