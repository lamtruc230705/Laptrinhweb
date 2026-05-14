const { connectDB, sql } = require("../configs/db");
const { successResponse, errorResponse } = require("../utils/response");

exports.getProfile = async (req, res) => {
  try {
    const pool = await connectDB();

    const result = await pool.request()
      .input("user_id", sql.Int, req.user.user_id)
      .query(`
        SELECT *
        FROM artists
        WHERE user_id = @user_id
      `);

    if (result.recordset.length === 0) {
      return errorResponse(res, "Không tìm thấy hồ sơ nghệ sĩ", 404);
    }

    return successResponse(res, "Lấy hồ sơ nghệ sĩ thành công", result.recordset[0]);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const pool = await connectDB();

    const artistResult = await pool.request()
      .input("user_id", sql.Int, req.user.user_id)
      .query(`
        SELECT *
        FROM artists
        WHERE user_id = @user_id
      `);

    if (artistResult.recordset.length === 0) {
      return errorResponse(res, "Không tìm thấy hồ sơ nghệ sĩ", 404);
    }

    const currentArtist = artistResult.recordset[0];

    const newData = {
      stage_name: req.body.stage_name,
      full_name: req.body.full_name,
      biography: req.body.biography,
      partner: req.body.partner,
      mascot: req.body.mascot,
      works: req.body.works,
      image: req.body.image
    };

    const requestResult = await pool.request()
      .input("artist_id", sql.Int, currentArtist.artist_id || currentArtist.id)
      .input("requested_by", sql.Int, req.user.user_id)
      .input("old_data", sql.NVarChar(sql.MAX), JSON.stringify(currentArtist))
      .input("new_data", sql.NVarChar(sql.MAX), JSON.stringify(newData))
      .query(`
        INSERT INTO artist_profile_update_requests (artist_id, requested_by, old_data, new_data, status, requested_at)
        OUTPUT INSERTED.id
        VALUES (@artist_id, @requested_by, @old_data, @new_data, 'pending', GETDATE())
      `);

    const requestId = requestResult.recordset?.[0]?.id;

    const adminResult = await pool.request().query(`
      SELECT id
      FROM users
      WHERE role = 'admin' AND status = 'active'
    `);

    for (const admin of adminResult.recordset) {
      await pool.request()
        .input("receiver_user_id", sql.Int, admin.id)
        .input("sender_user_id", sql.Int, req.user.user_id)
        .input("type", sql.NVarChar, "artist_profile_update")
        .input("title", sql.NVarChar, "Yêu cầu cập nhật hồ sơ nghệ sĩ")
        .input("message", sql.NVarChar, `Nghệ sĩ ${currentArtist.stage_name || currentArtist.full_name || ""} vừa gửi yêu cầu cập nhật hồ sơ.`)
        .input("reference_id", sql.Int, requestId || null)
        .query(`
          INSERT INTO notifications (receiver_user_id, sender_user_id, type, title, message, reference_id, created_at)
          VALUES (@receiver_user_id, @sender_user_id, @type, @title, @message, @reference_id, GETDATE())
        `);
    }

    return successResponse(
      res,
      "Đã gửi yêu cầu cập nhật hồ sơ cho admin duyệt. Hồ sơ sẽ được cập nhật sau khi admin phê duyệt.",
      { request_id: requestId, status: "pending" }
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const pool = await connectDB();

    const artistResult = await pool.request()
      .input("user_id", sql.Int, req.user.user_id)
      .query(`
        SELECT artist_id
        FROM artists
        WHERE user_id = @user_id
      `);

    if (artistResult.recordset.length === 0) {
      return errorResponse(res, "Không tìm thấy hồ sơ nghệ sĩ", 404);
    }

    const artistId = artistResult.recordset[0].artist_id;

    const result = await pool.request()
      .input("artist_id", sql.Int, artistId)
      .query(`
        SELECT *
        FROM products
        WHERE artist_id = @artist_id
        ORDER BY created_at DESC
      `);

    return successResponse(res, "Lấy danh sách sản phẩm của nghệ sĩ thành công", result.recordset);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
