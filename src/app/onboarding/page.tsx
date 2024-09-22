import HealthSafetyMeter from "@/components/HealthSafetyMeter";
import Image from "next/image";
import { CgAdd } from "react-icons/cg";

import site1 from '../../assets/site1.jpg';
import site2 from '../../assets/site2.jpg';
import { Glow, GlowCapture } from "@codaworks/react-glow";

function SiteButton({imgPath}){
  return (
    <div className="rounded rounded-xl w-52 overflow-hidden cursor-pointer shadow-xl hover:-translate-y-2 transition-transform duration-150 ease-in-out">
      <Image className="h-full" src={imgPath} alt="lol" layout="" objectFit="contain"/>
    </div>
  );
}

export default function Home() {
  
  const loremText = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi quas unde hic quo rerum ab officia cupiditate sequi eligendi porro consequatur dolore minima, consequuntur esse accusantium eveniet? Earum, dolorum molestias.'



  return (
    <GlowCapture className="w-full h-screen">
      <div className="flex justify-center my-4 mb-8">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Welcome, Meth</h1>
      </div>

      <div className="flex flex-row gap-16 mx-12">
        <SiteButton imgPath={site1}/>
        <SiteButton imgPath={site2}/>

				<Glow color="purple" className="hover:-translate-y-2 transition-transform duration-150 ease-in-out">
          <div className="w-52 h-40 border-white border-2 rounded-xl glow:border-purple-500 glow:text-glow/50 cursor-pointer ">
            <CgAdd className="relative inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-4xl"/>
          </div>
        </Glow>

      </div>

      {/* <GlowCapture>
  <span>This won't glow</span>
  <Glow color='purple'>
    <span className='text-white glow:text-glow/50 glow:bg-red-100'>
      This will glow purple when the mouse is passed over
    </span>
  </Glow>
</GlowCapture> */}

    </GlowCapture>
  );
}
