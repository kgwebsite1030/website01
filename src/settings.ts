interface NavItem {
  name: string
  path: string
}

interface Settings {
  title: string
  description: string
  keywords: string[]
  copyright: string

  companyLogo: string
  navList: NavItem[]
}

export const settings: Settings = {
  title: 'Vitesse',
  description: 'Vitesse is a Vite starter template',
  keywords: ['Vitesse', 'Vite', 'starter'],
  copyright: '© 2020 Your Company, Inc. All rights reserved.',
  companyLogo: 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500',
  navList: [
    { name: 'Popular Products', path: '/product/popular' },
    { name: 'Product', path: '/product' },
    { name: 'About Us', path: '/about-us' },
  ],
}
