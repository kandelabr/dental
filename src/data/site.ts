import type { SiteInfo } from '../types'

export const site: SiteInfo = {
  name: 'Ordinacija Premium Dental',
  phone: '011 / 123-4567',
  phoneHref: 'tel:+381111234567',
  mobile: '+381 60 123 4567',
  whatsapp: 'https://wa.me/381601234567',
  viber: 'viber://chat?number=%2B381601234567',
  email: 'info@premiumdental.rs',
  address: 'Kneza Miloša 12, 11000 Beograd, Srbija',
  hours: [
    { day: 'Ponedeljak – Petak', time: '08:00 – 20:00' },
    { day: 'Subota', time: '09:00 – 14:00' },
    { day: 'Nedelja', time: 'Zatvoreno' },
  ],
  social: { instagram: '#', facebook: '#' },
} as const
