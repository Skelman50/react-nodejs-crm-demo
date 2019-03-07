const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

function getOrdersMap(values = []) {
  const daysOrders = {};

  values.forEach((order) => {
    const date = moment(order.date).format('DD.MM.YYYY');
    if (date === moment().format('DD.MM.YYYY')) {
      return;
    }
    if (!daysOrders[date]) {
      daysOrders[date] = [];
    }
    daysOrders[date].push(order);
  });

  return daysOrders;
}

function calculatePrice(values = []) {
  return values.reduce((total, order) => {
    const orderCost = order.list.reduce((orderTotal, item) => orderTotal += item.cost * item.quantity, 0);
    return total += orderCost;
  }, 0);
}

module.exports.overview = async function (req, res) {
  try {
    const allOrders = await Order.find({ user: req.user.id }).sort({ date: 1 });
    const ordersMap = getOrdersMap(allOrders);


    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];

    const yesterdayOrdersNumber = yesterdayOrders.length;
    const totalOrders = allOrders.length;
    const daysNumber = Object.keys(ordersMap).length;
    const ordersPerDay = (totalOrders / daysNumber).toFixed(0);
    const orderPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2);
    const totalGain = calculatePrice(allOrders);
    const gainPerDay = totalGain / daysNumber;
    const yesterdayGain = calculatePrice(yesterdayOrders);
    const gainPercen = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2);
    const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);
    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercen),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: gainPercen > 0,
      },
      orders: {
        percent: Math.abs(+orderPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNumber,
        isHigher: orderPercent > 0,
      },
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports.analytics = async function (req, res) {
  try {
    const allOrders = await Order.find({ user: req.user.id }).sort({ date: 1 });

    const ordersMap = getOrdersMap(allOrders);

    const avarage = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2);

    const chart = Object.keys(ordersMap).map((label) => {
      const gain = calculatePrice(ordersMap[label]);
      const order = ordersMap[label].length;
      return {
        label, gain, order,
      };
    });

    res.status(200).json({
      avarage, chart,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};
