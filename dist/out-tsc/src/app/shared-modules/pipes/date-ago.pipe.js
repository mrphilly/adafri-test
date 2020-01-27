import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let DateAgoPipe = class DateAgoPipe {
    transform(value, args) {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value.seconds * 1000 + (value.nanoseconds / 1000000000))) / 1000);
            if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            const intervals = {
                'année': 31536000,
                'mois': 2592000,
                'semaines': 604800,
                'jour': 86400,
                'heure': 3600,
                'minute': 60,
                'seconde': 1
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return "il y'a " + counter + " " + i + "";
                        /*  return counter + ' ' + i + ' ago';  */ // singular (1 day ago)
                    }
                    else {
                        /* return counter + ' ' + i + 's ago';  */ // plural (2 days ago)
                        return "il y'a " + counter + " " + i + "s";
                    }
            }
        }
        return value;
    }
};
DateAgoPipe = tslib_1.__decorate([
    Pipe({
        name: 'dateAgo',
        pure: true
    })
], DateAgoPipe);
export { DateAgoPipe };
//# sourceMappingURL=date-ago.pipe.js.map