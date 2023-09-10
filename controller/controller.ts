import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

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
      const utcDate: any = new Date(  );

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
          utcDate >= lBound && utcDate <= upBound ? formattedUTCString: "",
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
