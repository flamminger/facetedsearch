/**
 * fetch json data from url
 * @param url
 */
export const getJson = async (url: string) => {
  try {
    return fetch(url).then((res) => res.json());
  } catch (e) {
    throw e;
  }
};
