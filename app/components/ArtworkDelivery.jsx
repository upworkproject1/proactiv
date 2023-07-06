'use client'
import { useRouter } from 'next/navigation';

const ArtworkDelivery = () => {
  const router = useRouter();

  const handleClick = () =>{
    
    router.push('/funnel/cards');
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md h-full w-[90%] mb-4 md:w-[52%]">
      
      <div className="flex flex-col mx-5 my-4 pb-0 items-center relative">

      <p className="fontTitle" style={{fontWeight:'700'}}>Artworks And Delivery Explained</p>

      <video controls className="w-[80vw] rounded-md md:w-[45%]" poster={"https://res.cloudinary.com/dbhtt5ozr/image/upload/v1686088520/imagenposter_ut847d.png"}>
        <source src={'https://res.cloudinary.com/dbhtt5ozr/video/upload/v1686066069/VIDEO_3_FINAL_v3_wau6e4.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
        <button className="px-4 py-2 buttonsMain m-5" onClick={handleClick}>
          Get Your Free Cards!
        </button>

      </div>
                
    </div>
  )
}

export default ArtworkDelivery