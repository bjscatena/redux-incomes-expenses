import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { StopLoadingAction, StartLoadingAction } from '../shared/ui.actions';

import { IncomeExpense } from './income-expense.model';
import { IncomesExpensesService } from './incomes-expenses.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-incomes-expense',
  templateUrl: './incomes-expenses.component.html',
  styles: []
})
export class IncomesExpensesComponent implements OnInit, OnDestroy {
  form: FormGroup;
  type = 'INCOME';

  loadingSubscription: Subscription;
  isLoading: boolean;

  constructor(
    private incExpService: IncomesExpensesService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.min(0))
    });

    this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.store.dispatch(new StartLoadingAction());

    const { description, amount } = this.form.value;

    const incomeExpense = new IncomeExpense(description, amount, this.type);

    this.incExpService
      .createIncomeExpense(incomeExpense)
      .then(() => {
        this.form.reset({ amount: 0 });
        this.store.dispatch(new StopLoadingAction());

        Swal.fire('Saved', incomeExpense.description, 'success');
      })
      .catch();
  }

  setIncome() {
    this.type = 'INCOME';
  }

  setExpense() {
    this.type = 'EXPENSE';
  }
}
