import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'jsl-digital-maturity-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, RouterLink],
  templateUrl: './digital-maturity-selector.html',
  styleUrl: './digital-maturity-selector.scss'
})
export class DigitalMaturitySelector {
  step = signal(0);
  answers = signal<Record<string, any>>({});

  // Example questions
  questions = [
    {
      id: 'size',
      titleKey: 'MATURITY.Q1_TITLE',
      options: [
        { labelKey: 'MATURITY.Q1_OPT1', value: 'startup', icon: 'Rocket' },
        { labelKey: 'MATURITY.Q1_OPT2', value: 'sme', icon: 'Building' },
        { labelKey: 'MATURITY.Q1_OPT3', value: 'enterprise', icon: 'Building2' }
      ]
    },
    {
      id: 'goal',
      titleKey: 'MATURITY.Q2_TITLE',
      options: [
        { labelKey: 'MATURITY.Q2_OPT1', value: 'efficiency', icon: 'Zap' },
        { labelKey: 'MATURITY.Q2_OPT2', value: 'growth', icon: 'TrendingUp' },
        { labelKey: 'MATURITY.Q2_OPT3', value: 'innovation', icon: 'Lightbulb' }
      ]
    },
    {
      id: 'tech',
      titleKey: 'MATURITY.Q3_TITLE',
      options: [
        { labelKey: 'MATURITY.Q3_OPT1', value: 'legacy', icon: 'HardDrive' },
        { labelKey: 'MATURITY.Q3_OPT2', value: 'cloud', icon: 'Cloud' },
        { labelKey: 'MATURITY.Q3_OPT3', value: 'mixed', icon: 'Layers' }
      ]
    }
  ];

  result = computed(() => {
    if (this.step() < this.questions.length) return null;

    // Simple logic for demo
    const size = this.answers()['size'];
    const goal = this.answers()['goal'];

    let recommendationKey = 'MATURITY.REC_GENERAL';
    if (size === 'startup') recommendationKey = 'MATURITY.REC_STARTUP';
    else if (goal === 'efficiency') recommendationKey = 'MATURITY.REC_EFFICIENCY';
    else if (goal === 'innovation') recommendationKey = 'MATURITY.REC_INNOVATION';

    return {
      titleKey: 'MATURITY.RESULT_TITLE',
      descKey: recommendationKey,
      ctaLink: ['/contact']
    };
  });

  selectOption(questionId: string, value: string) {
    this.answers.update(curr => ({ ...curr, [questionId]: value }));
    this.nextStep();
  }

  nextStep() {
    this.step.update(s => s + 1);
  }

  reset() {
    this.step.set(0);
    this.answers.set({});
  }
}
