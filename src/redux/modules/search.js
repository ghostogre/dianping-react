import url from "../../utils/url"
import { FETCH_DATA } from '../middlewares/api'
import { schema as keywordsSchema } from './entities/keywords'
import { combineReducers } from 'redux'
import { getKeywordsById } from './entities/keywords'
import { schema as shopSchema, getShopById } from './entities/shops'

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
  historyKeywords: [], // 关键词ID
  // 搜索结果页
  searchedShopsByKeyword: {}
  /**
   * searchedShopsByKeyword对象结构:
   * {
   *   'keywords.id'：{
   *      isFetcing: false,
   *      ids: []
   *    }
   * }
   */
}

export const types = {
  // 获取热门关键词
  FETCH_POPULAR_KEYWORDS_REQUEST: 'SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST',
  FETCH_POPULAR_KEYWORDS_SUCCESS: 'SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS',
  FETCH_POPULAR_KEYWORDS_FAILURE: 'SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE',
  // 根据输入文本获取关键词
  FETCH_RELATED_KEYWORDS_REQUEST: 'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',
  FETCH_RELATED_KEYWORDS_SUCCESS: 'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',
  FETCH_RELATED_KEYWORDS_FAILURE: 'SEARCH/FETCH_RELATED_KEYWORDS_FAILURE',
  // 设置当前输入
  SET_INPUT_TEXT: 'SEARCH/SET_INPUT_TEXT',
  CLEAR_INPUT_TEXT: 'SEARCH/CLEAR_INPUT_TEXT',
  // 添加历史查询记录
  ADD_HISTORY_KEYWORD: 'SEARCH/ADD_HISTORY_KEYWORD',
  CLEAR_HISTORY_KEYWORDS: 'SEARCH/CLEAR_HISTORY_KEYWORDS',
  // 搜索结果页
  FETCH_SHOPS_REQUEST: 'SEARCH/FETCH_SHOPS_REQUEST',
  FETCH_SHOPS_SUCCESS: 'SEARCH/FETCH_SHOPS_SUCCESS',
  FETCH_SHOPS_FAILURE: 'SEARCH/FETCH_SHOPS_FAILURE'
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

const fetchRelatedShops = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_SHOPS_REQUEST,
      types.FETCH_SHOPS_SUCCESS,
      types.FETCH_SHOPS_FAILURE
    ],
    endpoint,
    schema: shopSchema
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
  }),
  // 根据关键词查询对应的商品
  loadRelatedShops: keyword => {
    return (dispatch, getState) => {
      const { searchedShopsByKeyword } = getState().search
      if (searchedShopsByKeyword[keyword]) { // 已经查询过这个KEYWORD
        return null
      }
      const endpoint = url.getRelatedShops(keyword)
      return dispatch(fetchRelatedShops(keyword, endpoint))
    }
  }
}

// reducer
const popularKeywords = (state = initialState.popularKeywords, action) => {
 switch (action.type) {
   case types.FETCH_POPULAR_KEYWORDS_REQUEST:
     return {
       ...state,
       isFetching: true
     }
    case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      }
    case types.FETCH_POPULAR_KEYWORDS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
 }
}

const relatedKeywordsByText = (state = { isFetching: false, ids: [] }, action) => {
  switch(action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      }
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return {
        ...state,
        isFetching: true
      }
    default:
      return state
  }
}

const relatedKeywords = (state = initialState.relatedKeywords, action) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return {
        ...state,
        [action.text]: relatedKeywordsByText(state[action.text], action)
      }
    default:
      return state
  }
}

const inputText = (state = initialState.inputText, action) => {
  switch (action.type) {
    case types.SET_INPUT_TEXT:
      return action.text
    case types.CLEAR_INPUT_TEXT:
      return ''
    default:
      return state
  }
}

// 历史搜索记录
const historyKeywords = (state = initialState.historyKeywords, action) => {
  switch (action.type) {
    case types.ADD_HISTORY_KEYWORD:
      // 添加历史记录不应该重复，应该提升到第一个
      const data = state.filter(item => {
        if (item !== action.text) {
          return true
        }
        return false
      })
      return [
        action.text,
        ...data
      ]
    case types.CLEAR_HISTORY_KEYWORDS:
      return []
    default:
      return state
  }
}

const searchedShops = (state = { isFetching: false, ids: [] }, action) => {
  switch(action.type) {
    case types.FETCH_SHOPS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_SHOPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      }
    case types.FETCH_SHOPS_FAILURE:
      return {
        ...state,
        isFetching: true
      }
    default:
      return state
  }
}

const searchedShopsByKeyword = (state = initialState.searchedShopsByKeyword, action) => {
  switch(action.type) {
    case types.FETCH_SHOPS_REQUEST:
    case types.FETCH_SHOPS_SUCCESS:
    case types.FETCH_SHOPS_FAILURE:
      return {
        ...state,
        [action.text]: searchedShops(state[action.text], action)
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  historyKeywords,
  popularKeywords,
  relatedKeywords,
  inputText,
  searchedShopsByKeyword
})

export default reducer

// selectors
export const getPopularKeywords = (state) => {
  return state.search.popularKeywords.ids.map(id => {
    return getKeywordsById(state, id)
  })
}

export const getRelatedKeywords = (state) => {
  const text = state.search.inputText
  if (!text || text.trim().length === 0) {
    return []
  }
  const relatedKeywords = state.search.relatedKeywords[text]
  if (!relatedKeywords) {
    return []
  }
  return relatedKeywords.ids.map(id => {
    return getKeywordsById(state, id)
  })
}

export const getInputText = (state) => {
  return state.search.inputText
}

export const getHistoryKeywords = (state) => {
  return state.search.historyKeywords.map(id => {
    return getKeywordsById(state, id)
  })
}

export const getSearchedShops = (state) => {
  const keywordId = state.search.historyKeywords[0] // 第一条记录就是当前的关键词
  if (!keywordId) {
    return []
  }
  const shops = state.search.searchedShopsByKeyword[keywordId]
  return shops.ids.map((id) => {
    return getShopById(state, id)
  })
}

export const getCurrentKeyword = (state) => {
  const keywordId = state.search.historyKeywords[0]
  if (!keywordId) {
    return ''
  }
  return getKeywordsById(state, keywordId).keyword
}
