import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: `${environment.server}`, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DepositComponent,
    WithdrawComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    GroupChatComponent,
    DashboardComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() { }

  ngOnInit() {
  }
}