const SET_TROUBLESHOOT = 'SET_TROUBLESHOOT';
const SET_TROUBLESHOOT_HEADER = 'SET_TROUBLESHOOT_HEADER';
const SET_TROUBLESHOOT_CONTENT = 'SET_TROUBLESHOOT_CONTENT';
const SET_DELETED_TROUBLESHOOT_HEADER = 'SET_DELETED_TROUBLESHOOT_HEADER';
const SET_DELETED_TROUBLESHOOT_CONTENT = 'SET_DELETED_TROUBLESHOOT_CONTENT';
const SET_TROUBLESHOOT_DRAFT = 'SET_TROUBLESHOOT_DRAFT';

const init = {
    troubleshoot: { name: '', error_code: '', models: '', contents: [], is_active: true, },
    troubleshoot_header: [],
    troubleshoot_content: [],
    isDraft: false,
    deleted_header: [],
    deleted_content: [],
}

const TroubleshotReducer = (state = init, action) => {
    switch (action.type) {
        case SET_TROUBLESHOOT:
            const { troubleshoot } = action;
            return { ...state, troubleshoot, isDraft: true }
        case SET_TROUBLESHOOT_HEADER:
            const { troubleshoot_header } = action;
            return { ...state, troubleshoot_header }
        case SET_TROUBLESHOOT_CONTENT:
            const { troubleshoot_content } = action;
            return { ...state, troubleshoot_content }
        case SET_DELETED_TROUBLESHOOT_HEADER:
            const { deleted_header } = action;
            const _troubleshoot_header = state.troubleshoot_header.filter(e => deleted_header.indexOf(e.id) == -1);
            return { ...state, deleted_header, troubleshoot_header: _troubleshoot_header }
        case SET_DELETED_TROUBLESHOOT_CONTENT:
            const { deleted_content } = action;
            const _troubleshoot_content = state.troubleshoot_content.filter(e => deleted_content.indexOf(e.id) == -1);
            return { ...state, deleted_content, troubleshoot_content: _troubleshoot_content }
        case SET_TROUBLESHOOT_DRAFT:
            const { isDraft } = action;
            if (!isDraft) {
                return init;
            }
            return { ...state, isDraft }
        default:
            return state;
    }
}

export default TroubleshotReducer;
export {
    SET_TROUBLESHOOT,
    SET_TROUBLESHOOT_DRAFT,
    SET_TROUBLESHOOT_CONTENT,
    SET_TROUBLESHOOT_HEADER,
    SET_DELETED_TROUBLESHOOT_HEADER,
    SET_DELETED_TROUBLESHOOT_CONTENT
};