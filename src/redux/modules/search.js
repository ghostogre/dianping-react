import url from "../../utils/url"
import { FETCH_DATA } from '../middlewares/api'
import { schema as keywordsSchema } from './entities/keywords'

const initialState = {
  inputText: '',
  popularKeywords: {
    ids: [],
    isFetching: false
  },
  /**
   * relatedKeywords对象结构:
   * {
   *   '火锅'：{
   *      isFetcing: false,
   *      ids: []
   *    }
   * }
   */
  relatedKeywords: {
  },
  historyKeywords: {
    ids: [],
    isFetching: false
  }
}

export const types = {
  // 获取热门关键词
  FETCH_POPULAR_KEYWORDS_REQUEST: 'FETCH_POPULAR_KEYWORDS_REQUEST',
  FETCH_POPULAR_KEYWORDS_SUCCESS: 'FETCH_POPULAR_KEYWORDS_SUCCESS',
  FETCH_POPULAR_KEYWORDS_FAILURE: 'FETCH_POPULAR_KEYWORDS_FAILURE',
  // 根据输入文本获取关键词
  FETCH_RELATED_KEYWORDS_REQUEST: 'FETCH_RELATED_KEYWORDS_REQUEST',
  FETCH_RELATED_KEYWORDS_SUCCESS: 'FETCH_RELATED_KEYWORDS_SUCCESS',
  FETCH_RELATED_KEYWORDS_FAILURE: 'FETCH_RELATED_KEYWORDS_FAILURE',
  // 设置当前输入
  SET_INPUT_TEXT: 'SET_INPUT_TEXT',
  CLEAR_INPUT_TEXT: 'CLEAR_INPUT_TEXT',
  // 添加历史查询记录
  ADD_HISTORY_KEYWORD: 'ADD_HISTORY_KEYWORD',
  CLEAR_HISTORY_KEYWORDS: 'CLEAR_HISTORY_KEYWORDS'
}

const fetchPopularKeywords = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_POPULAR_KEYWORDS_REQUEST,
      types.FETCH_POPULAR_KEYWORDS_SUCCESS,
      types.FETCH_POPULAR_KEYWORDS_FAILURE
    ],
    endpoint,
    schema: keywordsSchema
  }
})

const fetchRelatedKeywords = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RELATED_KEYWORDS_REQUEST,
      types.FETCH_RELATED_KEYWORDS_SUCCESS,
      types.FETCH_RELATED_KEYWORDS_FAILURE
    ],
    endpoint,
    schema: keywordsSchema
  },
  text
})

export const actions = {
  // 热门关键词
  loadPopularKeywords: () => {
    return (dispatch, getState) => {
      const { ids } = getState().search.popularKeywords
      if (ids.length > 0) {
        // 已存在缓存，不加载
        return null
      }
      const endpoint = url.getPopularKeywords()
      return dispatch(fetchPopularKeywords(endpoint))
    }
  },
  // 根据输入文本关键词获取
  loadRelatedKeywords: text => {
    return (dispatch, getState) => {
      const { relatedKeywords } = getState().search
      if (relatedKeywords[text]) {
        return null
      }
      const endpoint = url.getRelatedKeywords(text)
      return dispatch(fetchRelatedKeywords(text, endpoint))
    }
  },
  // 输入文本
  setInputText: (text) => ({
    type: types.SET_INPUT_TEXT,
    text
  }),
  clearInputText: () => ({
    type: types.CLEAR_INPUT_TEXT
  }),
  // 历史记录
  addHistoryKeyword: keywordId => ({
    type: types.ADD_HISTORY_KEYWORD,
    text: keywordId
  }),
  clearHistoryKeywords: () => ({
    type: types.CLEAR_HISTORY_KEYWORDS
  })
}

const reducer = (state = initialState) => {
  return state
}

export default reducer
