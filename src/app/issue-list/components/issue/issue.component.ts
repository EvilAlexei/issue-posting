import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Issue } from '../../models/issue.model';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueComponent implements OnChanges {
  issueCopy: Issue = new Issue();
  isEditMode = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() issue: Issue = new Issue();
  @Input() tagsList: Set<string> = new Set();

  @Output() deleteIssue = new EventEmitter<string>();
  @Output() editIssue = new EventEmitter<Issue>();

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor(private readonly tagService: TagService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('issue' in changes) {
      this.issueCopy = Object.assign({}, this.issue);
    }
  }

  delete(): void {
    this.deleteIssue.emit(this.issue.id);
  }

  edit(): void {
    this.isEditMode = true;
  }

  save(): void {
    this.editIssue.emit(this.issueCopy);
    this.isEditMode = false;
  }

  cancel(): void {
    this.issueCopy = Object.assign({}, this.issue);
    this.isEditMode = false;
  }

  trackByFn(index: number) {
    return index;
  }

  addTag(event: MatChipInputEvent): void {
    this.issueCopy.tags = this.tagService.addTag(event, this.issueCopy.tags);
    this.tagInput.nativeElement.value = '';
  }

  removeTag(tag: string): void {
    this.issueCopy.tags = this.tagService.removeTag(tag, this.issueCopy.tags);
  }

  selectTag(event: MatAutocompleteSelectedEvent): void {
    this.issueCopy.tags = this.tagService.selectTag(event, this.issueCopy.tags);
    this.tagInput.nativeElement.value = '';
  }
}
