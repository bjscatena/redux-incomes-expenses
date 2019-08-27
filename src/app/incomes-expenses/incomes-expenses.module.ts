import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomesExpensesComponent } from './incomes-expenses.component';
import { OrderIncExpPipe } from './order-inc-exp.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from './income-expense.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomesExpensesComponent,
    DetailComponent,
    StatisticsComponent,
    OrderIncExpPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer)
  ]
})
export class IncomesExpensesModule {}
