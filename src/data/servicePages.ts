import type { ServicePageContent } from '../types'

export const servicePages: ServicePageContent[] = [
  {
    slug: 'implantologija',
    eyebrow: 'Implantologija',
    headline: 'Zubni implanti koji vraćaju funkciju i osmeh',
    lead: 'Trajno rešenje za izgubljene zube — uz 3D planiranje, premium materijale i bezbolnu ugradnju.',
    heroImage:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=70',
    introTitle: 'Moderni implantati umesto privremenih rešenja',
    introText: [
      'Gubitak zuba utiče na žvakanje, govor i samopouzdanje. Zubni implantati vraćaju prirodan osećaj i sprečavaju propadanje kosti vilice.',
      'Radimo sa sertifikovanim titanijumskim sistemima i digitalnim planom ugradnje kako bi rezultat bio precizan, stabilan i dugovečan.',
    ],
    introImage:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=70',
    benefitsTitle: 'Kada su implanti pravo rešenje?',
    benefits: [
      'Nedostatak jednog ili više zuba',
      'Nestabilne proteze koje ometaju svakodnevnicu',
      'Gubitak zuba zbog karijesa, traume ili parodontopatije',
      'Želja za fiksnim, prirodnim osećajem bez lepljenja',
      'Potreba za All-on-4 / All-on-6 rekonstrukcijom',
    ],
    processTitle: 'Kako izgleda terapija',
    process: [
      {
        title: 'Pregled i 3D planiranje',
        text: 'Analiziramo kost, desni i zagriz. Dobijate jasan plan terapije i cenu unapred.',
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
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=70',
        alt: 'Ordinacija tokom implantološke terapije',
      },
      {
        src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=70',
        alt: 'Digitalna dijagnostika',
      },
      {
        src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=70',
        alt: 'Pacijent nakon terapije',
      },
    ],
    ctaTitle: 'Spremni za trajno rešenje?',
    ctaText: 'Zakažite besplatan pregled i saznajte da li su implanti pravi izbor za vas.',
  },
  {
    slug: 'estetska-stomatologija',
    eyebrow: 'Estetska stomatologija i medicina',
    headline: 'Osmeh koji izgleda prirodno i samouvereno',
    lead: 'Hollywood smile, lasersko beljenje za osmeh bez mana. Hijaluronski fileri i botoks.',
    heroImage:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=70',
    introTitle: 'Estetika bez preterivanja',
    introText: [
      'Cilj nije „veštački beli“ osmeh, već skladan rezultat koji prati boju kože, oblik usana i karakter lica.',
      'Koristimo digitalni plan osmeha kako biste unapred videli mogući rezultat i doneli odluku bez pritiska.',
    ],
    introImage:
      'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1000&q=70',
    benefitsTitle: 'Šta možemo da korigujemo',
    benefits: [
      'Neujednačenu boju i senke na zubima',
      'Oštećenu ili istrošenu gleđ',
      'Razmake, iverje i asimetriju',
      'Želju za blagim ili izraženijim Hollywood smile-om',
      'Potrebu za brzim estetskim unapređenjem',
    ],
    processTitle: 'Tok estetske terapije',
    process: [
      {
        title: 'Konsultacija i dizajn',
        text: 'Definišemo cilj: prirodan, blistav ili potpuni makeover osmeha.',
      },
      {
        title: 'Priprema i mock-up',
        text: 'Po potrebi radimo privremeni prikaz kako biste osetili budući izgled.',
      },
      {
        title: 'Realizacija',
        text: 'Postavljamo veneers, bonding ili radimo kontrolisano beljenje.',
      },
      {
        title: 'Završna kontrola',
        text: 'Usklađujemo detalje zagriza, boje i sjaja za dugotrajan rezultat.',
      },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=800&q=70',
        alt: 'Estetski osmeh',
      },
      {
        src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=70',
        alt: 'Beljenje zuba',
      },
      {
        src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=70',
        alt: 'Rad u ordinaciji',
      },
    ],
    ctaTitle: 'Želite novi osmeh?',
    ctaText: 'Prvi pregled je besplatan — dogovorimo estetski plan koji vam odgovara.',
  },
  {
    slug: 'protetika',
    eyebrow: 'Protetika',
    headline: 'Krunice, mostovi i proteze vrhunskog kvaliteta',
    lead: 'Bezmetalna i cirkonijumska protetika koja vraća funkciju i prirodan izgled zuba.',
    heroImage:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=70',
    introTitle: 'Fiksna i mobilna rešenja po meri',
    introText: [
      'Od pojedinačne krunice do kompleksnih mostova — biramo materijal prema zagrizu, estetici i dugovečnosti.',
      'Radimo u saradnji sa laboratorijom kako bi svaki rad bio precizan, udoban i vizuelno usklađen.',
    ],
    introImage:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=70',
    benefitsTitle: 'Zašto pacijenti biraju našu protetiku',
    benefits: [
      'Cirkonijum i bezmetalna keramika',
      'Prirodna translucencija i boja',
      'Stabilnost pri žvakanju',
      'Rešenja za delimičan ili potpun gubitak zuba',
      'Jasna cena i pisani plan terapije',
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
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=70',
        alt: 'Protetski rad',
      },
      {
        src: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=70',
        alt: 'Detalj krunice',
      },
      {
        src: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=70',
        alt: 'Konsultacija sa pacijentom',
      },
    ],
    ctaTitle: 'Vratimo funkciju i estetiku',
    ctaText: 'Zakažite pregled i dobijte predlog protetskog rešenja prilagođen vama.',
  },
  {
    slug: 'ortodoncija',
    eyebrow: 'Ortodoncija',
    headline: 'Pravilno poređani zubi — vidljivo i nevidljivo',
    lead: 'Invisalign i fiksni aparati za ispravku zagriza, razmaka i gustih zuba.',
    heroImage:
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1600&q=70',
    introTitle: 'Terapija koja prati vaš ritam života',
    introText: [
      'Bilo da želite diskretne folije ili klasičan aparat, planiramo terapiju prema uzrastu, zagrizu i estetskim očekivanjima.',
      'Kontrole su jasno zakazane, a napredak pratimo kroz digitalne snimke i fotografije.',
    ],
    introImage:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=70',
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
      {
        src: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=800&q=70',
        alt: 'Ortodontski osmeh',
      },
      {
        src: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=70',
        alt: 'Kontrola aparata',
      },
      {
        src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=70',
        alt: 'Ordinacija',
      },
    ],
    ctaTitle: 'Ispravite zagriz na vreme',
    ctaText: 'Besplatan pregled — saznajte koji ortodontski pristup vam najbolje odgovara.',
  },
  {
    slug: 'opsta-stomatologija',
    eyebrow: 'Opšta stomatologija',
    headline: 'Prevencija, lečenje i briga o zdravlju zuba',
    lead: 'Bele plombe, endodoncija, čišćenje kamenca i redovne kontrole savremenim protokolima.',
    heroImage:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=70',
    introTitle: 'Temelj zdrave usne duplje',
    introText: [
      'Opšta stomatologija je osnova svake uspešne terapije — od blagovremenog otkrivanja karijesa do lečenja kanala.',
      'Radimo pažljivo, sa fokusom na očuvanje zuba i komfort pacijenta.',
    ],
    introImage:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=70',
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
      {
        src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=70',
        alt: 'Stomatološki pregled',
      },
      {
        src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=70',
        alt: 'Terapija',
      },
      {
        src: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=70',
        alt: 'Ordinacija',
      },
    ],
    ctaTitle: 'Zakažite redovnu kontrolu',
    ctaText: 'Prvi pregled je besplatan — na vreme rešavamo probleme dok su mali.',
  },
  {
    slug: 'parodontologija',
    eyebrow: 'Parodontologija',
    headline: 'Zdrave desni — temelj dugovečnih zuba',
    lead: 'Lečenje krvarenja, povlačenja gingive i parodontopatije laserskim i konzervativnim protokolima.',
    heroImage:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1600&q=70',
    introTitle: 'Ne ignorišite znakove upale desni',
    introText: [
      'Krvarenje pri pranju, neprijatan zadah i povlačenje desni često ukazuju na parodontalni problem koji se može uspešno tretirati.',
      'Cilj terapije je zaustaviti napredovanje bolesti, sačuvati zube i vratiti zdravlje mekih tkiva.',
    ],
    introImage:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=70',
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
        text: 'Merimo džepove, procenjujemo upalu i stepen oštećenja.',
      },
      {
        title: 'Inicijalna terapija',
        text: 'Dubinsko čišćenje, kiretaža i instrukcije higijene.',
      },
      {
        title: 'Laserska podrška',
        text: 'Po indikaciji — laserska terapija za brži oporavak tkiva.',
      },
      {
        title: 'Održavanje',
        text: 'Kontrolni protokol kako bi rezultat ostao stabilan.',
      },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=70',
        alt: 'Negovanje desni',
      },
      {
        src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=70',
        alt: 'Terapija',
      },
      {
        src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=70',
        alt: 'Kontrola',
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
    heroImage:
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1600&q=70',
    introTitle: 'Hirurški pristup bez nepotrebnog stresa',
    introText: [
      'Svaku intervenciju planiramo na osnovu snimaka i kliničkog nalaza, uz jasno objašnjenje toka i oporavka.',
      'Po dogovoru radimo u sedaciji — posebno kod anksioznih pacijenata i složenijih zahvata.',
    ],
    introImage:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=70',
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
      {
        src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=70',
        alt: 'Hirurška ordinacija',
      },
      {
        src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=70',
        alt: 'Planiranje zahvata',
      },
      {
        src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=70',
        alt: 'Oprema',
      },
    ],
    ctaTitle: 'Dogovorite hirurški pregled',
    ctaText: 'Prvi pregled je besplatan — dobijate jasan plan i očekivani tok oporavka.',
  },
  {
    slug: 'decja-stomatologija',
    eyebrow: 'Dečja stomatologija',
    headline: 'Nežno i bezbedno — prvo iskustvo koje gradi poverenje',
    lead: 'Pregledi, preventiva i terapija prilagođeni deci, uz strpljiv pristup i mirnu atmosferu.',
    heroImage:
      'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1600&q=70',
    introTitle: 'Zdrave navike od malih nogu',
    introText: [
      'Dečja stomatologija nije samo lečenje — već i prevencija, edukacija i pozitivno iskustvo koje smanjuje strah od stomatologa.',
      'Radimo polako, uz objašnjenja prilagođena uzrastu i podršku roditeljima.',
    ],
    introImage:
      'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=1000&q=70',
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
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=70',
        alt: 'Dečji pregled',
      },
      {
        src: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=70',
        alt: 'Razgovor sa roditeljem',
      },
      {
        src: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=70',
        alt: 'Osmeh deteta',
      },
    ],
    ctaTitle: 'Zakažite prvi dečji pregled',
    ctaText: 'Prvi pregled je besplatan — gradimo poverenje od prve posete.',
  },
]

export function getServicePage(slug: string): ServicePageContent | undefined {
  return servicePages.find((p) => p.slug === slug)
}
