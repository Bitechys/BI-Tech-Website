/**
 * Facts that are the same in every language and every variant. Copy lives in src/i18n/*.
 * Everything here came from the previous site; see NOTES.md for what still needs confirming.
 */
import cassandraLogo from '../assets/clients/mono/cassandra.png';
import crispyLogo from '../assets/clients/mono/crispy.png';
import sifLogo from '../assets/clients/mono/sif.png';
import maretekLogo from '../assets/clients/mono/maretek.png';
import masLogo from '../assets/clients/mono/mas.png';
import sankoLogo from '../assets/clients/mono/sanko.png';
import cassandraColor from '../assets/clients/Cassandra.png';
import crispyColor from '../assets/clients/cc.png';
import sifColor from '../assets/clients/sif.png';
import bigblueColor from '../assets/clients/bigblue.svg';
import work1 from '../assets/work/port-1.jpg';
import work2 from '../assets/work/port-2.jpg';
import work3 from '../assets/work/port-3.jpg';
import work4 from '../assets/work/port-4.jpg';
import serUx from '../assets/services/ser_1.png';
import serWeb from '../assets/services/ser_2.png';
import serAndroid from '../assets/services/ser_3.png';
import serApi from '../assets/services/ser_4.png';
import serData from '../assets/services/ser_5.png';
import type { ImageMetadata } from 'astro';

export const SITE_URL = 'https://bitechys.com';

export const company = {
  brand: 'Bi Tech Solutions',
  shortName: 'BiTechys',
  legalName: 'Bi Tech Solutions Sdn. Bhd.',
  registration: '1514245-P',
  email: 'admin@bitechys.com',
  phone: '+60 14-262 7634',
  phoneHref: '+60142627634',
  foundedCopyrightYear: 2025,
};

export const colors = {
  navy: '#22338E',
  sky: '#31B3ED',
};

/** Web3Forms access key from the old home-page form. Lock it to bitechys.com in the Web3Forms dashboard. */
export const WEB3FORMS_KEY = '9f90131d-eb82-42a2-9742-e83e03073502';

/** Empty strings are hidden — the old footer had five icons that linked nowhere. */
export type SocialId = 'linkedin' | 'instagram' | 'facebook' | 'x' | 'youtube';

const socialLinks: { id: SocialId; url: string }[] = [
  { id: 'linkedin', url: '' },
  { id: 'instagram', url: '' },
  { id: 'facebook', url: '' },
  { id: 'x', url: '' },
  { id: 'youtube', url: '' },
];

export const social = socialLinks.filter((s) => s.url);

export type ClientId = 'cassandra' | 'crispy' | 'sif' | 'maretek' | 'mas' | 'sanko';

export const clients: { id: ClientId; name: string; logo: ImageMetadata }[] = [
  { id: 'cassandra', name: 'Cassandra Collection', logo: cassandraLogo },
  { id: 'crispy', name: 'The Crispy Chicken', logo: crispyLogo },
  { id: 'sif', name: 'Syed International Food', logo: sifLogo },
  { id: 'maretek', name: 'Maretek Singapore', logo: maretekLogo },
  { id: 'mas', name: 'MAS Jewellery', logo: masLogo },
  { id: 'sanko', name: 'Sanko', logo: sankoLogo },
];

export type WorkId = 'cassandra' | 'crispy' | 'sif' | 'bigblue';

/** Screenshots of the live client sites, used inside browser frames. */
export const work: { id: WorkId; name: string; shot: ImageMetadata; logo: ImageMetadata; url?: string }[] = [
  { id: 'cassandra', name: 'Cassandra Collection', shot: work1, logo: cassandraColor },
  { id: 'crispy', name: 'The Crispy Chicken', shot: work2, logo: crispyColor },
  { id: 'sif', name: 'SIF', shot: work3, logo: sifColor },
  { id: 'bigblue', name: 'Big Blue', shot: work4, logo: bigblueColor },
];

export type ServiceId = 'ux' | 'web' | 'android' | 'api' | 'data' | 'qa';

export const serviceImages: Partial<Record<ServiceId, ImageMetadata>> = {
  ux: serUx,
  web: serWeb,
  android: serAndroid,
  api: serApi,
  data: serData,
};

export type OfficeId = 'kl' | 'chennai' | 'dubai';
