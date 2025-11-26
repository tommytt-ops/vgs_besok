# Python oppgaver

## 📋 Oppgaver oversikt

Dette repositoriet inneholder Python-oppgaver som skal løses ved å implementere funksjoner i `main`-filene. Hver oppgave har tilhørende enhetstester som du kan bruke for å verifisere at implementasjonen din er korrekt.
**NB Prøv og ikke bruke AI eller ferdig funskjoner i Python**

## 🎯 Ditt oppdrag

Din oppgave er å:

1. **Implementer funksjonene** i `main`-filene som er merket med `pass`
2. **Test koden din** ved å kjøre unittest-filene
3. **Alle tester skal bestå** før oppgaven er ferdig

## 📁 Filstruktur

```
vgs_besok/
├── README.md                    # Denne filen
├── oppgaveA/                    # Grunnleggende oppgaver
│   ├── main1.py                 # Implementer funksjonene her
│   └── unittetest1.py           # Kjør testene for oppgaveA
└── oppgaveB/                    # Avanserte oppgaver
    ├── main2.py                 # Implementer funksjonene her
    └── unittest2.py             # Kjør testene for oppgaveB
```

## 🚀 Slik kjører du testene

### For oppgaveA:
```bash
cd oppgaveA
python3 unittetest1.py
```

### For oppgaveB:
```bash
cd oppgaveB
python3 unittest2.py
```

## ✅ Hvordan vet du at oppgaven er ferdig?

Når du kjører testene, vil du se output som dette:

```
✓ test_plus_oppgave1
✓ test_minus_oppgave1
✗ test_gange_oppgave1
...
Ran 12 tests: 5 passed, 7 failed, 0 errors
```

- **✓** (grønn) = Testen bestod ✅
- **✗** (rød) = Testen feilet ❌

**Oppgaven er ferdig når alle tester viser ✓**

## 💡 Tips

- Les kommentarene i `main`-filene for å forstå hva hver funksjon skal gjøre
- Start med oppgaveA før du går videre til oppgaveB
- Kjør testene ofte mens du implementerer
- Hvis en test feiler, sjekk return-verdien og funksjonssignaturen

## 📝 Oppgaver detaljer

### OppgaveA - Grunnleggende funksjoner

1. **oppgave1(a, operator, b)** - Kalkulatoralgoritme
   - Input: To tall og en operator (+, -, *, /)
   - Output: Resultatet av operasjonen

2. **oppgave2(number)** - Sjekk partall/oddetall
   - Input: Et heltall
   - Output: True hvis partall, False hvis oddetall

3. **oppgave3(string)** - Reverser streng
   - Input: En tekststreng
   - Output: Den reverserte strengen

4. **oppgave4(numbers)** - Finn største tall
   - Input: En liste med tall
   - Output: Det største tallet i listen

5. **oppgave5(string)** - Teller vokaler
   - Input: En tekststreng
   - Output: Antall vokaler (a, e, i, o, u)

### OppgaveB - Litt mer vanserte funksjoner

1. **oppgave1(list)** - Reverser liste
   - Input: En liste med tall
   - Output: Listen reversert

2. **oppgave2(list)** - Sorter liste
   - Input: En liste med tall
   - Output: Listen sortert stigende

3. **oppgave3(number)** - Formater tall med komma
   - Input: Et tall
   - Output: Strengen med komma hver tredje siffer

4. **oppgave4(string)** - Sjekk palindrom
   - Input: En tekststreng
   - Output: True hvis palindrom, False ellers
   - Ekstra info om palindromer: [https://no.wikipedia.org/wiki/Palindrom](https://no.wikipedia.org/wiki/Palindrom)

5. **oppgave5(number)** - Fibonacci-sekvens
   - Input: Et heltall (posisjon i sekvensen)
   - Output: Verdien på den posisjonen i Fibonacci-sekvensen
   - Ekstra info om Fibonacci-sekvensen: [https://www.matematikk.org/artikkel.html?tid=63111](https://www.matematikk.org/artikkel.html?tid=63111)

Lykke til! 🎯
