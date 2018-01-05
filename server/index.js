const express = require('express');
const app = express();

const axios = require('axios');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const API_KEY = require('./config2');

app.use(morgan('combined'));
app.use(express.static('client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/', (req, res) => res.send('Hello, world!'));

app.post('/api', (req, response) => {
    // res.send(JSON.stringify([{"name": "yogurt"}]));

    // console.log('in post', req);
    let query = req.body.query;

    let reqURL = 
    `https://api.nal.usda.gov/ndb/search/?format=json&q=${query}&api_key=0Ga7Q2dzXgCjkJcggxTvySEgCgV80cWO9Emc12Nz&ds=Standard Reference`;

        //api call
    axios(reqURL)
    .then(res => {
        let resArr = res.data.list.item;
        let exact = resArr.sort((a, b) => a.name.length - b.name.length)[0];
        let ndbno = exact.ndbno;
        // res.send(JSON.stringify(data.data.common[0]));

        let ndbURL = 
        `https://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&api_key=0Ga7Q2dzXgCjkJcggxTvySEgCgV80cWO9Emc12Nz`
    axios(ndbURL)
    .then(res => {
        let nutrients = res.data.report.food.nutrients;
        let offName = res.data.report.food.name;
        nutrients = nutrients
        .filter(nutrient => {
            return nutrient.name === 'Carbohydrate, by difference' || 
            nutrient.name === 'Protein' || 
            nutrient.name === 'Total lipid (fat)';
        })
        .sort((a, b) => {
            return a.nutrient_id - b.nutrient_id;
        })
        .map(nutrient => {
            return nutrient.value;
        })
        console.log(nutrients);
        //protein, fat, carb
        response.send(JSON.stringify([offName, ...nutrients]));
    })
    .catch(err => err, 'error in RP');
}).catch(err => console.log(err));
});

app.route('/plate')
    .get((req, res) => {
        
        //test
        res.send(JSON.stringify([{name: 'Oranges'}, {name: 'Eggs'}]));

        
    })
    .post((req, res) => {
        
        
    });

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));