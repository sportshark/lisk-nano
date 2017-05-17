import moment from 'moment';

import './timestamp.less';

const UPDATE_INTERVAL_UPDATE = 15000;

/**
 * The main component uses moment.js to show a relative human readable time for a given date object.
 *
 * @module app
 * @submodule timestamp
 */
app.component('timestamp', {
  template: require('./timestamp.pug')(),
  bindings: {
    data: '<',
  },
  /**
   * The timestamp component constructor class
   *
   * @class timestamp
   * @constructor
   */
  controller: class timestamp {
    constructor($scope, $interval) {
      this.$interval = $interval;

      /**
       * @todo If we change this component to a directive, we won't need this watcher
       */
      $scope.$watch('$ctrl.data', this.update.bind(this));
    }

    $onDestroy() {
      this.$interval.cancel(this.interval);
    }

    /**
     * Uses moment JS to update the human readable timestamp
     *
     * @todo Either remove this interval and use moment directly, or use Sync service instead.
     */
    update() {
      this.$interval.cancel(this.interval);
      this.interval = this.$interval(this._update.bind(this), UPDATE_INTERVAL_UPDATE);
    }

    _update() {
      const obj = moment(timestamp.fix(this.data));
      this.full = obj.format('LL LTS');
      this.time_ago = obj.fromNow(true);
    }

    static fix(value) {
      return new Date((((Date.UTC(2016, 4, 24, 17, 0, 0, 0) / 1000) + value) * 1000));
    }
  },
});
