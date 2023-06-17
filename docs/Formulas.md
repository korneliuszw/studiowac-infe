Plik określający wzory matematyczne obliczające punkty rekrutacyjne dla danych uczelni.
Linie wzoru muszą być oddzielone średnikiem!

# Zmienne do wzorów

- maths_primary - punkty procentowe wyników z matury z matematyki podstawowej
- maths_extended - punkty procentowe wyników z matury z matematyki rozszerzonej
- polish_primary - punkty procentowe wyników z matury z języka polskiego podstawowego
- polish_extended - punkty procentowe wyników z matury z języka polskiego rozszerzonego
- physics_extended - punkty procentowe wyników z matury z fizyki rozszerzonej
- computerScience_extended - punkty procentowe wyników z matury z informatyki rozszerzonej
- selection_extended - punkty procentowe z informatyki lub fizyki, w zależności od tego, który jest większy
- english_primary - punkty procentowe wyników z matury z języka angielskiego podstawowego
- english_extended - punkty procentowe wyników z matury z języka angielskiego rozszerzonego
- exams - czy zdano egzamin zawodowy (jeżeli tak 100, jeżeli nie 0)
- inf02_primary - punkty procentowe za teoretyczny egzamin zawodowy INF.02
- inf02_extended - punkty procentowe za praktyczny egzamin zawodowy INF.02
- inf03_primary - punkty procentowe za teoretyczny egzamin zawodowy INF.03
- inf03_extended - punkty procentowe za praktyczny egzamin zawodowy INF.03

# Wzory

Wzory są obliczane za pomocą biblioteki math.js, mogą więc zawierać funkcje tylko z tej biblioteki.

## Politechnika Gdańska

```js
max(maths_primary * 0.4, maths_extended) + max(physics_extended, computerScience_extended) + (0.1 * max(polish_primary *
    0.4, polish_extended)) + (0.1 * max(english_primary * 0.4, english_extended)) + min(exams, 30)
```

## Politechnika Poznańska

```js
0.5 * polish_primary + 0.5 * english_primary + 2.5 * (maths_primary + maths_extended) + max(2 * ((0.3 * inf02_primary +
    0.7 * inf02_extended) + (0.3 * inf03_primary + 0.7 * inf03_extended)), 2 * ((selection_extended > 29 ? (0.5 *
    selection_extended + 50) : (2 * selection_extended)) + selection_extended))
```

## AGH

### Wzor pierwszy

Stosowany do:

- Informatyka i Systemy Inteligentne
- Computer Science (EAIiIB)
- Informatyka Techniczna (IMiIP)

```js
g(x) = x < 30 ? x : x <= 80 ? x + 2 * (x - 30) : x + 100;
avg(x, y) = ceil((x + y) / 2);
2 * maths_primary + 3 * g(max(selection_extended, maths_extended)) + g(max(selection_extended, maths_extended, avg(
    inf02_primary, inf02_extended), avg(inf03_primary, inf03_extended)))
```

### Wzor drugi

Stosowany do:

- Informatyka (IEiT+EAIiIB)
- Cyberbezpieczeństwo (IEiT)

```js
2 * maths_primary + 3 * (maths_extended < 30 ? maths_extended : maths_extended <= 80 ? maths_extended + 2 * (
    maths_extended - 30) : maths_extended + 100) + (selection_extended < 30 ? selection_extended : selection_extended <=
80 ? selection_extended + 2 * (selection_extended - 30) : selection_extended + 100)
```

## Politechnika Wrocławska

### Wzor pierwszy

Stosowany do:

- Cyberbezpieczeństwo
- Informatyczne systemy automatyki

```js
p(primary, extended) = max(primary, primary + 1.5 * extended, 2.5 * extended);
z = (0.3 * inf02_primary + 0.7 * inf02_extended + 0.3 * inf03_primary + 0.7 * inf03_extended) / 2;
p(maths_primary, maths_extended) + max(0.5 * z, 2.5 * selection_extended) + 0.1 * p(english_primary, english_extended) +
0.1 * max(polish_primary, polish_extended)
```

### Wzor drugi

Stosowany do:

- Informatyka techniczna
- Inżyniera systemów
- Informatyka algorytmiczna
- Informatyka stosowana

```js
p(primary, extended) = max(primary, primary + 1.5 * extended, 2.5 * extended);
p(maths_primary, maths_extended) + 2.5 * selection_extended + 0.1 * p(english_primary, english_extended) + 0.1 * max(
    polish_primary, polish_extended) 
```

## Politechnika Śląska

```js
avg(x, y) = round((x + y) / 2);
ex(x, y) = round(0.3 * x + 0.7 * y);
0.5 * maths_primary + max(0.75 * avg(ex(inf02_primary, inf02_extended), ex(inf03_primary, inf03_extended)), selection_extended, maths_extended)
```

## Politechnika Warszawska

### Wzor pierwszy

Stosowany do:

- Informatyka (ETI)
- Informatyka i Systemy informacyjne
- Inżynieria Internetu rzeczy

```js
max(0.5 * maths_primary, maths_extended) + selection_extended + 0.25 * max(0.5 * english_primary, english_extended)
```

### Wzor drugi

Stosowany do:

- Informatyka stosowana

```js
avg(x, y) = ceil((x + y) / 2);
ex(x, y) = round(0.3 * x + 0.7 * y);
max(0.5 * maths_primary, maths_extended) + max(0.75 * avg(ex(inf02_primary, inf02_extended), ex(inf03_primary, inf03_extended)), selection_extended) + 0.25 * max(0.5 * english_primary, english_extended)
```

### Wzor trzeci

Stosowany do:

- Inżyniera i analiza danych

```js
1.25 * max(0.5 * maths_primary, maths_extended) + 0.75 * selection_extended + 0.25 * max(0.5 * english_primary, english_extended)
```

## Politechnika Łódzka

```js
avg(x, y) = ceil((x + y) / 2);
ex(x, y) = round(0.3 * x + 0.7 * y);
6 * max(0.5 * maths_primary, maths_extended) + 2 * max(0.5 * english_primary, english_extended) + 4 * max(selection_extended, avg(ex(inf02_primary, inf02_extended), ex(inf03_primary, inf03_extended)))
```