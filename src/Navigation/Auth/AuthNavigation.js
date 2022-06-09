import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LoginScreen from '../../Screen/Login/LoginScreen'
import SelectLanguageScreen from '../../Screen/Login/SelectLanguageScreen'

const AuthNavigation = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/selectlanguage" element={<SelectLanguageScreen />} />
                <Route path="*" element={<LoginScreen />} />
            </Routes>
        </BrowserRouter>

    );
}

export default AuthNavigation;