import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, take } from 'rxjs';

import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root',
})
export class ApiIssueListService {
  private _jsonURL = 'assets/issues-list.json';

  constructor(private readonly http: HttpClient) {}

  getIssueList(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this._jsonURL);
  }

  updateIssueList(newList: Issue[]): Observable<Issue[]> {
    return of(newList).pipe(take(1));
  }

  /* eslint-disable-next-line */
  resolveRouteParam(snapshot: ActivatedRouteSnapshot, key: string): any {
    return snapshot.data[key] || (snapshot.parent ? this.resolveRouteParam(snapshot.parent, key) : null);
  }
}
