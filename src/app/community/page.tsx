//TODO: Not fetch all community but some and pagination (or recommendation)

import axios from "axios";
import Link from "next/link";

export default async function Communities() {

  // Fetch all communitites
  const res = await axios.get("https://localhost:4000/community")
  const data = res.data;

  return (
    <div>
      {data.success ?
        <div>
          {data.data.map((d: { id: string, name: string }) => (
            <Link href={`https://localhost:3000/community/${d.id}`} className="flex flex-column mx-60 mt-10 p-10 rounded-md" style={{ border: "2px solid white" }} key={d.id}>{d.name} </Link>
          ))}
        </div> :
        <div>
          No
        </div>}
    </div>
  )
}
