import NodeCache from "node-cache";
import { stateModel, stateDocument } from "../models/State.Models";
import { LgaModel, LgaDocument } from "../models/lgaModel";
import { RegionModel } from "../models/regionModel";
const cache = new NodeCache({ stdTTL: 43200, checkperiod: 3600 });

// Function to get all LGAs
const getAllLGAs = async (): Promise<any[]> => {
  const cacheKey = "all_lgas";
  const cachedLGAs: any = cache.get(cacheKey);
  if (cachedLGAs) {
    console.log(cachedLGAs, "cache hit for all LGAs");
    return cachedLGAs;
  } else {
    try {
      const allLGAs = await LgaModel.find();
      console.log("cache miss for all LGAs");
      if (allLGAs.length === 0) {
        return ["No LGAs found"];
      } else {
        cache.set(cacheKey, allLGAs);
        return allLGAs;
      }
    } catch (error) {
      console.error("Error fetching all LGAs", error);
      throw error;
    }
  }
};

//function to find LGA
const FindLga = async function (searchTerms: {}): Promise<any[]> {
  const cacheKey = `lga_${JSON.stringify(searchTerms)}`;
  console.log(cacheKey);
  const cachedLga: any = cache.get(cacheKey);
  if (cachedLga) {
    console.log(cachedLga, "cache hit");
    return cachedLga;
  } else {
    try {
      const lga = await LgaModel.find(searchTerms);
      console.log("cache miss");
      if (lga.length === 0) {
        return ["No data found for the specified query"];
      } else {
        cache.set(cacheKey, lga);
        return lga;
      }
    } catch (error) {
      console.error("Error fetching LGA", error);
      throw error;
    }
  }
};

//Function to get all states
const getAllStates = async (): Promise<any[]> => {
  const cacheKey = `All_States`;
  const cacheState: any = cache.get(cacheKey);
  if (cacheState) {
    console.log("cache hit");
    return cacheState;
  } else {
    const state = await stateModel.find();
    console.log("cache miss");
    if (state.length === 0) {
      return ["No data found for the specified query"];
    }
    cache.set(cacheKey, state);
    return state;
  }
};

// Function to findState
const findState = async function (searchTerms: {}): Promise<any[]> {
  const cacheKey = `lga_${JSON.stringify(searchTerms)}`;
  const cacheState: any = cache.get(cacheKey);
  if (cacheState) {
    console.log("cache hit");
    return cacheState;
  } else {
    const state = await stateModel.find(searchTerms);
    console.log("cache miss");
    if (state.length === 0) {
      return ["No data found for the specified query"];
    }
    cache.set(cacheKey, state);
    return state;
  }
};

//function to get all regions
const getAllRegion = async (): Promise<any[]> => {
  const cacheKey = `all_regions`;
  const cacheState: any = cache.get(cacheKey);
  if (cacheState) {
    console.log("cache hit");
    return cacheState;
  } else {
    const state = await RegionModel.find();
    console.log("cache miss");
    if (state.length === 0) {
      return ["No data found for the specified query"];
    }
    cache.set(cacheKey, state);
    return state;
  }
};

//function to find region
const findRegion = async function (searchTerms: {}): Promise<any[]> {
  const cacheKey = `Region_${JSON.stringify(searchTerms)}`;
  const cacheRegion: any = cache.get(cacheKey);
  if (cacheRegion) {
    console.log("cache hit");
    return cacheRegion;
  } else {
    const Region = await RegionModel.find(searchTerms);
    console.log("cache miss");
    if (Region.length === 0) {
      return ["No data found for the specified query"];
    }
    cache.set(cacheKey, Region);
    return Region;
  }
};

export {
  getAllLGAs,
  FindLga,
  getAllStates,
  findState,
  getAllRegion,
  findRegion,
};
