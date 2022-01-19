/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */

const checkIndianMobile = (mobile) => {
    if (typeof mobile == "string") {
        const regexExp = /\+91[6-9]\d{9}$/gi;
        return regexExp.test(mobile)
    }
    else return false;
}


const generateRandomToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
}

module.exports = {
    checkIndianMobile,
    generateRandomToken
}