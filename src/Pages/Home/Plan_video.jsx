import React from 'react'

const Plan_video = () => {
    	const payment_video = "../../../public/payment.mov"

  return (
    <div>


      		<video className="h-2/3 w-2/3 mx-auto md:mb-20" controls>
  <source src={payment_video} type="video/mp4"  />
  Your browser does not support the video tag.
</video>

    </div>
  )
}

export default Plan_video
