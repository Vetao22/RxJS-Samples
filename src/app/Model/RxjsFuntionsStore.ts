import { RxjsFunction } from './RxjsFunction';

export class RxjsFunctionsStore
{
  functions: Array<RxjsFunction>;

  constructor()
  {
    this.functions = new Array<RxjsFunction>();

    //Combination functions
    let rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'combineAll';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'combineAll takes an Observable of Observables, and collects all Observables from it. Once the outer Observable completes, it subscribes to all collected Observables and combines their values using the combineLatest strategy.';
    rxjsFunction.code =
    `
    const outer = of(1000, 5000);
    const combined = outer.pipe(
      map((val) => {
        return interval(val).pipe(take(2))
      }),
      combineAll()
    );
    combined.subscribe(console.log)
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'combineLatest';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables.';
    rxjsFunction.code =
    `
    const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
    const combinedTimers = combineLatest(firstTimer, secondTimer);
    combinedTimers.subscribe(value => console.log(value));
    // Logs
    // [0, 0] after 0.5s
    // [1, 0] after 1s
    // [1, 1] after 1.5s
    // [2, 1] after 2s
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'concat';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Creates an output Observable which sequentially emits all values from given Observable and then moves on to the next.';
    rxjsFunction.code =
    `
    concat(of(1, 2, 3),
    // subscribed after first completes
    of(4, 5, 6),
    // subscribed after second completes
    of(7, 8, 9))

    .subscribe(console.log);
    // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
  `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'concatAll';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Converts a higher-order Observable into a first-order Observable by concatenating the inner Observables in order.';
    rxjsFunction.code =
    `
    //emit a value every 2 seconds
    const source = interval(2000);
    const example = source.pipe(
    //for demonstration, add 10 to and return as observable
    map(val => of(val + 10)),
    //merge values from inner observable
    concatAll());

    const subscribe = example.subscribe(val =>
    console.log('Example with Basic Observable:', val));
    //output: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'endWith';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Returns an Observable that emits the items you specify as arguments after it finishes emitting items emitted by the source Observable.';
    rxjsFunction.code =
    `
    of('hi', 'how are you?', 'sorry, I have to go now').pipe(
      endWith('goodbye!'),
    )
    .subscribe(word => console.log(word));
    // result:
    // 'hi'
    // 'how are you?'
    // 'sorry, I have to go now'
    // 'goodbye!'
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'forkJoin';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Accepts an Array of ObservableInput or a dictionary Object of ObservableInput and returns an Observable that emits either an array of values in the exact same order as the passed array, or a dictionary of values in the same shape as the passed dictionary.';
    rxjsFunction.code =
    `
    const observable = forkJoin({
      foo: of(1, 2, 3, 4),
      bar: Promise.resolve(8),
      baz: timer(4000),
    });
    observable.subscribe({
     next: value => console.log(value),
     complete: () => console.log('This is how it ends!'),
    });

    // Logs:
    // { foo: 4, bar: 8, baz: 0 } after 4 seconds
    // "This is how it ends!" immediately aftera
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'merge';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Creates an output Observable which concurrently emits all values from every given input Observable.';
    rxjsFunction.code =
    `
    //emit every 2.5 seconds
    const first = interval(2500);
    //emit every 2 seconds
    const second = interval(2000);
    //emit every 1.5 seconds
    const third = interval(1500);
    //emit every 1 second
    const fourth = interval(1000);

    //emit outputs from one observable
    const example = merge(
    first.pipe(mapTo('FIRST!')),
    second.pipe(mapTo('SECOND!')),
    third.pipe(mapTo('THIRD')),
    fourth.pipe(mapTo('FOURTH')));
    //output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
    const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'mergeAll';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'mergeAll subscribes to an Observable that emits Observables, also known as a higher-order Observable. Each time it observes one of these emitted inner Observables, it subscribes to that and delivers all the values from the inner Observable on the output Observable.';
    rxjsFunction.code =
    `
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(map((ev) => interval(1000)));
    const firstOrder = higherOrder.pipe(mergeAll());
    firstOrder.subscribe(x => console.log(x));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'pairwise';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Puts the current value and previous value together as an array, and emits that.';
    rxjsFunction.code =
    `
    //Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
    interval(1000)
    .pipe(pairwise(), take(5))
    .subscribe(console.log);
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'race';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Returns an Observable that mirrors the first source Observable to emit an item from the combination of this Observable and supplied Observables.';
    rxjsFunction.code =
    `
    //take the first observable to emit
    const example = race(
    //emit every 1.5s
    interval(1500),
    //emit every 1s
    interval(1000).pipe(mapTo('1s won!')),
    //emit every 2s
    interval(2000),
    //emit every 2.5s
    interval(2500));

    const subscribe = example.subscribe(val => console.log(val));
    //output: "1s won!"..."1s won!"...etc
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'startWith';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Returns an Observable that emits the items you specify as arguments before it begins to emit items emitted by the source Observable.';
    rxjsFunction.code =
    `
    //emit (1,2,3)
    const source = of(1, 2, 3);
    //start with 0
    const example = source.pipe(startWith(0));

    const subscribe = example.subscribe(val => console.log(val));
    //output: 0,1,2,3
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'withLatestFrom';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.';
    rxjsFunction.code =
    `
    //emit every 5s
    const source = interval(5000);
    //emit every 1s
    const secondSource = interval(1000);
    const example = source.pipe(
    withLatestFrom(secondSource),
    map(([first, second]) => {
    return 'First Source (5s): #{first} Second Source (1s): #{second}';}));

    const subscribe = example.subscribe(val => console.log(val));
    "Source (1s): 4 Latest From (5s): 0"
    "Source (1s): 5 Latest From (5s): 0"
    "Source (1s): 6 Latest From (5s): 0"
    ...
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'zip';
    rxjsFunction.funcType = 'Combination';
    rxjsFunction.description = 'After all observables emit, emit values as an array.';
    rxjsFunction.code =
    `
    const sourceOne = of('Hello');
    const sourceTwo = of('World!');
    const sourceThree = of('Goodbye');
    const sourceFour = of('World!');
    //wait until all observables have emitted a value then emit all as an array
    const example = zip(
    sourceOne,
    sourceTwo.pipe(delay(1000)),
    sourceThree.pipe(delay(2000)),
    sourceFour.pipe(delay(3000)));

    const subscribe = example.subscribe(val => console.log(val));
    //output: ["Hello", "World!", "Goodbye", "World!"]
    `;

    this.functions.push(rxjsFunction);

    //Conditional functions

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'defaultIfEmpty';
    rxjsFunction.funcType = 'Conditional';
    rxjsFunction.description = 'Emits a given value if the source Observable completes without emitting any next value, otherwise mirrors the source Observable.';
    rxjsFunction.code =
    `
    //emit 'Observable.of() Empty!' when empty, else any values from source
    const exampleOne = of().pipe(defaultIfEmpty('Observable.of() Empty!'));

    const subscribe = example.subscribe(val => console.log(val));
    //output: 'Observable.of() Empty!'
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'every';
    rxjsFunction.funcType = 'Conditional';
    rxjsFunction.description = 'Returns an Observable that emits whether or not every item of the source satisfies the condition specified.';
    rxjsFunction.code =
    `
    const source = of(1, 2, 3, 4, 5);
    const example = source.pipe(
    //is every value even?
    every(val => val % 2 === 0));
    const subscribe = example.subscribe(val => console.log(val));
    //output: false
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'iif';
    rxjsFunction.funcType = 'Conditional';
    rxjsFunction.description = 'Subscribe to first or second observable based on a condition.';
    rxjsFunction.code =
    `
    const r$ = of('R');
    const x$ = of('X');

    interval(1000).pipe(mergeMap(v => iif(() => v % 4 === 0, r$, x$)))
      .subscribe(console.log);

    // output: R, X, X, X, R, X, X, X, etc...
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'sequenceEqual';
    rxjsFunction.funcType = 'Conditional';
    rxjsFunction.description = 'Compares all values of two observables in sequence using an optional comparator function and returns an observable of a single boolean value representing whether or not the two sequences are equal.';
    rxjsFunction.code =
    `
    const expectedSequence = from([4, 5, 6]);

    of([1, 2, 3], [4, 5, 6], [7, 8, 9])
    .pipe(switchMap(arr => from(arr).pipe(sequenceEqual(expectedSequence))))
    .subscribe(console.log);

    //output: false, true, false
    `;

    this.functions.push(rxjsFunction);

    //Creation functions

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'ajax';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'It creates an observable for an Ajax request with either a request object with url, headers, etc or a string for a URL.';
    rxjsFunction.code =
    `
    const githubUsers = 'https://api.github.com/users?per_page=2';

    const users = ajax(githubUsers);

    const subscribe = users.subscribe(res => console.log(res), err => console.error(err));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'create';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Creates a new Observable, that will execute the specified function when an Observer subscribes to it.';
    rxjsFunction.code =
    `
    /*
      Create an observable that emits 'Hello' and 'World' on
      subscription.
    */
    const hello = Observable.create(function(observer) {
      observer.next('Hello');
      observer.next('World');
      observer.complete();
    });

    //output: 'Hello'...'World'
    const subscribe = hello.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'defer';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.';
    rxjsFunction.code =
    `
    //will capture current date time
    const s1 = of(new Date());

    //will capture date time at the moment of subscription
    const s2 = defer(() => of(new Date()));

    console.log(new Date());

    timer(2000).pipe(switchMap(_ => merge(s1, s2))).subscribe(console.log);

    /*
    OUTPUT =>
    2019-02-10T12:38:30.000Z (currrent date/time from first console log)
    2019-02-10T12:38:30.000Z (date/time in s1 console log, captured date/time at the moment of observable creation)
    2019-02-10T12:38:32.000Z (date/time in s2 console log, captured date/time at the moment of subscription)
    */
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'empty';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Creates an Observable that emits no items to the Observer and immediately emits a complete notification.';
    rxjsFunction.code =
    `
    const interval$ = interval(1000);
    const result = interval$.pipe(mergeMap(x => x % 2 === 1 ? of('a', 'b', 'c') : empty()));
    result.subscribe(x => console.log(x));

    // Results in the following to the console:
    // x is equal to the count on the interval eg(0,1,2,3,...)
    // x will occur every 1000ms
    // if x % 2 is equal to 1 print abc
    // if x % 2 is not equal to 1 nothing will be output
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'from';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.';
    rxjsFunction.code =
    `
    //emit array as a sequence of values
    const arraySource = from([1, 2, 3, 4, 5]);
    //output: 1,2,3,4,5
    const subscribe = arraySource.subscribe(val => console.log(val));

    //emit result of promise
    const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
    //output: 'Hello World'
    const subscribe = promiseSource.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'fromEvent';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Creates an Observable that emits events of a specific type coming from the given event target.';
    rxjsFunction.code =
    `
    //create observable that emits click events
    const source = fromEvent(document, 'click');

    //map to string with given event timestamp
    const example = source.pipe(map(event => 'Event time: #{event.timeStamp}'));

    //output (example): 'Event time: 7276.390000000001'
    const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'generate';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Generates an observable sequence by running a state-driven loop producing the sequences elements, using the specified scheduler to send out observer messages.';
    rxjsFunction.code =
    `
    generate(
      2,
      x => x <= 8,
      x => x + 3
    ).subscribe(console.log);

    /*
    OUTPUT:
    2
    5
    8
    */
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'interval';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Creates an Observable that emits sequential numbers every specified interval of time.';
    rxjsFunction.code =
    `
    //emit value in sequence every 1 second
    const source = interval(1000);

    //output: 0,1,2,3,4,5....
    const subscribe = source.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'of';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Converts the arguments to an observable sequence.';
    rxjsFunction.code =
    `
    //emits any number of provided values in sequence
    const source = of(1, 2, 3, 4, 5);

    //output: 1,2,3,4,5
    const subscribe = source.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'range';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Creates an Observable that emits a sequence of numbers within a specified range.';
    rxjsFunction.code =
    `
    //emit 1-10 in sequence
    const source = range(1, 10);

    //output: 1,2,3,4,5,6,7,8,9,10
    const example = source.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'throw';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Emit error on subscription.';
    rxjsFunction.code =
    `
    //emits an error with specified value on subscription
    const source = throwError('This is an error!');

    //output: 'Error: This is an error!'
    const subscribe = source.subscribe({
      next: val => console.log(val),
      complete: () => console.log('Complete!'),
      error: val => console.log('Error: #{val}')
    });
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'timer';
    rxjsFunction.funcType = 'Creation';
    rxjsFunction.description = 'Creates an Observable that starts emitting after an dueTime and emits ever increasing numbers after each period of time thereafter.';
    rxjsFunction.code =
    `
    /*
    timer takes a second argument, how often to emit subsequent values
    in this case we will emit first value after 1 second and subsequent
    values every 2 seconds after
    */
    const source = timer(1000, 2000);
    //output: 0,1,2,3,4,5......
    const subscribe = source.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    //Error Handling functions

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'catchError';
    rxjsFunction.funcType = 'ErrorHandling';
    rxjsFunction.description = 'Catches errors on the observable to be handled by returning a new observable or throwing an error.';
    rxjsFunction.code =
    `
    of(1, 2, 3, 4, 5).pipe(
      map(n => {
        if (n === 4) {
          throw 'four!';
        }
      return n;
      }),
      catchError(err => of('I', 'II', 'III', 'IV', 'V')),
    )
    .subscribe(x => console.log(x));
    // 1, 2, 3, I, II, III, IV, V
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'retry';
    rxjsFunction.funcType = 'ErrorHandling';
    rxjsFunction.description = 'Returns an Observable that mirrors the source Observable with the exception of an error. If the source Observable calls error, this method will resubscribe to the source Observable for a maximum of count resubscriptions (given as a number parameter) rather than propagating the error call.';
    rxjsFunction.code =
    `
    //emit value every 1s
    const source = interval(1000);
    const example = source.pipe(
      mergeMap(val => {
        //throw error for demonstration
        if (val > 5) {
          return throwError('Error!');
        }
        return of(val);
      }),
      //retry 2 times on error
      retry(2));
    /*
      output:
      0..1..2..3..4..5..
      0..1..2..3..4..5..
      0..1..2..3..4..5..
      "Error!: Retried 2 times then quit!"
    */
    const subscribe = example.subscribe({
      next: val => console.log(val),
      error: val => console.log('#{val}: Retried 2 times then quit!')
    });
    `;

    this.functions.push(rxjsFunction);


    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'retryWhen';
    rxjsFunction.funcType = 'ErrorHandling';
    rxjsFunction.description = 'Retry an observable sequence on error based on custom criteria.';
    rxjsFunction.code =
    `
    //emit value every 1s
    const source = interval(1000);
    const example = source.pipe(
      map(val => {
        if (val > 5) {
          //error will be picked up by retryWhen
          throw val;
        }
        return val;
      }),
      retryWhen(errors =>
        errors.pipe(
          //log error message
          tap(val => console.log('Value #{val} was too high!')),
          //restart in 6 seconds
          delayWhen(val => timer(val * 1000))
        )
      )
    );
    /*
      output:
      0
      1
      2
      3
      4
      5
      "Value 6 was too high!"
      --Wait 6 seconds then repeat
    */
    const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    //Multicasting functions


    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'publish';
    rxjsFunction.funcType = 'Multicasting';
    rxjsFunction.description = 'Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called before it begins emitting items to those Observers that have subscribed to it.';
    rxjsFunction.code =
    `
      const source$ = zip(interval(2000), of(1, 2, 3, 4, 5, 6, 7, 8, 9)).pipe(
        map(values => values[1])
      );

      source$
        .pipe(
          publish(multicasted$ =>
            merge(
              multicasted$.pipe(tap(x => console.log('Stream 1:', x))),
              multicasted$.pipe(tap(x => console.log('Stream 2:', x))),
              multicasted$.pipe(tap(x => console.log('Stream 3:', x))),
            )
          )
        )
        .subscribe();

      // Results every two seconds
      // Stream 1: 1
      // Stream 2: 1
      // Stream 3: 1
      // ...
      // Stream 1: 9
      // Stream 2: 9
      // Stream 3: 9
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'multicast';
    rxjsFunction.funcType = 'Multicasting';
    rxjsFunction.description = 'Returns an Observable that emits the results of invoking a specified selector on items emitted by a ConnectableObservable that shares a single subscription to the underlying stream.';
    rxjsFunction.code =
    `
      //emit every 2 seconds, take 5
      const source = interval(2000).pipe(take(5));

      const example = source.pipe(
      //since we are multicasting below, side effects will be executed once
      tap(() => console.log('Side Effect #1')),
      mapTo('Result!'));

      //subscribe subject to source upon connect()
      const multi = example.pipe(multicast(() => new Subject()));
      /*
      subscribers will share source
      output:
      "Side Effect #1"
      "Result!"
      "Result!"
      ...
      */
      const subscriberOne = multi.subscribe(val => console.log(val));
      const subscriberTwo = multi.subscribe(val => console.log(val));
      //subscribe subject to source
      multi.connect();
      `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'share';
    rxjsFunction.funcType = 'Multicasting';
    rxjsFunction.description = 'Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream hot. This is an alias for multicast(() => new Subject()), refCount().';
    rxjsFunction.code =
    `
      //emit value in 1s
      const source = timer(1000);

      //log side effect, emit result
      const example = source.pipe(
      tap(() => console.log('***SIDE EFFECT***')),
      mapTo('***RESULT***'));

      /*
      ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
      output:
      "***SIDE EFFECT***"
      "***RESULT***"
      "***SIDE EFFECT***"
      "***RESULT***"
      */
      const subscribe = example.subscribe(val => console.log(val));
      const subscribeTwo = example.subscribe(val => console.log(val));

      //share observable among subscribers
      const sharedExample = example.pipe(share());

      /*
      ***SHARED, SIDE EFFECT EXECUTED ONCE***
      output:
      "***SIDE EFFECT***"
      "***RESULT***"
      "***RESULT***"
      */

      const subscribeThree = sharedExample.subscribe(val => console.log(val));
      const subscribeFour = sharedExample.subscribe(val => console.log(val));
       `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'shareReplay';
    rxjsFunction.funcType = 'Multicasting';
    rxjsFunction.description = 'Share source and replay specified number of emissions on subscription.';
    rxjsFunction.code =
    `

      // simulate url change with subject
      const routeEnd = new Subject<{data: any, url: string}>();

      // grab url and share with subscribers
      const lastUrl = routeEnd.pipe(
        tap(_ => console.log('executed')),
        pluck('url'),
        // defaults to all values so we set it to just keep and replay last one
        shareReplay(1)
      );

      // requires initial subscription
      const initialSubscriber = lastUrl.subscribe(console.log);

      // simulate route change
      // logged: 'executed', 'my-path'
      routeEnd.next({data: {}, url: 'my-path'});

      // logged: 'my-path'
      const lateSubscriber = lastUrl.subscribe(console.log);
    `;

    this.functions.push(rxjsFunction);

    //Filtering

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'audit';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Ignores source values for a duration determined by another Observable, then emits the most recent value from the source Observable, then repeats this process.';
    rxjsFunction.code =
    `
      const clicks = fromEvent(document, 'click');
      const result = clicks.pipe(audit(ev => interval(1000)));
      result.subscribe(x => console.log(x));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'auditTime';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Ignores source values for duration milliseconds, then emits the most recent value from the source Observable, then repeats this process.';
    rxjsFunction.code =
    `
      // Create observable that emits click events
      const source = fromEvent(document, 'click');

      // Emit clicks at a rate of at most one click per second
      const example = source.pipe(auditTime(1000))

      // Output (example): '(1s) --- Clicked --- (1s) --- Clicked'
      const subscribe = example.subscribe(val => console.log('Clicked'));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'debounce';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits a value from the source Observable only after a particular time span determined by another Observable has passed without another source emission.';
    rxjsFunction.code =
    `
        //emit four strings
        const example = of('WAIT', 'ONE', 'SECOND', 'Last will display');

        /*
            Only emit values after a second has passed between the last emission,
            throw away all other values
        */
        const debouncedExample = example.pipe(debounce(() => timer(1000)));

        /*
            In this example, all values but the last will be omitted
            output: 'Last will display'
        */
        const subscribe = debouncedExample.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);


    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'debounceTime';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits a value from the source Observable only after a particular time span has passed without another source emission.';
    rxjsFunction.code =
    `
      // elem ref
      const searchBox = document.getElementById('search');

      // streams
      const keyup$ = fromEvent(searchBox, 'keyup');

      // wait .5s between keyups to emit current value
      keyup$
        .pipe(
          map((i: any) => i.currentTarget.value),
          debounceTime(500)
        )
        .subscribe(console.log);
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'distinct';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.';
    rxjsFunction.code =
    `
      const obj1 = { id: 3, name: 'name 1' };
      const obj2 = { id: 4, name: 'name 2' };
      const obj3 = { id: 3, name: 'name 3' };
      const vals = [obj1, obj2, obj3];

