const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {
  constructor() {}

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is notification for queue",
        content: "Some queue will subscribe this",
        recepientEmail: "sahilpatil32267@gmail.com",
        notificationTime: "2023-10-30T12:00:00",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "Successfully published the event ",
    });
  }

  async create(req, res) {
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
  }
}

module.exports = BookingController;
