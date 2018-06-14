import {isPlatformBrowser} from '@angular/common';
import {Component, Inject, PLATFORM_ID, AfterViewInit} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';

declare const jQuery;


/***
 * Creator: Sangmin Heo
 *
 * Reference: https://codyhouse.co/demo/horizontal-timeline/index.html
 * Horizontal timeline pure javascript code refactor to Angular
 */
@Component({
  selector: 'intro-roadmap',
  templateUrl: './intro-roadmap.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './horizontal-timeline.scss',
    './intro-roadmap.component.scss'
  ]
})
export class IntroRoadmapComponent extends BaseComponent implements AfterViewInit {
  eventsMinDistance = 120;

  timelineList: {
    date: string,
    topic: string,
    topicTitle: string,
    title: string,
    subtitle: string,
    description: string,
    selected: boolean,
    current?: boolean
  }[] = [
    {
      date: '01/01/2017',
      topic: 'Q1, 2017',
      topicTitle: 'STARTING POINT',
      title: 'Horizontal Timeline',
      subtitle: 'January 16th, 2014',
      description: 'Hello World',
      selected: false
    },
    {
      date: '03/01/2017',
      topic: 'Q3, 2017',
      topicTitle: 'SYSTEM MODELING',
      title: 'Horizontal Timeline',
      subtitle: 'January 16th, 2014',
      description: 'Hello World',
      selected: false
    },
    {
      date: '06/01/2017',
      topic: 'Q4, 2017',
      topicTitle: 'PLATFORM TESTING',
      title: 'Horizontal Timeline',
      subtitle: 'January 16th, 2014',
      description: 'Hello World',
      selected: false
    },
    {
      date: '09/01/2017',
      topic: 'Q1, 2018',
      topicTitle: 'ICO',
      title: 'Horizontal Timeline',
      subtitle: 'January 16th, 2014',
      description: 'Hello World',
      selected: true,
      current: true
    },
    {
      date: '12/01/2017',
      topic: 'Q4, 2018',
      topicTitle: 'LAUNCHING',
      title: 'Horizontal Timeline',
      subtitle: 'January 16th, 2014',
      description: 'Hello World',
      selected: false
    },
    {
      date: '03/01/2018',
      topic: '2019 ~ 2020',
      topicTitle: 'RESHAPING GLOBAL MUSIC INDUSTRY',
      title: 'Horizontal Timeline',
      subtitle: 'January 16th, 2014',
      description: 'Hello World',
      selected: false
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) { // Only display horizontal timeline in browser mode (consider SSR)
      const timelines = jQuery('.cd-horizontal-timeline');

      if (timelines.length > 0) {
        this.initTimeline(timelines);
      }
    }
  }

  private initTimeline(timelines) {
    console.log(timelines);
    timelines.each((timelineEvent, element) => {
      const timeline = jQuery(element),
        timelineComponents = {};
      // cache timeline components
      timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
      timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
      timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
      timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
      timelineComponents['timelineDates'] = this.parseDate(timelineComponents['timelineEvents']);
      timelineComponents['eventsMinLapse'] = this.minLapse(timelineComponents['timelineDates']);
      timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
      timelineComponents['eventsContent'] = timeline.children('.events-content');

      // assign a left postion to the single events along the timeline
      this.setDatePosition(timelineComponents, this.eventsMinDistance);
      // assign a width to the timeline
      const timelineTotWidth = this.setTimelineWidth(timelineComponents, this.eventsMinDistance);
      // the timeline has been initialize - show it
      timeline.addClass('loaded');

      // detect click on the next arrow
      timelineComponents['timelineNavigation'].on('click', '.next', (event) => {
        event.preventDefault();
        this.updateSlide(timelineComponents, timelineTotWidth, 'next');
      });
      // detect click on the prev arrow
      timelineComponents['timelineNavigation'].on('click', '.prev', (event) => {
        event.preventDefault();
        this.updateSlide(timelineComponents, timelineTotWidth, 'prev');
      });
      // detect click on the a single event - show new event content
      timelineComponents['eventsWrapper'].on('click', 'a', (event) => {
        event.preventDefault();
        timelineComponents['timelineEvents'].removeClass('selected');
        const clickElement = (jQuery(event.target).prop('tagName') === 'A') ? jQuery(event.target) : jQuery(event.target).parent();
        clickElement.addClass('selected');
        this.updateOlderEvents(clickElement);
        this.updateFilling(clickElement, timelineComponents['fillingLine'], timelineTotWidth);
        this.updateVisibleContent(clickElement, timelineComponents['eventsContent']);
      });

      // on swipe, show next/prev event content
      timelineComponents['eventsContent'].on('swipeleft', () => {
        const mq = this.checkMQ();
        if (mq === 'mobile') {
          this.showNewContent(timelineComponents, timelineTotWidth, 'next');
        }
      });
      timelineComponents['eventsContent'].on('swiperight', () => {
        const mq = this.checkMQ();
        if (mq === 'mobile') {
          this.showNewContent(timelineComponents, timelineTotWidth, 'prev');
        }
      });

      // keyboard navigation
      jQuery(document).keyup((event) => {
        if (event.which === '37' && this.elementInViewport(timeline.get(0))) {
          this.showNewContent(timelineComponents, timelineTotWidth, 'prev');
        } else if (event.which === '39' && this.elementInViewport(timeline.get(0))) {
          this.showNewContent(timelineComponents, timelineTotWidth, 'next');
        }
      });
    });
  }

