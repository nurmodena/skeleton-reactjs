import axios from "axios";
import Swal from "sweetalert2";
import { SET_INSTALLATION, SET_LANGUAGES } from "../Reducer/InstallationReducer";


const setInstallation = (installation) => dispatch => {
    dispatch({ type: SET_INSTALLATION, installation });
}

const setLanguages = (languages) => dispatch => {
    dispatch({ type: SET_LANGUAGES, languages });
}

export { setInstallation, setLanguages };