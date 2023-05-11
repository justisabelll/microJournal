import PocketBase from "pocketbase";
import { EntryType } from "../pages/Home";

export interface ClientResponseError {
  url: string; // requested url
  status: number; // response status code
  response: {
    code: number;
    message: string;
    data: {};
  }; // the API JSON error response
  isAbort: boolean; // is abort/cancellation error
  originalError: Error | null; // the original non-normalized error
}

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export async function getEntries() {
  const stuff = await pb.collection("entries").getFullList<EntryType>({
    sort: "-created",
  });

  return stuff;
}

export async function saveEntry(owner_id: string, entry: EntryType) {
  const data = {
    entry_owner: owner_id,
    entry_text: entry.entry_text,
    entry_tags: entry.entry_tags,
  };

  try {
    const record = await pb.collection("entries").create(data);
  } catch (error) {
    return false;
  }

  return true;
}
