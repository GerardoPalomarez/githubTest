import { Injectable } from '@angular/core';

declare let jQuery: any;

@Injectable()
export class AppConfig {
  config = {
    debug: true,
    settings: {
      screens: {
        'xs-max': 543,
        'sm-min': 544,
        'sm-max': 767,
        'md-min': 768,
        'md-max': 991,
        'lg-min': 992,
        'lg-max': 1199,
        'xl-min': 1200
      },
      navCollapseTimeout: 2500
    },
    /**
     * Application state. May be changed when using.
     * Synced to Local Storage
     */
    state: {
      /**
       * whether navigation is static (prevent automatic collapsing)
       */
      'nav-static': false
    }
  };

  _resizeCallbacks = [];
  _screenSizeCallbacks = {
    xs: {enter: [], exit: []},
    sm: {enter: [], exit: []},
    md: {enter: [], exit: []},
    lg: {enter: [], exit: []},
    xl: {enter: [], exit: []}
  };

  isScreen(size: string): boolean {
    const screenPx = window.innerWidth;
    return (screenPx >= this.config.settings.screens[size + '-min'] || size === 'xs')
      && (screenPx <= this.config.settings.screens[size + '-max'] || size === 'xl');
  }

  getScreenSize(): string {
    const screenPx = window.innerWidth;
    if (screenPx <= this.config.settings.screens['xs-max']) { return 'xs'; }
    if ((screenPx >= this.config.settings.screens['sm-min'])
      && (screenPx <= this.config.settings.screens['sm-max'])) { return 'sm'; }
    if ((screenPx >= this.config.settings.screens['md-min'])
      && (screenPx <= this.config.settings.screens['md-max'])) { return 'md'; }
    if ((screenPx >= this.config.settings.screens['lg-min'])
      && (screenPx <= this.config.settings.screens['lg-max'])) { return 'lg'; }
    if (screenPx >= this.config.settings.screens['xl-min']) { return 'xl'; }
  }

  onScreenSize(size: string | number | (string | number)[], fn: any, onEnter: any): void {
    onEnter = typeof onEnter !== 'undefined' ? onEnter : true;
    if (typeof size === 'object') {
      for (let i = 0; i < size.length; i++) {
        this._screenSizeCallbacks[size[i]][onEnter ? 'enter' : 'exit'].push(fn);
      }
    } else {
      this._screenSizeCallbacks[size][onEnter ? 'enter' : 'exit'].push(fn);
    }

  }


  max(array: any): any {
    return Math.max.apply(null, array);
  }

  min(array: any): any {
    return Math.min.apply(null, array);
  }

  _initResizeEvent(): void {
    let resizeTimeout;

    jQuery(window).on('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        jQuery(window).trigger('sn:resize');
      }, 100);
    });
  }

  _initOnScreenSizeCallbacks(): void  {
    let resizeTimeout,
      prevSize = this.getScreenSize();

    jQuery(window).resize(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const size = this.getScreenSize();
        if (size !== prevSize) { // run only if something changed
          // run exit callbacks first
          this._screenSizeCallbacks[prevSize].exit.forEach((fn) => {
            fn(size, prevSize);
          });
          // run enter callbacks then
          this._screenSizeCallbacks[size].enter.forEach((fn) => {
            fn(size, prevSize);
          });
          // console.log('screen changed. new: ' + size + ', old: ' + prevSize);
        }
        prevSize = size;
      }, 100);
    });
  }

  constructor() {
    this._initResizeEvent();
    this._initOnScreenSizeCallbacks();
  }

  getConfig(): Object {
    return this.config;
  }
}

