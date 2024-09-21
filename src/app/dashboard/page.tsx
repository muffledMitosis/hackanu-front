import Image from "next/image";

export default function Home() {
  
  const loremText = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi quas unde hic quo rerum ab officia cupiditate sequi eligendi porro consequatur dolore minima, consequuntur esse accusantium eveniet? Earum, dolorum molestias.'

  return (
    <div>
      <h1 className="mx-8 my-8">Dashboard</h1>

      <div className="flex justify-center ">
        <div className="w-1/4">
          <h2>Summary of risks</h2>
          <p className="">{loremText}</p>
        </div>
        <div>
          <h2>Health safety meter</h2>
        </div>
      </div>


      <div className="my-8 flex justify-center">
        <p>Environment Visual</p>
      </div>

      <div className="flex justify-center">
        <div className="w-1/4">
          <h2>Advanced report</h2>
          <p>{loremText}</p>
        </div>

        <div>
          <h2>3D embed</h2>
        </div>
      </div>

    </div>
  );
}
