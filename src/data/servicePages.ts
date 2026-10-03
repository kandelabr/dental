import type { ServicePageContent } from '../types'

export const servicePages: ServicePageContent[] = [
  {
    slug: 'implantologija',
    eyebrow: 'Implantologija',
    headline: 'Zubni implantati koji vraćaju funkciju i osmeh',
    lead: 'Trajno rešenje za izgubljene zube uz 3D planiranje i bezbolnu ugradnju.',
    heroImage: '/assets/impantologija/Naslovna.jpg',
    introTitle: 'Moderni implantati umesto privremenih rešenja',
    introText: [
      'Gubitak zuba utiče na žvakanje, govor i samopouzdanje. Zubni implantati vraćaju prirodan osećaj i sprečavaju propadanje kosti vilice.',
      'Radimo sa sertifikovanim titanijumskim sistemima Straumann grupa, Neodent Neoporos i digitalnim planom ugradnje kako bi rezultat bio precizan, stabilan i dugovečan.',
    ],
    introImage: '/assets/impantologija/uvod.jpg',
    benefitsTitle: 'Kada su implantati jasan odgovor na vašu situaciju',
    benefits: [],
    situations: [
      {
        title: 'Nedostatak jednog zuba',
        text: 'Implantat nadoknađuje koren zuba, a na njega se stavlja krunica, čime se izbegava brušenje susednih zdravih zuba radi pravljenja mosta.',
      },
      {
        title: 'Nedostatak više zuba',
        text: 'Implantati služe kao stabilni nosači za zubne mostove.',
      },
      {
        title: 'Potpuna bezubost',
        text: 'Ugradnjom 4 do 6 implantata po vilici (metode poput All-on-4 ili All-on-6) omogućava se izrada fiksnih zubnih mostova ili stabilnih proteza koje ne spadaju i pružaju maksimalan komfor.',
      },
    ],
    processTitle: 'Kako izgleda terapija',
    process: [
      {
        title: 'Pregled i 3D planiranje',
        text: 'Analiziramo stanje kosti, desni i zagrižaj. Dobijate jasan plan terapije i cenu unapred.',
      },
      {
        title: 'Ugradnja implantata',
        text: 'Minimalno invazivna procedura u lokalnoj anesteziji ili sedaciji, po dogovoru.',
      },
      {
        title: 'Oseointegracija',
        text: 'Implantat srasta sa kosti i postaje čvrsta osnova za buduću krunicu.',
      },
      {
        title: 'Protetski rad',
        text: 'Postavljamo krunicu, most ili fiksnu protezu usklađenu sa vašim osmehom.',
      },
    ],
    featureSections: [
      {
        id: 'all-on-4',
        eyebrow: 'All-on-4 & All-on-6',
        title: 'All-on-4 i All-on-6',
        text: [
          'Gubitak svih zuba u vilici više ne mora da znači nošenje nestabilnih i nelagodnih akrilatnih proteza. Zahvaljujući napretku u implantologiji, metode All-on-4 i All-on-6 omogućavaju fiksiranje kompletnog zubnog niza (mosta) na samo četiri ili šest implantata.',
          'Ove metode predstavljaju trajno, stabilno i estetski savršeno rešenje koje u potpunosti oponaša prirodne zube.',
        ],
        stepsTitle: 'Tok rada',
        steps: [
          {
            title: 'Pregled i 3D dijagnostika (CT snimak)',
            text: 'Detaljna analiza strukture kosti i planiranje precizne pozicije svakog implantata.',
          },
          {
            title: 'Ugradnja implantata',
            text: 'Bezbolna intervencija u lokalnoj anesteziji (ili analgosedaciji). Sutradan se izrađuje i postavlja privremeni most.',
          },
          {
            title: 'Period zarastanja (oseointegracija)',
            text: 'Čeka se 3 do 6 meseci da implantati potpuno srastu sa kosti.',
          },
          {
            title: 'Izrada definitivnog rada',
            text: 'Nakon zarastanja, izrađuje se trajni, visokokvalitetni keramički ili cirkonijumski most koji se trajno fiksira za implantate.',
          },
        ],
      },
      {
        id: 'proteze-na-implantatima',
        eyebrow: 'Proteze na implantatima',
        title: 'Proteze na implantatima',
        text: [
          'Ekonomično rešenje: za stabilizaciju proteze na implantatima često je potreban manji broj implantata (najčešće 2 do 4 po vilici) u poređenju sa fiksnim mostovima na implantatima, što ovu proceduru čini finansijski dostupnijom.',
          'Gubitak zuba više ne mora da znači nelagodnost, nestabilnost i stalni strah od pomeranja klasične proteze. Proteza na implantatima predstavlja savremeno i dugotrajno rešenje koje kombinuje jednostavnost totalne proteze sa neuporedivom stabilnošću zubnih implantata.',
        ],
        highlightsTitle: 'Zašto izabrati protezu na implantatima?',
        highlights: [
          'Maksimalna stabilnost: nema ispadanja, pomeranja niti šetanja proteze prilikom smeha ili razgovora.',
          'Prirodan osećaj i veći komfor: proteza je znatno manja od klasične, posebno u gornjoj vilici, jer ne mora u potpunosti da pokriva nepce.',
          'Moć žvakanja je obnovljena.',
        ],
      },
    ],
    gallery: Array.from({ length: 18 }, (_, i) => ({
      src: `/assets/impantologija/d${i + 1}.jpg`,
      alt: `Implantologija — rad ${i + 1}`,
    })),
    ctaTitle: 'Spremni za trajno rešenje?',
    ctaText: 'Zakažite besplatan pregled i saznajte da li su implantati pravi izbor za vas.',
  },
  {
    slug: 'estetska-stomatologija',
    eyebrow: 'Estetska medicina i stomatologija',
    headline: 'Osmeh koji izgleda prirodno i samouvereno',
    lead: 'Hollywood smile, lasersko beljenje za osmeh bez mana. Hijaluronski fileri i botoks.',
    heroImage: '/assets/estetska/naslovna.jpg',
    introId: 'hollywood-smile',
    introTitle: 'Šta je zapravo Hollywood Smile?',
    introText: [
      'Hollywood Smile je jedna od najefektnijih estetskih transformacija u savremenoj stomatologiji. Koristeći najsavremenije stomatološke materijale, korigujemo sve nedostatke: od boje i oblika, preko položaja zuba, pa sve do zatvaranja neželjenih razmaka.',
      'U zavisnosti od stanja vaših prirodnih zuba, ovaj efekat postižemo kombinacijom vrhunskih metoda:',
    ],
    introImage: '/assets/estetska/d10.jpg',
    introMethods: [
      {
        id: 'fasete-viniri',
        title: 'Keramičke fasete (Viniri)',
        text: 'Ultra tanke ljuspice koje se lepe na prednju površinu zuba uz minimalno brušenje, idealne za korekciju boje i sitnih nepravilnosti.',
      },
      {
        title: 'Bezmetalne krunice',
        text: 'Vrhunac moderne estetske stomatologije. Pružaju maksimalnu čvrstinu i savršeno oponašaju prirodno prelamanje svetlosti.',
      },
    ],
    benefitsTitle: 'Šta možemo da korigujemo',
    benefits: [
      'Neujednačenu boju i senke na zubima',
      'Oštećenu ili istrošenu gleđ',
      'Razmake i asimetriju',
      'Želju za blagim ili izraženijim Hollywood smile-om',
      'Potrebu za brzim estetskim unapređenjem',
    ],
    processEyebrow: 'Proces',
    processTitle: 'Tok terapije',
    process: [
      {
        title: 'Konsultacije i digitalni dizajn (Digital Smile Design)',
        text: 'Slušamo vaše želje, analiziramo vaše lice i pravimo digitalni model. Pre nego što uopšte počnemo sa radom, vi možete videti kako će vaš novi osmeh izgledati!',
      },
      {
        title: 'Priprema zuba',
        text: 'Minimalno i bezbolno oblikovanje zuba (u lokalnoj anesteziji) kako bi se napravilo mesto za fasete ili krunice.',
      },
      {
        title: 'Izrada i proba',
        text: 'Dok naša zubotehnička laboratorija precizno izrađuje vaš rad, nosite privremene zube tako da ni u jednom trenutku niste bez osmeha.',
      },
      {
        title: 'Cementiranje',
        text: 'Postavljanje vašeg novog Hollywood Smile-a i trenutak kada u ogledalu ugledate osmeh koji ste oduvek želeli.',
      },
    ],
    featureSections: [
      {
        id: 'lasersko-izbeljivanje',
        eyebrow: 'Lasersko izbeljivanje',
        title: 'FLASH sistem izbeljivanja zuba',
        text: [
          'Savremeniji pristup profesionalnom izbeljivanju.',
          'Za razliku od konvencionalnih sistema, FLASH omogućava brže i neinvazivno izbeljivanje, uz nežan pristup zubima. U jednom tretmanu moguće je postići posvetljenje za nekoliko nijansi, uz očuvanje prirodne strukture zuba.',
        ],
        tagline: 'Jedan tretman. Nekoliko nijansi svetliji osmeh.',
        steps: [
          {
            title: 'Konsultacija',
            text: 'Doktor će proceniti boju vaših zuba i preporučiti najbolji tretman beljenja.',
          },
          {
            title: 'Tretman beljenja',
            text: 'Preparat se na zubima aktivira prema protokolu FLASH sistema, uz pažljivo kontrolisane uslove i nadzor stomatologa.',
          },
          {
            title: 'Održavanje',
            text: 'Saveti za održavanje rezultata beljenja i preporuke za dalju negu.',
          },
        ],
      },
      {
        id: 'hijaluronski-fileri',
        eyebrow: 'Fileri i botoks',
        title: 'Hijaluronski fileri',
        text: [
          'Hijaluronski fileri su savremeni preparati na bazi hijaluronske kiseline koji se koriste za nadoknadu volumena, definisanje kontura i ublažavanje određenih bora, uz mogućnost postizanja veoma prirodnog rezultata.',
          'U našem radu, svaki tretman planiramo individualno, vodeći računa o anatomiji, proporcijama i željama pacijenta. Cilj nije promena lica, već suptilno osvežavanje i naglašavanje njegove prirodne lepote.',
          'Verujemo da najbolji estetski rezultat treba da izgleda prirodno, skladno i nenametljivo — svežije lice, a i dalje Vi.',
        ],
        tagline: 'Suptilna korekcija. Prirodna lepota. Individualan pristup.',
      },
      {
        id: 'mezoterapija',
        eyebrow: 'Fileri i botoks',
        title: 'Mezoterapija',
        text: [
          'Mezoterapija je savremeni tretman koji podrazumeva aplikaciju pažljivo odabranih aktivnih sastojaka u površinske slojeve kože, sa ciljem intenzivne hidratacije, osvežavanja i poboljšanja njenog kvaliteta.',
          'Tretman može doprineti ujednačenijem tenu, poboljšanoj teksturi, tonusu i elastičnosti kože, koja izgleda svežije, glatkije i blistavije, uz smanjen utisak umora i sivila.',
          'U našem radu, svaki tretman planiramo individualno, u skladu sa potrebama i stanjem kože, kao i željama pacijenta. Cilj je suptilno osvežavanje, ujednačavanje tena i vraćanje prirodnog sjaja, bez promene izgleda.',
        ],
        tagline: 'Hidratacija kože. Ujednačen ten. Poboljšana tekstura. Individualan pristup.',
      },
      {
        id: 'botoks',
        eyebrow: 'Fileri i botoks',
        title: 'Botoks',
        text: [
          'Botoks je savremeni estetski tretman koji deluje na mišiće odgovorne za nastanak dinamičkih bora, čime se njihov izgled ublažava i lice dobija odmorniji i svežiji izgled.',
          'U našem radu, tretman planiramo individualno, uz pažljivo doziranje i poštovanje prirodne mimike lica. Cilj nije „zamrznut“ izraz, već suptilno omekšavanje bora i očuvanje prirodnog izgleda i karaktera lica.',
        ],
        tagline: 'Suptilna korekcija. Očuvana mimika. Prirodno svežiji izgled.',
      },
      {
        id: 'lipoliza',
        eyebrow: 'Fileri i botoks',
        title: 'Lipoliza',
        text: [
          'Lipoliza je nehirurški tretman namenjen smanjenju lokalizovanih masnih naslaga na regijama koje su otporne na ishranu i fizičku aktivnost, čime se dobija poboljšanje izgleda kože, mikrocirkulacije i tonusa, a cilj je glatkija i zategnutija koža.',
          'Tretman planiramo veoma pažljivo, prema stepenu celulita, stanju kože i željenom rezultatu.',
        ],
        tagline: 'Glatkija koža. Bolji tonus. Negovaniji izgled.',
      },
    ],
    gallery: Array.from({ length: 11 }, (_, i) => ({
      src: `/assets/estetska/d${i + 2}.jpg`,
      alt: `Estetska stomatologija — rad ${i + 2}`,
    })),
    ctaTitle: 'Želite novi osmeh?',
    ctaText: 'Prvi pregled je besplatan — dogovorimo estetski plan koji vam odgovara.',
  },
  {
    slug: 'protetika',
    eyebrow: 'Protetika',
    headline: 'Krunice, mostovi i proteze vrhunskog kvaliteta',
    lead: 'Bezmetalna i cirkonijumska protetika koja vraća funkciju i prirodan izgled zuba.',
    heroImage: '/assets/protetika/naslovna.jpg',
    introTitle: 'Fiksna i mobilna rešenja po meri',
    introText: [
      'Od pojedinačnih krunica do kompleksnih mostova, svako protetsko rešenje planiramo individualno, u skladu sa zagrižajem, funkcijom i estetikom.',
      'U saradnji sa zubotehničkom laboratorijom biramo odgovarajući materijal i precizno usklađujemo oblik i boju, kako bi rad bio što prirodniji, komforniji i dugotrajniji.',
    ],
    introImage: '/assets/protetika/uvod.jpg',
    benefitsTitle: 'Zašto pacijenti biraju našu protetiku',
    benefits: [
      'Cirkonijum i bezmetalna keramika',
      'Prirodna translucencija i boja',
      'Stabilnost pri žvakanju',
      'Rešenja za delimičan ili potpun gubitak zuba',
      'Jasna cena i pisani plan terapije',
    ],
    featuresBeforeProcess: true,
    featureSections: [
      {
        id: 'keramicki-viniri',
        eyebrow: 'Keramički viniri',
        title: 'Keramički viniri',
        text: [
          'Keramički viniri (poznati i kao zubne fasete) su ultratanke, posebno prilagođene ljuspice od visokokvalitetne stomatološke keramike koje se trajno cementiraju na prednju površinu zuba. Njihova glavna uloga je da koriguju estetske nedostatke i pruže zubima savršen oblik, boju, veličinu i poravnanje.',
          'Za razliku od klasičnih krunica, viniri pokrivaju samo prednji, vidljivi deo zuba, što ih čini izuzetno neinvazivnim i nežnim rešenjem prema prirodnoj zubnoj supstanci.',
        ],
        highlightsTitle: 'Zašto izabrati keramičke vinire?',
        highlights: [
          'Prirodan izgled i transparentnost: vrhunska keramika savršeno imitira optička svojstva prirodne zubne gleđi, uključujući način na koji reflektuje svetlost. Rezultat je potpuno prirodan osmeh koji niko neće primetiti da je estetska nadoknada.',
          'Otpornost na prebojavanje: za razliku od prirodnih zuba ili kompozitnih materijala, porcelan je neporozan. To znači da viniri ne menjaju boju pod uticajem kafe, čaja, crnog vina ili duvanskog dima.',
          'Maksimalno očuvanje zuba: procedura zahteva minimalno brušenje gleđi (svega 0,3 do 0,7 milimetara), a u nekim slučajevima (No-Prep viniri) brušenje uopšte nije potrebno.',
        ],
      },
      {
        id: 'bezmetalne-krunice',
        eyebrow: 'Bezmetalne krunice',
        title: 'Bezmetalne krunice',
        text: [
          'Bezmetalne krunice (često nazivane i bezmetalne navlake) predstavljaju vrhunac moderne stomatološke protetike. Za razliku od tradicionalnih metalokeramičkih krunica koje imaju tamnu metalnu osnovu, bezmetalne krunice su u potpunosti izrađene od visokokvalitetnih keramičkih materijala, najčešće cirkonijuma ili litijum-disilikata (E.max keramike).',
          'One se koriste za rekonstrukciju zuba koji su u velikoj meri oštećeni usled karijesa, trauma ili lečenja, kao i za postizanje vrhunskih estetskih rezultata na prirodnim zubima ili implantatima.',
          'Prelazak sa metalokeramičkih na bezmetalne sisteme doneo je revoluciju u stomatologiji, a pacijentima obezbedio brojne prednosti.',
        ],
        highlightsTitle: 'Zašto izabrati bezmetalne krunice?',
        highlights: [
          'Vrhunska, prirodna estetika: bezmetalna keramika ima sposobnost da propušta i prelama svetlost na gotovo identičan način kao i prirodna zubna gleđ.',
          'Nema „crnog ruba“ uz desni: ivica zuba ostaje savršeno bela i prirodna.',
          'Biokompatibilnost i zdravlje desni.',
          'Izuzetna čvrstina i dugotrajnost: bezmetalne krunice bez problema podnose visoke pritiske žvakanja, zbog čega su idealne kako za prednje, tako i za bočne zube.',
          'Maksimalna preciznost izrade: zahvaljujući naprednoj kompjuterskoj CAD/CAM tehnologiji, bezmetalne krunice se kompjuterski dizajniraju i mašinski režu iz jednog bloka materijala. To garantuje mikronsku preciznost i savršeno nalaženje krunice na pripremljen zub.',
        ],
      },
    ],
    processTitle: 'Koraci protetskog rada',
    process: [
      {
        title: 'Analiza i predlog',
        text: 'Pregledamo postojeće zube, kost i zagriz, pa predlažemo optimalno rešenje.',
      },
      {
        title: 'Priprema i otisak',
        text: 'Digitalni ili klasični otisak — u zavisnosti od indikacije.',
      },
      {
        title: 'Privremeni rad',
        text: 'Po potrebi dobijate privremenu krunicu dok traje izrada.',
      },
      {
        title: 'Finalna ugradnja',
        text: 'Cementiranje i kontrola udobnosti, estetike i funkcije.',
      },
    ],
    gallery: Array.from({ length: 15 }, (_, i) => ({
      src: `/assets/protetika/d${i + 1}.jpg`,
      alt: `Protetika — rad ${i + 1}`,
    })),
    ctaTitle: 'Vratimo funkciju i estetiku',
    ctaText: 'Zakažite pregled i dobijte predlog protetskog rešenja prilagođen vama.',
  },
  {
    slug: 'ortodoncija',
    eyebrow: 'Ortodoncija',
    headline: 'Pravilno poređani zubi — vidljivo i nevidljivo',
    lead: 'Invisalign i fiksni aparati za ispravku zagriza, razmaka i gustih zuba.',
    heroImage: '/assets/ortodoncija/f2.jpg',
    introTitle: 'Terapija koja prati vaš ritam života',
    introText: [
      'Bilo da želite diskretne folije ili klasičan aparat, planiramo terapiju prema uzrastu, zagrizu i estetskim očekivanjima.',
      'Kontrole su jasno zakazane, a napredak pratimo kroz digitalne snimke i fotografije.',
    ],
    introImage: '/assets/ortodoncija/f2.jpg',
    introMethods: [
      {
        id: 'invisalign',
        title: 'Invisalign',
        text: 'Diskretne providne folije — skoro neprimetne tokom nošenja, skidaju se pri jelu i higijeni.',
        image: '/assets/ortodoncija/invisalgin.jpg',
      },
      {
        id: 'fiksni-aparat',
        title: 'Fiksni aparat',
        text: 'Metalni ili estetski breketi za preciznu korekciju zagriza, razmaka i položaja zuba.',
        image: '/assets/ortodoncija/f1.jpg',
      },
    ],
    benefitsTitle: 'Indikacije za ortodontsku terapiju',
    benefits: [
      'Krivi ili rotirani zubi',
      'Otvoren, dubok ili ukršten zagriz',
      'Razmaci i zbijenost zuba',
      'Priprema za protetiku ili implantate',
      'Estetska korekcija osmeha kod odraslih',
    ],
    processTitle: 'Kako teče ortodoncija',
    process: [
      {
        title: 'Dijagnostika',
        text: 'Analiza snimaka, fotografija i modela za tačan plan pomeranja.',
      },
      {
        title: 'Izbor sistema',
        text: 'Invisalign, metalni ili estetski fiksni aparat — biramo zajedno.',
      },
      {
        title: 'Aktivna terapija',
        text: 'Redovne kontrole i korekcije dok zubi ne dođu u željeni položaj.',
      },
      {
        title: 'Retencija',
        text: 'Fiksni ili mobilni retainer čuva postignuti rezultat.',
      },
    ],
    gallery: [
      { src: '/assets/ortodoncija/f1.jpg', alt: 'Ortodontska terapija — fiksni aparat' },
      { src: '/assets/ortodoncija/f2.jpg', alt: 'Fiksni aparat sa estetskim ligaturama' },
      { src: '/assets/ortodoncija/f3.jpg', alt: 'Ortodontska terapija — pre i posle' },
      { src: '/assets/ortodoncija/f4.jpg', alt: 'Fiksni aparat — klinički rad' },
      { src: '/assets/ortodoncija/invisalgin.jpg', alt: 'Invisalign providne folije' },
    ],
    ctaTitle: 'Ispravite zagriz na vreme',
    ctaText: 'Besplatan pregled — saznajte koji ortodontski pristup vam najbolje odgovara.',
  },
  {
    slug: 'opsta-stomatologija',
    eyebrow: 'Opšta stomatologija',
    headline: 'Prevencija, lečenje i briga o zdravlju zuba',
    lead: 'Bele plombe, endodoncija, čišćenje kamenca i redovne kontrole savremenim protokolima.',
    heroImage: '/assets/opsta/d4.jpg',
    introTitle: 'Zdrav osmeh počinje pažljivim pristupom.',
    introText: [
      'Pružamo kompletnu stomatološku negu — od preventivnih pregleda i očuvanja zdravlja zuba, do lečenja karijesa, bolesti desni i sprovođenja kompleksnih oralno-hirurških i protetskih zahvata.',
      'Naš pristup zasniva se na individualnom planu terapije, savremenim metodama i očuvanju prirodnih zuba kad god je to moguće. Svakom pacijentu posvećujemo vreme da razumemo njegove potrebe i zajedno pronađemo najbolje rešenje.',
    ],
    introImage: '/assets/opsta/d4.jpg',
    introTagline: 'Stručnost, poverenje i pažnja — u svakom koraku terapije.',
    benefitsTitle: 'Najčešće usluge',
    benefits: [
      'Pregled i savetovanje',
      'Kompozitne (bele) plombe',
      'Endodontsko lečenje kanala',
      'Ultrazvučno uklanjanje kamenca',
      'Zalivanje fisura i preventiva',
    ],
    processTitle: 'Kako izgleda poseta',
    process: [
      {
        title: 'Pregled',
        text: 'Detaljan uvid u stanje zuba i desni, uz predlog prioriteta.',
      },
      {
        title: 'Dijagnostika',
        text: 'Po potrebi snimak i jasno objašnjenje nalaza.',
      },
      {
        title: 'Terapija',
        text: 'Lečenje u jednoj ili više poseta, u zavisnosti od obima.',
      },
      {
        title: 'Kontrola',
        text: 'Praćenje rezultata i saveti za kućnu negu.',
      },
    ],
    gallery: [
      { src: '/assets/opsta/d3.jpg', alt: 'Opšta stomatologija — rad 1' },
      { src: '/assets/opsta/d4.jpg', alt: 'Opšta stomatologija — rad 2' },
      { src: '/assets/opsta/d5.jpg', alt: 'Opšta stomatologija — rad 3' },
    ],
    ctaTitle: 'Zakažite redovnu kontrolu',
    ctaText: 'Prvi pregled je besplatan — na vreme rešavamo probleme dok su mali.',
  },
  {
    slug: 'parodontologija',
    eyebrow: 'Parodontologija',
    headline: 'Zdrave desni — temelj dugovečnih zuba',
    lead: 'Lečenje krvarenja, povlačenja gingive i parodontopatije konzervativnim protokolima.',
    heroImage: '/assets/parodontologija/naslovna.jpg',
    introTitle: 'Ne ignorišite znakove upale desni',
    introText: [
      'Krvarenje pri pranju, neprijatan zadah i povlačenje desni često ukazuju na parodontalni problem koji se može uspešno tretirati.',
      'Cilj terapije je zaustaviti napredovanje bolesti, sačuvati zube i vratiti zdravlje mekih tkiva.',
    ],
    introImage: '/assets/parodontologija/naslovna.jpg',
    benefitsTitle: 'Kada da se javite',
    benefits: [
      'Krvarenje desni pri pranju ili flossingu',
      'Oticanje i osetljivost gingive',
      'Povlačenje desni i otkrivanje vratova zuba',
      'Klackanje zuba',
      'Hroničan neprijatan zadah',
    ],
    processTitle: 'Parodontalna terapija',
    process: [
      {
        title: 'Parodontalni status',
        text: 'Merimo dubinu džepova, procenjujemo stanje desni i stepen oštećenja.',
      },
      {
        title: 'Kauzalna faza terapije',
        text: 'Ultrazvučno čišćenje, kiretaža parodontalnih džepova i uputstvo za pravilno održavanje oralne higijene.',
      },
      {
        title: 'Održavanje postignutih rezultata',
        text: 'Redovni kontrolni pregledi kako bi rezultati terapije ostali uspešni.',
      },
    ],
    ctaTitle: 'Sačuvajte zube i desni',
    ctaText: 'Zakažite pregled — rana intervencija često sprečava gubitak zuba.',
  },
  {
    slug: 'oralna-hirurgija',
    eyebrow: 'Oralna hirurgija',
    headline: 'Precizne hirurške intervencije uz maksimalan komfor',
    lead: 'Vađenje umnjaka, apikotomija, augmentacija kosti i priprema za implantate.',
    heroImage: '/assets/hirurgija/naslovna.jpg',
    introTitle: 'Hirurški pristup bez nepotrebnog stresa',
    introText: [
      'Svaku intervenciju planiramo na osnovu snimaka i kliničkog nalaza, uz jasno objašnjenje toka i oporavka.',
      'Po dogovoru radimo u sedaciji — posebno kod anksioznih pacijenata i složenijih zahvata.',
    ],
    introImage: '/assets/hirurgija/naslovna.jpg',
    benefitsTitle: 'Najčešće intervencije',
    benefits: [
      'Hirurško i jednostavno vađenje zuba',
      'Retinisani i problematični umnjaci',
      'Apikotomija i resekcija korena',
      'Augmentacija kosti i sinus lift',
      'Priprema vilice za implantate',
    ],
    processTitle: 'Tok hirurške terapije',
    process: [
      {
        title: 'Pregled i snimak',
        text: 'Procena rizika, plana i potrebne pripreme.',
      },
      {
        title: 'Intervencija',
        text: 'Bezbolan zahvat u anesteziji, uz pažljivu tehniku.',
      },
      {
        title: 'Uputstva za oporavak',
        text: 'Jasne smernice za higijenu, ishranu i lekove.',
      },
      {
        title: 'Kontrola',
        text: 'Praćenje zarastanja i naredni koraci terapije.',
      },
    ],
    gallery: [
      { src: '/assets/hirurgija/d2.jpg', alt: 'Oralna hirurgija — rad 1' },
      { src: '/assets/hirurgija/d3.jpg', alt: 'Oralna hirurgija — rad 2' },
      { src: '/assets/hirurgija/d4.jpg', alt: 'Oralna hirurgija — rad 3' },
    ],
    ctaTitle: 'Dogovorite hirurški pregled',
    ctaText: 'Prvi pregled je besplatan — dobijate jasan plan i očekivani tok oporavka.',
  },
  {
    slug: 'decja-stomatologija',
    eyebrow: 'Dečja stomatologija',
    headline: 'Nežno i bezbedno — prvo iskustvo koje gradi poverenje',
    lead: 'Pregledi, preventiva i terapija prilagođeni deci, uz strpljiv pristup i mirnu atmosferu.',
    heroImage: '/assets/decija/naslovna.jpg',
    // Portrait hero: on desktop shift focus up so heads aren't cropped (mobile/tablet stay centered)
    heroImagePosition: 'object-center lg:object-[center_20%]',
    introTitle: 'Zdrave navike od malih nogu',
    introText: [
      'Dečja stomatologija nije samo lečenje — već i prevencija, edukacija i pozitivno iskustvo koje smanjuje strah od stomatologa.',
      'Radimo polako, uz objašnjenja prilagođena uzrastu i podršku roditeljima.',
    ],
    introImage: '/assets/decija/naslovna.jpg',
    introImagePosition: 'object-[10%_center]',
    benefitsTitle: 'Šta nudimo najmlađima',
    benefits: [
      'Prvi pregled bez stresa',
      'Zalivanje fisura',
      'Fluorizacija',
      'Plombe na mlečnim i stalnim zubima',
      'Saveti o higijeni i ishrani',
    ],
    processTitle: 'Kako izgleda poseta',
    process: [
      {
        title: 'Upoznavanje',
        text: 'Dete se upoznaje sa ordinacijom i timom u opuštenom ritmu.',
      },
      {
        title: 'Pregled',
        text: 'Provera zuba, desni i razvoja, uz jasan izveštaj roditeljima.',
      },
      {
        title: 'Prevencija ili terapija',
        text: 'Zalivanje, fluorizacija ili blaga terapija po potrebi.',
      },
      {
        title: 'Kontrolni ritam',
        text: 'Predlažemo redovne kontrole za zdrav rast i miran osmeh.',
      },
    ],
    ctaTitle: 'Zakažite prvi dečji pregled',
    ctaText: 'Prvi pregled je besplatan — gradimo poverenje od prve posete.',
  },
]

export function getServicePage(slug: string): ServicePageContent | undefined {
  return servicePages.find((p) => p.slug === slug)
}
