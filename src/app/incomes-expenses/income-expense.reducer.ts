import * as fromIncomeExpense from './income-expense.actions';
import { IncomeExpense } from './income-expense.model';
import { AppState } from '../app.reducer';

export interface IncomeExpenseState {
  items: IncomeExpense[];
}

export interface AppState extends AppState {
  incomeExpense: IncomeExpenseState;
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
