import axios from "axios";
import Swal from "sweetalert2";
import {
    SET_TROUBLESHOOT_DRAFT,
    SET_TROUBLESHOOT,
    SET_TROUBLESHOOT_CONTENT,
    SET_TROUBLESHOOT_HEADER,
    SET_DELETED_TROUBLESHOOT_HEADER,
    SET_DELETED_TROUBLESHOOT_CONTENT
} from "../Reducer/TroubleShootReducer";

const setTroubleshoot = (troubleshoot) => dispatch => {
    dispatch({ type: SET_TROUBLESHOOT, troubleshoot });
}

const setTroubleshootHeader = (troubleshoot_header) => dispatch => {
    dispatch({ type: SET_TROUBLESHOOT_HEADER, troubleshoot_header });
}

const setTroubleshootContent = (troubleshoot_content) => dispatch => {
    dispatch({ type: SET_TROUBLESHOOT_CONTENT, troubleshoot_content });
}

const setDeletedTroubleshootHeader = (deleted_header) => dispatch => {
    dispatch({ type: SET_DELETED_TROUBLESHOOT_HEADER, deleted_header });
}

const setDeletedTroubleshootContent = (deleted_content) => (dispatch, getState) => {
    dispatch({ type: SET_DELETED_TROUBLESHOOT_CONTENT, deleted_content });
}

const setTroubleshootDraft = (isDraft) => dispatch => {
    dispatch({ type: SET_TROUBLESHOOT_DRAFT, isDraft });
}

export {
    setTroubleshoot,
    setTroubleshootDraft,
    setTroubleshootHeader,
    setTroubleshootContent,
    setDeletedTroubleshootHeader,
    setDeletedTroubleshootContent
};