"use client"

import axios from "axios";
import { useState } from "react";

export default function JoinLeaveButton({ communityId, joined }: { communityId: string, joined: boolean }) {
  const [sJoined, setSJoined] = useState(joined);

  // TODO: Try/Catch and disable mouse
  async function handleJoin() {
    const url = "https://localhost:4000/community/";
    const fullUrl = url + (sJoined ? "leave" : "join");

    const res = await axios.post(fullUrl, {
      communityId: communityId
    }, {
      withCredentials: true,
    });
    alert(`${res.data.success ? "Success" : "Error"}: ${res.data.message}`);
    if(res.data.success){
      setSJoined(!sJoined);
    }
  }
  return (
    <button onClick={handleJoin} style={{ backgroundColor: sJoined ? "red" : "indigo" }} id="join" type="submit" className="mt-10 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      {sJoined ? "leave" : "join"}
    </button>
  )
}
