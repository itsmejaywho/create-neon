import {
  AlignCenter,
  AlignLeft,
  AlignRight,
} from 'lucide-react'
import indoorLocationImage from '../../../assets/image/indoors.png'
import outdoorLocationImage from '../../../assets/image/outdoors.png'

export const colors = [
  { id: 'cream', name: 'Cream White', value: '#fff4d6', overall: true },
  { id: 'rgb', name: 'RGB', value: '#ff2d2d', rgb: true },
  { id: 'white', name: 'White', value: '#ffffff' },
  { id: 'girlpink', name: 'Girl Pink', value: '#ff9ecb' },
  { id: 'hotpink', name: 'Hot Pink', value: '#ff2aa1' },
  { id: 'red', name: 'Red', value: '#ff2d2d' },
  { id: 'yellowgold', name: 'Yellow Gold', value: '#ffcf33' },
  { id: 'yellowlemon', name: 'Yellow Lemon', value: '#fff22d' },
  { id: 'lightblue', name: 'Light Blue', value: '#5bc8ff' },
  { id: 'darkblue', name: 'Dark Blue', value: '#3b6dff' },
  { id: 'bluegreen', name: 'Blue Green', value: '#2dd4bf' },
  { id: 'green', name: 'Green', value: '#3ddc6d' },
  { id: 'violet', name: 'Violet', value: '#9b5cff' },
  { id: 'orange', name: 'Orange', value: '#ff8a3d' },
]

export const fonts = [
  {
    id: 'Cudi',
    name: 'Poppins',
    label: 'Sydney',
    family: "'Poppins', sans-serif",
    previewFamily: "'Poppins', sans-serif",
    previewWeight: 600,
  },
  {
    id: 'George',
    name: 'Great Vibes',
    label: 'Melbourne',
    family: "'Great Vibes', cursive",
    previewFamily: "'Great Vibes', cursive",
    previewWeight: 400,
    overall: true,
  },
  {
    id: 'Marilyn',
    name: 'Satisfy',
    label: 'Brisbane',
    family: "'Satisfy', cursive",
    previewFamily: "'Satisfy', cursive",
    previewWeight: 400,
  },
  {
    id: 'Young',
    name: 'Shadows Into Light',
    label: 'Perth',
    family: "'Shadows Into Light', cursive",
    previewFamily: "'Shadows Into Light', cursive",
    previewWeight: 400,
  },
  {
    id: 'Pop',
    name: 'Poppins',
    label: 'Adelaide',
    family: "'Poppins', sans-serif",
    previewFamily: "'Poppins', sans-serif",
    previewWeight: 500,
  },
  {
    id: 'Keith',
    name: 'Mrs Saint Delafield',
    label: 'Canberra',
    family: "'Mrs Saint Delafield', cursive",
    previewFamily: "'Mrs Saint Delafield', cursive",
    previewWeight: 400,
  },
  {
    id: 'Action',
    name: 'Kaushan Script',
    label: 'Hobart',
    family: "'Kaushan Script', cursive",
    previewFamily: "'Kaushan Script', cursive",
    previewWeight: 400,
  },
  {
    id: 'Offset',
    name: 'Caveat',
    label: 'Darwin',
    family: "'Caveat', cursive",
    previewFamily: "'Caveat', cursive",
    previewWeight: 700,
  },
  {
    id: 'Soulja',
    name: 'Sacramento',
    label: 'Gold Coast',
    family: "'Sacramento', cursive",
    previewFamily: "'Sacramento', cursive",
    previewWeight: 400,
  },
  {
    id: 'Britney',
    name: 'La Belle Aurore',
    label: 'Newcastle',
    family: "'La Belle Aurore', cursive",
    previewFamily: "'La Belle Aurore', cursive",
    previewWeight: 400,
  },
  {
    id: 'Jay',
    name: 'Nothing You Could Do',
    label: 'Wollongong',
    family: "'Nothing You Could Do', cursive",
    previewFamily: "'Nothing You Could Do', cursive",
    previewWeight: 400,
  },
  {
    id: 'Baby',
    name: 'Patrick Hand',
    label: 'Geelong',
    family: "'Patrick Hand', cursive",
    previewFamily: "'Patrick Hand', cursive",
    previewWeight: 400,
  },
  {
    id: 'Knowles',
    name: 'Monsieur La Doulaise',
    label: 'Cairns',
    family: "'Monsieur La Doulaise', cursive",
    previewFamily: "'Monsieur La Doulaise', cursive",
    previewWeight: 400,
  },
  {
    id: 'Lana',
    name: 'Cutive Mono',
    label: 'Townsville',
    family: "'Cutive Mono', monospace",
    previewFamily: "'Cutive Mono', monospace",
    previewWeight: 400,
  },
  {
    id: 'Snoop',
    name: 'Tulpen One',
    label: 'Ballarat',
    family: "'Tulpen One', sans-serif",
    previewFamily: "'Tulpen One', sans-serif",
    previewWeight: 400,
  },
]

export const alignments = [
  { id: 'left', icon: AlignLeft },
  { id: 'center', icon: AlignCenter },
  { id: 'right', icon: AlignRight },
]

export const sizePresets = [
  { id: 's', label: 'S', w: 26, h: 8 },
  { id: 'm', label: 'M', w: 33, h: 10, overall: true },
  { id: 'l', label: 'L', w: 52, h: 17 },
]

export const locations = [
  { id: 'indoors', label: 'Indoors', image: indoorLocationImage },
  {
    id: 'outdoors',
    label: 'Outdoors',
    image: outdoorLocationImage,
    surcharge: '+10%',
  },
]

export const QUOTED_PRICE = 9581
