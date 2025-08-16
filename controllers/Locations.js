var utilServices = require(`${appRoot}/services/Util`);
const { constants } = require(`${appRoot}/lib/constants`);
const locationService = require(`${appRoot}/services/Location`);

const createLocations = async function (req, res) {
  try {
    if (!req.body.location) {
      return utilServices.errorResponse(res, constants.PARAMETER_MISSING, 401);
    }
    const checkLocation = await locationService.checkLocation(req.body.location);
    if (checkLocation) {
      return utilServices.errorResponse(res, constants.LOCATION_ALREADY_EXIST, 409);
    }
    const data = await locationService.insertLocation(req.body);
    return utilServices.successResponse(res, constants.CREATE_LOCATION, 201, data);
  } catch (error) {
    return utilServices.errorResponse(res, constants.DB_ERROR, 500);
  }
}

const getAllLocations = async function (req, res) {
  try {
    const query = req.query;
    const perpage = parseInt(query.length);
    const skip = parseInt(query.start)
    const search = {};
    const order = (query.dir == 'asc') ? 1 : -1;
    let sort = 'createdAt';
    if (parseInt(query.column) == 1) {
      sort = 'location'
    }
    if (query.searchdata) {
      if (query.searchdata.length > 0) {
        var value = new RegExp("^" + query.searchdata, "i");
        search['$or'] = [{ name: value }, { email: value }];
      }
    }
    const total = await locationService.countList(search);
    const data = await locationService.getLocationList(search, sort, order, perpage, skip);
    return utilServices.successResponse(res, constants.DATA_FOUND, 200, { data: data, total: total });
  } catch (error) {
    return utilServices.errorResponse(res, constants.DB_ERROR, 500);
  }
}

const updateLocations = async function (req, res) {
  try {
    var locationId = req.params.id;
    const updateData = await locationService.getSingleLocation(locationId)
    if (!updateData) {
      return utilServices.errorResponse(res, constants.DATA_NOT_FOUND, 404);
    }
    if (req.body.location) {
      updateData.location = req.body.location;
    }
    const data = await locationService.locationUpdate(updateData)
    return utilServices.successResponse(res, constants.UPDATE_DATA, 200, data);
  } catch (error) {
    return utilServices.errorResponse(res, constants.DB_ERROR, 500);
  }
}

const deleteLocations = async function (req, res) {
  try {
    var locationId = req.params.id;
    var data = await locationService.removeSingleLocation(locationId);
    if (!data) {
      return utilServices.errorResponse(res, constants.DATA_NOT_FOUND, 400);
    }
    return utilServices.successResponse(res, constants.DATA_DELETE, 200);
  } catch (error) {
    return utilServices.errorResponse(res, constants.DB_ERROR, 500);
  }
}


const getSingleLocation = async function (req, res) {
  try {
    var locationId = req.params.id;
    var data = await locationService.getSingleLocation(locationId);
    if (!data) {
      return utilServices.errorResponse(res, constants.DATA_NOT_FOUND, 400);
    }
    return utilServices.successResponse(res, constants.DATA_FOUND, 200, data);
  } catch (error) {
    return utilServices.errorResponse(res, constants.DB_ERROR, 500);
  }
}

const getTutorsLocation = async function (req, res) {
  try {
    const location = req.body.location;
    const locations = location.split(',');
    const locationIds = await locationService.getLocationIds(locations);
    if(locationIds.length == 0){
      return utilServices.errorResponse(res, constants.DATA_NOT_FOUND, 404);
    }
    let tutor = await locationService.getLocationOfTutors(locationIds);
    if(tutor && tutor.length>0){
      return utilServices.successResponse(res, constants.DATA_FOUND, 200);
    } else {
      return utilServices.errorResponse(res, constants.DATA_NOT_FOUND, 404);
    }
  } catch (error) {
    return utilServices.errorResponse(res, constants.DB_ERROR, 500);
  }
}

module.exports = {
  createLocations: createLocations,
  getAllLocations: getAllLocations,
  deleteLocations: deleteLocations,
  updateLocations: updateLocations,
  getSingleLocation: getSingleLocation,
  getTutorsLocation: getTutorsLocation
}