      from(vals)
        .pipe(distinct(e => e.id))
        .subscribe(console.log);

      /*
      OUTPUT:
      {id: 3, name: "name 1"}
      {id: 4, name: "name 2"}
      */
    `;

    this.functions.push(rxjsFunction);


    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'distinctUntilChanged';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.';
    rxjsFunction.code =
    `
      // only output distinct values, based on the last emitted value
      const source$ = from([1, 1, 2, 2, 3, 3]);

      source$
        .pipe(distinctUntilChanged())
        // output: 1,2,3
        .subscribe(console.log);
    `;

    this.functions.push(rxjsFunction);


    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'distinctUntilKeyChanged';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item, using a property accessed by using the key provided to check if the two items are distinct.';
    rxjsFunction.code =
    `
      // only output distinct values, based on the last emitted value
      const source$ = from([
        { name: 'Brian' },
        { name: 'Joe' },
        { name: 'Joe' },
        { name: 'Sue' }
      ]);

      source$
        // custom compare based on name property
        .pipe(distinctUntilKeyChanged('name'))
        // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
        .subscribe(console.log);
    `;

    this.functions.push(rxjsFunction);


    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'filter';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.';
    rxjsFunction.code =
    `
      //emit (1,2,3,4,5)
      const source = from([1, 2, 3, 4, 5]);

