import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mzk-faq-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss', '../../md-style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FAQQAComponent {
  @Input()
  question: string;

  @Input()
  answer: string;
}
