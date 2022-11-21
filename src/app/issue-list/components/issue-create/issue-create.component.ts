import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Issue } from '../../models/issue.model';
import { TagService } from '../../services/tag.service';

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

  constructor(private readonly tagService: TagService) {}

  create(): void {
    this.createIssue.emit(this.newIssue);
    this.newIssue = new Issue();
    this.tagInput.nativeElement.value = '';
  }

  cancel(): void {
    this.newIssue = new Issue();
  }

  trackByFn(index: number) {
    return index;
  }

  addTag(event: MatChipInputEvent): void {
    this.newIssue.tags = this.tagService.addTag(event, this.newIssue.tags);
    this.tagInput.nativeElement.value = '';
  }

  removeTag(tag: string): void {
    this.newIssue.tags = this.tagService.removeTag(tag, this.newIssue.tags);
  }

  selectTag(event: MatAutocompleteSelectedEvent): void {
    this.newIssue.tags = this.tagService.selectTag(event, this.newIssue.tags);
    this.tagInput.nativeElement.value = '';
  }
}
