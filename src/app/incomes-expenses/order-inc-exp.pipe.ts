import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from './income-expense.model';

@Pipe({
  name: 'orderIncExp'
})
export class OrderIncExpPipe implements PipeTransform {
  transform(items: IncomeExpense[]): IncomeExpense[] {
    return items.sort((a, b) => {
      if (a.type === 'INCOME') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
