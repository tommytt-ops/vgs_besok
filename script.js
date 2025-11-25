// ==========================================
// SKATTEKALKULATOR
// ==========================================

// Avansert skatteberegning
const beregnSkattKnapp = document.getElementById('beregnSkattKnapp');
const nullstillKnapp = document.getElementById('nullstillKnapp');

if (beregnSkattKnapp) {
  beregnSkattKnapp.addEventListener('click', function () {
    const inntekt = parseFloat(document.getElementById('inntektInput').value);
    const alder = parseFloat(document.getElementById('alderInput').value);
    const skatteKlasse = document.getElementById('skatteKlasse').value;
    const medlemKirken = document.getElementById('medlemKirken').checked;


    let skattesats = 0.22;
    let trinnskatt = 0;
    let minstefradrag = 0;

    // Beregn minstefradrag
    minstefradrag = 100000;

    // Beregn trinnskatt
    if (inntekt > 190350) {
      trinnskatt += (Math.min(inntekt, 267900) - 190350) * 0.017;
    }
    if (inntekt > 267900) {
      trinnskatt += (Math.min(inntekt, 643800) - 267900) * 0.04;
    }
    if (inntekt > 643800) {
      trinnskatt += (Math.min(inntekt, 969200) - 643800) * 0.134;
    }
    if (inntekt > 969200) {
      trinnskatt += (inntekt - 969200) * 0.164;
    }

    // Beregn grunnlag
    const skattegrunnlag = inntekt - minstefradrag;
    let kommuneskatt = skattegrunnlag * skattesats;

    // Kirkeskatt
    let kirkeskatt = 0;
    if (medlemKirken) {
      kirkeskatt = skattegrunnlag * 0.01;
    }

    // Total skatt
    const totalSkatt = kommuneskatt + trinnskatt;

    // Vis resultat
    const resultatBoks = document.getElementById('skattResultat');
    resultatBoks.innerHTML = `
      <strong>Din estimerte skatt:</strong> ${totalSkatt.toFixed(2)} NOK<br>
      <small>Netto inntekt: ${(inntekt - totalSkatt).toFixed(2)} NOK</small>
    `;

    // Vis detaljer
    const detaljerBoks = document.getElementById('skatteDetaljer');
    detaljerBoks.innerHTML = `
      <strong>Detaljer:</strong><br>
      Bruttoinntekt: ${inntekt.toFixed(2)} NOK<br>
      Minstefradrag: ${minstefradrag.toFixed(2)} NOK<br>
      Skattegrunnlag: ${skattegrunnlag.toFixed(2)} NOK<br>
      Kommuneskatt (22%): ${kommuneskatt.toFixed(2)} NOK<br>
      Trinnskatt: ${trinnskatt.toFixed(2)} NOK<br>
      Kirkeskatt: ${kirkeskatt.toFixed(2)} NOK<br>
    `;
  });
}


// ==========================================
// KLOKKE I HEADER
// ==========================================

function oppdaterKlokke() {
  const klokkeElement = document.getElementById('klokke');
  if (klokkeElement) {
    const na = new Date();
    const tid = na.toLocaleTimeString('no-NO');
    klokkeElement.innerText = tid;
  }
}

setInterval(oppdaterKlokke, 1000);
oppdaterKlokke();

// ==========================================
// STATISTIKK GRAF
// ==========================================

const statistikkData = {
  maneder: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
  verdier: [12000, 15000, 14000, 18000, 22000, 19000, 21000, 23000, 20000, 25000, 27000, 30000]
};

function tegnGraf() {
  const canvas = document.getElementById('skatteGraf');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const bredde = canvas.width;
  const hoyde = canvas.height;

  // Tøm canvas
  ctx.clearRect(0, 0, bredde, hoyde);

  const maxVerdi = Math.max(...statistikkData.verdier);
  const stegBredde = bredde / statistikkData.verdier.length;

  // Tegn søyler
  ctx.fillStyle = '#003366';
  statistikkData.verdier.forEach((verdi, indeks) => {
    const soyeHoyde = (verdi / maxVerdi) * (hoyde - 40);
    const x = indeks * stegBredde + 10;
    const y = hoyde - soyeHoyde - 20;

    ctx.fillRect(x, y, stegBredde - 20, soyeHoyde);

    // Tegn månedsnavn
    ctx.fillStyle = '#000';
    ctx.font = '10px Arial';
    ctx.fillText(statistikkData.maneder[indeks], x, hoyde - 5);
    ctx.fillStyle = '#003366';
  });
}

