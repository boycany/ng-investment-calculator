import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  // calculate = output<InvestmentInput>();
  private investmentService = inject(InvestmentService);

  enteredInitialInvestment = signal(0);
  enteredAnnualInvestment = signal(0);
  enteredExpectedReturn = signal(0);
  enteredDuration = signal(0);

  onSubmit() {
    // this.calculate.emit({
    //   initialInvestment: this.enteredInitialInvestment(),
    //   annualInvestment: this.enteredAnnualInvestment(),
    //   expectedReturn: this.enteredExpectedReturn(),
    //   duration: this.enteredDuration(),
    // });
    this.investmentService.calculateInvestmentResults({
      initialInvestment: this.enteredInitialInvestment(),
      annualInvestment: this.enteredAnnualInvestment(),
      expectedReturn: this.enteredExpectedReturn(),
      duration: this.enteredDuration(),
    });
  }
}
