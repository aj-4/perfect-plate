const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'perfectplate'
});
 
// connection.connect();
const selectAll = (cb) => {
    connection.query('SELECT * FROM plate', function (error, results, fields) {
        if (error) {
            console.log(error, "Err in SelectAll");
        } else {
            cb(results);
        }
      });
}

const insertOne = (itemObj, cb) => {
    itemObj.name = itemObj.name.replace(',', '-');
    
    let qS = `INSERT INTO plate (name, carb, protein, fat) VALUES ('${itemObj.name}', '${itemObj.carb}', '${itemObj.protein}', '${itemObj.fat}')`
    

    console.log('queryString is: ', qS);

    connection.query(qS, function (error, results, fields) {
        if (error) {
            console.log(error, "Err in insertAll");
        } else {
            cb('worked');
        }
      });

    }

const insertAll = (array, cb) => {
    let qS = `INSERT INTO plate (name, carb, protein, fat) VALUES `

    array.forEach((item, i) => {
        item.name = item.name.replace(',', '-');        
        if (i === array.length - 1) {
            qS += `(${item.mod}, ${item.carb}, ${item.protein}, ${item.fat})`
        } else {
            qS += `(${item.mod}, ${item.carb}, ${item.protein}, ${item.fat}), `
        }
    });

    console.log('queryString is: ', qS);

    connection.query(qS, function (error, results, fields) {
        if (err) {
            console.log(err, "Err in insertAll");
        } else {
            cb('Insert Success');
        }
      });

    }

module.exports.selectAll = selectAll;
module.exports.insertAll = insertAll;
module.exports.insertOne = insertOne;