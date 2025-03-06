
import './utils/array-helpers.js'
import { notasServices as service } from './nota/service.js'
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js';
import { delay, retry, timeoutPromise } from './utils/promise-helpers.js'


const operation = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
)

const action = operation(() =>
    retry(3, 3000, () => timeoutPromise(200, service.sumItems('2143')))
        .then(delay(5000))
        .then(console.log)
        .catch(console.error));


document
    .querySelector('#myButton')
    .onclick = action; 