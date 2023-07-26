const fs = require("fs");
const path = require('path');
const papaParse = require('papaparse');
const lunr = require('lunr');
const shortid = require('shortid');

const arrToJson = require('./arrToJson')();

const dataMap = new Map();
const hospitalsData = {
    lunrIndex: null,
    dataMap: dataMap
}

async function loadHospitalsData() {

    if (hospitalsData.lunrIndex) return hospitalsData;

    const resPromise = new Promise((resolve, reject) => {

        const readerStream = fs.createReadStream(path.join(__dirname, '../../data.csv'));
        readerStream.setEncoding('utf-8');

        readerStream.on('data', function (chunk) {

            let { data } = papaParse.parse(chunk);
            let jsonData = arrToJson(data);

            jsonData.forEach(item => {
                let itemId = shortid.generate();
                item["id"] = itemId;
                dataMap.set(itemId, item);
            });
        });

        readerStream.on('end', async function () {

            const idx = lunr(function () {
                this.ref('id');
                this.field('Name');
                this.field('Address');
                this.field('Area');
                this.field('Type');

                dataMap.forEach(item => { this.add(item) });
            });

            hospitalsData.lunrIndex = idx;
            resolve(hospitalsData);
        });

        readerStream.on('error', function (err) {
            console.log(err.stack);
            reject("Some Error Occured While reading data from csv");
        });
    })

    return await resPromise;

}

module.exports = loadHospitalsData;