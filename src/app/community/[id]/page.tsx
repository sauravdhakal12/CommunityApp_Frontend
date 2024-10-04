import axios from "axios";
import JoinLeaveButton from "./JoinLeaveButton";
import { cookies } from 'next/headers'; // For Next.js

export default async function Community({ params }: { params: { id: string } }) {

  // 1. Figure out if user is already part of a community

  // Get info on a community
  const res = await axios.get(`https://localhost:4000/community/${params.id}`);
  const data = res.data.data;

  // Access cookies
  const cookieStore = cookies();
  const auth_token = cookieStore.get("auth_token")?.value;

  // TODO: User can direclty visit this page.
  // TODO: Do smth about cookies
  const joined = await axios.post("https://localhost:4000/community/part", {
    communityId: params.id,
  }, {
    withCredentials: true,
    headers: {
      "Accept": "application/json",
      "cookie": `auth_token=${auth_token}`,
    }
  });

  return (
    <div className="mt-10 mx-20">
      <h1 className="text-4xl text-center">{data.name}</h1>
      <hr />

      <div>
        <p>
          By:
          <span className="font-bold"> {data.username}</span>
        </p>
        <p>
          Price:
          <span className="font-bold"> {Number(data.price) === 0 ? "Free" : data.price} </span>
        </p>
        <p className="mt-3">{data.description}</p>
      </div>

      <JoinLeaveButton communityId={params.id} joined={joined.data.success} />
    </div >
  )
}