const oppdaterStatKnapp = document.getElementById('oppdaterStat');
if (oppdaterStatKnapp) {
  oppdaterStatKnapp.addEventListener('click', function() {
    // Generer nye tilfeldige data
    statistikkData.verdier = statistikkData.verdier.map(() =>
      Math.floor(Math.random() * 30000) + 10000
    );
    tegnGraf();
  });
}

// Tegn initial graf
setTimeout(tegnGraf, 100);

// ==========================================
// SØK I SKATTEREGLER
// ==========================================

const sokKnapp = document.getElementById('sokKnapp');
const sokInput = document.getElementById('sokInput');

if (sokKnapp && sokInput) {
  sokKnapp.addEventListener('click', filtrerRegler);
  sokInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      filtrerRegler();
    }
  });
}

function filtrerRegler() {
  const sokeTerm = sokInput.value.toLowerCase();
  const rader = document.querySelectorAll('#regelTabellKropp tr');

  let funnet = 0;
  rader.forEach(rad => {
    const tekst = rad.innerText.toLowerCase();
    if (tekst.includes(sokeTerm) || sokeTerm === '') {
      rad.style.display = '';
      funnet++;
    } else {
      rad.style.display = 'none';
    }
  });

  const sokResultat = document.getElementById('sokResultat');
  if (sokResultat) {
    sokResultat.innerText = `Fant ${funnet} regel(er)`;
  }
}

// ==========================================
// REGEL INFO MODAL
// ==========================================

const regelModal = document.getElementById('regelModal');
const infoKnapper = document.querySelectorAll('.info-knapp');

infoKnapper.forEach(knapp => {
  knapp.addEventListener('click', function() {
    const regelId = this.getAttribute('data-regel');
    visRegelDetaljer(regelId);
  });
});

function visRegelDetaljer(regelId) {
  const regelInfo = {
    'R001': {
      navn: 'Reisefradrag',
      beskrivelse: 'Du kan få fradrag for reise mellom hjem og arbeid når det er mer enn 22 000 kroner per år.',
      detaljer: 'Satsen er 1,70 kr per kilometer over grensen på 22 000 kr.'
    },
    'R002': {
      navn: 'Merverdiavgift',
      beskrivelse: 'MVA er en indirekte skatt som legges på varer og tjenester.',
      detaljer: 'Standard sats er 25%, redusert sats 15% og 12% for matvarer.'
    },
    'R003': {
      navn: 'Skattesats',
      beskrivelse: 'Standard kommunal skattesats er 22%.',
      detaljer: 'Kommunene kan ikke endre denne satsen.'
    },
    'R004': {
      navn: 'Minstefradrag',
      beskrivelse: 'Automatisk fradrag i lønnsinntekt.',
      detaljer: 'Minst 4000 kr og maks 104 450 kr (2024). Satsen er 46% av inntekt.'
    }
  };

  const info = regelInfo[regelId];
  if (info) {
    const detaljerDiv = document.getElementById('regelDetaljer');
    detaljerDiv.innerHTML = `
      <h2>${info.navn}</h2>
      <p><strong>Beskrivelse:</strong> ${info.beskrivelse}</p>
      <p><strong>Detaljer:</strong> ${info.detaljer}</p>
    `;
    regelModal.style.display = 'block';
  }
}

// Lukk regel modal
const lukkRegelModal = document.querySelector('#regelModal .lukk-modal');
if (lukkRegelModal) {
  lukkRegelModal.addEventListener('click', function() {
    regelModal.style.display = 'none';
  });
}

// ==========================================
// NYHETER
// ==========================================

const lesMerKnapper = document.querySelectorAll('.les-mer');
lesMerKnapper.forEach(knapp => {
  knapp.addEventListener('click', function() {
    const nyhetId = this.getAttribute('data-nyhet');
    visNyhet(nyhetId);
  });
});

function visNyhet(id) {
  const nyheter = {
    '1': 'Fullstendig artikkel om nye skatteregler for 2025...',
    '2': 'Fullstendig artikkel om digital skattemelding...'
  };

  alert('Nyhet: ' + nyheter[id]);
}

// ==========================================
// STJERNERATING
// ==========================================

const stjerner = document.querySelectorAll('.stjerne');
let valgtRating = 0;

