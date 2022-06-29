const SET_INSTALLATION = 'SET_INSTALLATION';
const SET_LANGUAGES = 'SET_LANGUAGES';

const init = {
    installation: {},
    languages: []
}

const InstallationReducer = (state = init, action) => {
    switch (action.type) {
        case SET_INSTALLATION:
            const { installation } = action;
            return { ...state, installation }
        case SET_LANGUAGES:
            const { languages } = action;
            return { ...state, languages }
        default:
            return state;
    }
}

export default InstallationReducer;
export { SET_LANGUAGES, SET_INSTALLATION };