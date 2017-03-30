# Node.js TDD - krok po kroku


## TDD

* red red red green refactor
* praktyka
* narzędzie
* strategia tworzenia oprogramowania

**Praktyka**, ale nie best practice.

Dobra w pewnych kontestach.

W innych niekoniecznie (sudoku, ordered vs unordered domain).

Eksperci czasami piszą testy po fakcie, a kod wygląda i tak jak napisany z TDD.

Nie każdy musi stosować, warto spróbować.


**Narzędzie**, więc z natury nie może być martwe (TDD is not dead).



**Strategia** - pomaga utrzymać skupienie.

Pomaga projektować dobre API w skali mikro (taktyczne, nie strategiczne).

W jaki sposób? Wymusza użycie kodu jako klient, a następnie pilnuje błędów regresji jako efekt uboczny.


## 2 style TDD

**Classic style** - opisane przez Kenta Becka w TDD by example. Skoncentrowany na algorytmach.

**London style** - opisane w GOOS book. Skoncentrowany na rolach, odpowiedzialnościach i interakcjach.

Będziemy mieszać style. Węzły w grafie zależnośći wg. London style, a liście wg. Classic style.


## Opis problemu*
Sprawdzanie indeksu giełdowego dla firm.

WE - plik symbols - https://gist.github.com/kwasniew/e14a21806ed817b360d5e9594923734c

WY - stdout - https://gist.github.com/kwasniew/9b816431d9c9e02d438071354bbdf93c

Dane giełdowe:
http://ichart.finance.yahoo.com/table.csv?s=GOOG (przykładowa odpowiedź: https://gist.github.com/kwasniew/55b3793078d22f5a0105b0e108d12e27)

* Problem pochodzi z książki https://pragprog.com/book/vsjavas/test-driving-javascript-applications
Czytając oryginalne rozwiązanie autora stwierdziłem, że można je znacznie uprościć i tak zrodził się pomysł
na to ćwiczenie.

Nietrywialny problem ponieważ mamy zależności od systemu plików, HTTP i standardowego wyjścia.

Ważne:

* proponuję naukę poprzez ping pong pair programming  

* w trakcie ćwiczenia będziemy dużo korzystać z ES6

* trener powinien pokazać skończony projekt przed rozpoczęciem ćwiczenia