stjerner.forEach(stjerne => {
  stjerne.addEventListener('click', function() {
    valgtRating = parseInt(this.getAttribute('data-verdi'));
    oppdaterStjerner(valgtRating);

    const ratingText = document.getElementById('ratingText');
    if (ratingText) {
      const meldinger = [
        'Vi beklager at du ikke er fornøyd',
        'Vi jobber med å bli bedre',
        'Takk for tilbakemeldingen',
        'Flott! Takk for din vurdering',
        'Fantastisk! Vi setter pris på det'
      ];
      ratingText.innerText = meldinger[valgtRating - 1];
    }
  });

  stjerne.addEventListener('mouseenter', function() {
    const verdi = parseInt(this.getAttribute('data-verdi'));
    oppdaterStjerner(verdi);
  });
});

const ratingContainer = document.querySelector('.stjerne-rating');
if (ratingContainer) {
  ratingContainer.addEventListener('mouseleave', function() {
    oppdaterStjerner(valgtRating);
  });
}

function oppdaterStjerner(antall) {
  stjerner.forEach((stjerne, indeks) => {
    if (indeks < antall) {
      stjerne.classList.add('aktiv');
    } else {
      stjerne.classList.remove('aktiv');
    }
  });
}

// ==========================================
// HOVEDMODAL
// ==========================================

const infoModal = document.getElementById('infoModal');
const apneModalKnapp = document.getElementById('apneModal');
const lukkModalKnapp = document.getElementById('lukkModal');
const ikkVisIgjenKnapp = document.getElementById('ikkvisIgjen');

if (apneModalKnapp) {
  apneModalKnapp.addEventListener('click', function() {
    if (!localStorage.getItem('skjulModal')) {
      infoModal.style.display = 'block';
    }
  });
}

if (lukkModalKnapp) {
  lukkModalKnapp.addEventListener('click', function() {
    infoModal.style.display = 'none';
  });
}

if (ikkVisIgjenKnapp) {
  ikkVisIgjenKnapp.addEventListener('click', function() {
    localStorage.setItem('skjulModal', 'true');
    infoModal.style.display = 'none';
  });
}

// Lukk modal ved klikk utenfor
window.addEventListener('click', function(e) {
  if (e.target === infoModal) {
    infoModal.style.display = 'none';
  }
  if (e.target === regelModal) {
    regelModal.style.display = 'none';
  }
});

// Vis modal automatisk ved lasting hvis ikke skjult
window.addEventListener('load', function() {
  setTimeout(function() {
    if (!localStorage.getItem('skjulModal')) {
      infoModal.style.display = 'block';
    }
  }, 2000);
});

// ==========================================
// BESØKSTELLER
// ==========================================

let besoksTeller = localStorage.getItem('besoksTeller') || 0;
besoksTeller = parseInt(besoksTeller);
besoksTeller = besoksTeller + 1;

const tellerElement = document.getElementById('besoksTeller');
if (tellerElement) {
  tellerElement.innerText = besoksTeller;
  localStorage.setItem('besoksTeller', besoksTeller);
}

// ==========================================
// TJENESTEVALG (fra services.html)
// ==========================================

const tjenesteVelger = document.getElementById('tjenesteVelger');
if (tjenesteVelger) {
  tjenesteVelger.addEventListener('change', function () {
    const tjenesteInfo = document.getElementById('tjenesteInfo');
    if (tjenesteInfo) {
      const tjenesteBeskrivelser = {
        'skattemelding': 'Hjelp med å fylle ut skattemeldingen. Vi veileder deg gjennom hele prosessen.',
        'veiledning': 'Personlig veiledning fra våre skatteeksperter. Timebestilling påkrevd.',
        'bedrift': 'Tjenester for bedrifter inkludert MVA, skattemelding og rådgivning.',
        'revisjon': 'Vi gjennomgår din selvangivelse for å sikre at alt er korrekt.',
        'klage': 'Hjelp med å klage på skattevedtak. Vi vurderer saken din.'
      };

      tjenesteInfo.innerHTML = `<p>${tjenesteBeskrivelser[this.value] || 'Vennligst velg en tjeneste'}</p>`;
    }
  });
}

// ==========================================
// FRADRAGSSKJEMA (fra services.html)
// ==========================================

const fradragSkjema = document.getElementById('fradragSkjema');
if (fradragSkjema) {
  fradragSkjema.addEventListener('submit', function (e) {
    e.preventDefault();

    const type = document.getElementById('fradragType').value;
    const belop = parseFloat(document.getElementById('fradragBelop').value);
    const beskrivelse = document.getElementById('fradragBeskrivelse').value;


    const statusElement = document.getElementById('fradragStatus');
    if (statusElement) {
      statusElement.innerText = `Søknad om ${type}-fradrag på ${belop} NOK er sendt!`;
      statusElement.style.color = 'green';
      statusElement.style.background = '#d4edda';
      statusElement.style.padding = '10px';

      // Nullstill skjema
      fradragSkjema.reset();
    }
  });
}

