/**
 * 分段获取异步请求结果
 * @param {Array<() => Promise<any>>} promises 
 * @param {number} max 
 * @param {number} maxError 
 */
function segment(promises, max = 10, maxError = 10) {
    const races = []
    const anwser = []
    let errorCount = 0
    return new Promise((resolveFn, rejectFn) => {
        const nextPromise = (promise, promiseIndex, raceIndex) => {
            return new Promise((resolve, reject) => {
                promise()
                    .then(res => {
                        anwser[promiseIndex] = res
                        resolve(raceIndex)
                    }).catch(e => {
                        errorCount++
                        if (errorCount >= maxError) {
                            rejectFn('maxError')
                            return
                        }
                        races[raceIndex] = nextPromise(promise, promiseIndex, raceIndex)
                        reject(raceIndex)
                    })
            })
        }
        const race = (promise, promiseIndex) => {
            return Promise.race(races).then((index) => {
                races[index] = nextPromise(promise, promiseIndex, index)
            }).catch(index => {
                return race(promise, promiseIndex)
            })
        }
        const resolveAll = () => {
            return Promise.all(races).catch(e => {
                return resolveAll()
            })
        }
        return promises.reduce((prev, curr, promiseIndex) => {
            return prev.then(() => {
                const length = races.length
                if (length < max) {
                    races.push(nextPromise(curr, promiseIndex, length))
                } else {
                    return race(curr, promiseIndex)
                }
            })
        }, Promise.resolve()).then(() => {
            return resolveAll()
        }).catch(rejectFn).then(() => resolveFn(anwser))
    })
}

export { segment }