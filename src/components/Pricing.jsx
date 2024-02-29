import React from 'react'
import { NavLink } from 'react-router-dom'

function Pricing() {
    return (<>


        <div style={{ backgroundColor: "#1d233b" }}>


            <div class="container boxHeader">



                <div className="row price-box-1">



                    <div className="col">

                        <span style={{ color: 'white' }}>PRICING</span>
                        <h3 style={{ color: 'white', fontSize: '54px' }}>Start Your Business for Less</h3>
                        <NavLink to='/pricedata'> <button type="button" class="btn btn-light incHeaderBtnprice" style={{fontWeight:"800"}}>Get Started</button></NavLink>

                    </div>


                    <div className="col" >

                        <div className="row">

                            <div className="col priceMove-1" >

                                <div class="card dfAhbD">

                                    <div class=" text-center">
                                        <h5 className="card-title price04" style={{ fontSize: '56px' }}><span style={{ fontSize: '30px', color: "#918ea2" }}>$</span> 599 <span style={{ fontSize: '24px', color: "#918ea2" }}>CAD</span></h5>
                                        <p className=" priceText">Incorporation</p>
                                        <span className="badge text-bg-danger">ONE-TIME FEE</span>
                                        <p className='LearnText'>Learn More </p>
                                    </div>

                                </div>

                            </div>

                            <div className="col priceMove-2" >

                                <div class="card dfAhbD dbs">

                                    <div class="card-body text-center">
                                        <h5 className="card-title price04" style={{ fontSize: '56px' }}><span style={{ fontSize: '30px', color: "#918ea2" }}>$</span> 699 <span style={{ fontSize: '24px', color: "#918ea2" }}>CAD</span></h5>
                                        <p className=" priceText">Managed Incorporation</p>
                                        <span class="badge text-bg-danger">ONE-TIME FEE</span>
                                        <p className='LearnText'>Learn More </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>





                </div>

            </div>



        </div>
        


    </>

    )
}

export default Pricing