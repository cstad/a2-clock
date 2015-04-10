import {Component, Template, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'a2-clock'
})
@Template({
    url: 'templates/Clock.html'
})
class Clock {
    time: Date = new Date();
    clockType: string = 'default';

    constructor() {
        this.incrementSeconds();
    }
    incrementSeconds() {
        setTimeout(function() {
            this.incrementSeconds();

            this.time = new Date();
        }.bind(this), 1000);
    }
    getHour(): string {
        return 'rotate(' + (30 * (this.time.getHours() % 12) + this.time.getMinutes() / 2) + ' 49.5 49.5)';
    }
    getMinute(): string {
        return 'rotate(' + (6 * this.time.getMinutes()) + ' 49.5 49.5)';
    }
    getSeond(): string {
        return 'rotate(' + (6 * this.time.getSeconds()) + ' 49.5 49.5)';
    }
}

export function main() {
    bootstrap(Clock);
}