// ==========================================
// PRISBEREGNER (fra services.html)
// ==========================================

const beregnPrisKnapp = document.getElementById('beregnPrisKnapp');
if (beregnPrisKnapp) {
  beregnPrisKnapp.addEventListener('click', function() {
    const tjenestePris = parseFloat(document.getElementById('tjenestePris').value);
    const antallTimer = parseFloat(document.getElementById('antallTimer').value);
    const hasteTjeneste = document.getElementById('hasteTjeneste').checked;

    let totalPris = tjenestePris * antallTimer * antallTimer;

    if (hasteTjeneste) {
      totalPris = totalPris * 1.5;
    }

    const prisResultat = document.getElementById('prisResultat');
    if (prisResultat) {
      prisResultat.innerHTML = `
        <strong>Estimert pris:</strong> ${totalPris.toFixed(2)} NOK<br>
        <small>Basispris: ${tjenestePris} NOK/time</small><br>
        <small>Antall timer: ${antallTimer}</small><br>
        <small>Hastebehandling: ${hasteTjeneste ? 'Ja (+50%)' : 'Nei'}</small>
      `;
      prisResultat.style.display = 'block';
    }
  });
}

// ==========================================
// TIMEBESTILLING (fra services.html)
// ==========================================

const timeSkjema = document.getElementById('timeSkjema');
if (timeSkjema) {
  timeSkjema.addEventListener('submit', function(e) {
    e.preventDefault();

    const navn = document.getElementById('timeNavn').value;
    const email = document.getElementById('timeEmail').value;
    const telefon = document.getElementById('timeTelefon').value;
    const dato = document.getElementById('timeDato').value;
    const tid = document.getElementById('timeTid').value;
    const formaal = document.getElementById('timeFormaal').value;

    // Valider dato (må være fremtidig)
    const valgtDato = new Date(dato);
    const idag = new Date();

    const statusElement = document.getElementById('timeStatusMelding');

    if (valgtDato < idag) {
      if (statusElement) {
        statusElement.innerText = 'Feil: Velg en fremtidig dato!';
        statusElement.style.color = 'red';
        statusElement.style.background = '#f8d7da';
        statusElement.style.padding = '10px';
      }
      return;
    }

    if (statusElement) {
      statusElement.innerHTML = `
        <strong>Time bekreftet!</strong><br>
        Navn: ${navn}<br>
        Dato: ${dato} kl. ${tid}<br>
        Du vil motta en bekreftelse på e-post: ${email}
      `;
      statusElement.style.color = 'green';
      statusElement.style.background = '#d4edda';
      statusElement.style.padding = '10px';

      // Nullstill skjema
      timeSkjema.reset();
    }
  });
}

// ==========================================
// DOKUMENTNEDLASTING (fra services.html)
// ==========================================

const lastNedKnapper = document.querySelectorAll('.last-ned-knapp');
lastNedKnapper.forEach(knapp => {
  knapp.addEventListener('click', function() {
    const dokument = this.getAttribute('data-dokument');

    // Simuler nedlasting
    alert(`Laster ned dokument: ${dokument}.pdf`);

    const nedlastingsTeller = document.getElementById('nedlastingsTeller');
    if (nedlastingsTeller) {
      let antall = parseInt(nedlastingsTeller.innerText) || 0;
      antall++;
      nedlastingsTeller.innerText = antall;
    }
  });
});

// ==========================================
// KONTAKTSKJEMA (fra contact.html)
// ==========================================

// Tegnteller for meldingsfelt
const kontaktMelding = document.getElementById('kontaktMelding');
const tegnTeller = document.getElementById('tegnTeller');

if (kontaktMelding && tegnTeller) {
  kontaktMelding.addEventListener('input', function() {
    const antallTegn = this.value.length;
    const maksAntall = 500;

    tegnTeller.innerText = `${antallTegn}/${maksAntall} tegn`;

    if (antallTegn > maksAntall) {
      tegnTeller.style.color = 'red';
      this.value = this.value.substring(0, maksAntall);
    } else {
      tegnTeller.style.color = '#666';
    }
  });
}

