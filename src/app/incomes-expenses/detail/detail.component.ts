import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeExpense } from '../income-expense.model';
import { Subscription } from 'rxjs';
import { IncomesExpensesService } from '../incomes-expenses.service';

import Swal from 'sweetalert2';
import { AppState } from '../income-expense.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  items: IncomeExpense[];
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private incExpService: IncomesExpensesService
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('incomeExpense')
      .subscribe(docData => (this.items = docData.items));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onDelete(item: IncomeExpense) {
    this.incExpService
      .deleteIncomeExpense(item.uid)
      .then(() => Swal.fire('Deleted', item.description, 'success'))
      .catch(error => Swal.fire('Error', error, 'error'));
  }
}
