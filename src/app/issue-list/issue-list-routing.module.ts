import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IssueListComponent } from './issue-list.component';
import { IssueListResolver } from './resolvers/issue-list.resolver';

const issuesRoutes: Routes = [
  {
    path: '',
    component: IssueListComponent,
    resolve: { issueList: IssueListResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(issuesRoutes)],
  exports: [RouterModule],
})
export class IssueListRoutingModule {}
