import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roundCurrency' })
export class RoundCurrencyPipe implements PipeTransform {
  constructor() {}
  transform(currency: number): string {
    if(currency == null){
        return '0';
    }

    let c: number;
    let amountString: string;
    //round quadrillion WTF?!?!?
    if(currency >= 1000000000000000){
        c = Math.floor(currency / 1000000000000000);
        amountString = c.toString() + "q";
        return amountString;
    }
    //round trillion
    if(currency >= 1000000000000){
        c = Math.floor(currency / 1000000000000);
        amountString = c.toString() + "t";
        return amountString;
    }
    //round billion
    else if(currency >= 1000000000){
        c = Math.floor(currency / 1000000000);
        amountString = c.toString() + "b";
        return amountString;
    } 
    //round million
    else if( currency >= 1000000){
        c = Math.floor(currency / 1000000);
        amountString = c.toString() + "m";
        return amountString;
    } else if ( currency >= 1000) {
        c = Math.floor(currency / 1000);
        amountString = c.toString() + "k";
        return amountString;
    }
    else {
        return currency.toString();
    }
  }
}