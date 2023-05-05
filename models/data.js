const db = require('../util/database')

module.exports = class data {
    constructor(name, buy, last, sell, volume, base_unit) {
      // this.id = id; 
      this.name = name;
      this.last = last;
      this.buy = buy;;
      this.sell = sell
      this.volume = volume
      this.base_unit = base_unit
    }

    save() {

      console.log(this.name, this.last, this.buy, this.sell, this.volume, this.base_unit)
        return db.execute(
          `INSERT INTO api_data (name, buy, last, sell, vol, base_unit) VALUES (?, ?, ?, ?, ?, ?)`,
          [this.name, this.last, this.buy, this.sell, this.volume, this.base_unit]
        );
      }

      static fetchAll() {
        return db.execute('SELECT * FROM api_data');
      }


}
  