import { IAppData } from "../types/interfaces";

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
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch JSON ${error.message}`);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};
