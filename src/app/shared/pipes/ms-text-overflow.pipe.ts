import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textOverflow'
})
export class MsTextOverflowPipe implements PipeTransform {

  transform(value: string, maxLength: string): string {
    if (value == null) {
      return '';
    }

    let length = parseInt(maxLength);
    let result = value;

    if (value.length > length) {
      result = result.substring(0, length - 3);
      result += '...';
    }

    return result;
  }

}
