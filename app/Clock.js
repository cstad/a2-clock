import {Component, Template, bootstrap, If} from 'angular2/angular2';

@Component({
    selector: 'a2-clock'
})
@Template({
    url: 'templates/Clock.html',
    directives: [If]
})
class Clock {
    time: Date = new Date();
    secondHandPosition: string = 'M150, 150 L150, 2';
    constructor() {
        setTimeout(function() {
            this.secondHandPosition = 'M150, 150 L150, 298';
        }, 3000);
    }
    getSecondHandPosition() {
        return this.secondHandPosition;
    }

}

export function main() {
    bootstrap(Clock);
}
