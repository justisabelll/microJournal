import { pb } from "../api/pocketbase";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ErrorMessage } from "@hookform/error-message";

export interface formData {
  first_name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function AuthModal() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [needtoSingUp, setneedtoSignUp] = useState(undefined);
  const password = useRef({});
  password.current = watch("password", "");
  const [isAuthError, setAuthError] = useState({
    isError: false,
    message: "",
  });

  const LoginSubmit = async (data: formData) => {
    console.log(data);
    try {
      await pb.collection("users").authWithPassword(data.email, data.password);
    } catch (error) {
      setAuthError({ isError: true, message: error.response.errorDetails });
    }
    return null;
  };

  const SignUpSubmit = async (data: formData) => {
    console.log(data);
    try {
      await pb.collection("users").create({
        first_name: data.first_name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
    } catch (error) {

      // TODO: comunicate errors better in future 
      console.log(error.response.data.email.message);
      setAuthError({
        isError: true,
        message: "Password " + error.response.data[0].message,
      });
    }

    return LoginSubmit(data);
  };

  return (
    <div className="fixed inset-0 flex mt-2 items-center justify-center z-50">
      <span className="absolute top-0 mt-8 flex justify-center font-extralight text-2xl italic bg-primary box-decoration-clone shadow-md bg-opacity-90 rounded-lg p-4 h-fit w-fit text-primary-content">
        welcome to microJournal
      </span>

      {needtoSingUp ? (
        <div>
          <div className="mt-24 bg-primary bg-opacity-95 shadow-lg rounded-md p-8 max-w-lg">
            <div>
              <div className="flex flex-col gap-4 items-center ">
                <h1>
                  <span className="text-primary-content text-2xl font-medium italic lowercase">
                    Please Sign Up ...
                  </span>
                </h1>
                <div>
                  <form onSubmit={handleSubmit(SignUpSubmit)}>
                    <input
                      {...register("first_name", {
                        minLength: {
                          value: 3,
                          message: "first name must be at least 3 characters.",
                        },
                        required: "first nanme is required.",
                      })}
                      type="text"
                      placeholder="firstname"
                      className="input input-bordered w-full mb-2 "
                    />
                    <input
                      {...register("email", {
                         required: "email is required.", 
                        })}
                      type="email"
                      placeholder="email"
                      className="input input-bordered w-full mb-2 "
                    />
                    <input
                      {...register("password", { required: true })}
                      name="password"
                      type="password"
                      placeholder="password"
                      className="input input-bordered w-full mb-2"
                    />
                    <input
                      {...register("passwordConfirm", { validate: value => value === password.current || "passwords dont match", required: "password must be confirmed." })}
                      type="password"
                      placeholder="confrim your password"
                      className="input input-bordered w-full mb-2"
                    />
                    {
                      // allows multiple errors to be rendered at once
                      Object.keys(errors) && (
                        Object.keys(errors).map((error) => {
                          return (
                            <div className=" mt-4 mb-4 p-4 w-full rounded-md shadow-md bg-red-500">
                              <AiOutlineCloseCircle
                                size={30}
                                className="text-red-100 inline mr-2 mb-1"
                              />
                              <span className="text-red-100">
                                {errors[error].message} please try again.
                              </span>
                            </div>
                          );
                        })
                      )
                    }
                      <div>
                        {isAuthError.isError && (
                          <div className=" mt-4 mb-4 p-4 w-full rounded-md shadow-md bg-red-500">
                            <AiOutlineCloseCircle
                              size={30}
                              className="text-red-100 inline mr-2 mb-1"
                            />
                            <span className="text-red-100">
                              {isAuthError.message}
                            </span>
                          </div>
                        )}
                      </div>
                    <input
                      type="submit"
                      className="bg-primary-content rounded-md p-2 w-full font-light lowercase  hover:bg-slate-400"
                    ></input>
                  </form>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div className="flex flex-col gap-4 selft-center">
              <h1>
                <button
                  onClick={() => setneedtoSignUp(false)}
                  className="text-primary-content rounded-md font-light italic lowercase underline underline-offset-1"
                >
                  i already have an account
                </button>
              </h1>
              <div>
                <a
                  href="what-is-this"
                  className="self-start mt-2 text-primary-content text-md font-light hover:text-primary-focus underline lowercase"
                >
                  Wait, what is this?
                </a>
              </div>
              {
                <ErrorMessage
                  errors={errors}
                  name="singleErrorInput"
                  render={({ message }) => <p>{message}</p>}
                />
              }
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-8 bg-primary bg-opacity-95 shadow-lg rounded-md p-8 max-w-lg">
            <div>
              <div className="flex flex-col gap-4 items-center">
                <h1>
                  <span className="text-primary-content text-2xl font-medium italic lowercase">
                    Please Sign In ...
                  </span>
                </h1>
                <div>
                  <form onSubmit={handleSubmit(LoginSubmit)}>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="email"
                      className="input input-bordered w-full mb-2 "
                    />
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      placeholder="password"
                      className="input input-bordered w-full mb-2"
                    />
                    <input
                      type="submit"
                      className="bg-primary-content rounded-md p-2 w-full font-light lowercase  hover:bg-slate-400 "
                    ></input>
                  </form>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div className="flex flex-col gap-4 self-center">
              <h1>
                <button
                  onClick={() => setneedtoSignUp(true)}
                  className="text-primary-content rounded-md  font-light italic lowercase underline underline-offset-1"
                >
                  i need to create an account ...
                </button>
              </h1>
              <div>
                <a
                  href="what-is-this"
                  className="self-start mt-2 text-primary-content text-md font-light hover:text-primary-focus underline lowercase"
                >
                  Wait, what is this?
                </a>
              </div>
              {isAuthError.isError && (
                <div className="p-4 rounded-md shadow-md bg-red-500">
                  <AiOutlineCloseCircle
                    size={30}
                    className="text-red-100 inline mr-2 mb-1"
                  />
                  <span className="text-red-100">
                    {isAuthError.message} Please try again.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
