import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IncomesExpensesService } from 'src/app/incomes-expenses/incomes-expenses.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  userName: string;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private incExpService: IncomesExpensesService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => (this.userName = auth.user.name));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.incExpService.cancelSubscriptions();
    this.authService.logout();
  }
}
