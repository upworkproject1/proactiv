'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation';

const ClaimGiftForm = ( ) => {
  const [data, setData] = useState({fullname:'',businessname:'',email:'',number:''})

  const router = useRouter();

  const handleChange = (e) =>{
    setData({...data , [e.target.name]:e.target.value})

  }

  const handleClick = (e)=>{
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const numberRegex = /^0[127]\d{9}$/;

    if( 
      data.fullname.length == 0 || 
      data.businessname.length == 0 || 
      data.email.length == 0 || 
      data.number.length == 0 
      ){
        alert('Complete all the fields')
      }else if (!emailRegex.test(data.email)) {
      alert('Invalid email');
      } else if (!numberRegex.test(data.number)) {
        alert('Invalid number')
      } else {
        localStorage.setItem('data', JSON.stringify(data));
        router.push('/funnel/spin');
      }
      
      




  }



  return (
    <div className="flex justify-center items-center min-h-screen md:w-[55%]">
      <form id="formulario" className="flex flex-col px-4 py-8 mx-5 bg-white rounded-lg shadow-md relative">
        <p className="fontAlternative"> <span className="fontTitle" style={{ padding: "0"} }>FREE</span> to 100 Salon Owners - Value up to £653</p>
        <p className="fontTitle">Claim Your FREE Gift Today!</p>        
         {/* <label for="Name" className="fontForm mb-1">
          Full Name*
        </label>        */}
        <input
          type="text"
          name="fullname"
          value={data.fullname}
          onChange={handleChange}
          placeholder="Full Name*"
          required
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput "
        />

         {/* <label for="Business Name" className="fontForm mb-1">
          Business Name*
        </label>  */}
        <input
          type="text"
          name="businessname"
          value={data.businessname}
          onChange={handleChange}
          placeholder="Business Name*"
          required
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />

         {/* <label for="Email" className="fontForm mb-1">
          Email*
        </label>          */}
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email*"
          required
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />



        {/* <label for="Contact Number" className="fontForm mb-1">
          Contact Number*
        </label>           */}
        <input
          type="tel"
          name="number"
          value={data.number}
          onChange={handleChange}
          placeholder="Contact Number*"
          required
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />
        <button
          type="submit"
          className="px-4 py-2 buttonsMain"
          onClick={handleClick}
        >
          Click to claim your FREE gift
        </button>
      </form>
    </div>
  )
}

export default ClaimGiftForm