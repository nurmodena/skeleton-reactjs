const SET_INSTALLATION = 'SET_INSTALLATION';
const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_INSTALLATION_HEADER = 'SET_INSTALLATION_HEADER';
const SET_INSTALLATION_CONTENT = 'SET_INSTALLATION_CONTENT';
const SET_DELETED_HEADER = 'SET_DELETED_HEADER';
const SET_DELETED_CONTENT = 'SET_DELETED_CONTENT';
const SET_DRAFT = 'SET_DRAFT';

const init = {
    installation: { is_active: true, name: '', contents: [] },
    installation_header: [],
    installation_content: [],
    languages: [],
    isDraft: false,
    deleted_header: [],
    deleted_content: [],
}

const InstallationReducer = (state = init, action) => {
    switch (action.type) {
        case SET_INSTALLATION:
            const { installation } = action;
            return { ...state, installation, isDraft: true }
        case SET_LANGUAGES:
            const { languages } = action;
            return { ...state, languages }
        case SET_INSTALLATION_HEADER:
            const { installation_header } = action;
            return { ...state, installation_header }
        case SET_INSTALLATION_CONTENT:
            const { installation_content } = action;
            return { ...state, installation_content }
        case SET_DELETED_HEADER:
            const { deleted_header } = action;
            const _installation_header = state.installation_header.filter(e => { return deleted_header.indexOf(e.id) == -1 });
            return { ...state, deleted_header, installation_header: _installation_header }
        case SET_DELETED_CONTENT:
            const { deleted_content } = action;
            const _installation_content = state.installation_content.filter(e => { return deleted_content.indexOf(e.id) == -1 });
            return { ...state, deleted_content, installation_content: _installation_content }
        case SET_DRAFT:
            const { isDraft } = action;
            if (!isDraft) {
                return init;
            }
            return { ...state, isDraft }
        default:
            return state;
    }
}

export default InstallationReducer;
export {
    SET_LANGUAGES,
    SET_INSTALLATION,
    SET_DRAFT,
    SET_INSTALLATION_CONTENT,
    SET_INSTALLATION_HEADER,
    SET_DELETED_HEADER,
    SET_DELETED_CONTENT
};