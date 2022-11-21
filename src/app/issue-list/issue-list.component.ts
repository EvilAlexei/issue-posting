import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatChipListbox, MatChipListboxChange } from '@angular/material/chips';
import { Subscription } from 'rxjs';

import { Issue } from './models/issue.model';
import { ApiIssueListService } from './services/api-issue-list.service';

/* eslint-disable-next-line */
const cloneData = (data: any) => JSON.parse(JSON.stringify(data));

@Component({
  selector: 'issue-list',
  templateUrl: './issue-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueListComponent implements OnInit, OnDestroy {
  issueList$!: Subscription;
  issues: Issue[] = [];
  issuesCopy: Issue[] = [];
  tagsList!: Set<string>;

  @ViewChild('tagsFilter') tagsFilter!: MatChipListbox;

  constructor(private readonly apiIssueList: ApiIssueListService) {}

  ngOnInit(): void {
    this.issueList$ = this.apiIssueList.issueList$.subscribe((data) => {
      this.updateIssues(data);
    });

    this.apiIssueList.getIssueList();
  }

  deleteIssue(id: string): void {
    this.issuesCopy = this.issuesCopy.filter((issue) => issue.id !== id);
    this.apiIssueList.updateIssueList(this.issuesCopy);
  }

  editIssue(item: Issue): void {
    const index = this.issuesCopy.findIndex(({ id }) => id === item.id);
    this.issuesCopy[index] = item;
    this.apiIssueList.updateIssueList(this.issuesCopy);
  }

  createIssue(item: Issue): void {
    const lastId = Math.max(...this.issuesCopy.map((i) => Number(i.id)));

    if (lastId) {
      this.issuesCopy.push({
        ...item,
        id: (lastId + 1).toString(),
      });
      this.apiIssueList.updateIssueList(this.issuesCopy);
    }
  }

  filterChanged(event: MatChipListboxChange): void {
    const values = event.value;
    let filteredIssues: Issue[] = cloneData(this.issues);
    values.forEach((v: string) => {
      filteredIssues = filteredIssues.filter((i) => i.tags.includes(v));
    });

    this.issuesCopy = cloneData(filteredIssues);
  }

  clearFilters(): void {
    this.issuesCopy = cloneData(this.issues);
    this.tagsFilter.value = '';
  }

  trackByFn(index: number) {
    return index;
  }

  setUniqueTags(issueList: Issue[]): void {
    const tags = issueList.reduce((acc, val) => acc.concat(val.tags), new Array());
    this.tagsList = new Set(tags);
  }

  updateIssues(data: Issue[]): void {
    this.issues = this.issuesCopy = cloneData(data);
    this.setUniqueTags(this.issuesCopy);
  }

  ngOnDestroy() {
    this.issueList$.unsubscribe();
  }
}
