const utilServices = require(`${appRoot}/services/Util`)
const { constants } = require(`${appRoot}/lib/constants`);
const codeService = require('../services/Code')

const randomNumber = async (req, res) => {
    try {
        const data = await codeService.insertCode(req.body);
        return utilServices.successResponse(res, constants.CREATE_CODE, 201, data);
    } catch (error) {
        return utilServices.errorResponse(res, constants.DB_ERROR, 500);
    }
}

const deviceData = async (req, res) => {
    try {
        var deviceId = req.body.deviceId;
        const deviceData = await codeService.checkDeviceId(deviceId)
        let deviceDetails = {}
        if (deviceData) {
            if (req.body.deviceType) {
                deviceDetails.deviceType = req.body.deviceType;
            }
            if (req.body.deviceToken) {
                deviceDetails.deviceToken = req.body.deviceToken;
            }
            await codeService.deviceTokenUpdate(deviceId, deviceDetails)
            const updatedDeviceData = await codeService.checkDeviceId(deviceId)
            return utilServices.successResponse(res, constants.UPDATE_DATA, 200, updatedDeviceData);
        } else {
            const data = await codeService.insertDevice(req.body);
            return utilServices.successResponse(res, constants.CREATE_DEVICES, 201, data);
        }
    } catch (error) {
        return utilServices.errorResponse(res, constants.DB_ERROR, 500);
    }
}

module.exports = {
    randomNumber: randomNumber,
    deviceData: deviceData
}