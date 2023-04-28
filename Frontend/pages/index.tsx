import { User } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {

  const [user, setUser] = useState({} as User);
  const { push } = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, [])

  return (
    <>
      <div className="flex w-full justify-center mt-5 gap-3">
        <button 
          type="button" 
          onClick={e => push({ pathname: '/login' })}
          className='pl-2 pr-2 pt-1 pb-1 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:translate-y-1 transition-all duration-100'
        >
          Login
        </button>
        <button
          type="button"
          onClick={e => {
            localStorage.removeItem('user');
            setUser({} as User);
          }}
          className='pl-2 pr-2 pt-1 pb-1 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:translate-y-1 transition-all duration-100'
        >Logout</button>
      </div>
      <div className="flex h-full w-full justify-center mt-10 ">
        <div>
          <h1 className="text-6xl font-extrabold mb-5">Hour Control</h1>
          <div className="border border-black">
          </div>
        </div>
      </div>
      <pre>
        {
          JSON.stringify(user, null, 2)
        }
      </pre>
    </>
  )
}
