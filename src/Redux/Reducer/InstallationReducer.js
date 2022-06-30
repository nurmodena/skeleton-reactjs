const SET_INSTALLATION = 'SET_INSTALLATION';
const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_DRAFT = 'SET_DRAFT';

const init = {
    installation: { is_active: true, name: '', contents: [] },
    languages: [],
    isDraft: false
}

const InstallationReducer = (state = init, action) => {
    switch (action.type) {
        case SET_INSTALLATION:
            const { installation } = action;
            return { ...state, installation, isDraft: true }
        case SET_LANGUAGES:
            const { languages } = action;
            return { ...state, languages }
        case SET_DRAFT:
            const { isDraft } = action;
            return { ...state, isDraft }
        default:
            return state;
    }
}

export default InstallationReducer;
export { SET_LANGUAGES, SET_INSTALLATION, SET_DRAFT };