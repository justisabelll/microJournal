import PocketBase from 'pocketbase';
import { EntryType } from '../pages/Home';

export interface ClientResponseError {
  url:           string,     // requested url
  status:        number,     // response status code
  response:      { string },    // the API JSON error response
  isAbort:       boolean,    // is abort/cancellation error
  originalError: Error|null, // the original non-normalized error
}

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);


  export async function getEntries() {
    const stuff = await pb.collection("entries").getFullList<EntryType>({
      sort: "-created",
    });
  
    return stuff;
  }
  

   