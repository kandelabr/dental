import type { SiteInfo } from '../types'

export const site: SiteInfo = {
  name: 'House of Smile',
  phone: '062 / 765-101',
  phoneHref: 'tel:+38162765101',
  mobile: '+381 62 765 101',
  whatsapp: 'https://wa.me/38162765101',
  viber: 'viber://chat?number=%2B38162765101',
  email: 'smilehouseofsmile@gmail.com',
  address: 'Prizrenska 7, Stari grad, Beograd',
  hours: [
    { day: 'Ponedeljak – Petak', time: '12:00 – 20:00' },
    { day: 'Subota', time: 'Po pozivu' },
    { day: 'Nedelja', time: 'Neradna' },
  ],
  social: {
    instagram: 'https://www.instagram.com/houseofsmilebgd.rs/',
    facebook: 'https://www.facebook.com/people/House-of-smile/100089872863126/',
  },
} as const
