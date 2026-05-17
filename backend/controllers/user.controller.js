const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/response');
const service = require('../services/user.service');

const getMyProfile = asyncHandler(async (req, res) => {
  const data = await service.getMyProfile(req.user.id);
  return success(res, 'Lay ho so nguoi dung thanh cong.', data);
});

const updateMyProfile = asyncHandler(async (req, res) => {
  const data = await service.updateMyProfile(req.user.id, req.body);
  return success(res, 'Cap nhat ho so nguoi dung thanh cong.', data);
});

module.exports = {
  getMyProfile,
  updateMyProfile
};
