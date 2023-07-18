'use client'

import { useEffect, useState } from "react"
import CardsForm from "./CardsForm"

const CardsFree = () => {
  const [calculate, serCalculate] = useState(false)
  const [estimate, setEstimate] = useState({average:'',percentage:100,cards:'',months:''})
  const [percentageField ,setPercentageField] = useState('100%')


  const handleChange = (e) =>{
    setEstimate({...estimate , [e.target.name]:e.target.value})
  }  

  const changePercentage = (e) =>{
    let value = e.target.value

    if( /[^\d%]/.test(value)){
      //COMPROBACION DE QUE SEA SOLO NUMERO O % SIGN
    }else if(value.slice(-1) !== '%' || parseInt(value.replace('%', '')) > 100 || parseInt(value.replace('%', '')) < 0){
      //COMPROBACION DE QUE SE MANTENGA EL % SIGN Y QUE NO SEA NI MAYOR A 100 NI MENOS A 0
    } else{
      setPercentageField(e.target.value)
      setEstimate({...estimate , percentage: parseInt(value.replace('%', ''))})
    }
  }

  const handleClick = (e)=>{
    e.preventDefault()

    if( 
      estimate.average.length == 0 || 
      estimate.percentage.length == 0 || 
      estimate.cards.length == 0 || 
      estimate.months.length == 0 
      ){
        alert('Complete all the fields')
      }else if ( estimate.percentage < 0 || estimate.percentage>100 ) {
        alert('Percentage must be between 1 - 100');
      }  else {
        serCalculate(true)
      }
      
  }

  useEffect(()=>{
    localStorage.setItem('customers', JSON.stringify(estimate.average));
  },[calculate])
  
  return (
    <div className="flex flex-col justify-center items-center pt-3 md:w-[55%]">

      <form id="formulario" className="flex flex-col px-4 pb-8 mx-5 bg-white rounded-lg shadow-md relative">

        {/* <p id="close" className=" absolute top-0 right-0">X</p> */}
        <p className="fontTitle text-center" style={{ fontWeight:'700', color:'#a52a2a' , padding: '5px 0 20px 0'}}>How many referral marketing cards do you need for your business?</p>
        <p style={{color:'#4a6bb6' , padding: "0 0 5px 0" , textAlign:'center', lineHeight: '1', fontSize:'0.8rem'}}>Input the information below to calculate:</p>


        {/* <label for="Average of customers per month" className="fontForm mb-1">
          Average No. of customers per month*
        </label>          */}
        <input
          type="number"
          name="average"
          onChange={handleChange}
          required
          placeholder="Average no. of customers per month"
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput "
        />


        {/* <label for="Percentage of customers going to give the card to" className="fontForm mb-1">
          Percentage of customers going to give the cards to*
        </label>    */}
        <div className="flex justify-between items-center mb-4 rounded-lg border border-gray-300 focusInput ">
            <input
            name="percentage"
            type="text"
            value={percentageField}
            required
            className=" w-full py-2 pl-4 pr-4 rounded-lg focusInput"
            placeholder="% of customers going to give the cards to"
            onChange={changePercentage}
            // style={{borderRight: "0"}}
            />
            {/* <div className="text-center text-2xl">%</div> */}
        </div>

        <label htmlFor="Card to each customer (2 or 3 cards per happy customer recommended)" style={{color:'#4a6bb6' , padding: "0 0 5px 0" , textAlign:'center', lineHeight: '1', fontSize:'0.7rem'}}>
          (We recommend 2 or 3 cards per happy customer)
        </label>   
        <input
          type="number"
          required
          name="cards"
          onChange={handleChange}
          placeholder="No. of cards to each customer? "
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />

        {/* <label for="Number of months supply required" className="fontForm mb-1">
          Number of months supply required*
        </label>   */}
        <input
          type="number"
          required
          name="months"
          onChange={handleChange}
          placeholder="No. of months supply required"
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focusInput"
        />
        <div className="flex justify-center items-center">
          <p className=" fontAlternative" style={{paddingTop: "0"}}>{`Recommended: ${ Math.round((estimate.average * (estimate.percentage/100) * estimate.cards * estimate.months))}`}</p>
        </div>
        <button
          type="submit"
          className="px-4 py-2 buttonsMain"
          onClick={handleClick}
        >
          Calculate Total
        </button>
      </form>

      <span className="w-full  h-1 block"></span> 

      {calculate && <CardsForm estimate={Math.round((estimate.average * (estimate.percentage/100) * estimate.cards * estimate.months))}/>}



    </div>
  )
}

export default CardsFree