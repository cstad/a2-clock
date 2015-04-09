import {Component, Template, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'a2-clock'
})
@Template({
    url: 'templates/Clock.html'
})
class Clock {
    time: Date = new Date(2015, 3, 8, 12, 0, 0, 0, 0);

    constructor() {
        // this.incrementSeconds();
    }
    incrementSeconds() {
        setTimeout(function() {
            this.incrementSeconds();

            this.time = new Date();
        }.bind(this), 1000);
    }
    getHour(): string {
        return 'rotate(' + (30 * (this.time.getHours() % 12) + this.time.getMinutes() / 2) + ' 50 50)';
    }
    getMinute(): string {
        return 'rotate(' + (6 * this.time.getMinutes()) + ' 50 50)';
    }
    getSeond(): string {
        return 'rotate(' + (6 * this.time.getSeconds()) + ' 50 50)';
    }
}

export function main() {
    bootstrap(Clock);
}
