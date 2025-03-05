
import './utils/array-helpers.js'
import { notasServices as service } from './nota/service.js'
import { log } from './utils/promise-helpers.js'



document
    .querySelector('#myButton')
    .onclick = () => service.sumItems('2143')
        .then(console.log)
        .catch(console.error); 