import axios from "axios"
import { useEffect, useState } from "react"

function Home() {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [data, setData] = useState({})

    const PATH = import.meta.env.VITE_NODE_ENV === "Development" ? "http://localhost:3000/" : "/" // or '/api'

    // console.log("react:", import.meta.env.VITE_NODE_ENV)
    
    const submitInput = () => {
        axios.get(`${PATH}weather?lat=${lat}&lon=${lon}`).then((res) => {
            console.log(res.data)
            setData(res.data)
        }).catch(error => {
            console.log(error)
        })
    }


  return (
    <div className='bg-gray-900'>
        <div className='p-5'>    
            <div className="border rounded-xl p-5 bg-white">
                <div className="mb-6">
                    <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900">Latitude</label>
                    <input value={lat} onChange={(e) => setLat(e.target.value)}  type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="mb-6">
                    <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900">Longitude</label>
                    <input value={lon} onChange={(e) => setLon(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <button onClick={submitInput} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Submit</button>
            </div>
        </div>

    <div className="flex justify-center">
        <div className="bg-white p-5 flex flex-col gap-5 w-8/10 rounded-xl mb-3">
            <div className="border p-3 rounded-xl"> test: lat = 24.71 lon = 46.60</div>
            <div className="flex items-center gap-4"><span className="font-bold">source: </span><span className="border px-3 py-2 rounded-xl text-white bg-black">{data?.source}</span></div>
            <div className="flex items-center gap-4"><span className="font-bold">coordinates: </span><span className="border px-3 py-2 rounded-xl text-white bg-black">lat: {data?.coordinates?.lat}</span><span className="border px-3 py-2 rounded-xl text-white bg-black">lon: {data?.coordinates?.lon}</span></div>
            <div className="flex items-center gap-4"><span className="font-bold">temp: </span><span className="border px-3 py-2 rounded-xl text-white bg-black">{data?.tempC}</span></div>
            <div className="flex items-center gap-4"><span className="font-bold">humidity: </span><span className="border px-3 py-2 rounded-xl text-white bg-black">{data?.humidity}</span></div>
            <div className="flex items-center gap-4"><span className="font-bold">description: </span><span className="border px-3 py-2 rounded-xl text-white bg-black">{data?.description}</span></div>
            <div className="flex items-center gap-4"><span className="font-bold">fetchedAt: </span><span className="border px-3 py-2 rounded-xl text-white bg-black">{data?.fetchedAt}</span></div>
        </div>
    </div>


    </div>
  )
}

export default Home