const kontaktskjema = document.getElementById('kontaktskjema');
if (kontaktskjema) {
  kontaktskjema.addEventListener('submit', function (e) {
    e.preventDefault();

    const navn = document.getElementById('kontaktNavn').value;
    const epost = document.getElementById('kontaktEpost').value;
    const telefon = document.getElementById('kontaktTelefon').value;
    const emne = document.getElementById('kontaktEmne').value;
    const melding = document.getElementById('kontaktMelding').value;
    const personvern = document.getElementById('personvern').checked;

    // Validering
    if (!personvern) {
      alert('Du må godta personvernerklæringen');
      return;
    }

    const epostRegex = /^[^\s@]+@[^\s@]+$/;
    if (!epostRegex.test(epost)) {
      alert('Ugyldig e-postadresse');
      return;
    }

    const meldingElement = document.getElementById('skjemaMelding');
    if (meldingElement) {
      meldingElement.innerHTML = `
        <strong>Takk for din henvendelse, ${navn}!</strong><br>
        Vi vil svare deg på ${epost} innen 1-3 virkedager.<br>
        Referansenummer: ${Math.floor(Math.random() * 1000000)}
      `;
      meldingElement.style.color = 'green';
      meldingElement.style.background = '#d4edda';
      meldingElement.style.padding = '15px';
      meldingElement.style.borderRadius = '5px';

      // Nullstill skjema
      kontaktskjema.reset();
      if (tegnTeller) {
        tegnTeller.innerText = '0/500 tegn';
      }
    }
  });
}

// Hurtiglenker på kontaktside
const hurtiglenkKnapper = document.querySelectorAll('.hurtiglenke-knapp');
hurtiglenkKnapper.forEach(knapp => {
  knapp.addEventListener('click', function() {
    const emne = this.getAttribute('data-emne');
    window.location.href = `faq.html?emne=${emne}`;
  });
});

// ==========================================
// FAQ-SØK OG FILTER (fra faq.html)
// ==========================================

const faqSok = document.getElementById('faqSok');
const faqSokKnapp = document.getElementById('faqSokKnapp');
const faqSokResultat = document.getElementById('faqSokResultat');

function filtrerFAQ() {
  if (!faqSok) return;

  const sokTerm = faqSok.value.toLowerCase();
  const detaljer = document.querySelectorAll('details');
  let funnetAntall = 0;

  detaljer.forEach(d => {
    const tekst = d.innerText.toLowerCase();
    if (sokTerm === '' || tekst.includes(sokTerm)) {
      d.style.display = 'block';
      funnetAntall++;
    } else {
      d.style.display = 'none';
    }
  });

  if (faqSokResultat) {
    if (sokTerm === '') {
      faqSokResultat.innerText = '';
    } else {
      faqSokResultat.innerText = `Fant ${funnetAntall} svar`;
    }
  }
}

if (faqSok) {
  faqSok.addEventListener('input', filtrerFAQ);
  faqSok.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      filtrerFAQ();
    }
  });
}

if (faqSokKnapp) {
  faqSokKnapp.addEventListener('click', filtrerFAQ);
}

// FAQ kategorifilter
const kategoriKnapper = document.querySelectorAll('.kategori-knapp');
kategoriKnapper.forEach(knapp => {
  knapp.addEventListener('click', function() {
    // Fjern aktiv klasse fra alle knapper
    kategoriKnapper.forEach(k => k.classList.remove('aktiv'));
    this.classList.add('aktiv');

    const valgtKategori = this.getAttribute('data-kategori');
    const faqGrupper = document.querySelectorAll('.faq-gruppe');

    faqGrupper.forEach(gruppe => {
      const gruppeKategori = gruppe.getAttribute('data-kategori');

      if (valgtKategori === 'alle' || gruppeKategori === valgtKategori) {
        gruppe.style.display = 'block';
      } else {
        gruppe.style.display = 'none';
      }
    });

    // Nullstill søk
    if (faqSok) {
      faqSok.value = '';
    }
    if (faqSokResultat) {
      faqSokResultat.innerText = '';
    }

    // Vis alle details i valgt kategori
    const alleDetaljer = document.querySelectorAll('details');
    alleDetaljer.forEach(d => {
      d.style.display = 'block';
    });
  });
});

// Sjekk URL-parameter for emne
window.addEventListener('load', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const emne = urlParams.get('emne');

  if (emne) {
    // Finn og klikk på riktig kategoriknapp
    kategoriKnapper.forEach(knapp => {
      if (knapp.getAttribute('data-kategori') === emne) {
        knapp.click();
      }
    });
  }
});
