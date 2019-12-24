const initialState = {
  error: null
}

export const types = {
  CLEAR_ERROR: 'APP/CLEAR_ERROR'
}

// action creator
export const actions = {
  clearError: () => ({
    type: types.CLEAR_ERROR
  })
}

const reducer = (state = initialState, action) => {
  const { type, error } = action
  if (type === types.CLEAR_ERROR) {
    return {
      ...state,
      error: null
    }
  } else if (error) {
    // 如果存在error就可以直接判断了
    // 可以省略发出错误的action type
    return { ...state, error }
  }
  return state
}

// selectors
export const getError = (state) => {
  return state.app.error
}

export default reducer
