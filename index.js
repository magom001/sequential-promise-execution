/**
 * An example of a sequential execution of promises:
 * 1. With generators;
 * 2. With async await;
 * 3. With promise factory.
 */

function arrayOfPromisesFactory() {
  const promises = [];
  for (let i = 0; i < 5; i++) {
    promises.push(
      () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(`Promise resolves in ${i} second(s)`);
          }, 1000);
        })
    );
  }
  return promises;
}

/**
 * 1. Sequential promises with generators
 */

function* showPromisesSequentially() {
  const arrayOfPromises = arrayOfPromisesFactory();

  for (let i = 0; i < arrayOfPromises.length; i++) {
    const promiseResult = yield arrayOfPromises[i]();
    console.log(promiseResult);
  }
  return "Promises resolved sequentially with a generator";
}

function execute(generator, yieldValue) {
  let next = generator.next(yieldValue);
  if (!next.done) {
    next.value.then(result => execute(generator, result));
  } else {
    console.log(next.value);
  }
}

/*********************************************************/

/**
 * 2. Sequential promises with async await
 */

async function sequentialPromisesWithAsyncAwait(promises) {
  for (promise of promises) {
    const result = await promise();
    console.log(result);
  }
  console.log("Promises executed sequentially with async await");
}

/*********************************************************/

/**
 * 3. Sequential promises with promise factory
 */

function sequentialExecutionWithPromiseFactory() {
  function promiseFactory(id, msg) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("Resolving promise with id", id);
        resolve();
      }, 1000);
    });
  }

  let result = Promise.resolve();

  for (let i = 0; i < 5; i++) {
    result = result.then(() => promiseFactory.call(null, i));
  }

  result
    .then(() => console.log("Promises were executed sequentially"))
    .catch(err => console.log(err));
}

/*********************************************************/

/**
 * Remove comment to call the required function
 */

// execute(showPromisesSequentially());
// sequentialPromisesWithAsyncAwait(arrayOfPromisesFactory());
// sequentialExecutionWithPromiseFactory();
