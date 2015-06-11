var DataStore = require('./DataStore.js');

function extend(destination, source) {
  for (var k in source) {
    if(source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
}

function Model(schema) {
  this.schema = schema;
  this.id = null;
  extend(Model.prototype, schema);
  if(!DataStore.store.hasOwnProperty('Model')) {
    DataStore.store.Model = [];
  };
}

Model.prototype.save = function() {
  if (this.id === null) {
    return this.id = 0;
  }
};

Model.prototype.destroy = function() {
  if (this.id) {
    delete this.id;
  }
};

Model.prototype.getNextId = function() {
  if(this.id) {
    return this.id++
  } else {
    return this.id = 1;
  }
};

Model.prototype.find = function() {

};

Model.prototype.extend = function(klass) {

};








module.exports = Model;