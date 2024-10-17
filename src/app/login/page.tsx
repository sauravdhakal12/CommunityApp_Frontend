// LOGIN

/*
  TODO:
    1. Refactor Code
    2. Combine login & signup in a single route (auth)
    3. Use PPR?
*/

"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Remove outline from input fields
import "@/global.css";

export default function Demo() {
  const router = useRouter();

  // State variables related to input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Functions to handle state change
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handlePasswordToggle() {
    setShowPassword(!showPassword);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Disable login button
    const button = document.querySelector("#login");
    button?.setAttribute("disabled", "true");

    try {

      // Send auth credentials to /login route
      const res = await axios.post("https://localhost:4000/user/auth/login", {
        email: email,
        password: password
      }, {
        withCredentials: true,
      });

      // If success then redirect else console error
      if (res.data.success)
        router.push("/");
      else
        setErrMsg(res.data.message)
    }
    catch (err) {
      console.log(err);
      setErrMsg("Something went wrong");
    }
    finally {

      // Clear input fields and remove disabled attribute
      setPassword("");
      setShowPassword(false);
      button?.removeAttribute("disabled");
    }
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" style={{ display: !errorMsg ? "none" : "flex" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mx-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <span className="block sm:inline">{errorMsg}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setErrMsg("")}>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" onChange={handleEmailChange} value={email} required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type={showPassword ? "text" : "password"} onChange={handlePasswordChange} value={password} required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <input type="checkbox" name="" id="showPassword" onChange={handlePasswordToggle} checked={showPassword} /> <span className="mx-1 text-sm font-medium">Show password</span>
            </div>
          </div>

          <div>
            <button id="login" type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Register now</a>
        </p>
      </div>
    </div>

  )
}
