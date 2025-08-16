var utilServices = require(`${appRoot}/services/Util`);
const { constants } = require(`${appRoot}/lib/constants`);
const commentServices = require(`${appRoot}/services/Comment`);

const createComment = async function (req, res) {
  try {
    var tutorId = req.body.tutorId;
    var managerId = req.body.managerId;
    const checkComment = await commentServices.getComment(tutorId, managerId);
    if (!checkComment) {
      const data = await commentServices.insertComment(req.body);
      return utilServices.successResponse(res, constants.CREATE_COMMENTS, 201, data);
    } else {
      const checkComment = await commentServices.getComment(tutorId, managerId);
      const updateData = await commentServices.getCommentById(checkComment._id)
      if (req.body.comment) {
        updateData.comment = req.body.comment;
      }
      const data = await commentServices.getCommentId(updateData)
      return utilServices.successResponse(res, constants.UPDATE_DATA, 200, data);
    }
  } catch (error) {
    return utilServices.errorResponse(res, constants.DB_ERROR, 500);
  }
}

const getComments = async function (req, res) {
  try {
    const data = await commentServices.getComments(req.body);
    return utilServices.successResponse(res, constants.DATA_FOUND, 200, data);
  } catch (error) {
    return utilServices.errorResponse(res, constants.DB_ERROR, 500);
  }
}

module.exports = {
  createComment: createComment,
  getComments: getComments
}