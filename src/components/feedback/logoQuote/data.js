import {
  BadgeCheck,
  BriefcaseBusiness,
  CircleHelp,
  Lightbulb,
  PackageCheck,
  PanelsTopLeft,
  Sparkles,
  SquareStack,
} from 'lucide-react'
import best1Image from '../../../assets/image/best1.jpg'
import best2Image from '../../../assets/image/best2.jpg'
import best6Image from '../../../assets/image/best6.png'

export const quoteShowcaseImages = [
  {
    src: best6Image,
    alt: 'Custom neon logo installation in a branded interior.',
  },
  {
    src: best1Image,
    alt: 'Warm illuminated business sign mounted on a wall.',
  },
  {
    src: best2Image,
    alt: 'Retail-style illuminated storefront signage.',
  },
]

export const quoteBenefits = [
  {
    title: 'Free shipping worldwide',
    Icon: PackageCheck,
  },
  {
    title: '2-4 weeks production',
    Icon: Sparkles,
  },
  {
    title: 'Dedicated account manager',
    Icon: BriefcaseBusiness,
  },
  {
    title: 'Certified commercial product',
    Icon: BadgeCheck,
  },
]

export const quoteSelectOptions = {
  sizeNeeded: ['Under 50 cm', '50-100 cm', '100-150 cm', '150 cm and above'],
  quantityNeeded: ['1 sign', '2-5 signs', '6-10 signs', '10+ signs'],
  projectTimeline: ['As soon as possible', 'Within 2 weeks', 'Within 1 month', 'Flexible'],
  hearAboutUs: ['Instagram', 'Facebook', 'Google Search', 'Referral', 'Repeat customer'],
}

export const technologyOptions = [
  {
    id: 'led-neon',
    label: 'LED Neon',
    Icon: Lightbulb,
    image: null,
    accentClass: 'from-[#003d2b] via-[#00684A] to-[#00ED64]',
  },
  {
    id: 'light-box',
    label: 'Light Box',
    Icon: PanelsTopLeft,
    image: null,
    accentClass: 'from-[#10243a] via-[#1d4266] to-[#6dc7ff]',
  },
  {
    id: 'channel-letter',
    label: 'Channel Letter',
    Icon: SquareStack,
    image: null,
    accentClass: 'from-[#23003b] via-[#4b2cff] to-[#00ED64]',
  },
  {
    id: 'not-sure',
    label: "I'm not sure yet",
    Icon: CircleHelp,
    image: null,
    accentClass: 'from-[#d9dee2] via-[#f1f4f6] to-[#c9d0d6]',
  },
]