  private updateSlide(timelineComponents, timelineTotWidth, string) {
    // retrieve translateX value of timelineComponents['eventsWrapper']
    const translateValue = this.getTranslateValue(timelineComponents['eventsWrapper']),
      wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
    // translate the timeline to the left('next')/right('prev')
    (string === 'next')
      ? this.translateTimeline(timelineComponents, translateValue - wrapperWidth + this.eventsMinDistance, wrapperWidth - timelineTotWidth)
      : this.translateTimeline(timelineComponents, translateValue + wrapperWidth - this.eventsMinDistance);
  }

  private showNewContent(timelineComponents, timelineTotWidth, string) {
    // go from one event to the next/previous one
    const visibleContent = timelineComponents['eventsContent'].find('.selected'),
      newContent = ( string === 'next' ) ? visibleContent.next() : visibleContent.prev();

    if (newContent.length > 0) { // if there's a next/prev event - show it
      const selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
        newEvent = ( string === 'next' ) ? selectedDate.parent('li').next('li').children('a')
          : selectedDate.parent('li').prev('li').children('a');

      this.updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
      this.updateVisibleContent(newEvent, timelineComponents['eventsContent']);
      newEvent.addClass('selected');
      selectedDate.removeClass('selected');
      this.updateOlderEvents(newEvent);
      this.updateTimelinePosition(string, newEvent, timelineComponents);
    }
  }

  private updateTimelinePosition(string, event, timelineComponents) {
    // translate timeline to the left/right according to the position of the selected event
    const eventStyle = window.getComputedStyle(event.get(0), null),
      eventLeft = Number(eventStyle.getPropertyValue('left').replace('px', '')),
      timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
      timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
    const timelineTranslate = this.getTranslateValue(timelineComponents['eventsWrapper']);

    if ((string === 'next' && eventLeft > timelineWidth - timelineTranslate) || (string === 'prev' && eventLeft < -timelineTranslate)) {
      this.translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
    }
  }

  private translateTimeline(timelineComponents, value, totWidth = null) {
    const eventsWrapper = timelineComponents['eventsWrapper'].get(0);
    value = (value > 0) ? 0 : value; // only negative translate value
    value = ( totWidth && value < totWidth ) ? totWidth : value; // do not translate more than timeline width
    this.setTransformValue(eventsWrapper, 'translateX', value + 'px');
    // update navigation arrows visibility
    (value === 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive')
      : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
    (value === totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive')
      : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
  }

  private updateFilling(selectedElement, filling, totWidth) {
    // change .filling-line length according to the selected event
    if (!(selectedElement instanceof Element)) {
      selectedElement = selectedElement[0];
    }
    const eventStyle = window.getComputedStyle(selectedElement, null),
      eventWidth = eventStyle.getPropertyValue('width');
    let eventLeft: any = eventStyle.getPropertyValue('left');
    eventLeft = +eventLeft.replace('px', '') + +eventWidth.replace('px', '') / 2;
    const scaleValue = eventLeft / totWidth;
    this.setTransformValue(filling.get(0), 'scaleX', scaleValue);
  }

  private setDatePosition(timelineComponents, min) {
    for (let i = 0; i < timelineComponents['timelineDates'].length; i++) {
      const distance = this.daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]);
      // const distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
      const distanceNorm = i * 2 + 2; // Sangmin Customize
      timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
    }
  }

