import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
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

  onSubmit(values: { name: string; email: string; password: string }) {
    this.authService.createUser(values.name, values.email, values.password);
  }
}
