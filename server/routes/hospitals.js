const router = require('express').Router();
const fetch = require("node-fetch");

const loadHospitalsData = require('../utils/loadHospitalsData');
const haversineDist = require("../utils/haversineDist");
const { distMatrixConfig } = require('../config')

const getHospitals = ({ lunrIndex, dataMap }, searchQuery) => {

    let result = [];

    if (!searchQuery) {
        dataMap.forEach(item => result.push({
            "id": item.id,
            "name": item.Name,
            "address": item.Address,
            "area": item.Area,
            "type": item.Type,
            "lat": item.Lat,
            "lng": item.Lng,
        }));
    } else {
        const searchResult = lunrIndex.search(searchQuery);

        searchResult.forEach(val => {
            let item = dataMap.get(val.ref);
            result.push({
                "id": item.id,
                "name": item.Name,
                "address": item.Address,
                "area": item.Area,
                "type": item.Type,
                "lat": item.Lat,
                "lng": item.Lng,
            });
        });
    }

    return result;
}

const setRouteDist = async (data, orig) => {

    if (!(orig.lat && orig.lng)) return;

    let destArr = data.map((item) => `${item.lat},${item.lng}`);

    let origStr = `${orig.lat},${orig.lng}`,
        destStr = destArr.join('|');

    let distResult = await fetch(
        `${distMatrixConfig.BASE_URI}?origins=${origStr}&destinations=${destStr}&departure_time=now&key=${distMatrixConfig.API_KEY}`,
        {
            method: "GET"
        }
    );

    let distResultJson = await distResult.json();

    data.forEach((item, i) => {
        let havDist = haversineDist(orig, {
            lat: item.lat,
            lng: item.lng
        });
        item["dist_hv"] = {
            "text": `${Math.floor(havDist * 10) / 10} km`,
            "value": Math.floor(havDist * 1000)
        }
        item["dist"] = distResultJson.rows[0]?.elements[i]?.distance;
        item["time"] = distResultJson.rows[0]?.elements[i]?.duration;
        item["time_in_traffic"] = distResultJson.rows[0]?.elements[i]?.duration_in_traffic;
    });

}

const filterResult = (data, filter) => {

    let rFilter = data.filter(item => item.dist?.value <= filter.r * 1000);

    return rFilter;
}

router.get("/", async (req, res) => {

    const { lunrIndex, dataMap } = await loadHospitalsData();

    let searchQuery = req.query.searchQuery;
    let orig = {
        lat: req.query.lat,
        lng: req.query.lng
    };

    let hospitalsData = getHospitals({ lunrIndex, dataMap }, searchQuery);
    await setRouteDist(hospitalsData, orig);

    const r = req.query.range || 100;
    if (r && !isNaN(parseInt(r))) {
        hospitalsData = filterResult(hospitalsData, {
            r: parseInt(r)
        });
    }

    const sortBy = req.query.sortBy;
    switch (sortBy) {
        case "name":
            hospitalsData.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            break;

        case "dist":
        default:
            hospitalsData.sort((a, b) => {
                if (a.dist && b.dist) return a.dist.value - b.dist.value;
                else return 0;
            });
            break;
    }

    res.send(hospitalsData);

});

module.exports = router;