      //filter out non-even numbers
      const example = source.pipe(filter(num => num % 2 === 0));

      //output: "Even number: 2", "Even number: 4"
      const subscribe = example.subscribe(val => console.log('Even number: #{val}'));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'find';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits only the first value emitted by the source Observable that meets some condition.';
    rxjsFunction.code =
    `
      // elem ref
      const status = document.getElementById('status');

      // streams
      const clicks$ = fromEvent(document, 'click');

      clicks$
        .pipe(
          find((event: any) => event.target.id === 'box'),
          mapTo('Found!'),
          startWith('Find me!'),

          // reset when click outside box
          repeatWhen(() =>
            clicks$.pipe(filter((event: any) => event.target.id !== 'box'))
          )
        )
        .subscribe(message => (status.innerHTML = message));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'first';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits only the first value (or the first value that meets some condition) emitted by the source Observable.';
    rxjsFunction.code =
    `
      const source = from([1, 2, 3, 4, 5]);
      //emit first item to pass test

      const example = source.pipe(first(num => num === 5));

      //output: "First to pass test: 5"
      const subscribe = example.subscribe(val =>
      console.log('First to pass test: #{val}'));
          `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'ignoreElements';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Ignores all items emitted by the source Observable and only passes calls of complete or error.';
    rxjsFunction.code =
    `
      //emit value every 100ms
      const source = interval(100);

