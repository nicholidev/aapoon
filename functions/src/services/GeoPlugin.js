/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const axios = require("axios")

const getGeoDetailsFromIP = async (ip) => {
    return await axios.get(`http://www.geoplugin.net/json.gp?ip=${ip}`)
}

module.exports = {
    getGeoDetailsFromIP
}