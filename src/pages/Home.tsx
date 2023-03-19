import pb from "../api/pocketbase";
import Entry from "../components/Entry";
import AuthModal from "../components/AuthModal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

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
  const authData = await pb
    .collection("users")
    .authWithPassword("test", "testingtesting");
  return console.log("logged in");
};

getAuthUser();

async function getEntries() {
  const stuff = await pb.collection("entries").getFullList<EntryType>({
    sort: "-created",
  });

  console.log(stuff);
  return stuff;
}

export default function Home(isUserLoggedIn) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    data: userEntries,
    isLoading,
    error,
  } = useQuery(["entries"], getEntries, {
    refetchOnWindowFocus: false,
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //  fix this implementation later
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching entries</div>;
  if (!userEntries) return <div>No entries</div>;

  if (!isUserLoggedIn.isUserLoggedIn) {
    return (
      <>
        <AuthModal />
        <div className="blur-lg">
        <h1 className="text-xl font-bold ml-4 mt-2">Hi, </h1>
          <div className="flex flex-col">
            <Entry entries={userEntries} />
          </div>
        </div>

      </>
    );
  }

const currentUser = pb.authStore.model.name;
  return (
    <>
      <div className="flex">
        {isSidebarOpen && (
          <div className="z-50">
            <Sidebar />
            <button
              className="btn absolute top-0 left-60 ml-4 hover:text-accent-focus text-lg text-red-500 border-none bg-transparent"
              onClick={toggleSidebar}
            >
              <AiOutlineClose size={30} />
            </button>
          </div>
        )}
        <div
          className={`w-screen h-screen ${
            isSidebarOpen ? "blur" : ""
          } transition-all duration-300`}
        >
          {!isSidebarOpen && (
            <button
              className="mt-3 ml-4 text-2xl hover:text-accent-focus"
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
          )}
          <h1 className="text-xl font-bold ml-4 mt-2">Hi, {currentUser}</h1>
          <div className="flex flex-col">
            <Entry entries={userEntries} />
          </div>
        </div>
      </div>
    </>
  );
}
