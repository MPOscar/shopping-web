import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MsSeoService {
  constructor(private metaTagService: Meta) { }

  addMetadata(keywords: string) {
    this.metaTagService.addTags([
      { name: 'keywords', content: keywords || '' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }
}
