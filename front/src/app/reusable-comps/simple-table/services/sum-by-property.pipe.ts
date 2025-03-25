import { Pipe, PipeTransform } from '@angular/core';
import { CustomService } from './custom.service';

@Pipe({
  name: 'sumByProperty',
  standalone: true,
  pure: false
})
export class SumByPropertyPipe implements PipeTransform {

  constructor(private customService: CustomService){}  

  transform(array: any[], prop: string ): any {
    return this.customService.sumByProperty(array,prop);
  }

}