      //ignore everything but complete
      const example = source.pipe(take(5), ignoreElements());

      //output: "COMPLETE!"
      const subscribe = example.subscribe(
        val => console.log('NEXT: #{val}'),
        val => console.log('ERROR: #{val}'),
        () => console.log('COMPLETE!'));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'last';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Returns an Observable that emits only the last item emitted by the source Observable. It optionally takes a predicate function as a parameter, in which case, rather than emitting the last item from the source Observable, the resulting Observable will emit the last item from the source Observable that satisfies the predicate.';
    rxjsFunction.code =
    `
      const source = from([1, 2, 3, 4, 5]);
      //emit last even number

      const exampleTwo = source.pipe(last(num => num % 2 === 0));

      //output: "Last to pass test: 4"
      const subscribeTwo = exampleTwo.subscribe(val =>
      console.log('Last to pass test: #{val}'));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'sample';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits the most recently emitted value from the source Observable whenever another Observable, the notifier, emits.';
    rxjsFunction.code =
    `
      //emit value every 1s
      const source = interval(1000);

      //sample last emitted value from source every 2s
      const example = source.pipe(sample(interval(2000)));

      //output: 2..4..6..8..
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'single';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Returns an Observable that emits the single item emitted by the source Observable that matches a specified predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no items, notify of an IllegalArgumentException or NoSuchElementException respectively. If the source Observable emits items but none match the specified predicate then undefined is emitted.';
    rxjsFunction.code =
    `
      //emit (1,2,3,4,5)
      const source = from([1, 2, 3, 4, 5]);

      //emit one item that matches predicate
      const example = source.pipe(single(val => val === 4));

      //output: 4
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'skip';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Returns an Observable that skips the first count items emitted by the source Observable.';
    rxjsFunction.code =
    `
      //emit every 1s
      const source = interval(1000);

