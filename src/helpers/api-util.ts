import { IAppData } from "../types/interfaces";
import { preprocessData } from "./data-util";

/**
 * fetch json data from url
 * @param url
 */
export const getJson = async (url: string): Promise<IAppData> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(response.status);
      throw new Error(`Could not fetch data from ${url}!`);
    }
    const data = await response.json();
    return preprocessData(data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch JSON ${error.message}`);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};
