import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: string): any {
    console.log(args)
    return args
    ? value.filter(
        item =>
          item.first_name.toLowerCase().indexOf(args.toLowerCase()) !== -1 ||
          item.last_name.toLowerCase().indexOf(args.toLowerCase()) !== -1 ||
          item.email.toLowerCase().indexOf(args.toLowerCase()) !== -1
      )
    : value;
  }
}
