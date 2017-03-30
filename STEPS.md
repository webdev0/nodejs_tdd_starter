## Spike i Strategic Design

Nie wiem jak zacząć więc napiszę spike'a i szybko zbadam problem.
Mogę stworzyć plik spike.js w którym przeprowadzam eksperymenty.
Na tym etapie jakość kodu nie ma aż takiego znaczenia.
Optymalizuje pod szybką naukę, a kod ze spike.js zostanie później wyrzucony.

Czego chcę się nauczyć:

- jak odczytać plik (src/symbols) w Node.js ([https://docs.nodejitsu.com/articles/file-system/how-to-read-files-in-nodejs/](https://docs.nodejitsu.com/articles/file-system/how-to-read-files-in-nodejs/))

- jak zrobić zapytanie do API Yahoo Finance ([http://ichart.finance.yahoo.com/table.csv?s=GOOG](http://ichart.finance.yahoo.com/table.csv?s=GOOG))

- jak sparsować i wyświetlić odpowiedź na standardowe wyjście (konsole)

Czego nie chcę:

- obsługi błędów


W trakcie pisania kodu nazywam poszczególne kroki w komentarzach.

Spike pomoże mi podjąć decyzje strategiczne (jak zorganizować kod w skali makro) a TDD w taktycznej realizacji
strategiczych decyzji (w skali mikro)

## Spike i Strategic Design - podsumowanie

W jaki sposób myślisz o kodzie? Bryły? Przepływ danych?
```
GOOG                                                                   GOOG 10
APPL     [GOOG, APPL, ORCL]     [[GOOG, 10], [APPL, 12], [ORCL, 7]]    APPL 12
ORCL                                                                   ORCL  7
```
```
(file) fetch symbols --> (HTTP) fetch prices --> prepare report
```

## Outside-in development (stockfetch)

W Londyńskiej szkole TDD zaczynamy testy od zewnątrz systemu.

Zróbmy TDD funkcji stockfetch, która ma 3 pomocnicze funkcje:

- fetchSymbols

- fetchPrices

- prepareReport

Na tym etapie nie chcemy jeszcze implementować tych pomocniczych funkcji.

Naszym celem jest stworzyć stuby funkcji i przetestować czy funkcja stockfetch
właściwie deleguje zadania do funkcji pomocniczych.

Hint: Promise.resolve(1) zwraca wartość opakowaną w Promisa

## Outside-in development (stockfetch) - podsumowanie

Myślenie funkcyjne. Przepuszczam dane przez maszynkę złożoną z funkcji transformujących.

Czy projektuje synchroniczne czy asynchroniczne API?

Jakie dane do testów? Ja wolę generyczne.

Mocha nie ma sprawdzania liczby asercji.

## Poziom niżej (fetchSymbols)

Co powinna robić funkcja fetchSymbols: czytać plik i parsować symbole do postaci [GOOG, APPL, ORCL]

Napisz test, który weryfikuje czy fetchSymbols opdowiednio deleguje zadania do funkcji
readFile i parseSymbols.

Testy piszemy w pliku fetchSymbolsTest.js

## Czytelniejszy kod asynchroniczny z async/await lub generatorami

Chcemy aby nasz kod asynchroniczny wyglądał bardziej jak kod synchroniczny.

### async/await (wymaga najnowszego Node.js)


```function (done) {}```
zastępujemy
```async function () {}```

```fetch('symbolsFile').then(function(result) {})```
zastępujemy
```const result = await fetch('symbolsFile');```

### generatory (yield)

Dodaj bibliotekę co-mocha:
```
npm install co-mocha --save-dev
const coMocha = require('co-mocha');
```
```function (done) {}```
zastępujemy
```function *() {}```


```fetch('symbolsFile').then(function(result) {})```
zastępujemy
```const result = yield fetch('symbolsFile');```


## Testy integracyjne z zależnościami od systemu plików (readFile)

Testy jednostkowe nie powinny dotykać systemu plików.

Zamiast prawdziwego systemu plików chcemy użyć mocka/stuba.

Zanim jednak to zrobimy napiszmy test integracyjny używający systemu plików.

Pozwoli nam to lepiej przygotować odpowiedniego mocka/stuba.

Testy piszemy w pliku readFileTest.js

Chcemy aby funkcja readFile zwracała API Promisowe.

Moduł fs ma API callbackowe. Poniżej pomocny wzorzec przerabiania API na Promisy:

```
new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('some data');
    }, 1000);
});
```

## Testy jednostkowe z zależnościami od systemu plików (readFile)

Mając test integracyjny, stwórzmy teraz test jednostkowy.

Interesuje nas tylko tzw. happy path czyli wszystko tylko nie obsługa błędów.

## Narzędzia do mockowania

Ten sam test co poprzedno możemy napisać też z użyciem biblioteki do mockowania.

W tym celu użyjemy: [https://github.com/testdouble/testdouble.js](https://github.com/testdouble/testdouble.js)

```
npm i testdouble --save-dev
const td = require('testdouble');
```

W jaki sposób stubować callbacki?

[https://github.com/testdouble/testdouble.js/blob/master/docs/5-stubbing-results.md#stubbing-callback-apis](https://github.com/testdouble/testdouble.js/blob/master/docs/5-stubbing-results.md#stubbing-callback-apis)
