import {
    BrowserRouter, Routes, Route
} from "react-router-dom";
import HomeScreen from "../../Screen/Home/HomeScreen";
import LanguagesScreen from "../../Screen/Languages/LanguagesScreen";
import BrandScreen from '../../Screen/ManageBrand/Brand/BrandScreen';
import CategoryScreen from '../../Screen/ManageBrand/Category/CategoryScreen';
import SubCategoryScreen from '../../Screen/ManageBrand/SubCategory/SubCategoryScreen';
import ModelScreen from '../../Screen/ManageBrand/Model/ModelScreen';
import SeriesScreen from '../../Screen/ManageBrand/Series/SeriesScreen';
import UserScreen from '../../Screen/User/UserScreen';
import RoleAccessScreen from '../../Screen/RoleAccess/RoleAccessScreen';
import InstallationScreen from '../../Screen/Installation/InstallationScreen';
import TroubleShootingScreen from '../../Screen/TroubleShooting/TroubleShootingScreen';
import FAQScreen from '../../Screen/FAQ/FAQScreen';
import LayoutScreen from "../../Screen/Layout/LayoutScreen";

const ScreenNavigation = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutScreen />} >
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/home" element={<HomeScreen />} />
                    <Route path="/language" element={<LanguagesScreen />} />
                    <Route path="/brand" element={<BrandScreen />} />
                    <Route path="/category" element={<CategoryScreen />} />
                    <Route path="/subcategory" element={<SubCategoryScreen />} />
                    <Route path="/model" element={<ModelScreen />} />
                    <Route path="/series" element={<SeriesScreen />} />
                    <Route path="/user" element={<UserScreen />} />
                    <Route path="/roleaccess" element={<RoleAccessScreen />} />
                    <Route path="/installation" element={<InstallationScreen />} />
                    <Route path="/troubleshoot" element={<TroubleShootingScreen />} />
                    <Route path="/faq" element={<FAQScreen />} />
                    <Route path="/*" element={<HomeScreen />} />
                </Route>

            </Routes>
        </BrowserRouter>

    );
}

export default ScreenNavigation;