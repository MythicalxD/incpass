import React from 'react';
import { NavLink } from 'react-router-dom';

function PriceBox() {
  return (
    <>
      <div className="header-container">
        <div className="header-content">
          <h1 className="main-heading">Let's Get Started</h1>
          <p className="sub-heading">Welcome, get your business going in just a few clicks.</p>

          <div className="card-container pricebox-1">
            {/* Resident Card */}
            <NavLink to="/resident" className="card">
              <div className="card-content pricebox-2">
                <h3 className="card-title">Resident</h3>
                <p className="card-description"> Register your company with the relevant province without going through the KYC and legalization procedure.</p>

                <button type="button" class="btn btn-dark btn-lg">Start With</button>


                <p className="card-price"> <span style={{ fontSize: '30px', color: "#565658" }}>$</span> 499 <span style={{ fontSize: '24px', color: "#565658" }}>CAD</span></p>

              </div>
            </NavLink>

            {/* Non-Resident Card */}
            <NavLink to="/non-resident" className="card">
              <div className="card-content pricebox-2">
                <h3 className="card-title">Non-Resident</h3>
                <p className="card-description">Unlock Canada's business potential for non-residents with tax incentives, and a balanced cost of living.</p>

                <button type="button" class="btn btn-dark btn-lg">Start With</button>


                <p className="card-price"><span style={{ fontSize: '30px', color: "#565658" }}>$</span> 1199 <span style={{ fontSize: '24px', color: "#565658" }}>CAD</span></p>


              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default PriceBox;
