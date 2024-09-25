"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import "@/global.css";

export default function Demo() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }
  function handleFullNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFullName(e.target.value);
  }
  function handlePasswordToggle(){
    setShowPassword(!showPassword);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const button = document.querySelector("#signup");
    button?.setAttribute("disabled", "true");

    if (password !== confirmPassword) {
      setErrMsg("Password and Confirm Password donot match")
      setPassword("")
      setConfirmPassword("")
      button?.removeAttribute("disabled");
      return
    }

    const res = await axios.post("http://localhost:4000/user/auth/register", {
      name: fullName,
      email: email,
      password: password
    }, {
      withCredentials: true,
    });

    if (res.data.success)
      router.push("/");
    else {
      setErrMsg(res.data.message)
      setPassword("");
      setConfirmPassword("");
      button?.removeAttribute("disabled");
    }
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" style={{ display: !errorMsg ? "none" : "inherit" }}>
            <span className="block sm:inline">{errorMsg}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setErrMsg("")}>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
          </div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold leading-6 text-gray-900">Full Name</label>
            <div className="mt-2">
              <input id="fullName" name="fullname" onChange={handleFullNameChange} value={fullName} required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" onChange={handleEmailChange} value={email} required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900">Password</label>
            <div className="mt-2">
              <input id="password" name="password" type={showPassword?"text":"password"} onChange={handlePasswordChange} value={password} required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <input type="checkbox" name="" id="showPassword" onChange={handlePasswordToggle}  /> <span className="mx-1 text-sm font-medium">Show password</span>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold leading-6 text-gray-900">Confirm Password</label>
            <div className="mt-2">
              <input id="confirmPassword" name="confirmPassword" type={showPassword?"text":"password"} onChange={handleConfirmPasswordChange} value={confirmPassword} required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" id="signup" className="flex w-full justify-center bg-indigo-600 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Create an account
            </button>
          </div>

        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</a>
        </p>
      </div>
    </div>

  )
}