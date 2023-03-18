import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineQuestion } from "react-icons/ai";

const SidebarRoutes = [
  {
    title: "Home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    title: "What is this?",
    path: "/what-is-this",
    icon: <AiOutlineQuestion />,
  },
];

export default function Sidebar() {

  return (
    <div>
     
        <div className="inset-0 flex md:static ">
          <div className="flex flex-col w-64 ">
            <div className="flex items-center justify-center
            bg-secondary h-24 rounded-br-lg mb-2">
              <span className="text-4xl font-bold italic box-decoration-clone bg-gradient-to-r from-primary to-accent text-white px-2 rounded-lg pb-0.5">
                <span className="lowercase text-2xl text-accent-content">
                Micro
                </span>
                Journal 
              </span>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto">
              <nav className="h-screen px-2 py-4 bg-secondary-focus rounded-tr-lg ">
                <ul className="space-y-1">
                  {SidebarRoutes.map((route) => (
                    <li key={route.title}>
                      <Link
                        to={route.path}
                        className="flex justify-center items-center px-2 py-2 text-md font-medium rounded-md hover:bg-accent hover:text-white"
                      >
                        <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-secondary-content">
                          {route.icon}
                        </span>
                        <span className="ml-2 text-md text-secondary-content font-medium">
                          {route.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
    </div>
  );


}
