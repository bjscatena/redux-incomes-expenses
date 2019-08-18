import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[Auth] Set user';

export class SetUserAction implements Action {
  readonly type = SET_USER;
  constructor(public payload: { user: User }) {}
}

export type Actions = SetUserAction;
