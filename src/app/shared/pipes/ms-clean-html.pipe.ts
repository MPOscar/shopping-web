import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanHtml'
})
export class MsCleanHtmlPipe implements PipeTransform {

  transform(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;

    return div.textContent || div.innerText || '';
  }

}
