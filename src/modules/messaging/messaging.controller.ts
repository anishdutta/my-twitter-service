import { HttpsStatusCode } from "../../utils/utils.interfaces";
import { MessagingService } from "./messaging.service";
import { Request, Response } from "express";
import { TokenService } from "../token/toke.service";

export const postMessage = async (req: Request, res: Response) => {
  try {
    const request = req.body,
      tokenService = new TokenService();
    const tokenUser = await tokenService.verifyToken(request.token);
    if (!tokenUser) {
      res
        .status(HttpsStatusCode.VALIDATION_FAILED)
        .send({ error: "Invalid Token!" });
      return {
        status: HttpsStatusCode.VALIDATION_FAILED,
        error: "Invalid Token!",
      };
    }
    console.log(req.body);
    const messagingService = new MessagingService(tokenUser.user as string);
    const message = await messagingService.postMessage(request);
    if (message.error) {
      res.status(message.status).send(message);
      return;
    }
    res.status(HttpsStatusCode.SUCCESS).send({ message });
  } catch (err) {
    console.error("Error in postMessage", err);
    res.status(HttpsStatusCode.SOMETHING_WENT_WRONG).send({
      status: HttpsStatusCode.SOMETHING_WENT_WRONG,
      error:
        Object.keys(err).length > 0
          ? err
          : JSON.stringify(err) ||
            "Something Went Wrong, Please Try Again Later.",
    });
  }
};

export const fetchAllUserMessages = async (req: Request, res: Response) => {
  try {
    const request = req.body,
      tokenService = new TokenService();
    const tokenUser = await tokenService.verifyToken(request.token);
    if (!tokenUser) {
      res
        .status(HttpsStatusCode.VALIDATION_FAILED)
        .send({ error: "Invalid Token!" });
      return {
        status: HttpsStatusCode.VALIDATION_FAILED,
        error: "Invalid Token!",
      };
    }
    console.log(req.body);
    const messagingService = new MessagingService(tokenUser.user as string);
    const message = await messagingService.getAllMessages(request);
    if (message.error) {
      res.status(message.status).send(message);
      return;
    }
    res.status(HttpsStatusCode.SUCCESS).send({ message });
  } catch (err) {
    console.error("Error in postMessage", err);
    res.status(HttpsStatusCode.SOMETHING_WENT_WRONG).send({
      status: HttpsStatusCode.SOMETHING_WENT_WRONG,
      error:
        Object.keys(err).length > 0
          ? err
          : JSON.stringify(err) ||
            "Something Went Wrong, Please Try Again Later.",
    });
  }
};
