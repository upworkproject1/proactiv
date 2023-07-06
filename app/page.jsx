'use client'



export default function Home() {

  const resetSpin = () => {
    localStorage.setItem('click', JSON.stringify('no'));
  }

  return (
    <div
      id="containerNEW"
      className="flex flex-col justify-center items-start h-auto pt-4 gap-3"
    >

<a className="p-6 font-bold bg-[#ff0000]" href="/funnel"> GO TO FUNNEL</a>

<button className="bg-white text-slate-800" onClick={resetSpin}>Reset Spin</button>






      {/* <ArtworkDelivery />
      <span className="w-full bg-black h-1"></span>      

      <CardsFree/>
      <span className="w-full bg-black h-1"></span>

      <CardsForm />
      <span className="w-full bg-black h-1"></span>

      <RequiredInformation/>
      <span className="w-full bg-black h-1"></span> */}



        





    </div>
  );
}
