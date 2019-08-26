import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IncomeExpense } from '../income-expense.model';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit {
  incomes: number;
  expenses: number;
  incomesQuantity: number;
  expensesQuantity: number;

  subscription: Subscription;

  pieChartType = 'pie';
  pieChartLabels: Label[] = ['Incomes', 'Expenses'];
  pieChartData: number[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('incomeExpense').subscribe(incExp => {
      this.countIncomesExpenses(incExp.items);
    });
  }

  countIncomesExpenses(items: IncomeExpense[]) {
    this.incomes = 0;
    this.expenses = 0;

    this.expensesQuantity = 0;
    this.incomesQuantity = 0;

    items.forEach(item => {
      if (item.type === 'INCOME') {
        this.incomesQuantity++;
        this.incomes += item.amount;
      } else {
        this.expensesQuantity++;
        this.expenses += item.amount;
      }
    });

    this.pieChartData = [this.incomes, this.expenses];
  }
}
