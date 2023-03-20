import {AiFillGoogleSquare, AiFillFacebook, AiFillTwitterSquare, AiOutlineRightSquare} from 'react-icons/ai';

export default function AuthModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <span className='absolute top-0 mt-28 flex justify-center   font-extralight text-6xl italic bg-primary box-decoration-clone  h-fit w-fit  shadow-md bg-opacity-90 rounded-lg p-4 text-primary-content'>
        welcome to microJournal
      </span>
      <div className="mt-8 bg-primary bg-opacity-95 shadow-lg rounded-md p-8 md:w-1/3 ">
        <div className="flex flex-col gap-4 items-center ">
          <h1>
            <span className="text-primary-content text-2xl font-thin italic lowercase">Please Sign In ...</span>
          </h1>
          <div className="flex">
          <button className="bg-primary-content rounded-md p-2 w-52 md:w-64 font-light lowercase hover:bg-slate-400 ">
                  Sign In with Twitter <AiFillTwitterSquare size={35} className="inline-block" />
                </button>

          </div>
          <div className="flex">
          <button className="bg-primary-content rounded-md p-2 w-52 font-light lowercase hover:bg-slate-400  md:w-64 ">
                Sign In with Google <AiFillGoogleSquare size={35} className="inline-block" />
              </button>

          </div>
          <div className="flex">
          <button className="bg-primary-content rounded-md p-2 w-52  md:w-64 font-light lowercase hover:bg-slate-400 ">
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
