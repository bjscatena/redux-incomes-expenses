import * as fromIncomeExpense from './income-expense.actions';
import { IncomeExpense } from './income-expense.model';

export interface IncomeExpenseState {
  items: IncomeExpense[];
}

const initialState = {
  items: []
};

export function incomeExpenseReducer(
  state = initialState,
  action: fromIncomeExpense.Actions
) {
  switch (action.type) {
    case fromIncomeExpense.SET_ITEMS:
      return {
        ...state,
        items: [
          ...action.payload.items.map(item => {
            return { ...item };
          })
        ]
      };

    case fromIncomeExpense.UNSET_ITEMS:
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
}
