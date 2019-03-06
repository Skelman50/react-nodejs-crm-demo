const initialState = [
  { url: '/overview', name: 'Обзор' },
  { url: '/analytics', name: 'Аналитика' },
  { url: '/history', name: 'История' },
  { url: '/order', name: 'Добавить заказ' },
  { url: '/categories', name: 'Ассортимент' },
];

export function links(state = initialState, action) {
  switch (action.type) {
    case 'LINKS_ACTIVATE':
      return action.links;
    default:
      return state;
  }
}
