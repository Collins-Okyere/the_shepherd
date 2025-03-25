import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class PricingService {

  getYearlyPrice(item: any): any {
    if(!item.is_free){
      const yearlyFee = item.monthly_fee * 12;
      const yearlyDiscount = item.yearly_discount ? yearlyFee * (item.yearly_discount / 100) : 0;
      const payableYearly = yearlyFee - yearlyDiscount;
      const yearMessage = yearlyDiscount ? `(save $${yearlyDiscount.toFixed(2)})` : '';
      return { ...item, payableAmount: payableYearly, msg: yearMessage };
    }else{
      return { ...item, payableAmount: 0, msg: `For ${item.free_days} days` };
    }
  }

  getMonthlyPrice(item: any): any {
    if(!item.is_free){
      const monthlyDiscount = item.monthly_discount ? item.monthly_fee * (item.monthly_discount / 100) : 0;
      const payableMonthly = item.monthly_fee - monthlyDiscount;
      const monthMessage = item.is_free ? `(${item.free_days} days only)` : monthlyDiscount ? `(save $${monthlyDiscount.toFixed(2)})` : '';
      return { ...item, payableAmount: payableMonthly, msg: monthMessage };
    }else{
      return { ...item, payableAmount: 0, msg: `For ${item.free_days} days` };
    }
  }
  
}
