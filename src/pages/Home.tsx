import { getEntries, pb } from "../api/pocketbase";
import Entry from "../components/Entry";
import AuthModal from "../components/AuthModal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { MdLogout } from "react-icons/md";

export interface EntryType {
  id: string;
  entry_text: string;
  created: string;
  entry_tags?: string[];
}

export interface EntriesType {
  entries: EntryType[];
}

interface AuthData {
  id: string;
  name: string;
  email: string;
  password: string;
}

// const getAuthUser = async () => {
//   const authData = await pb
//     .collection("users")
//     .authWithPassword("test", "testingtesting");
//   return console.log("logged in");
// };

// getAuthUser();

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authStatus, authStatusUpdate] = useState(pb.authStore.isValid);


 
  pb.authStore.onChange(() => {
    authStatusUpdate(pb.authStore.isValid);
  });

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
  // if (!isLoaded) return <div>Loading...</div>;
  if (error) return <div>Error fetching entries</div>;
  if (!userEntries) return <div>No entries</div>;

  if (!authStatus) {
    return (
      <>
        <AuthModal />
        <div className="blur-2xl">
          <div className="flex flex-col">
            <Entry entries={userEntries} />
          </div>
        </div>
      </>
    );
  } else {
    const currentUser = pb.authStore.model.first_name;
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
              <div>
                <button
                  className="mt-3 relative top-0 left-4 text-2xl hover:text-accent-focus"
                  onClick={toggleSidebar}
                >
                  <FaBars />
                </button>
                <button
                  className="mt-3 fixed top-0 right-3 text-2xl hover:text-accent-focus"
                  onClick={() => pb.authStore.clear()}
                >
                  <MdLogout />
                </button>
              </div>
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
}
