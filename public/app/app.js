
import './utils/array-helpers.js'
import { notasServices as service } from './nota/service.js'
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js';
import { retry, timeoutPromise } from './utils/promise-helpers.js'
import { EventEmmiter } from './utils/event-emmiter.js';


const operation = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
)

const action = operation(() =>
    retry(3, 3000, () => timeoutPromise(200, service.sumItems('2143')))
        .then(total => EventEmmiter.emmit('itensTotalizados', total))
        .catch(console.error));


document
    .querySelector('#myButton')
    .onclick = action; 