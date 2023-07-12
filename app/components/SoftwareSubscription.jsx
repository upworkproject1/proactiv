"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const SoftwareSubscription = () => {
  const [packages, setPackages] = useState("Silver");
  const [period, setPeriod] = useState("Monthly");
  const [total, setTotal] = useState();
  const [prize, setPrize] = useState({})
  const [data, setData] = useState({fullname:'',businessname:'',email:'',number:'',industry:'',web:'',address:'',periodselested:'Monthly', packageselected:'Silver'})


  const router = useRouter();

  useEffect(()=>{
    let prizeStored = JSON.parse(localStorage.getItem('software')); //{description:'',number:0}
    if( prizeStored.description?.length == 0 || prizeStored == 'undefined'){
      setPrize({description:'',number:0})
    }else{
      setPrize(prizeStored)
    }

    let dataStored = JSON.parse(localStorage.getItem('data'));
    if( dataStored.fullname?.length == 0 || dataStored.email.length == 0 || dataStored == 'undefined'){
      setData({...data, fullname:'none',businessname:'none',email:'none',number:'none',industry:'none',web:'none',address:'none',periodselested:'', packageselected:''})
      console.log('entro a if falso');
    }else{
      setData({...data, fullname: dataStored.fullname , businessname: dataStored.businessname, email: dataStored.email, number: dataStored.number})
      console.log('entro a if correcto');
      console.log(dataStored.fullname);
    }    

  },[])

  const changePeriod = (e) => {
    setPeriod(e.target.value);
    setData({...data,periodselested:e.target.value})
  };
  const changepack = (e) => {
    setPackages(e.target.value);
    setData({...data,packageselected:e.target.value})
  };


  // useEffect(()=>{
  //   setData({...data,periodselested:period,packageselected:packages})
  // },[packages,period])

  useEffect(() => {
    if (packages === "Silver") {
      if (period === "Monthly") {
        setTotal(30.00);
      } else if(period === "Quarterly") {
        setTotal(80.00);
      } else if(period === "Annually") {
        setTotal(299.00);
      }
    } else if (packages == "Gold") {
      if (period === "Monthly") {
        setTotal(50.00);
      } else if(period === "Quarterly") {
        setTotal(135.00);
      } else if(period === "Annually") {
        setTotal(499.00);
      }
    } else if (packages == "Diamond"){
      if (period === "Monthly") {
        setTotal(50.00);
      } else if(period === "Quarterly") {
        setTotal(135.00);
      } else if(period === "Annually") {
        setTotal(499.00);
      }
    }
  }, [packages, period]);


  const handleClick = (e) =>{
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const numberRegex = /^0[127]\d{9}$/;

    if( 
      data.fullname.length == 0 || 
      data.businessname.length == 0 || 
      data.email.length == 0 || 
      data.number.length == 0 ||
      data.industry.length == 0 ||
      data.address.length == 0 
      ){
        alert('Complete the fields')
      } else if (!emailRegex.test(data.email)) {
      alert('Invalid email');
      } else if (!numberRegex.test(data.number)) {
        alert('Invalid number')
      } else{    

        localStorage.setItem('data', JSON.stringify(data));
        router.push('/funnel/referral');
      }
  }


  const handleChange = (e) =>{
    setData({...data , [e.target.name]:e.target.value})
  }

  return (
    <div className="flex flex-col mx-5 my-4 pb-2 items-center bg-white rounded-lg shadow-md relative md:w-[55%]">

      <p className="fontTitle text-center" style={{fontWeight: '700', color: '#4a6bb6'}}> <span className="colorPrimary">Congratulations on winning</span> <br /> <span className="underline">{prize.description}</span>  software subscription!!</p>

      <p className="fontSubTitle text-center" style={{fontSize:'1.5rem'}}>To go with your free plastic referral marketing cards.</p>

      <p className="fontGeneral pb-0 mb-5" style={{textAlign: 'center', fontStyle: 'italic'}}>
        (NO CONTRACT - cancel at any time <br /> - 30 days notice)
      </p>

      <p className="fontGeneral pb-1 underline" style={{fontWeight: '700', color: '#4a6bb6', fontSize:'1.5rem', textAlign: 'center'}}>Use as many of the features as you like</p>


      <div id='DIVsoftwarecomponents' className='flex flex-col justify-center items-center w-[90%] rounded-lg shadow-lg pb-2 mb-3 bg-[#ebebeb86]'>
        <p className="fontSubTitle" style={{paddingBottom:'0.2rem'}}>Software Components</p>
        <ul className="fontGeneral">
          <li className=" flex justify-around items-center h-fit border-2 border-[#a52a2a49] py-1">
            <div className=' w-[95%] h-[100%] flex justify-center items-center'>
              <p className='fontGeneral' style={{textAlign: 'start', padding: '0 4px 0 2px'}}>1.-</p>
              <p className='fontGeneral w-[100%]' style={{textAlign: 'start' , padding:'0 0 0 0'}}> Database</p>
            </div>
            <span className='w-[2px] h-[30px] bg-[#a52a2a49]'></span>
            <div className='w-[95%] h-[100%] flex justify-center items-center'>
              <p className='fontGeneral' style={{textAlign: 'start', padding: '0 4px 0 2px'}}>2.-</p>              
              <p className='fontGeneral w-[100%]' style={{textAlign: 'start', padding:'0 0 0 0'}}>Telephone / Email Marketing</p>
            </div>
          </li>

          <li className=" flex justify-around items-center h-fit border-2 border-[#a52a2a49] py-1">
            <div className='w-[95%] h-[100%] flex justify-center items-center'>
              <p className='fontGeneral' style={{textAlign: 'start', padding: '0 4px 0 2px'}}>3.-</p> 
              <p className='fontGeneral w-[100%] text-center' style={{textAlign: 'start', padding:'0 0 0 0'}}>Referral Marketing</p>
            </div>
            <span className='w-[2px] h-[30px] bg-[#a52a2a49]'></span>
            <div className='w-[95%] h-[100%] flex justify-center items-center'>
              <p className='fontGeneral' style={{textAlign: 'start', padding: '0 4px 0 2px'}}>4.-</p>               
              <p className='fontGeneral w-[100%]' style={{textAlign: 'start', padding:'0 0 0 0'}}>Gift Cards</p>
            </div>
          </li>

          <li className=" flex justify-around items-center h-fit border-2 border-[#a52a2a49] py-1">
            <div className='w-[95%] h-[100%] flex justify-center items-center'>
              <p className='fontGeneral' style={{textAlign: 'start', padding: '0 4px 0 2px'}}>5.-</p>                
              <p className='fontGeneral w-[100%] text-center' style={{textAlign: 'start', padding:'0 0 0 0'}}>Loyalty / Incentive Marketing</p>
            </div>
            <span className='w-[2px] h-[30px] bg-[#a52a2a49]'></span>
            <div className='w-[95%] h-[100%] flex justify-center items-center'>
              <p className='fontGeneral' style={{textAlign: 'start', padding: '0 4px 0 2px'}}>6.-</p>                
              <p className='fontGeneral w-[100%]' style={{textAlign: 'start', padding:'0 0 0 0'}}>Diary System</p>
            </div>
          </li>

          <li className=" flex justify-around items-center h-fit border-2 border-[#a52a2a49] py-1">
            <div className='w-[95%] h-[100%] flex justify-center items-center'>
              <p className='fontGeneral' style={{textAlign: 'start', padding: '0 4px 0 2px'}}>7.-</p>  
              <p className='fontGeneral w-[100%] text-center' style={{textAlign: 'start', padding:'0 0 0 0'}}>Stock Control</p>
            </div>
            <span className='w-[2px] h-[30px] bg-[#a52a2a49]'></span>
            <div className='w-[95%] h-[100%] flex justify-center items-center'>
              <p className='fontGeneral' style={{textAlign: 'start', padding: '0 4px 0 2px'}}>8.-</p>                
              <p className='fontGeneral w-[100%]' style={{textAlign: 'start', padding:'0 0 0 0'}}>Invoicing </p>
            </div>
          </li>
        </ul>
      </div>


      <p className="fontGeneral my-4" style={{textAlign: 'center'}}>
        Your free trial will end on{" "}
        <span className="font-semibold">{prize.date}</span>{" "}
      </p>


      <p className="fontGeneral pb-3" style={{textAlign: 'center', fontStyle: 'italic'}}>
        After your FREE trial, ONLY pay for what features you want to use. <br />
      </p>


      <p className="fontGeneral pb-0 underline" style={{fontWeight: '700', color: '#4a6bb6', fontSize:'1.5rem'}}>Price After Free Trial</p>

      <div id="tables" className="flex flex-col w-[95%] border-2 mb-5 md:w-[80%]">
      <table className="w-[100%] border rounded-lg mb-0 ">
        <thead>
          <tr>
            <th className="resize-text py-1 px-0 w-[50%]" style={{border: 'none'}}>Package</th>
            <th className="resize-text py-1 px-0 w-[50%]" style={{border: 'none'}}>Features</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-neutral-200">
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>Silver</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>Database + 1</td>
          </tr>
          <tr className="border-b ">
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>Gold</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>Database + 3</td>
          </tr>
          <tr className="border-b bg-neutral-200">
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>Diamond</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>All 8</td>
          </tr>
        </tbody>
      </table>

      <table className="w-[100%] border rounded-lg mb-0">
        <thead>
          <tr>
            <th className="w-[4%]" style={{border: 'none'}}> </th>
            <th className="resize-text py-1 px-0 w-[32%]" style={{border: 'none'}}>Monthly</th>
            <th className="resize-text py-1 px-0 w-[32%]" style={{border: 'none'}}>Quarterly</th>
            <th className="resize-text py-1 px-0 w-[32%]" style={{border: 'none'}}>Annually</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-neutral-200">
            <td style={{border: 'none'}}>S.</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>&#163;30.00</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>&#163;80.00</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>&#163;299.00</td>
          </tr>
          <tr className="border-b">
            <td style={{border: 'none'}}>G.</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>&#163;50.00</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>&#163;135.00</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>&#163;499.00</td>
          </tr>
          <tr className="border-b bg-neutral-200">
            <td style={{border: 'none'}}>D.</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>&#163;70.00</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>&#163;180.00</td>
            <td className="resize-text py-1 px-0" style={{border: 'none'}}>&#163;589.00</td>
          </tr>          
        </tbody>
      </table>
      </div>




      <div className=" text-center">
        <p className="fontAlternative" style={{paddingBottom: "4px", fontSize:'1rem'}}>Please provide required information</p>
        {/* <p className="text-xs"> * marked fields are mandatory</p> */}
      </div>

      <p className="fontGeneral mb-2" style={{textAlign: 'center'}}>
        Please choose your package after free trial period:
      </p>

      <div className="flex gap-4 justify-center items-center fontGeneral py-2 border-2 w-[95%] md:justify-around">
        <label className="text-red-700 text-[1rem]" style={{fontWeight: '700'}}>
          <input
            type="radio"
            name="priceTrial"
            value="Silver"
            checked={packages === "Silver" ? true : false}
            onChange={changepack}
          />{" "}
          Silver
        </label>

        <label className="text-red-700 text-[1rem]" style={{fontWeight: '700'}}>
          <input
            type="radio"
            name="priceTrial"
            value="Gold"
            checked={packages === "Gold" ? true : false}
            onChange={changepack}
          />{" "}
          Gold
        </label>

        <label className="text-red-700 text-[1rem]" style={{fontWeight: '700'}}>
          <input
            type="radio"
            name="priceTrial"
            value="Diamond"
            checked={packages === "Diamond" ? true : false}
            onChange={changepack}
          />{" "}
          Diamond
        </label>
      </div>
      <div className="bg-[#d15d4ea9] w-[95%] my-2">
        <p className="my-1 text-[1rem] text-center text-white" style={{ fontWeight: '500' }}>
          Extra special offer! <br />
         Diamond plan for the price of gold for life
        </p>
      </div>
      
      <div className="flex justify-center items-center gap-4 fontGeneral py-2 border-2 mb-5 w-[95%] md:justify-around">
        <label>
          <input
            type="radio"
            name="period"
            value="Monthly"
            checked={period === "Monthly" ? true : false}
            onChange={changePeriod}
          />{" "}
          Monthly
        </label>
        <label>
          <input
            type="radio"
            name="period"
            value="Quarterly"
            checked={period === "Quarterly" ? true : false}
            onChange={changePeriod}
          />{" "}
          Quarterly
        </label>
        <label>
          <input
            type="radio"
            name="period"
            value="Annually"
            checked={period === "Annually" ? true : false}
            onChange={changePeriod}
          />{" "}
          Annually
        </label>
      </div>
      {period !== 0 && (
        <div>
          <p className="fontGeneral mt-3" style={{textAlign: 'center'}}>
            Your 1st payment of <span className="colorPrimary font-semibold">&#163;{total}</span>
              {" "}will be due on <br /><span style={{fontSize:'1.2rem'}}>{prize.date}</span> 
            
          </p>
          <p className="fontGeneral mb-5" style={{textAlign: 'center'}}>
            Cancel at anytime by email to{" "}
            <span className="colorSecondary">
              admin@proactivmarketing.co.uk
            </span>{" "}
          </p>
        </div>
      )}
      <form
        id="form"
        className="w-full flex flex-col px-4 py-4 bg-white relative"
      >
        {/* <label for="FullName" className="fontForm mb-1">
          Full Name *
        </label> */}
        <input
          required={true}
          id="YourName"
          type="text"
          name="fullname"
          onChange={handleChange}
          placeholder="Full Name"
          value={data.fullname}  
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />
        {/* <label for="Business" className="fontForm mb-1">
          Business Name *
        </label> */}
        <input
          required={true}
          id="Business"
          type="text"
          name="businessname"
          placeholder="Business Name"
          onChange={handleChange}          
          value={data.businessname}   
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />
        {/* <label for="Industry" className="fontForm mb-1">
          Industry *
        </label> */}
        <input
          id="Industry"
          type="text"
          name="industry"
          placeholder="*Industry"
          onChange={handleChange}
          value={data.industry}  
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />
        {/* <label for="Phone" className="fontForm mb-1">
          Phone Number *
        </label> */}
        <input
          required={true}
          id="Phone"
          type="text"
          name="number"
          placeholder="Phone Number"
          onChange={handleChange}
          value={data.number}  
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />
        {/* <label for="email" className="fontForm mb-1">
          Email Address *
        </label> */}
        <input
          required={true}
          id="email"
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          value={data.email}  
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />
        {/* <label for="web" className="fontForm mb-1">
          Website Address
        </label> */}
        <input
          id="web"
          type="text"
          name="web"
          placeholder="Website Address"
          onChange={handleChange}
          value={data.web} 
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />
        {/* <label for="Address" className="fontForm mb-1">
          Address *
        </label> */}
        <input
          required={true}
          id="Address"
          type="text"
          name="address"
          placeholder="*Postal Address"
          onChange={handleChange}
          value={data.address} 
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />

        <button type="submit" className="px-4 py-2 buttonsMain" onClick={handleClick} style={{textAlign:'center'}}>
          Watch the short video to learn how to use your free gift!
        </button>
      </form>
    </div>
  );
};

export default SoftwareSubscription;
