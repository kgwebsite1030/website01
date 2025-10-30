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
  companyLogo: 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500',
  navList: [
    { name: 'Popular Products', path: '/product/popular' },
    { name: 'Product', path: '/product' },
    { name: 'About Us', path: '/about-us' },
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
          name: 'Ordert Racking',
          path: '/ordert-racking',
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
        {
          name: 'Popular Products',
          path: '/product/popular',
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {
          name: 'About us',
          path: '/about-us',
        },
      ],
    },
  ],
}
