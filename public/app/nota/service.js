import { handleStatus, log } from '../utils/promise-helpers.js'
import { partialize, pipe } from '../utils/operators.js'
import { Maybe } from '../utils/maybe.js';

const API = 'http://localhost:3000/notas';


const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo == code));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((prev, curr) => prev + curr.valor, 0));

export const notasServices = {
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .then(_ => Maybe.of(null))
            .catch(err => {
                console.error(err);
                return Promise.reject('Não foi possível obter as notas fiscais');
            });
    },

    sumItems(codigo) {
        const filterItems = partialize(filterItemsByCode, codigo);

        const sumItems = pipe(getItemsFromNotas, filterItems, sumItemsValue);

        return this.listAll()
            .then(sumItems)
            .then(result => result.getOrElse(0));
    }
} 