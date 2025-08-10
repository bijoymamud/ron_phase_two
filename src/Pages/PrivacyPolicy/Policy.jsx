import { GoDotFill } from 'react-icons/go';

const Policy = () => {
  return (
   <section>
     <div className="relative min-h-[60vh] w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/VpbV0dnP/image-2.png')`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container with Glassmorphism */}
      <div className="relative z-10 flex items-center min-h-screen p-6 md:p-12">
        <div 
          className="container mx-auto rounded-2xl "
        >
          {/* Heading */}
          <div className="text-4xl md:text-5xl font-bold text-white">
          <h1 className='mb-5'>Privacy, policies, and</h1>  <h1>legal information   </h1>       
          </div>

          {/* Description */}
          <p className="text-white/90 text-md mt-10 leading-relaxed">
          At VA, your privacy is our priority. We collect only the necessary personal information you provide and use it solely to fulfill your requests. This page outlines our website’s privacy policy, detailing how we collect, store, use, and share your data. You’ll also find important information about your rights and our compliance with federal regulations and user agreements."
          </p>
        </div>
      </div>
    </div>


    {/* text */}
    <div  className='container mx-auto py-20'>
        <div>
        <h1 className='text-[40px] font-bold'>Information We Collect</h1>
        <p className='text-[20px] font-semibold mb-10 '>Information You Provide to Us</p>
        <ul className='space-y-3'>
          
          <span className='flex items-start gap-2'>
          <GoDotFill size={24} />
          <li >
            
            Contact Information: Name, email address, phone number, and other details you provide through our contact forms or when communicating with us.</li>
          </span>

          <span className='flex items-start gap-2 '>
          <GoDotFill size={24} />
          <li >
          Service Information: Details related to your inquiries or requests for assistance.</li>
          </span>

        </ul>
        </div>

        <div className='mt-20'>
        <h1 className='text-[40px] font-bold'>How We Use Your Information</h1>
        <p className='text-[20px] font-semibold mb-10 '>We use the information we collect for the following purposes:</p>
        <ul className='space-y-3'>
          
          <span className='flex items-start gap-2'>
          <GoDotFill size={24} />
          <li >
          To respond to your inquiries and support requests.</li>
          </span>

          <span className='flex items-start gap-2 '>
          <GoDotFill size={24} />
          <li >
          To personalize your experience on our Site.
          </li>
          </span>

          <span className='flex items-start gap-2 '>
          <GoDotFill size={24} />
          <li >
          To communicate updates, newsletters, or promotional materials (with your consent).
          </li>
          </span>

          <span className='flex items-start gap-2 '>
          <GoDotFill size={24} />
          <li >
          To comply with legal obligations, such as responding to court orders, subpoenas, or legal processes, or to protect our 
          </li>
          </span>

          <span className='flex items-start gap-2 '>
          <GoDotFill size={24} />
          <li >
          To comply with legal obligations, such as responding to court orders, subpoenas, legal processes, to protect our legal rights in cases of fraud, unauthorized access.
          </li>
          </span>

        </ul>
        </div>

        <div className='mt-20'>
        <h1 className='text-[40px] font-bold'>Disclosure of Your Information</h1>
        <ul className='space-y-3 mt-5'>
          
          <span className='flex items-start gap-2'>
          <GoDotFill size={24} />
          <li >
          To respond to your inquiries and support requests.</li>
          </span>

          <span className='flex items-start gap-2 '>
          <GoDotFill size={24} />
          <li >
          To personalize your experience on our Site.
          </li>
          </span>

          <span className='flex items-start gap-2 '>
          <GoDotFill size={24} />
          <li >
          To communicate updates, newsletters, or promotional materials (with your consent).
          </li>
          </span>

          <span className='flex items-start gap-2 '>
          <GoDotFill size={24} />
          <li >
          To comply with legal obligations, such as responding to court orders, subpoenas, or legal processes, or to protect our 
          </li>
          </span>

          <span className='flex items-start gap-2 '>
          <GoDotFill size={24} />
          <li >
          To comply with legal obligations, such as responding to court orders, subpoenas, legal processes, to protect our legal rights in cases of fraud, unauthorized access.
          </li>
          </span>

        </ul>
        </div>
    </div>

   </section>
  );
};

export default Policy;