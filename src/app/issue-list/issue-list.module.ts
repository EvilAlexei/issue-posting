import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { IssueCreateComponent } from './components/issue-create/issue-create.component';

import { IssueComponent } from './components/issue/issue.component';
import { IssueListComponent } from './issue-list.component';

@NgModule({
  declarations: [IssueComponent, IssueListComponent, IssueCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  providers: [],
  exports: [IssueListComponent],
})
export class IssueListModule {}