      //skip the first 5 emitted values
      const example = source.pipe(skip(5));

      //output: 5...6...7...8........
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'skipUntil';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.';
    rxjsFunction.code =
    `
      //emit every 1s
      const source = interval(1000);

      //skip emitted values from source until inner observable emits (6s)
      const example = source.pipe(skipUntil(timer(6000)));

      //output: 5...6...7...8........
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'skipWhile';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds true, but emits all further source items as soon as the condition becomes false.';
    rxjsFunction.code =
    `
      //emit every 1s
      const source = interval(1000);

      //skip emitted values from source while value is less than 5
      const example = source.pipe(skipWhile(val => val < 5));

      //output: 5...6...7...8........
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'take';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits only the first count values emitted by the source Observable.';
    rxjsFunction.code =
    `
      //emit 1,2,3,4,5
      const source = of(1, 2, 3, 4, 5);

      //take the first emitted value then complete
      const example = source.pipe(take(1));

      //output: 1
      const subscribe = example.subscribe(val => console.l
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'takeLast';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits only the last count values emitted by the source Observable.';
    rxjsFunction.code =
    `
      const source = of('Ignore', 'Ignore', 'Hello', 'World!');

      // take the last 2 emitted values
      const example = source.pipe(takeLast(2));

      // Hello, World!
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'takeUntil';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits the values emitted by the source Observable until a notifier Observable emits a value.';
    rxjsFunction.code =
    `
      //emit value every 1s
      const source = interval(1000);

      //after 5 seconds, emit value
      const timer$ = timer(5000);

      //when timer emits after 5s, complete source
      const example = source.pipe(takeUntil(timer$));

      //output: 0,1,2,3
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'takeWhile';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits values emitted by the source Observable so long as each value satisfies the given predicate, and then completes as soon as this predicate is not satisfied.';
    rxjsFunction.code =
    `
      //emit 1,2,3,4,5
      const source$ = of(1, 2, 3, 4, 5);

      //allow values until value from source is greater than 4, then complete
      source$
        .pipe(takeWhile(val => val <= 4))
        // log: 1,2,3,4
        .subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'throttle';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits a value from the source Observable, then ignores subsequent source values for a duration determined by another Observable, then repeats this process.';
    rxjsFunction.code =
    `
      //emit value every 1 second
      const source = interval(1000);

      //throttle for 2 seconds, emit latest value
      const example = source.pipe(throttle(val => interval(2000)));

      //output: 0...3...6...9
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'throttleTime';
    rxjsFunction.funcType = 'Filtering';
    rxjsFunction.description = 'Emits a value from the source Observable, then ignores subsequent source values for duration milliseconds, then repeats this process.';
    rxjsFunction.code =
    `
      // emit value every 1 second
      const source = interval(1000);

      /*
        emit the first value, then ignore for 5 seconds. repeat...
      */
      const example = source.pipe(throttleTime(5000));

      // output: 0...6...12
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    //Transformation functions

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'buffer';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Buffers the source Observable values until closingNotifier emits.';
    rxjsFunction.code =
    `
      //Create an observable that emits a value every second
      const myInterval = interval(1000);

      //Create an observable that emits every time document is clicked
      const bufferBy = fromEvent(document, 'click');

      /*
      Collect all values emitted by our interval observable until we click document. This will cause the bufferBy Observable to emit a value, satisfying the buffer. Pass us all collected values since last buffer as an array.
      */
      const myBufferedInterval = myInterval.pipe(buffer(bufferBy));

      //Print values to console
      //ex. output: [1,2,3] ... [4,5,6,7,8]
      const subscribe = myBufferedInterval.subscribe(val => console.log(' Buffered Values:', val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'bufferCount';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Buffers the source Observable values until the size hits the maximum bufferSize given.';
    rxjsFunction.code =
    `
      //Create an observable that emits a value every second
      const source = interval(1000);

      //After three values are emitted, pass on as an array of buffered values
      const bufferThree = source.pipe(bufferCount(3));

