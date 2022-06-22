import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPlato =[];
    for(const plato of value){
      if (plato.nombrePlato?.toLowerCase().indexOf(arg?.toLowerCase()) > -1){
        resultPlato.push(plato);
      };
    };
    return resultPlato;
  }

}
