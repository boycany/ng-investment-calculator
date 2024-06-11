import { Inject, Injectable, signal } from '@angular/core';
import type { InvestmentInput } from './investment-input.model';
import { InvestmentResult } from './investment-results/investment-result.model';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  annualData = signal<InvestmentResult[] | undefined>(undefined);

  calculateInvestmentResults(data: InvestmentInput) {
    console.log('data :>> ', data);
    const { initialInvestment, annualInvestment, expectedReturn, duration } =
      data;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    console.log('annualData :>> ', annualData);
    // return annualData;
    this.annualData.set(annualData);
  }
}
