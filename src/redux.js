// redux.js
import {  
  combineReducers,
  createStore,
} from 'redux';

const SET_RESULT = 'SET_RESULT';

// 数字を押される
export const setResult = data => ({
  type: SET_RESULT,
  data,
});

INITIAL_STATE = {
  tableData: [
        ['C', '+/-', '%', '÷'],
        ['7', '8', '9', '×'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '00','.', '='],
      ],
  result: ['0'],
}

const reducer = (state = INITIAL_STATE, action) => {  
  switch (action.type) {
    case SET_RESULT:
      return { ...state, result: [action.data] };
    default:
      return state;
  }
}

export const reducers = combineReducers({  
  topData: reducer
})

// store.js
export const store = createStore(reducers)