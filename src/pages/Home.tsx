import pb from "../api/pocketbase";
import Entry from "../components/Entry";
import { useQuery } from "@tanstack/react-query";

export interface EntryType {
  id: string;
  entry_text: string;
  created: string;
  entry_tags?: string[];
}

export interface EntriesType {
  entries: EntryType[];
}


const getAuthUser = async () => {
  const authData = await pb.collection('users').authWithPassword(
    'test',
    'testingtesting',
);
  return console.log("logged in");
}

getAuthUser();

const currentUser = pb.authStore.model.name;


async function getEntries() {
  const stuff = await pb.collection('entries').getFullList<EntryType>({
    sort: '-created'
  })

  console.log(stuff);
  return stuff;
}



export default function Home() {
  const { data: userEntries, isLoading, error } = useQuery(['entries'], getEntries,
  {
    refetchOnWindowFocus: false,
  }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching entries</div>;


    return (
        
        <div className="">
            <h1 className="text-xl font-bold ml-4 mt-2">Hi, {currentUser}</h1>
            <div className="flex flex-col">
                <Entry entries={userEntries} />
            </div>
        </div>

    )
}
