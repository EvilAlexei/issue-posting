import { Injectable } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  addTag(event: MatChipInputEvent, tags: string[]): string[] {
    const value = (event.value || '').trim();

    if (value && !tags.includes(value)) {
      tags.push(value.trim());
    }

    event.chipInput.clear();

    return tags;
  }

  removeTag(tag: string, tags: string[]): string[] {
    const index = tags.indexOf(tag);

    if (index >= 0) {
      tags.splice(index, 1);
    }

    return tags;
  }

  selectTag(event: MatAutocompleteSelectedEvent, tags: string[]): string[] {
    if (!tags.includes(event.option.viewValue)) {
      tags.push(event.option.viewValue);
    }

    return tags;
  }
}
