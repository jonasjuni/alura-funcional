export const handleStatus = res =>
    res.ok ? res.json() : Promise.reject(res.statusText);

export const log = param => {
    console.log(param);
    return param;
}

export const timeoutPromise = (ms, promise) => {

    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() =>
            reject(`O limite da promise de ${ms}ms foi exedido`),
            ms));

    return Promise.race([
        timeoutPromise,
        promise]);
}

export const delay = ms => data =>
    new Promise((resolve, _) =>
        setTimeout(() => resolve(data), ms));


export const retry = (retries, ms, fn) =>
    fn().catch(err => {
        console.error(err, `${retries} tentativa`);
        return delay(ms)().then(() =>
            retries > 1
                ? retry(--retries, ms, fn)
                : Promise.reject(err, 'limite de tentativas atigido')
        )
    });