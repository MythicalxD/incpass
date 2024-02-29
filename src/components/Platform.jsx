import React from 'react'
// import { IoIosArrowForward } from "react-icons/io";
import { FaPlay } from "react-icons/fa";



function Platform() {
    return (<>

        <div class="container text-center boxHeader03 mt-5">

            <div className="platformHeader">

                <span>ALL-IN-ONE PLATFORM</span>
                <h2>Join Over 100,000 Businesses that Trust Incpass</h2>
                <p className='incPara'>Your business’s one-stop destination. From business registration to office acquisition and seamless payment management, trust Incpass to empower your company’s success with seamless efficiency.

                </p>

                <div class="row row-cols-1 row-cols-md-3 g-4 pt-4">
                    <div class="col">
                        <div class="card h-100 h100">

                            <div class="card-body">
                                <h5 className="card-title">New Businesses</h5>
                                <p className="card-text">IncPass offers a complete set of tools for seamless business registration.
</p>
                                {/* <span className='cardSpan'>Learn More <IoIosArrowForward /></span> */}
                            </div>
                            <img src="/img/f1.png" class="card-img-top" alt="..." />
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100 h100">
                            <div class="card-body">
                                <h5 className="card-title">Residency Options</h5>
                                <p className="card-text">Efficiently register your business, tailored to your residency status—whether resident or non-resident.


                                </p>
                                {/* <span className='cardSpan'>Learn More <IoIosArrowForward />
 </span> */}
                            </div>
                            <img src="/img/f2.png" class="card-img-top" alt="..." />
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100 h100">
                            <div class="card-body">
                                <h5 className="card-title">Automated</h5>
                                <p className="card-text">Streamline your entrepreneurial journey with our automated registration system. Register your business effortlessly, anytime, anywhere.</p>
                                {/* <span className='cardSpan'>Learn More <IoIosArrowForward />
</span> */}
                            </div>
                            <img src="/img/f3.png" class="card-img-top" alt="..." />
                        </div>
                    </div>

                </div>


            </div>


            <div className="card mb-3 incvideo">
      <div className="row g-0">
        <div className="col-12 col-md-4 order-md-1 ">
          <img src="/img/video.png" className="img-fluid rounded-start incvideoImg" alt="..." />
        </div>
        <div className="col-12 col-md-8 order-md-2 ">
          <div className="d-flex align-items-center v1" >
            <div className="text-start">
              <h4>Discover How Ownr Can Launch and Grow Your Business Today</h4>
              <a href='https://youtu.be/0bMYXeSEYuc?si=ZzgmoVMnh4bScyM-'><span> Watch Video </span><FaPlay /></a>

            </div>
          </div>
        </div>
      </div>
    </div>


        </div>






    </>






    )
}

export default Platform