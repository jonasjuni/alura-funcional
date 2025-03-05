import { handleStatus, log } from '../utils/promise-helpers.js'
import { partialize, pipe } from '../utils/operators.js'

const API = 'http://localhost:3000/notas';


const getItemsFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItemsByCode = (code, items) => items.filter(item => item.codigo == code);
const sumItemsValue = items => items.reduce((prev, curr) => prev + curr.valor, 0);

const sumItems = codigo => getItemsFromNotas()
    .filter(item => item.codigo == codigo)
    .reduce((total, item) => total + item.valor, 0);

export const notasServices = {
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .catch(err => {
                console.error(err);
                return Promise.reject('Não foi possível obter as notas fiscais');
            });
    },

    sumItems(codigo) {
        const filterItems = partialize(filterItemsByCode, codigo);

        const sumItems = pipe(getItemsFromNotas, filterItems, sumItemsValue);

        return this.listAll()
            .then(sumItems);
    }
} 