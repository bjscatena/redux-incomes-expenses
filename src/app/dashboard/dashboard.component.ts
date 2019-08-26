import { Component, OnInit } from '@angular/core';
import { IncomesExpensesService } from '../incomes-expenses/incomes-expenses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(private incExpService: IncomesExpensesService) {}

  ngOnInit() {
    this.incExpService.initIncomesExpensesListener();
  }
}
