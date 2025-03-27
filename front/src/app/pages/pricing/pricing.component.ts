import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { LocalDbService } from '../../services/local-db.service';
import { ApiService } from '../../services/api.service';
import { PricingService } from './pricing.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
  packages: any[] = [];
  paytPeriod: string = 'monthly';
  filteredPlans: any[] = [];
  selectedPlan: string = 'Standard';

  constructor(
    private readonly noDB: LocalDbService,
    private readonly router: Router,
    private readonly app: AppComponent,
    private readonly api: ApiService,
    private readonly pricingService: PricingService
  ) {}

  ngOnInit(): void {
    this.packages = this.noDB.product_plans;
    this.api.addLocalStorage('paytPeriod', this.paytPeriod);
    this.updatePackagePricing();
  }

  switch(val: string): void {
    this.paytPeriod = val;
    this.api.addLocalStorage('paytPeriod', val);
    this.updatePackagePricing();
  }

  updatePackagePricing(): void {
    this.filteredPlans = this.packages.filter((pkg) => (this.paytPeriod === 'monthly' ? true : !pkg.is_free)).map((pkg) =>
      this.paytPeriod === 'monthly' ? this.pricingService.getMonthlyPrice(pkg) : this.pricingService.getYearlyPrice(pkg)
    );
  }

  selectPlan(product: string): void {
    this.selectedPlan = product;
  }

  pay(item: any): void {
    const toastData = {
      showIcon: true,
      isVisible: true,
      showCloseBtn: true,
      message: `Signup for ${item.name} package.`,
    };
    const isFree = item.is_free ? true : false;
    this.api.addLocalStorage('tryFree', String(isFree));
    this.api.addLocalStorage('selectedService', item.name);
    this.router.navigateByUrl('pages/sign_up');
    this.api.toast.showToast(toastData.message, 'success');
    // setTimeout(() => window.location.reload(), 2000);
  }
}
