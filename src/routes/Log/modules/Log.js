// ------------------------------------
// Constants
// ------------------------------------
export const MEDIA_CHANGE = 'MEDIA_CHANGE'
export const MEDIA_SEARCH = 'MEDIA_SEARCH'
export const MEDIA_RECEIVE = 'MEDIA_RECEIVE'
// ------------------------------------
// Actions
// ------------------------------------
const initialSearch = {
    url : 'HLog/OpLogList',
    key : '',
    page : 1,
    size : 20
}
export function fetchData (status = initialSearch) {
    const params = Object.assign({}, initialSearch, status)
    const searchPath = params.url + '?parent=' + params.key + '&page=' + params.page +'&size=' +params.size
    return dispatch => {
            return fetch(searchPath,{
               credentials: 'same-origin'
            }).then(response => response.json())
            .then(json => dispatch(mediaReceive(json)))
    }
}

export function mediaSearch (status = initialSearch) {
    return {
        type  : MEDIA_SEARCH,
        status
    }
}

function mediaReceive (state) {
    return {
        type  : MEDIA_RECEIVE,
        state
    }
}

export const actions = {
    fetchData,
    mediaSearch
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MEDIA_RECEIVE] : (state, action) => {
        return action.state.data
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function accountReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
