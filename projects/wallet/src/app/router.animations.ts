import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({
        position: 'fixed', width:'100%'
    }), { optional: true }),
    group([
      query(':enter .wrapper, :enter footer, :enter .address', [
        style({opacity: '0'}),
      ], { optional: true }),
      query(':leave .wrapper, :leave footer, :leave .address', [
        style({opacity: '1'}),
      ], { optional: true }),
    ]),
    query(':leave .wrapper, :leave footer, :leave .address',
      animate('0.15s ease-out', style({
          opacity: '0'
      })
    ), { optional: true }),
    query(':enter .wrapper, :enter footer, :enter .address',
      animate('0.15s ease-in', style({
        opacity: '1'
      })
    ), { optional: true }),
  ])
]);
