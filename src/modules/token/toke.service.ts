import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import mongoose from "mongoose";
import Token from "./token.model";
import { AccessAndRefreshTokens, ITokenDoc } from "./token.interfaces";
import config from "../../config/db.config";
import { IUserDoc } from "../user/user.interfaces";

export class TokenService {
  generateToken(
    userId: mongoose.Types.ObjectId,
    expires: Moment,
    secret: string = config.jwt.secret
  ): string {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
    };
    return jwt.sign(payload, secret);
  }

  /**
   * Save a token
   * @param {string} token
   * @param {mongoose.Types.ObjectId} userId
   * @param {Moment} expires
   * @returns {Promise<ITokenDoc>}
   */
  async saveToken(
    token: string,
    userId: mongoose.Types.ObjectId,
    expires: Moment,
    blacklisted: boolean = false
  ): Promise<ITokenDoc> {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      blacklisted,
    });
    return tokenDoc;
  }

  /**
   * Generate auth tokens
   * @param {IUserDoc} user
   * @returns {Promise<AccessAndRefreshTokens>}
   */
  async generateAuthTokens(user: IUserDoc): Promise<AccessAndRefreshTokens> {
    const accessTokenExpires = moment().add(
      config.jwt.accessExpirationMinutes,
      "minutes"
    );
    const accessToken = this.generateToken(user.id, accessTokenExpires);

    const refreshTokenExpires = moment().add(
      config.jwt.refreshExpirationDays,
      "days"
    );
    const refreshToken = this.generateToken(user.id, refreshTokenExpires);
    await this.saveToken(refreshToken, user.id, refreshTokenExpires);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  async verifyToken(token: string): Promise<ITokenDoc> {
    const payload = jwt.verify(token, config.jwt.secret);
    if (typeof payload.sub !== "string") {
      throw new Error("bad user");
    }
    const tokenDoc = await Token.findOne({
      token,
      user: payload.sub,
    });
    if (!tokenDoc) {
      throw new Error("Token not found");
    }
    return tokenDoc;
  }
}
