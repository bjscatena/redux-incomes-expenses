import { Action } from '@ngrx/store';
import { IncomeExpense } from './income-expense.model';

export const SET_ITEMS = '[Income Expense] Set items';
export const UNSET_ITEMS = '[Income Expense] Unset items';

export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;
  constructor(public payload: { items: IncomeExpense[] }) {}
}

export class UnsetItemsAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type Actions = SetItemsAction | UnsetItemsAction;
