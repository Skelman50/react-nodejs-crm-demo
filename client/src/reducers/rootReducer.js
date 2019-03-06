import { combineReducers } from 'redux';
import { links } from './links';
import { validation } from './validation';
import { user } from './user';
import { preload } from './preloader';
import { categories, categoryById } from './categories';
import { positions } from './positions';
import { orderId } from './orderId';
import { orders } from './orders';
import { orderList } from './history';
import { overview } from './overview';
import { analytics } from './analytics';
import { activeLinks } from './isActive';
import { image } from './image';
import { loadMorePreload } from './loadMorePreload';

const rootReducer = combineReducers(
  {
    links,
    validation,
    user,
    preload,
    categories,
    positions,
    orderId,
    orders,
    orderList,
    overview,
    analytics,
    activeLinks,
    categoryById,
    image,
    loadMorePreload,
  },
);

export default rootReducer;
