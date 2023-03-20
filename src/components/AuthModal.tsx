import {AiFillGoogleSquare, AiFillFacebook, AiFillTwitterSquare, AiOutlineRightSquare} from 'react-icons/ai';

export default function AuthModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-primary bg-opacity-95 shadow-lg rounded-md">
        <div className="flex flex-col gap-4 p-8 items-center ">
          <h1>
            <span className="text-primary-content text-2xl font-thin italic lowercase">Please Sign In ...</span>
          </h1>
          <div className="flex">
          <button className="bg-primary-content rounded-md p-2 w-52 font-light lowercase hover:bg-slate-400 ">
                  Sign In with Twitter <AiFillTwitterSquare size={35} className="inline-block" />
                </button>

          </div>
          <div className="flex">
          <button className="bg-primary-content rounded-md p-2 w-52 font-light lowercase hover:bg-slate-400 ">
                Sign In with Google <AiFillGoogleSquare size={35} className="inline-block" />
              </button>

          </div>
          <div className="flex">
          <button className="bg-primary-content rounded-md p-2 w-52 font-light lowercase hover:bg-slate-400 ">
                Sign In with Facebook <AiFillFacebook size={35} className="inline-block" />
              </button>
            </div>
            <a href="what-is-this" className="self-start mt-2 text-primary-content text-md font-light hover:text-primary-focus underline lowercase"> 
            Wait, what is this? 
            </a>
        </div>
      </div>
    </div>
  );
}
