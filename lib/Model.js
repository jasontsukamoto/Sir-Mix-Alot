var db = require('./DataStore.js').store;

function Model(schema) {
  this.schema = schema;
  this.id = null;

  for (var k in schema) {
    this[k] = null;
  };

  db[this.constructor.name] = db[this.constructor.name] || [];
}

Model.getNextId = function() {
  if (!db[this.name].length) {
    this.id = 1;
  } else {
    this.id = db[this.name].length;
    this.id++;
  }
  return this.id;
};

Model.find = function(id) {
  for (var i = 0; i < db[this.name].length; i++) {
    if (db[this.name][i].id === id) {
      return db[this.name][i];
    }
  }
  return null;
};

Model.prototype.save = function() {
  if (!this.id) {
    this.id = this.constructor.getNextId();
    db[this.constructor.name].push(this);
  }
};

Model.prototype.destroy = function() {
  if (this.id) {
    for (var i = 0; i < db[this.constructor.name].length; i++) {
      if (db[this.constructor.name][i].id == this.id) {
        db[this.constructor.name].splice(i, 1);
        return;
      }
    }

  }
};

Model.extend = function(klass) {
  for (var k in this) {
    if (this.hasOwnProperty(k)) {
      klass[k] = this[k];
    }
  }

  for (var j in this.prototype) {
    if (this.prototype.hasOwnProperty(j)) {
      klass.prototype[j] = this.prototype[j];
    }
  }

  return klass;
};

module.exports = Model;