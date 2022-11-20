import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Issue } from '../../models/issue.model';

@Component({
  selector: 'issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueCreateComponent {
  newIssue: Issue = new Issue();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() tagsList: Set<string> = new Set();

  @Output() createIssue = new EventEmitter<Issue>();

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  create(): void {
    this.createIssue.emit(this.newIssue);
    this.newIssue = new Issue();
  }

  cancel(): void {
    this.newIssue = new Issue();
  }

  trackByFn(index: number) {
    return index;
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this.newIssue.tags.includes(value)) {
      this.newIssue.tags.push(value.trim());
    }

    event.chipInput.clear();
    this.tagInput.nativeElement.value = '';
  }

  removeTag(tag: string): void {
    const index = this.newIssue.tags.indexOf(tag);

    if (index >= 0) {
      this.newIssue.tags.splice(index, 1);
    }
  }

  selectTag(event: MatAutocompleteSelectedEvent): void {
    if (!this.newIssue.tags.includes(event.option.viewValue)) {
      this.newIssue.tags.push(event.option.viewValue);
    }
    this.tagInput.nativeElement.value = '';
  }
}
