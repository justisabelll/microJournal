import { saveEntry } from "../api/pocketbase";
import { EntriesType, EntryType } from "../pages/Home";
import { useToast } from "./ui/use-toast";
import { pb } from "../api/pocketbase";
import { Textarea } from "./ui/Textarea";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Entry(entries: EntriesType) {
  const { toast } = useToast();
  const [currentEntry, setCurrentEntry] = useState<EntryType>({
    id: "",
    entry_text: "",
    created: "",
    entry_tags: [],
  });

  return (
    <>
      <div className="p-4 bg-rosePine-subtle rounded-sm m-4 shadow-lg shadow-rosePine-subtle/20">
        <h1 className="text-rosePine-base scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          What's on your mind?
        </h1>
        <Textarea
          className="rounded-md p-2 w-full"
          placeholder="Type here..."
          onChange={(e) =>
            setCurrentEntry({ ...currentEntry, entry_text: e.target.value })
          }
        />
        <button className="bg-rosePine-love text-rosePine-base rounded-md p-2 w-1/5  mt-2 lowercase  hover:bg-rosePine-love/80">
          save
        </button>
      </div>
      <div className="divider" />
      {entries.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <div className="p-4 bg-rosePine-subtle rounded-lg m-4 shadow-md">
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-rosePine-base">
                {entry.entry_text}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
