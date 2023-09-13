import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { User } from "../model/user.model";

export const getUserProfile = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get slack name and track from the request params
      const { track } = req.query;
      const slackName: string | any = req.query.slack_name;
      //   create an array of days
      const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const github_repo_url: string =
        "https://github.com/chile4coding/hngstage1backend.git";
      const github_file_url: string =
        "https://github.com/chile4coding/hngstage1backend/blob/main/controller/controller.ts";
      const refTime: number = 120000;
      const utcDate: any = new Date();

      const year = utcDate.getUTCFullYear();
      const month = (utcDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
      const day = utcDate.getUTCDate().toString().padStart(2, "0");
      const hours = utcDate.getUTCHours().toString().padStart(2, "0");
      const minutes = utcDate.getUTCMinutes().toString().padStart(2, "0");
      const seconds = utcDate.getUTCSeconds().toString().padStart(2, "0");

      const formattedUTCString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
      const weekDay = utcDate.getUTCDay();
      const currentTime = utcDate.getTime();
      const lBound = new Date(currentTime - refTime);
      const upBound = new Date(currentTime + refTime);
      res.status(StatusCodes.OK).json({
        slack_name: slackName.replace("_", " "),
        current_day: weekDays[weekDay],
        utc_time:
          utcDate >= lBound && utcDate <= upBound ? formattedUTCString : "",
        track: track,
        github_file_url: github_file_url,
        github_repo_url: github_repo_url,
        status_code: 200,
      });
    } catch (error) {
      next(error);
    }
  }
);

export const createUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      throw new Error("Invalid Request");
    }
    const { username } = req.body;

    if (typeof username !== "string") {
      throw new Error("invalid string supplied");
    }
    try {
      const userCreate = await User.create({ username });
      const save = await userCreate.save();
      if (save) {
        res.status(StatusCodes.OK).json({
          message: "user successfully created",
          user: save,
          status_code: 200,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);
export const updateUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req.params);

    if (!errors.isEmpty()) {
      throw new Error("Invalid Request");
    }
    const { user_id } = req.params;
    const { username } = req.body;
    if (typeof username !== "string" && user_id !== "string") {
      throw new Error("invalid string supplied");
    }
    try {
      const userUpdate = await User.findByIdAndUpdate(
        user_id as string ,
        { username }
      );
if(!userUpdate){
      throw new Error("user not found!");
}
        res.status(StatusCodes.OK).json({
          message: "user successfully update",
          user: userUpdate,
          status_code: 200,
        });
      
    } catch (error) {
      next(error);
    }
  }
);
export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req.params);
    if (!errors.isEmpty()) {
      throw new Error("Invalid Request");
    }
    try {
      const user = await User.findByIdAndDelete({
        _id: req.params.user_id as string,
      });

        res.status(StatusCodes.OK).json({
          message: "user successfully deleted",
          user,
          status_code: 200,
        });
      
    } catch (error) {
      next(error);
    }
  }
);
export const getUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req.params);

    if (!errors.isEmpty()) {
      throw new Error("Invalid Request");
    }
    try {
      const user = await User.findById(req.params.user_id as string);
        res.status(StatusCodes.OK).json({
          message: "user successfully fetched",
          user,
          status_code: 200,
        });
      
    } catch (error) {
      next(error);
    }
  }
);
