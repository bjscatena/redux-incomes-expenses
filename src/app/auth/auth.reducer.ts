import { User } from './user.model';

import * as fromAuth from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState = {
  user: null
};

export function authReducer(
  state = initialState,
  action: fromAuth.Actions
): AuthState {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {
        ...state,
        user: { ...action.payload.user }
      };

    default:
      return state;
  }
}
