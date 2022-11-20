import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [{ path: '', component: AppComponent, resolve: { issueList: IssueListResolver } }];
const routes: Routes = [
  {
    path: '',
    redirectTo: 'issues',
    pathMatch: 'full',
  },
  {
    path: 'issues',
    loadChildren: () => import('./issue-list/issue-list.module').then((m) => m.IssueListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
