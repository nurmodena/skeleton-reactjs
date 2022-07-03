import axios from "axios";
import Swal from "sweetalert2";
import {
    SET_DRAFT,
    SET_INSTALLATION,
    SET_LANGUAGES,
    SET_INSTALLATION_CONTENT,
    SET_INSTALLATION_HEADER,
    SET_DELETED_HEADER,
    SET_DELETED_CONTENT
} from "../Reducer/InstallationReducer";


const setInstallation = (installation) => dispatch => {
    console.log('2 installation', installation);
    dispatch({ type: SET_INSTALLATION, installation });
}

const setLanguages = (languages) => dispatch => {
    dispatch({ type: SET_LANGUAGES, languages });
}

const setInstallationHeader = (installation_header) => dispatch => {
    dispatch({ type: SET_INSTALLATION_HEADER, installation_header });
}

const setInstallationContent = (installation_content) => dispatch => {
    dispatch({ type: SET_INSTALLATION_CONTENT, installation_content });
}

const setDeletedHeader = (deleted_header) => dispatch => {
    dispatch({ type: SET_DELETED_HEADER, deleted_header });
}

const setDeletedContent = (deleted_content) => (dispatch, getState) => {
    dispatch({ type: SET_DELETED_CONTENT, deleted_content });
}


const setInstallationDraft = (isDraft) => dispatch => {
    dispatch({ type: SET_DRAFT, isDraft });
}

export {
    setInstallation,
    setLanguages,
    setInstallationDraft,
    setInstallationHeader,
    setInstallationContent,
    setDeletedHeader,
    setDeletedContent
};