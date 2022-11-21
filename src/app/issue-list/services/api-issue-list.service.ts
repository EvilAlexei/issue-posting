import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take } from 'rxjs';

import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root',
})
export class ApiIssueListService {
  private _jsonURL = 'assets/issues-list.json';

  private issueListSubject = new BehaviorSubject<Issue[]>([]);
  issueList$: Observable<Issue[]> = this.issueListSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  getIssueList(): void {
    this.http.get<Issue[]>(this._jsonURL).subscribe((data) => this.issueListSubject.next(data));
  }

  updateIssueList(newList: Issue[]): void {
    of(newList)
      .pipe(take(1))
      .subscribe((data) => this.issueListSubject.next(data));
  }
}
