import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'

const AllRequests = () => {
        const [allRequests, setAllRequests] = useState([]);
        const [totalRequests, setTotalRequests] = useState(0);
        const [itemsPerPage, setItemsPerPage] = useState(10)
        const [currentPage, setCurrentPage] = useState(1);
        const [loading, setLoading] = useState(true);
    
        const axiosSecure = useAxiosSecure()
    
        useEffect(()=>{
            setLoading(true)
            axiosSecure.get(`/all-requests?page=${currentPage-1}&size=${itemsPerPage}`)
            .then(res=>{
                setAllRequests(res.data.requests)
                setTotalRequests(res.data.totalRequests)
            })
        },[axiosSecure, currentPage, itemsPerPage])
    
        const numberOfPages = Math.ceil(totalRequests/itemsPerPage)
        const pages = totalRequests>0? [...Array(numberOfPages).keys()].map(e => e+1) : [1]
    
        const handlePrev = ()=>{
            if(currentPage > 1){
                setCurrentPage(currentPage - 1)
            }
        }
        const handleNext = ()=>{
            if(currentPage < pages.length){
                setCurrentPage(currentPage + 1)
            }
        }
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Order</th>
        <th>Recipient Name</th>
        <th>Hospital Name</th>
        <th>Blood Type</th>
      </tr>
    </thead>
    <tbody>

      {/* row 1 */}
      {
        allRequests.map((request,index) => 
            <tr>
        <th>{(currentPage*10)+(index+1)-10}</th>
        <td>{request.recipient_name}</td>
        <td>{request.hospital_name}</td>
        <td>{request.blood_group}</td>
        
      </tr>
        )
      }
      
    </tbody>
  </table>

  
</div>
<div className='flex justify-center items-center mt-12 gap-4'>
        <button onClick={handlePrev} className="">Prev</button>
        {
            pages.map(page=>
                <button
                className={`text-2xl ${page === currentPage? ' text-red-500':''}`}
                onClick={() => setCurrentPage(page)}>{page}
                </button>
            )
        }
        <button onClick={handleNext} className="">Next</button>
  </div>
</div>
  )
}

export default AllRequests
