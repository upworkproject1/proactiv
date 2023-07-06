'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

const Checkout = () => {
    const [softwaredata, setSoftwaredata] = useState('');
    const [cardsdata, setCardsdata] = useState('');
    const [keyfobdata, setKeyfobdata] = useState('')
    const [cTotal, setCtotal] = useState('')
    const [kfTotal, setKftotal] = useState('')
    const [srTotal, setSrtotal] = useState('')
    const [deposit, setDeposit] = useState((parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal)))

    const router = useRouter();

    useEffect(()=>{
        let storageSoft = JSON.parse(localStorage.getItem('software'));
        let storageCards = JSON.parse(localStorage.getItem('cardsdata'));
        let storageKeyfobs = JSON.parse(localStorage.getItem('keyfobs'));

        setSoftwaredata(storageSoft)
        setCardsdata(storageCards)
        setKeyfobdata(storageKeyfobs)

        // if(averagecustomers != ''){
        //     setCustomers( parseInt(averagecustomers))
        // }

    },[])    


    useEffect(()=>{
        if(cardsdata != ''){
            if(cardsdata.option == 'full payment'){
                setCtotal(cardsdata.totaldue.toFixed(2).replace(',', '.'))
            } else{
                setCtotal(cardsdata.payment.toFixed(2).replace(',', '.'))
            }
        }
    },[cardsdata])

    useEffect(()=>{

        if(keyfobdata != ''){
            setKftotal(((keyfobdata.customers * keyfobdata.price) * 0.5).toFixed(2).replace(',', '.') )

            if(keyfobdata.addrings == 'No'){
                setSrtotal('0.00')
            } else {
                setSrtotal((Math.ceil(keyfobdata.customers/100) * (6 * 0.5)).toFixed(2).replace(',', '.'))
            }

        }

    },[keyfobdata])

    useEffect(()=>{
      setDeposit((parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal)))
    },[cTotal,kfTotal,srTotal])


    const handleDeposit = (e)=>{
      setDeposit(e.target.value)
    }

    const handleClick = (e) =>{
        e.preventDefault()
        
        router.push('/funnel/thanks');

        // if( customers < 0 ){
        //     alert('Invalid number')
        // } else{    
          
        //   localStorage.setItem('keyfobs', JSON.stringify({customers: customers, price: price, addrings: optionsyes}));
          
        //   router.push('/funnel/order');
        // }        

    }



  return (
    <div className="flex flex-col w-[95%] my-4 py-5 items-center bg-white rounded-lg shadow-md relative h-full md:w-[52%]">


      <p className="fontTitle text-center" style={{ fontWeight:'700', color:'#a52a2a' , padding: '5px 0 20px 0'}}>Checkout</p>
      <p className="fontSubTitle text-center" style={{fontSize: '1.5rem', fontWeight: '700', color: '#4a6bb6', lineHeight:'1.2' , paddingBottom: '0.5rem'}}>Order summary</p>
      <table className="w-[95%] border rounded-lg">
        <thead>
          <tr className="border-b bg-[#7a94b3]">
            <th className="resize-text py-1 px-2 w-[75%] text-white" style={{fontWeight:'700'}}>Description</th>
            <th className="resize-text py-1 px-2 w-[25%] text-white" style={{fontWeight:'700'}}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-[#ffffff]">
            <td className="resize-text py-1 px-2">
              Referral Marketing Cards
                {/* Software Subscription 
                <br /> {softwaredata.description} */}

            </td>
            <td className="resize-text py-1 px-2">FREE</td>
          </tr>
          <tr className="border-b bg-[#96cfd1]">
            <td className="resize-text py-1 px-2">
                { cardsdata.needed } Additional Cards <br /> ( {cardsdata.option} ) <br />
                {/* (100 free cards + { cardsdata.needed }) */}
            </td>
            <td className="resize-text py-1 px-2">&#163; {cTotal} </td>
          </tr>
          <tr className="border-b bg-[#ffffff]">
            <td className="resize-text py-1 px-2">
                {keyfobdata.customers} Keyfobs
            </td>
            <td className="resize-text py-1 px-2">&#163; { kfTotal }</td>
          </tr>
          <tr className="border-b bg-[#96cfd1]">
            <td className="resize-text py-1 px-2">
                { keyfobdata.addrings == 'No' ? 0 : keyfobdata.customers} Split Rings
            </td>
            <td className="resize-text py-1 px-2">&#163; { srTotal } </td>
          </tr>

        </tbody>
      </table>

      <div className='w-[95%] flex items-center pt-3'>
        <p className="fontTitle  w-[80%]" style={{ fontWeight:'700', color:'black' , margin: '3px 0 4px 0', fontSize:'1rem' , padding: '0 0 0 0', textAlign:'end'}}>Total:</p>
        <p className="fontTitle text-center w-[20%]" style={{ fontWeight:'700', color:'black' , margin: '3px 0 4px 0', fontSize:'1rem', padding: '0 0 0 0'}}>&#163;{ (parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal)).toFixed(2).replace(',', '.') }</p>
      </div>

      <div className='w-[95%] flex items-center pt-3'>
        <p className="fontTitle w-[80%]" style={{ fontWeight:'700', color:'black' , margin: '3px 0 4px 0', fontSize:'0.8rem', padding: ' 0 5px 0 0', textAlign:'end'}}>Deposit (today):</p>
        {/* <p className="fontTitle text-center" style={{ fontWeight:'700', color:'black' , margin: '5px 0 10px 0'}}>&#163;{ (parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal)).toFixed(2).replace(',', '.') }</p> */}
        <input 
          type="number"
          name='deposit'
          value={deposit}
          onChange={handleDeposit}
          className="font-bold w-[20%] h-fit px-1 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className='w-[95%] flex items-center pt-3'>
        <p className="fontTitle w-[80%]" style={{ fontWeight:'700', color:'black' , margin: '3px 0 4px 0', fontSize:'0.8rem', padding: ' 0 5px 0 0', textAlign:'end'}}>Balance Due (before despatch):</p>
        {/* <p className="fontTitle text-center" style={{ fontWeight:'700', color:'black' , margin: '5px 0 10px 0'}}>&#163;{ (parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal)).toFixed(2).replace(',', '.') }</p> */}
        <input 
          type="number"
          value={(parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal))-deposit}
          className="font-bold w-[20%] h-fit px-1 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>


        {/* PAYMENT METHOD */}

        <p className="fontSubTitle text-center" style={{fontSize: '1.5rem', fontWeight: '700', color: '#4a6bb6', lineHeight:'1.2' , paddingBottom: '0.5rem'}}>Payment method</p>

        <label htmlFor="card" className="fontForm mb-1 w-[85%] text-left">
          Card number
        </label>      
        <input
            type="number"
            name="card"
            // value={customers}
            required
            // onChange={handleChange}
            placeholder="1234 1234 1234 1234"
            maxLength="12"
            className="w-[85%] px-2 py-2 mb-2 rounded-lg border border-gray-300 focusInput "
        />   

        <label htmlFor="card" className="fontForm mb-1 w-[85%] text-left">
          Expiry
        </label>   
        <div className="w-[85%] px-2 py-2 mb-2 rounded-lg border border-gray-300 focusInput ">
            <input 
            type="number" 
            className='w-[30px] text-center'
            placeholder='MM'
            maxLength="2"
            /> 
            / 
            <input 
            type="number" 
            className='w-[45px] text-center'
            placeholder='YYYY'
            maxLength="4"
            />
        </div>


        <label htmlFor="card" className="fontForm mb-1 w-[85%] text-left">
          CVC
        </label>      
        <input
            type="number"
            name="CVC"
            // value={customers}
            required
            // onChange={handleChange}
            placeholder="CVC"
            maxLength="4"
            className="w-[85%] px-2 py-2 mb-2 rounded-lg border border-gray-300 focusInput "
        />     

        <label htmlFor="country" className="fontForm mb-1 w-[85%] text-left">
          Country
        </label>      
        <input
            type="text"
            name="country"
            // value={customers}
            required
            // onChange={handleChange}
            placeholder="Country"   
            className="w-[85%] px-2 py-2 mb-2 rounded-lg border border-gray-300 focusInput "
        />     


        <button
          type="submit"
          className="px-4 py-2 buttonsMain mt-3"
          onClick={handleClick}
        >
          Continue
        </button>   

    </div>
  )
}

export default Checkout