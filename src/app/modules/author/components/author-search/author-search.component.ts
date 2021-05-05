import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Author } from 'src/app/shared/models/author';
import { distinctUntilChanged, switchMap, map, tap, startWith, share, take, first } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthorService } from 'src/app/core/services/author.service';
import { debounceTime } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-author-search',
  templateUrl: './author-search.component.html',
  styleUrls: ['./author-search.component.scss']
})
export class AuthorSearchComponent implements OnInit {

  @Input() selectedAuthor: Author;

  public searchResults$: Observable<Author[]>;
  public selectedAuthor$: Author;
  private listAuthors: Author[];

  @Input() fGroup: FormGroup;

  @Output() authorChanged: EventEmitter<Author> = new EventEmitter<Author>();

  constructor( private authorService: AuthorService) { }

  ngOnInit() {
    if (this.selectedAuthor) {
      this.fGroup.patchValue({
        author: this.selectedAuthor
      });
    }

    this.authorService.getAuthors().pipe(
      first(),
      map(rs => {
        this.listAuthors = rs
      })
    ).subscribe()

    this.searchResults$ = this.fGroup.get('author').valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(query => this.listAuthors.filter(value => value.name.includes(query))),
      share(),
    );
  }

  public onValueChanged(value: string): void {
    if (!value) {
      this.selectedAuthor = null as any;
      this.authorChanged.emit(this.selectedAuthor);
    }
  }

  public selectAuthor(event: MatAutocompleteSelectedEvent): void {

    const foundAuthor = this.listAuthors.filter(c => c.name === event.option.value)[0];
    if (!!foundAuthor) {
      this.selectedAuthor = foundAuthor;
      this.authorChanged.emit(foundAuthor);
    }
  }

  public displayFn(author: Author): string {
    if (author) {
      return author.name;
    }
    return ''
  }

}
