import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IncomeExpense } from './income-expense.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomesExpensesService {
  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService
  ) {}

  createIncomeExpense(incomeExpense: IncomeExpense) {
    const user = this.authService.getUser();

    return this.afDB
      .doc(`${user.uid}/incomes-expenses`)
      .collection('items')
      .add({ ...incomeExpense });
  }
}
