import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IncomeExpense } from './income-expense.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './income-expense.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomesExpensesService {
  incExpListenerSubscription: Subscription;
  incExpItemsSubscription: Subscription;

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  cancelSubscriptions(): void {
    if (this.incExpItemsSubscription) {
      this.incExpItemsSubscription.unsubscribe();
    }

    if (this.incExpListenerSubscription) {
      this.incExpListenerSubscription.unsubscribe();
    }

    this.store.dispatch(new UnsetItemsAction());
  }

  initIncomesExpensesListener(): void {
    this.incExpListenerSubscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => this.incomeExpenseItems(auth.user.uid));
  }

  private incomeExpenseItems(uid: string): void {
    this.incExpItemsSubscription = this.afDB
      .collection(`${uid}/incomes-expenses/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((incExpArray: any[]) => {
        this.store.dispatch(new SetItemsAction({ items: incExpArray }));
      });
  }

  createIncomeExpense(incomeExpense: IncomeExpense) {
    const user = this.authService.getUser();

    return this.afDB
      .doc(`${user.uid}/incomes-expenses`)
      .collection('items')
      .add({ ...incomeExpense });
  }

  deleteIncomeExpense(uid: string) {
    const user = this.authService.getUser();

    return this.afDB.doc(`${user.uid}/incomes-expenses/items/${uid}`).delete();
  }
}
