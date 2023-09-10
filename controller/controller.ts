import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getUserProfile = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slack_name, track } = req.params;
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
      "https://github.com/my-username/my-repo/blob/main/src/example.js";
    const refTime = 1631184000;
    const range = 2;
    const utcDate = new Date();
    const weekDay = utcDate.getUTCDay();
    const currentTime = utcDate.getTime() / 1000;
    const lBound = refTime - range;
    const upBound = refTime + range;

    res.status(StatusCodes.OK).json({
      slack_name: slack_name,
      current_day: weekDays[weekDay],
      utc_time: currentTime >= lBound && currentTime <= upBound,
      track: track,
      github_file_url: github_file_url,
      github_repo_url: github_repo_url,
      status_code: 200,
    });
  }
);
