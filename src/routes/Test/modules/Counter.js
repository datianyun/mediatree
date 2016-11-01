// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT'
export const COUNTER_PLUS = 'COUNTER_PLUS'
// ------------------------------------
// Actions
// ------------------------------------
export function decrement (value = 1) {
    return {
        type    : COUNTER_DECREMENT,
        payload : value
    }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export function plusAsync (value = 1) {
    return {
        type    : COUNTER_PLUS,
        payload : value
    }
}

export const actions = {
    decrement,
    plusAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [COUNTER_DECREMENT] : (state, action) => state - action.payload,
    [COUNTER_PLUS] : (state, action) => state / 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
