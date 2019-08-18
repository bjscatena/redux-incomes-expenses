import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('ui')
      .subscribe(ui => (this.isLoading = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(formValue: { email: string; password: string }) {
    this.authService.login(formValue.email, formValue.password);
  }
}
