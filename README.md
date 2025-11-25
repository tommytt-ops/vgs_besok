# Skatteetaten Nettside - Feilsøkingsprosjekt

## 📋 Prosjektoversikt

Dette er et skolingsprosjekt der du skal finne og fikse feil i en nettside for Skatteetaten. Nettsiden har mange funksjoner, men dessverre har det sneket seg inn en del feil som gjør at ikke alt fungerer som det skal!

## 🎯 Ditt oppdrag

Du er ansatt som junior utvikler hos Skatteetaten, og din jobb er å finne og fikse alle feilene i den nye nettsiden før den lanseres. Brukerne har rapportert at noen ting ikke fungerer som forventet.

## 📁 Filstruktur

```
vgs_besoek
├── index.html          # Hovedside med skattekalkulator og statistikk
├── services.html       # Tjenesteside med skjemaer og prisberegner
├── contact.html        # Kontaktside med kontaktskjema
├── faq.html           # FAQ-side med spørsmål og svar
├── style.css          # All styling for nettsiden
├── script.js          # All JavaScript-funksjonalitet
└── README.md          # Denne filen
```

## ✨ Funksjoner på nettsiden

### 🏠 Hovedside (index.html)
- **Avansert skattekalkulator** - Beregn skatt basert på inntekt, alder og skatteklasse
- **Statistikkgraf** - Visualisering av skattedata
- **Søk i skatteregler** - Søkbar tabell med skatteregler
- **Nyheter** - Siste nyheter fra Skatteetaten
- **Stjernerating** - Gi tilbakemelding på nettsiden
- **Viktig info modal** - Pop-up med viktig informasjon
- **Besøksteller** - Teller antall besøk på siden

### 🛠️ Tjenester (services.html)
- **Tjenestevelger** - Informasjon om ulike tjenester
- **Fradragsskjema** - Søk om skattefradrag
- **Prisberegner** - Beregn pris for våre tjenester
- **Timebestilling** - Bestill time hos Skatteetaten
- **Dokumenter** - Last ned viktige dokumenter

### 📧 Kontakt (contact.html)
- **Kontaktinformasjon** - Telefon, e-post og adresse
- **Kontaktskjema** - Send henvendelse til Skatteetaten
- **Tegnteller** - Viser hvor mange tegn du har skrevet
- **Validering** - Sjekker at du fyller ut riktig
- **Hurtiglenker** - Gå direkte til FAQ-emner

### ❓ FAQ (faq.html)
- **Søkefunksjon** - Søk etter spørsmål
- **Kategorifilter** - Filtrer etter kategori
- **Ekspanderbare svar** - Klikk for å se svar
- **URL-parametere** - Direkte lenker til kategorier

## 🔍 Slik finner du feilene

### 1. Test alle funksjoner
- Klikk på ALLE knapper
- Fyll ut ALLE skjemaer
- Prøv ALLE funksjoner
- Noter hva som ikke fungerer

### 2. Bruk utviklerverktøy
- Åpne Browser Console (F12 eller høyreklikk > "Inspiser")
- Se etter røde feilmeldinger
- Bruk Console-fanen for JavaScript-feil
- Bruk Network-fanen for å se HTTP-forespørsler

### 3. Test med ulike verdier
- Prøv tomme felter
- Prøv negative tall
- Prøv svært store tall
- Prøv ugyldig input

### 4. Les koden nøye
- Sjekk variabelnavn
- Sjekk ID-er i HTML matcher JavaScript
- Sjekk at logikken er riktig
- Se etter skrivefeil

## 🐛 Typer feil å se etter

1. **Knapper som ikke fungerer** - Manglende event listeners
2. **Feil beregninger** - Logiske feil i formler
3. **Feil ID-referanser** - JavaScript ser etter feil element
4. **Manglende validering** - Kan sende inn ugyldig data
5. **Feil i søk/filter** - Viser feil resultater
6. **Regex-feil** - Validering aksepterer feil data

## 📝 Hvordan dokumentere feil

For hver feil du finner, noter:
1. **Hvilket element/funksjon** som ikke fungerer
2. **Hva som skjer** (faktisk oppførsel)
3. **Hva som skulle skjedd** (forventet oppførsel)
4. **Hvor feilen er** (fil og cirka linje)
5. **Hvordan du fikset det**

Eksempel:
```
FEIL: Nullstill-knappen i skattekalkulatoren gjør ingenting
FIL: script.js
PROBLEM: Mangler event listener for knappen
LØSNING: La til addEventListener for nullstillKnapp
```

## 🎓 Læringsmål

Gjennom dette prosjektet lærer du:
- ✅ Systematisk testing av nettsider
- ✅ Bruk av browser developer tools
- ✅ Debugging av JavaScript
- ✅ HTML/CSS/JavaScript interaksjon
- ✅ Validering og feilhåndtering
- ✅ Kodelesing og feilsøking

## 🚀 Komme i gang

1. Åpne `index.html` i en nettleser
2. Test alle funksjoner metodisk
3. Noter alle feil du finner
4. Åpne filene i en code editor
5. Finn og fiks feilene
6. Test igjen for å bekrefte at det fungerer

## 💡 Tips

- Start med de mest åpenbare feilene (ting som ikke fungerer i det hele tatt)
- Bruk console.log() for å debugge
- Les feilmeldinger nøye - de forteller deg ofte hva som er galt
- Test underveis - ikke vent til du har "fikset alt"
- Spør om hjelp hvis du står fast!

## 📊 Fremgang

Lag en sjekkliste for å holde oversikt:

### Index.html
- [ ] Skattekalkulator beregner riktig
- [ ] Nullstill-knapp fungerer
- [ ] Statistikk oppdateres
- [ ] Søk i regler fungerer
- [ ] Stjernerating viser melding
- [ ] Besøksteller fungerer

### Services.html
- [ ] Tjenestevelger viser info
- [ ] Fradragsskjema sender
- [ ] Prisberegner beregner riktig
- [ ] Timebestilling validerer dato
- [ ] Dokumentnedlasting fungerer

### Contact.html
- [ ] Tegnteller oppdateres
- [ ] E-postvalidering fungerer
- [ ] Skjema sender
- [ ] Hurtiglenker fungerer

### FAQ.html
- [ ] Søk fungerer
- [ ] Kategorifilter fungerer
- [ ] URL-parametere fungerer

## 🏆 Utfordringer

Når du har fikset alle feilene:
1. **Forbedre koden** - Kan noe skrives bedre?
2. **Legg til features** - Hva mangler?
3. **Forbedre design** - Kan det se bedre ut?
4. **Tilgjengelighet** - Legg til ARIA-labels
5. **Testing** - Lag en komplett testplan

## 📞 Hjelp og support

Hvis du står fast:
1. Les feilmeldingen nøye
2. Google feilen
3. Sjekk dokumentasjon (MDN Web Docs)
4. Spør en medelev
5. Spør læreren

## ⚠️ Viktig

Dette er et øvingsprosjekt - det er MENINGEN at det skal være feil!
Ta deg tid til å:
- Forstå hva koden gjør
- Tenke gjennom løsningene
- Lære av feilene

Lykke til med feilsøkingen! 🎉

