import { Link } from 'react-router-dom'

const VaSubcription = () => {
  return (
   <section className='md:min-h-screen min-h-[85vh] bg-white flex flex-col items-center justify-center mx-auto text-center'>
     <div >
      <h1 className='md:w-2/3 mx-auto mb-10 md:text-[40px] px-2 text-[20px] font-semibold text-[#0A3161]'>Thank you for providing this information. To proceed with your VA Benefits Claim, please subscribe now.</h1>
    <Link to="/plan">
    <button type="submit" className="bg-[#B31942] text-white px-6 py-2 rounded">Subscribe Now</button>
    </Link>
    </div>
   </section>
  )
}

export default VaSubcription
