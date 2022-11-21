import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { IssueListModule } from './issue-list/issue-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, BrowserModule, HttpClientModule, IssueListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
