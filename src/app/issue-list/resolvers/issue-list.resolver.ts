import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Issue } from '../models/issue.model';
import { ApiIssueListService } from '../services/api-issue-list.service';

@Injectable({
  providedIn: 'root',
})
export class IssueListResolver implements Resolve<Issue[]> {
  constructor(private readonly apiIssueListService: ApiIssueListService) {}

  resolve(): Observable<Issue[]> {
    return this.apiIssueListService.getIssueList();
  }
}
