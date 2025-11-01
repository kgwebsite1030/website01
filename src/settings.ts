interface NavItem {
  name: string
  path: string
  children?: NavItem[]
}

interface FooterNav {
  title: string
  links: NavItem[]
}

interface Settings {
  title: string
  description: string
  keywords: string[]
  copyright: string

  companyLogo: string

  navList: NavItem[]

  footerNav: FooterNav[]
}

export const settings: Settings = {
  title: 'Vitesse',
  description: 'Vitesse is a Vite starter template',
  keywords: ['Vitesse', 'Vite', 'starter'],
  copyright: '© 2020 Your Company, Inc. All rights reserved.',
  companyLogo: '/pwa-192x192.png',
  navList: [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' },
    { name: 'Contact us', path: '/contact-us' },
  ],
  footerNav: [
    {
      title: 'Account',
      links: [
        {
          name: 'Account Manager',
          path: '/account',
        },
      ],
    },
    {
      title: 'Order Manager',
      links: [
        {
          name: 'Order Tracking',
          path: '/order/tracking',
        },
        {
          name: 'Cart',
          path: '/cart',
        },
        {
          name: 'Favorite',
          path: '/favorite',
        },
      ],
    },
    {
      title: 'Product',
      links: [
        {
          name: 'Products',
          path: '/product',
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {
          name: 'Contact us',
          path: '/contact-us',
        },
      ],
    },
  ],
}
