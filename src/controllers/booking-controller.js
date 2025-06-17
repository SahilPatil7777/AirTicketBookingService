const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      err: {},
      message: "Successfully completed booking",
    });
  } catch (error) {
    return res
      .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        data: {},
        success: false,
        message: error.message,
        err: error.explanation,
      });
  }
};

module.exports = {
  create,
};
