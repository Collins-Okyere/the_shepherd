import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalDbService } from '../../services/local-db.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SelectInputComponent } from '../../reusable-comps/select-input/select-input.component';
import { ToastService } from '../../reusable-comps/toast/toast.service';
import { PricingService } from '../pricing/pricing.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, SelectInputComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  acceptTerms = true;
  tryFree = false;
  paymentPage = false;
  database: any = {};
  signupInfo:any = { paymentMode: 'momo', package: 'Basic', paytPeriod: 'monthly' };
  selectedCountry: any = null;
  dropdownOpen = false;
  countries: any[] = [];
  packages: any[] = [];
  toastData: any = {};
  selectInputData: any = {};
  filteredPlans: any[] = [];
  paytPeriod: string = 'monthly';

  constructor(
    private readonly noDB: LocalDbService,
    private readonly toast: ToastService,
    private readonly router: Router,
    private readonly api: ApiService,
    private readonly pricingService: PricingService
  ) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.countries = this.noDB.countries || [];
    this.packages = this.noDB.product_plans || [];
    this.selectInputData = {
      items: this.countries,
      placeholder: 'Select country',
      displayProperty: 'name',
      searchProperty: 'name',
      multiple: false,
      autoClose: true,
      defaultValue: this.countries.length > 0 ? this.countries[0] : null,
      toastData: this.toastData,
    };
    this.getStorage();
    this.updatePackagePricing();
  }

  getStorage() {
    const isFree = this.api.getLocalStorage('tryFree');
    const paytPeriod = this.api.getLocalStorage('paytPeriod');
    const service = this.api.getLocalStorage('selectedService');
    if(isFree === 'true'){ this.tryFree = true} else {this.tryFree = false};
    if(paytPeriod){ this.paytPeriod = paytPeriod} else {this.paytPeriod = 'monthly'};
    if(service){ this.switchService(service) } else { this.switchService('Basic') };
    this.switchPaytPeriod(this.paytPeriod);
  }

  toggleCheckBoxes(val: string) {
    if (val === 'accept') this.acceptTerms = !this.acceptTerms;
    if (val === 'tryFree') this.tryFree = !this.tryFree;
  }

  onSelectionChanged(selectedCountries: any[]) {
    console.log('Selected countries:', selectedCountries);
  }

  submitAndProceed() {
    this.paymentPage = true;
    if (!this.tryFree) {
      this.switchPaytMode('momo');
      // this.signupInfo.package = 'Basic';
    } else {
      this.signupInfo.package = '14-day Trial';
    }
    this.updatePackagePricing();
  }

  viewPlans() {
    this.toggleCheckBoxes('tryFree');
    this.submitAndProceed();
    this.switchPaytMode('momo');
    this.switchPaytPeriod('monthly');
  }

  switchPaytPeriod(val: string) {
    this.signupInfo.paytPeriod = val;
    this.paytPeriod = val;
    this.updatePackagePricing();
  }

  switchPaytMode(val: string) {
    this.signupInfo.paymentMode = val;
  }

  switchService(val: string) {
    this.signupInfo.package = val;
    this.updatePackagePricing();
  }

  updatePackagePricing(): void {
    const plans = this.tryFree ? this.packages.filter((pk: any) => pk.is_free) : this.packages.filter((pk: any) => !pk.is_free);
    this.filteredPlans = plans.filter( (pkg) => (this.paytPeriod === 'monthly' ? true : !pkg.is_free)).map((pkg) =>
      this.paytPeriod === 'monthly' ? this.pricingService.getMonthlyPrice(pkg) : this.pricingService.getYearlyPrice(pkg)
    );
  }

  signUp(info: any) {
    if (this.acceptTerms) {
      info.churchCountry = this.selectedCountry;
      setTimeout(() => {
        this.toastData = { isVisible: true, showCloseBtn: true, showIcon: true, status: 'success', time: 6000, msg: `Congratulations ${info.userFirstName}! You just unlocked your 14-day free trial! Your login details have been sent to ${info.userEmail}.`};
        this.toast.showToast(this.toastData.message, this.toastData.status);
        this.router.navigate(['/auth/sign_in']);
      }, 1000);
    } else {
      this.toastData = { isVisible: true, showCloseBtn: true, showIcon: true, status: 'danger', msg: `Accept terms and conditions to continue.`,};
      this.toast.showToast(this.toastData.message, this.toastData.status);
    }
    this.selectInputData.toastData = this.toastData;
  }

}
