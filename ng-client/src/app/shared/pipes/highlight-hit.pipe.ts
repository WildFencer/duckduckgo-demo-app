import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isNil, escapeRegExp } from 'lodash';

@Pipe({
  name: 'highlightHit'
})
export class HighlightHitPipe implements PipeTransform {
  private highlighTagOpening: string = '<span class="search-highlighted">';
  private highlightTagClosing: string = '</span>';

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(text: any, searchTerms: Array<string>): string | null | undefined {
    if (isNil(text)) {
      return text;
    }

    if ((isNil(searchTerms) || !searchTerms.length)) {
      return text;
    }

    return this.tryHighlightSearchTerms(text, searchTerms);
  }

  tryHighlightSearchTerms(text: string, searchTerms: Array<string>): string|null {
    if (!!searchTerms && !!searchTerms.length) {
      searchTerms.forEach(searchInput =>
        text = text.replace(new RegExp(escapeRegExp(searchInput), 'gi'), (match: string) => `${this.highlighTagOpening}${match}${this.highlightTagClosing}`));
    }

    return this._sanitizer.sanitize(SecurityContext.HTML, text);
  }
}
