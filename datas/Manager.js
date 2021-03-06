const fs = require("fs");

class Manager {
  constructor() {}
}

class ConstantManager extends Manager {
  constructor(datas) {
    super();
    this.gameName = datas.gameName;
  }
}

class MapManager extends Manager {
  constructor(datas) {
    super();
    this.id = datas.id;
    this.fields = {};

    datas.fields.forEach((field) => {
      this.fields[`${field[0]}_${field[1]}`] = {
        x: field[0],
        y: field[1],
        canGo: field[3],
        events: JSON.parse(fs.readFileSync(__dirname + "/events.json"))
      };
    });
  }

  getField(x, y) {
    return this.fields[`${x}_${y}`];
  }
}
const constantManager = new ConstantManager(
  JSON.parse(fs.readFileSync(__dirname + "/constants.json"))
);

const mapManager = new MapManager(
  JSON.parse(fs.readFileSync(__dirname + "/map.json"))
);

module.exports = {
  constantManager,
  mapManager
};
