export const Faculties = [
  { code: 'FABE', name: 'Faculty of Architecture and Build Environment' },
  { code: 'FBMG', name: 'Faculty of Business and Globalisation' },
  { code: 'FCMB', name: 'Faculty of Communication, Media & Broadcasting' },
  {
    code: 'FCTH',
    name: 'Faculty of Creativity in Tourism & Hospitality',
  },
  { code: 'FDI', name: 'Faculty of Design and Innovation' },
  {
    code: 'FICT',
    name: 'Faculty of Information & Communication Technology',
  },
] as const;

export type Faculty = (typeof Faculties)[number];
