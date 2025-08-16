var utilServices = require(`${appRoot}/services/Util`);
const { constants } = require(`${appRoot}/lib/constants`);
const subjectService = require(`${appRoot}/services/Subject`);


const createSubjects = async function(req, res){
  try {
    if (!req.body.subject) {
      return utilServices.errorResponse(res, constants.PARAMETER_MISSING, 401);
    }
    const checkSubject = await subjectService.checkSubject(req.body.subject);
    if (checkSubject) {
      return utilServices.errorResponse(res, constants.SUBJECT_ALREADY_EXIST, 409);
    }
    const data = await subjectService.insertSubject(req.body);
    return utilServices.successResponse(res, constants.CREATE_SUBJECT, 201, data);
  } catch (error) {
    return utilServices.errorResponse(res, constants.DB_ERROR, 500);
  }
}

const getAllSubjects = async function (req, res){
    try {
    const query = req.query;
    const perpage = parseInt(query.length);
    const skip = parseInt(query.start)
    const search = {};
    const order = (query.dir == 'asc') ? 1: -1;
    let sort = 'createdAt'; 
    if(parseInt(query.column) == 1){
      sort = 'subject'
    }
    if (query.searchdata) {
      if (query.searchdata.length > 0) {
        var value = new RegExp("^" + query.searchdata, "i");
        search['$or'] = [{ name: value }, { email: value }];
      }
    }
    const total = await subjectService.countList(search);
    const data = await subjectService.getSubjectsList(search, sort, order, perpage, skip);
    return utilServices.successResponse(res, constants.DATA_FOUND, 200, { data: data, total: total });
    } catch (error) {
      return utilServices.errorResponse(res, constants.DB_ERROR, 500);
    }
  }

  const updateSubjects = async function(req, res){
    try {
      var subjectId = req.params.id;
     const updateData = await subjectService.getSingleSubject(subjectId)
     if (!updateData) {
      return utilServices.errorResponse(res, constants.DATA_NOT_FOUND, 404);
    }
    if (req.body.subject) {
      updateData.subject = req.body.subject;
    }
    if (req.body.colorcode) {
      updateData.colorcode = req.body.colorcode;
    }
    const data = await subjectService.subjectUpdate(updateData)
    return utilServices.successResponse(res, constants.UPDATE_DATA, 200, data);
    } catch (error) {
      return utilServices.errorResponse(res, constants.DB_ERROR, 500);
    }
  }

  const deleteSubjects = async function(req, res){
    try {
      var subjectId = req.params.id;
      var data = await subjectService.removeSingleSubject(subjectId);
      if (!data) {
        return utilServices.errorResponse(res, constants.DATA_NOT_FOUND, 400);
      }
      return utilServices.successResponse(res, constants.DATA_DELETE, 200);
    } catch (error) {
      return utilServices.errorResponse(res, constants.DB_ERROR, 500);
    }
  }

  const getSingleSubject = async function(req, res){
    try {
      var subjectId = req.params.id;
      var data = await subjectService.getSingleSubject(subjectId);
      if (!data) {
        return utilServices.errorResponse(res, constants.DATA_NOT_FOUND, 400);
      }
      return utilServices.successResponse(res, constants.DATA_FOUND, 200, data);
    } catch (error) {
      return utilServices.errorResponse(res, constants.DB_ERROR, 500);
    }
  }


module.exports = {
    createSubjects: createSubjects,
    getAllSubjects: getAllSubjects,
    deleteSubjects: deleteSubjects,
    updateSubjects: updateSubjects,
    getSingleSubject: getSingleSubject
}