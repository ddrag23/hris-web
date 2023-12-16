export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'fa-home'
  },
  {
    title: 'About',
    route: 'about',
    icon: 'fa-book'
  },
  {
    title: 'Master',
    route: 'master',
    icon: 'fa-flag',
    children: [
      {
        title: 'Posisi',
        route: 'posisi',
        icon: 'fa-regular-circle'
      },
      {
        title: 'Level',
        route: 'level',
        icon: 'fa-regular-circle'
      },
      {
        title: 'Division',
        route: 'division',
        icon: 'fa-regular-circle'
      },
      {
        title: 'Province',
        route: 'province',
        icon: 'fa-regular-circle'
      }
    ]
  }
]
