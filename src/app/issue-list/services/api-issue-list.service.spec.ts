import { TestBed } from '@angular/core/testing';

import { ApiIssueListService } from './api-issue-list.service';

describe('DataServiceService', () => {
  let service: ApiIssueListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIssueListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
