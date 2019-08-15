import * as fromUI from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState = {
  isLoading: false
};

export function uiReducer(state = initialState, action: fromUI.Actions) {
  switch (action.type) {
    case fromUI.START_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case fromUI.STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