  private setTimelineWidth(timelineComponents, width) {
    const timeSpan = this.daydiff(
      timelineComponents['timelineDates'][0],
      timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]
    );
    const timeSpanNorm = timelineComponents['timelineDates'].length * 2; // Sangmin Customize
    const totalWidth = timeSpanNorm * width;
    timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
    this.updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
    this.updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

    return totalWidth;
  }

  private getTranslateValue(timeline) {
    const timelineStyle = window.getComputedStyle(timeline.get(0), null),
      timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
        timelineStyle.getPropertyValue('-moz-transform') ||
        timelineStyle.getPropertyValue('-ms-transform') ||
        timelineStyle.getPropertyValue('-o-transform') ||
        timelineStyle.getPropertyValue('transform');

    let translateValue;
    if (timelineTranslate.indexOf('(') >= 0) {
      let timeline_translate: any = timelineTranslate.split('(')[1];
      timeline_translate = timeline_translate.split(')')[0];
      timeline_translate = timeline_translate.split(',');
      translateValue = +timeline_translate[4];
    } else {
      translateValue = 0;
    }

    return translateValue;
  }

  private updateVisibleContent(event, eventsContent) {
    const eventDate = event.data('date'),
      visibleContent = eventsContent.find('.selected'),
      selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
      selectedContentHeight = selectedContent.height();

    let classEntering, classLeaving;

    if (selectedContent.index() > visibleContent.index()) {
      classEntering = 'selected enter-right';
      classLeaving = 'leave-left';
    } else {
      classEntering = 'selected enter-left';
      classLeaving = 'leave-right';
    }

    selectedContent.attr('class', classEntering);
    visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', () => {
      visibleContent.removeClass('leave-right leave-left');
      selectedContent.removeClass('enter-left enter-right');
    });
    eventsContent.css('height', selectedContentHeight + 'px');

    this.timelineList.forEach((timeline, index) => {
      timeline.selected = selectedContent.index() === index;
    });
  }

  private updateOlderEvents(event) {
    event.parent('li').prevAll('li').children('a')
      .addClass('older-event').end().end().nextAll('li')
      .children('a').removeClass('older-event');
  }

  private setTransformValue(element, property, value) {
    element.style['-webkit-transform'] = property + '(' + value + ')';
    element.style['-moz-transform'] = property + '(' + value + ')';
    element.style['-ms-transform'] = property + '(' + value + ')';
    element.style['-o-transform'] = property + '(' + value + ')';
    element.style['transform'] = property + '(' + value + ')';
  }

  // based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
  private parseDate(events) {
    const dateArrays = [];
    events.each(function () {
      const singleDate = jQuery(this),
        dateComp = singleDate.data('date').split('T');
      let dayComp, timeComp;
      if (dateComp.length > 1) { // both DD/MM/YEAR and time are provided
        dayComp = dateComp[0].split('/');
        timeComp = dateComp[1].split(':');
      } else if (dateComp[0].indexOf(':') >= 0) { // only time is provide
        dayComp = ['2000', '0', '0'];
        timeComp = dateComp[0].split(':');
      } else { // only DD/MM/YEAR
        dayComp = dateComp[0].split('/');
        timeComp = ['0', '0'];
      }
      const newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
      dateArrays.push(newDate);
    });
    return dateArrays;
  }

  private daydiff(first, second) {
    return Math.round((second - first));
  }

  private minLapse(dates) {
    // determine the minimum distance among events
    const dateDistances = [];
    for (let i = 1; i < dates.length; i++) {
      const distance = this.daydiff(dates[i - 1], dates[i]);
      dateDistances.push(distance);
    }
    return Math.min.apply(null, dateDistances);
  }

  /*
    How to tell if a DOM element is visible in the current viewport?
    http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  */
  private elementInViewport(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }

  private checkMQ() {
    // check if mobile or desktop device
    return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before')
      .getPropertyValue('content')
      .replace(/'/g, '')
      .replace(/"/g, '');
  }
}
