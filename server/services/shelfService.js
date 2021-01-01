const { Shelf } = require('../models');

const createShelf = ({ name }) => {
  return new Shelf({ name }).save(null, {
    require: true,
    method: 'insert',
  });
};

const deleteShelf = (id) => {
  return new Shelf({ id }).destroy({ require: true });
};

const getAllShelves = () => {
  return Shelf.fetchAll({ withRelated: ['books'], require: true });
};

const getShelfById = (id) => {
  return Shelf.where('id', '=', id).fetch({
    withRelated: ['books'],
    require: true,
  });
};

const patchShelf = (id, { name }) => {
  return new Shelf({ id }).save(
    { name: name.trim() },
    {
      require: true,
      method: 'update',
      patch: true,
    }
  );
};

exports.createShelf = createShelf;
exports.deleteShelf = deleteShelf;
exports.getAllShelves = getAllShelves;
exports.getShelfById = getShelfById;
exports.patchShelf = patchShelf;
