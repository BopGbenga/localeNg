import { FindLga, findState, findRegion } from "../helpers/cache";
import express, { Request, Response, NextFunction, query } from "express";
import { getAllLGAs, getAllStates, getAllRegion } from "../helpers/cache";

// Function to Get all LGA
export const allLGA = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allLGAs = await getAllLGAs();
    res.status(200).json({
      message: "Successful",
      data: allLGAs,
    });
  } catch (error) {
    console.error("Error fetching all LGAs:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
  next();
};
// Function to find one LGA
async function lgaGetter(req: Request, res: Response, next: NextFunction) {
  try {
    if (Object.keys(req.query).length > 0) {
      const { lga } = req.query;
      console.log(lga);

      if (lga) {
        const response = await FindLga({ localGvt: lga });
        res.status(200).json({
          message: "Successful",
          data: response,
        });
      }
    } else {
      res.status(400).json({
        message: "LGA query parameter is missing",
        success: false,
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: "error fouund",
      success: false,
    });
  }

  next();
}
//function to get all states
export const allStates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allStates = await getAllStates();
    res.status(200).json({
      message: "Successful",
      data: allStates,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching all states:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
  next();
};
// function to find one state
async function stateGetter(req: Request, res: Response, next: NextFunction) {
  try {
    if (Object.keys(req.query).length > 0) {
      const { State } = req.query;
      console.log(State);

      if (State) {
        const response = await findState({ Name: State });
        res.status(200).json({
          message: "Successful",
          data: response,
        });
      }
    } else {
      res.status(400).json({
        message: "State query parameter is missing",
        success: false,
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: "error fouund",
      success: false,
    });
  }
  next();
}
//function to get all regions
export const allRegions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allRgs = await getAllRegion();

    // Return the response
    res.status(200).json({
      message: "Successful",
      data: allRgs,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching all regions:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
  next();
};
// function to find one region
async function RegionGetter(req: Request, res: Response, next: NextFunction) {
  try {
    if (Object.keys(req.query).length > 0) {
      const { Region } = req.query;
      console.log(Region);

      if (Region) {
        const response = await findRegion({ Region: Region });
        res.status(200).json({
          message: "Successful",
          data: response,
        });
      }
    } else {
      res.status(400).json({
        message: "State query parameter is missing",
        success: false,
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: "error fouund",
      success: false,
    });
  }
  next();
}

export { lgaGetter, stateGetter, RegionGetter };
