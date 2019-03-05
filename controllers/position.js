const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryID = async function (req, res) {
  try {
    const position = await Position.find({
      category: req.params.categoryID,
      user: req.user.id,
    });
    res.status(200).json(position);
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports.create = async function (req, res) {
  try {
    const position = await new Position({
      name: req.body.name,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id,
    }).save();
    console.log(req.body);

    res.status(201).json(position);
  } catch (err) {
    console.log(req.body);
    errorHandler(res, err);
  }
};

module.exports.remove = async function (req, res) {
  try {
    await Position.remove({ _id: req.params.id });
    res.status(200).json({
      message: 'Position delete',
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports.update = async function (req, res) {
  try {
    const position = await Position.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(position);
  } catch (err) {
    errorHandler(res, err);
  }
};