      //Print values to console
      //ex. output [0,1,2]...[3,4,5]
      const subscribe = bufferThree.subscribe(val => console.log('Buffered Values:', val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'bufferTime';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Buffers the source Observable values for a specific time period.';
    rxjsFunction.code =
    `
      //Create an observable that emits a value every 500ms
      const source = interval(500);

      //After 2 seconds have passed, emit buffered values as an array
      const example = source.pipe(bufferTime(2000));

      //Print values to console
      //ex. output [0,1,2]...[3,4,5,6]
      const subscribe = example.subscribe(val => console.log('Buffered with Time:', val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'bufferToggle';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Buffers the source Observable values starting from an emission from openings and ending when the output of closingSelector emits.';
    rxjsFunction.code =
    `
      //emit value every second
      const sourceInterval = interval(1000);

      //start first buffer after 5s, and every 5s after
      const startInterval = interval(5000);

      //emit value after 3s, closing corresponding buffer
      const closingInterval = val =>
      {
        console.log('Value #{val} emitted, starting buffer! Closing in 3s!');
        return interval(3000);
      };

      //every 5s a new buffer will start, collecting emitted values for 3s then emitting buffered values
      const bufferToggleInterval = sourceInterval.pipe(
        bufferToggle(startInterval, closingInterval)
      );

      //log to console
      //ex. emitted buffers [4,5,6]...[9,10,11]
      const subscribe = bufferToggleInterval.subscribe(val => console.log('Emitted Buffer:', val));
          `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'bufferWhen';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Buffers the source Observable values, using a factory function of closing Observables to determine when to close, emit, and reset the buffer.';
    rxjsFunction.code =
    `
      //emit value every 1 second
      const oneSecondInterval = interval(1000);

      //return an observable that emits value every 5 seconds
      const fiveSecondInterval = () => interval(5000);

      //every five seconds, emit buffered values
      const bufferWhenExample = oneSecondInterval.pipe(
        bufferWhen(fiveSecondInterval)
      );

      //log values
      //ex. output: [0,1,2,3]...[4,5,6,7,8]
      const subscribe = bufferWhenExample.subscribe(val => console.log('Emitted Buffer: ', val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'concatMap';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging the next.';
    rxjsFunction.code =
    `
      //emit delay value
      const source = of(2000, 1000);

      // map value from source into inner observable, when complete emit result and move to next
      const example = source.pipe(
        concatMap(val => of('Delayed by: #{val}ms').pipe(delay(val)))
      );

      //output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
      const subscribe = example.subscribe(val =>
        console.log('With concatMap: #{val}'));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'concatMapTo';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Projects each source value to the same Observable which is merged multiple times in a serialized fashion on the output Observable.';
    rxjsFunction.code =
    `
      //emit value every 2 seconds
      const sampleInterval = interval(500).pipe(take(5));
      const fakeRequest = of('Network request complete').pipe(delay(3000));

      //wait for first to complete before next is subscribed
      const example = sampleInterval.pipe(concatMapTo(fakeRequest));

      //result
      //output: Network request complete...3s...Network request complete'
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'exhaustMap';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Projects each source value to an Observable which is merged in the output Observable only if the previous projected Observable has completed.';
    rxjsFunction.code =
    `
      const sourceInterval = interval(1000);
      const delayedInterval = sourceInterval.pipe(delay(10), take(4));

      const exhaustSub = merge(
        // delay 10ms, then start interval emitting 4 values
        delayedInterval,
        // emit immediately
        of(true)).pipe(exhaustMap(_ => sourceInterval.pipe(take(5))))
        /*
        *  The first emitted value (of(true)) will be mapped
        *  to an interval observable emitting 1 value every
        *  second, completing after 5.
        *  Because the emissions from the delayed interval
        *  fall while this observable is still active they will be ignored.
        *
        *  Contrast this with concatMap which would queue,
        *  switchMap which would switch to a new inner observable each emission,
        *  and mergeMap which would maintain a new subscription for each emitted value.
        */
        // output: 0, 1, 2, 3, 4
        .subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'expand';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Recursively projects each source value to an Observable which is merged in the output Observable.';
    rxjsFunction.code =
    `
      //emit 2
      const source = of(2);

      const example = source.pipe(
        //recursively call supplied function
        expand(val => {
          //2,3,4,5,6
          console.log('Passed value: #{val}');
          //3,4,5,6
          return of(1 + val);
        }),
        //call 5 times
        take(5)
      );

      /*
          "RESULT: 2"
          "Passed value: 2"
          "RESULT: 3"
          "Passed value: 3"
          "RESULT: 4"
          "Passed value: 4"
          "RESULT: 5"
          "Passed value: 5"
          "RESULT: 6"
          "Passed value: 6"
      */
      //output: 2,3,4,5,6
      const subscribe = example.subscribe(val => console.log('RESULT: #{val}'));
    `;


    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'groupBy';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Groups the items emitted by an Observable according to a specified criterion, and emits these grouped items as GroupedObservables, one GroupedObservable per group.';
    rxjsFunction.code =
    `
      const people = [
        { name: 'Sue', age: 25 },
        { name: 'Joe', age: 30 },
        { name: 'Frank', age: 25 },
        { name: 'Sarah', age: 35 }
      ];

      //emit each person
      const source = from(people);

      //group by age
      const example = source.pipe(
        groupBy(person => person.age),
        // return each item in group as array
        mergeMap(group => group.pipe(toArray()))
      );

      /*
        output:
        [{age: 25, name: "Sue"},{age: 25, name: "Frank"}]
        [{age: 30, name: "Joe"}]
      */
      const subscribe = example.subscribe(val => console.log(val));
      `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'map';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.';
    rxjsFunction.code =
    `
      //emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
      const source = from([
        { name: 'Joe', age: 30 },
        { name: 'Frank', age: 20 },
        { name: 'Ryan', age: 50 }
      ]);

      //grab each persons name, could also use pluck for this scenario
      const example = source.pipe(map(({ name }) => name));

      //output: "Joe","Frank","Ryan"
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'mapTo';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Emits the given constant value on the output Observable every time the source Observable emits a value.';
    rxjsFunction.code =
    `
      //emit value every two seconds
      const source = interval(2000);

      //map all emissions to one value
      const example = source.pipe(mapTo('HELLO WORLD!'));

      //output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'mergeMap';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Projects each source value to an Observable which is merged in the output Observable.';
    rxjsFunction.code =
    `
      // faking network request for save
      const saveLocation = location => {
        return of(location).pipe(delay(500));
      };

      // streams
      const click$ = fromEvent(document, 'click');

      click$
        .pipe(
          mergeMap((e: MouseEvent) => {
            return saveLocation({
              x: e.clientX,
              y: e.clientY,
              timestamp: Date.now()
            });
          })
        )

        // Saved! {x: 98, y: 170, ...}
        .subscribe(r => console.log('Saved!', r));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'mergeScan';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Applies an accumulator function over the source Observable where the accumulator function itself returns an Observable, then each intermediate Observable returned is merged into the output Observable.';
    rxjsFunction.code =
    `
      const click$ = fromEvent(document, 'click');
      const one$ = click$.pipe(mapTo(1));
      const seed = 0;

      const count$ = one$.pipe(
        mergeScan((acc, one) => of(acc + one), seed),
      );

      count$.subscribe(x => console.log(x));

      // Results:
      // 1
      // 2
      // 3
      // 4
      // ...and so on for each click
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'partition';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Splits the source Observable into two, one with values that satisfy a predicate, and another with values that do not satisfy the predicate.';
    rxjsFunction.code =
    `
      const source = from([1, 2, 3, 4, 5, 6]);
      //first value is true, second false

      const [evens, odds] = source.pipe(partition(val => val % 2 === 0));

      /*
        Output:
        "Even: 2"
        "Even: 4"
        "Even: 6"
        "Odd: 1"
        "Odd: 3"
        "Odd: 5"
      */
      const subscribe = merge(
        evens.pipe(map(val => 'Even: #{val}')),
        odds.pipe(map(val => 'Odd: #{val}''))
      ).subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'pluck';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Maps each source value (an object) to its specified nested property.';
    rxjsFunction.code =
    `
      const source = from([
        { name: 'Joe', age: 30 },
        { name: 'Sarah', age: 35 }
      ]);

      //grab names
      const example = source.pipe(pluck('name'));

      //output: "Joe", "Sarah"
      const subscribe = example.subscribe(val => console.log(val));
     `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'reduce';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value.';
    rxjsFunction.code =
    `
      const source = of(1, 2, 3, 4);
      const example = source.pipe(reduce((acc, val) => acc + val));

      //output: Sum: 10'
      const subscribe = example.subscribe(val => console.log('Sum:', val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'scan';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Applies an accumulator function over the source Observable, and returns each intermediate result, with an optional seed value.';
    rxjsFunction.code =
    `
      const source = of(1, 2, 3);
      // basic scan example, sum over time starting with zero

      const example = source.pipe(scan((acc, curr) => acc + curr, 0));

      // log accumulated values
      // output: 1,3,6
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'switchMap';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.';
    rxjsFunction.code =
    `
      fromEvent(document, 'click')
      .pipe(
        // restart counter on every click
        switchMap(() => interval(1000))  )
      .subscribe(console.log);
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'switchMapTo';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Projects each source value to the same Observable which is flattened multiple times with switchMap in the output Observable.';
    rxjsFunction.code =
    `
      const clicks = fromEvent(document, 'click');
      const result = clicks.pipe(switchMapTo(interval(1000)));
      result.subscribe(x => console.log(x));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'toArray';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Collects all source emissions and emits them as an array when the source completes.';
    rxjsFunction.code =
    `
      interval(100)
      .pipe(take(10), toArray())
      .subscribe(console.log);

    // output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'window';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Branch out the source Observable values as a nested Observable whenever windowBoundaries emits.';
    rxjsFunction.code =
    `
    //emit immediately then every 1s
    const source = timer(0, 1000);

    const example = source.pipe(window(interval(3000)));
    const count = example.pipe(scan((acc, curr) => acc + 1, 0));

    /*
      "Window 1:"
      0
      1
      2
      "Window 2:"
      3
      4
      5
      ...
    */
    const subscribe = count.subscribe(val => console.log('Window #{val}:'));
    const subscribeTwo = example
      .pipe(mergeAll())
      .subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'windowCount';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Branch out the source Observable values as a nested Observable with each nested Observable emitting at most windowSize values.';
    rxjsFunction.code =
    `
      //emit every 1s
      const source = interval(1000);

      const example = source.pipe(
        //start new window every 4 emitted values
        windowCount(4),
        tap(_ => console.log('NEW WINDOW!'))
      );

      const subscribeTwo = example
        .pipe(
          //window emits nested observable
          mergeAll()
          /*
                  output:
                  "NEW WINDOW!"
                  0
                  1
                  2
                  3
                  "NEW WINDOW!"
                  4
                  5
                  6
                  7
                */
        )
        .subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'windowTime';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Branch out the source Observable values as a nested Observable periodically in time.';
    rxjsFunction.code =
    `
      //emit immediately then every 1s
      const source = timer(0, 1000);

      const example = source.pipe(
        //start new window every 3s
        windowTime(3000),
        tap(_ => console.log('NEW WINDOW!'))
      );

      const subscribeTwo = example
        .pipe(
          //window emits nested observable
          mergeAll()
          /*
                  output:
                  "NEW WINDOW!"
                  0
                  1
                  2
                  "NEW WINDOW!"
                  3
                  4
                  5
                */
        )
        .subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'windowToggle';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Branch out the source Observable values as a nested Observable starting from an emission from openings and ending when the output of closingSelector emits.';
    rxjsFunction.code =
    `
      //emit immediately then every 1s
      const source = timer(0, 1000);

      //toggle window on every 5
      const toggle = interval(5000);

      const example = source.pipe(
        //turn window on every 5s
        windowToggle(toggle, val => interval(val * 1000)),
        tap(_ => console.log('NEW WINDOW!'))
      );

      const subscribeTwo = example
        .pipe(
          //window emits nested observable
          mergeAll()
          /*
                  output:
                  "NEW WINDOW!"
                  5
                  "NEW WINDOW!"
                  10
                  11
                  "NEW WINDOW!"
                  15
                  16
                  "NEW WINDOW!"
                  20
                  21
                  22
                */
        )
        .subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'windowWhen';
    rxjsFunction.funcType = 'Transformation';
    rxjsFunction.description = 'Branch out the source Observable values as a nested Observable using a factory function of closing Observables to determine when to start a new window.';
    rxjsFunction.code =
    `
      //emit immediately then every 1s
      const source = timer(0, 1000);

      const example = source.pipe(
        //close window every 5s and emit observable of collected values from source
        windowWhen(() => interval(5000)),
        tap(_ => console.log('NEW WINDOW!'))
      );

      const subscribeTwo = example
        .pipe(
          //window emits nested observable
          mergeAll()
          /*
            output:
            "NEW WINDOW!"
            0
            1
            2
            3
            4
            "NEW WINDOW!"
            5
            6
            7
            8
            9
          */
        )
        .subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    //Utility functions

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'tap';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.';
    rxjsFunction.code =
    `
      const source = of(1, 2, 3, 4, 5);

      // transparently log values from source with 'tap'
      const example = source.pipe(
        tap(val => console.log('BEFORE MAP: #{val}')),
        map(val => val + 10),
        tap(val => console.log('AFTER MAP: #{val}'))
      );

      //'tap' does not transform values
      //output: 11...12...13...14...15
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'delay';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Delays the emission of items from the source Observable by a given timeout or until a given Date.';
    rxjsFunction.code =
    `
      //emit one item
      const example = of(null);

      //delay output of each by an extra second
      const message = merge(
        example.pipe(mapTo('Hello')),
        example.pipe(mapTo('World!'), delay(1000)),
        example.pipe(mapTo('Goodbye'), delay(2000)),
        example.pipe(mapTo('World!'), delay(3000))
      );

      //output: 'Hello'...'World!'...'Goodbye'...'World!'
      const subscribe = message.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'delayWhen';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Delays the emission of items from the source Observable by a given time span determined by the emissions of another Observable.';
    rxjsFunction.code =
    `
      //emit value every second
      const message = interval(1000);

      //emit value after five seconds
      const delayForFiveSeconds = () => timer(5000);

      //after 5 seconds, start emitting delayed interval values
      const delayWhenExample = message.pipe(delayWhen(delayForFiveSeconds));

      //log values, delayed for 5 seconds
      //ex. output: 5s....1...2...3
      const subscribe = delayWhenExample.subscribe(val => console.
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'dematerialize';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Converts an Observable of Notification objects into the emissions that they represent.';
    rxjsFunction.code =
    `
      //emit next and error notifications
      const source = from([
        Notification.createNext('SUCCESS!'),
        Notification.createError('ERROR!')
      ]).pipe(
        //turn notification objects into notification values
        dematerialize()
      );

      //output: 'NEXT VALUE: SUCCESS' 'ERROR VALUE: 'ERROR!'
      const subscription = source.subscribe({
        next: val => console.log('NEXT VALUE: #{val}'),
        error: val => console.log('ERROR VALUE: #{val}')
      });
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'finalize';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Returns an Observable that mirrors the source Observable, but will call a specified function when the source terminates on complete or error.';
    rxjsFunction.code =
    `
      //emit value in sequence every 1 second
      const source = interval(1000);

      const example = source.pipe(
        take(5), //take only the first 5 values
        finalize(() => console.log('Sequence complete'))
        // Execute when the observable completes
      )

      //output: 0,1,2,3,4,5....
      const subscribe = example.subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'repeat';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Returns an Observable that will resubscribe to the source stream when the source stream completes, at most count times.';
    rxjsFunction.code =
    `
      const delayedThing = of('delayed value').pipe(delay(2000));

      delayedThing
        .pipe(repeat(3))

        // delayed value...delayed value...delayed value
        .subscribe(console.log);
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'timeInterval';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Emits an object containing the current value, and the time that has passed between emitting the current value and the previous value, which is calculated by using the provided schedulers now() method to retrieve the current time at each emission, then calculating the difference. The scheduler defaults to async, so by default, the interval will be in milliseconds.';
    rxjsFunction.code =
    `
      const seconds = interval(1000);

      seconds.pipe(timeInterval())
      .subscribe(
          value => console.log(value),
          err => console.log(err),
      );

      // NOTE: The values will never be this precise,
      // intervals created with 'interval' or 'setInterval'
      // are non-deterministic.

      // {value: 0, interval: 1000}
      // {value: 1, interval: 1000}
      // {value: 2, interval: 1000}
      `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'timeout';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Errors if Observable does not emit a value in given time span.';
    rxjsFunction.code =
    `
      // simulate request
      function makeRequest(timeToDelay) {
        return of('Request Complete!').pipe(delay(timeToDelay));
      }

      of(4000, 3000, 2000)
        .pipe(
          concatMap(duration =>
            makeRequest(duration).pipe(
              timeout(2500),
              catchError(error => of('Request timed out after: #{duration}'))
            )
          )
        )
        /*
        *  "Request timed out after: 4000"
        *  "Request timed out after: 3000"
        *  "Request Complete!"
        */
        .subscribe(val => console.log(val));
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'timeoutWith';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Errors if Observable does not emit a value in given time span, in case of which subscribes to the second Observable.';
    rxjsFunction.code =
    `
      const fakeRequest = delayTime => of('!response!').pipe(delay(delayTime));
      const requestTimeoutLogger = of('logging request timeout');
      const timeoutThreshold = 1000;

      of(timeoutThreshold + 1, timeoutThreshold - 1, timeoutThreshold + 3)
        .pipe(
          concatMap(e =>
            fakeRequest(e).pipe(timeoutWith(timeoutThreshold, requestTimeoutLogger))
          )
        )
        .subscribe(console.log);

      /*
        OUTPUT:
          logging request timeout
          !response!
          logging request timeout
      */
    `;

    this.functions.push(rxjsFunction);

    rxjsFunction = new RxjsFunction();
    rxjsFunction.name = 'toPromise';
    rxjsFunction.funcType = 'Utility';
    rxjsFunction.description = 'Convert observable to promise.';
    rxjsFunction.code =
    `
      //return basic observable
      const sample = val => Rx.Observable.of(val).delay(5000);

      //convert basic observable to promise
      const example = sample('First Example')
        .toPromise()

        //output: 'First Example'
        .then(result => {
          console.log('From Promise:', result);
        });
    `;

    this.functions.push(rxjsFunction);
  }
}
