import type { PriceCategory } from '../types'

export const prices: PriceCategory[] = [
  {
    key: 'implantologija',
    label: 'Implantologija',
    rows: [
      { name: 'Implant (Straumann)', price: 750 },
      { name: 'Implant (Nemačka)', price: 480 },
      { name: 'All-on-4 (kompletno)', price: 4900 },
      { name: 'All-on-6 (kompletno)', price: 6400 },
      { name: 'Augmentacija kosti', price: 250 },
      { name: 'Sinus lift', price: 400 },
    ],
  },
  {
    key: 'estetska-stomatologija',
    label: 'Estetska stomatologija i medicina',
    rows: [
      { name: 'Hollywood smile (po vilici)', price: 1900 },
      { name: 'Lasersko beljenje zuba', price: 150 },
      { name: 'Kompozitne ljuspice (po zubu)', price: 120 },
      { name: 'Digitalni plan osmeha', price: 90 },
      { name: 'Bonding (po zubu)', price: 85 },
    ],
  },
  {
    key: 'protetika',
    label: 'Protetika',
    rows: [
      { name: 'Cirkonijumska krunica', price: 280 },
      { name: 'Metalokeramička krunica', price: 140 },
      { name: 'Keramička ljuspica (veneer)', price: 320 },
      { name: 'Most (po članu)', price: 260 },
      { name: 'Totalna proteza', price: 450 },
      { name: 'Parcijalna proteza', price: 380 },
    ],
  },
  {
    key: 'ortodoncija',
    label: 'Ortodoncija',
    rows: [
      { name: 'Invisalign (kompletna terapija)', price: 3200 },
      { name: 'Fiksni aparat (metalni)', price: 1200 },
      { name: 'Fiksni aparat (safirni)', price: 1800 },
      { name: 'Retenciona šina', price: 90 },
    ],
  },
  {
    key: 'opsta-stomatologija',
    label: 'Opšta stomatologija',
    rows: [
      { name: 'Bela plomba', price: 60 },
      { name: 'Endodontsko lečenje (kanal)', price: 120 },
      { name: 'Ultrazvučno čišćenje kamenca', price: 55 },
      { name: 'Vađenje zuba', price: 70 },
      { name: 'Pregled i konsultacija', price: 30 },
    ],
  },
  {
    key: 'parodontologija',
    label: 'Parodontologija',
    rows: [
      { name: 'Parodontalni status', price: 40 },
      { name: 'Kiretaža (po kvadrantu)', price: 90 },
      { name: 'Laserska terapija gingive', price: 120 },
      { name: 'Regeneracija parodonta', price: 280 },
      { name: 'Gingivektomija', price: 150 },
    ],
  },
  {
    key: 'oralna-hirurgija',
    label: 'Oralna hirurgija',
    rows: [
      { name: 'Vađenje umnjaka (jednostavno)', price: 100 },
      { name: 'Vađenje umnjaka (hirurško)', price: 180 },
      { name: 'Apikotomija', price: 220 },
      { name: 'Augmentacija kosti', price: 250 },
      { name: 'Resekcija korena', price: 200 },
    ],
  },
  {
    key: 'decja-stomatologija',
    label: 'Dečja stomatologija',
    rows: [
      { name: 'Pregled deteta', price: 25 },
      { name: 'Zalivanje fisura', price: 35 },
      { name: 'Plomba na mlečnom zubu', price: 45 },
      { name: 'Vađenje mlečnog zuba', price: 40 },
      { name: 'Fluorizacija', price: 30 },
    ],
  },
]
