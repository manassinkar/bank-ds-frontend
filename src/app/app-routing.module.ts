import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { AccountComponent } from './account/account.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children:[
      {
        path: '',
        component: AccountComponent,
      },
      {
        path: 'deposit',
        component: DepositComponent
      },
      {
        path: 'withdraw',
        component: WithdrawComponent
      },
      {
        path: 'chat',
        component: GroupChatComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
