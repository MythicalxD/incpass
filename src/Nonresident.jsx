import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { PiCaretDoubleRightDuotone } from "react-icons/pi";


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './Resident.css'; // Add a separate CSS file for styling



const Nonresident = () => {
    const [step, setStep] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedShareholder, setSelectedShareholder] = useState('');
    const [selectedOffice, setSelectedOffice] = useState('');
    const [selectedIncorporationType, setSelectedIncorporationType] = useState('');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('stripe'); // Default to 'stripe'
    const [selectedIsCorporateShareholder, setSelectedIsCorporateShareholder] = useState('no');
    const [selectedIsSameDirector, setSelectedIsSameDirector] = useState('yes');
    const [numberOfDirectors, setNumberOfDirectors] = useState(0);
    const [agentServiceFee, setAgentServiceFee] = useState(0);
    // Add these state variables
    const [selectedGSTHST, setSelectedGSTHST] = useState(false);
    const [selectedAnnualCompliance, setSelectedAnnualCompliance] = useState(false);

    // New state for minute book
    const [selectedMinuteBookOption, setSelectedMinuteBookOption] = useState('');






    // ... rest of your component


    // const [notary, setNotary] = useState(0);
    const [price, setPrice] = useState(0);

    const handlePayment = async (token) => {
        // Send the payment details to your server for processing
        const response = await fetch('/process-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                price,
            }),
        });

        const result = await response.json();

        // Handle the result as needed
        console.log(result);
    };

    const handleNext = () => {
        if (step < 7) {
            setStep(step + 1);
        } else {
            // If it's the final step, trigger the Stripe payment
            document.getElementById('stripe-checkout-btn').click();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        updatePrice(event.target.value, selectedShareholder, selectedOffice, selectedIncorporationType);
    };

    const handleShareholderChange = (event) => {
        setSelectedShareholder(event.target.value);
        updatePrice(selectedCountry, event.target.value, selectedOffice, selectedIncorporationType);
    };

    const handleOfficeChange = (event) => {
        setSelectedOffice(event.target.value);
        updatePrice(selectedCountry, selectedShareholder, event.target.value, selectedIncorporationType);
    };

    const handleofficeprocess = (event) => {
        setSelectedIncorporationType(event.target.value);
        updatePrice(selectedCountry, selectedShareholder, selectedOffice, event.target.value);
    };



    const handleCardClick = (countryValue) => {
        setSelectedCountry(countryValue);
        updatePrice(countryValue, selectedShareholder, selectedOffice, selectedIncorporationType);
    };

    // Function to handle card click in step 3
    const handleOfficeCardClick = (officeValue) => {
        setSelectedOffice(officeValue);
        updatePrice(selectedCountry, selectedShareholder, officeValue, selectedIncorporationType);
    };

    // Function to handle card click in step 4
    const handleIncorporationTypeCardClick = (typeValue) => {
        setSelectedIncorporationType(typeValue);
        updatePrice(selectedCountry, selectedShareholder, selectedOffice, typeValue, selectedIsSameDirector);
    };

    // Function to handle card click in step 5
    const handlePaymentOptionCardClick = (optionValue) => {
        setSelectedPaymentOption(optionValue);
        // Optionally, you can perform any other actions based on the selected payment option
    };


    const handleIsCorporateShareholderChange = (event) => {
        setSelectedIsCorporateShareholder(event.target.value);
        // Reset director-related options when changing corporate shareholder status
        setSelectedIsSameDirector('yes');
    };

    const handleIsSameDirectorChange = (event) => {
        setSelectedIsSameDirector(event.target.value);
        updatePrice(selectedCountry, selectedShareholder, selectedOffice, selectedIncorporationType, event.target.value);
    };




    // New step for minute book
    const handleMinuteBookOptionCardClick = (optionValue) => {
        setSelectedMinuteBookOption(optionValue);
        updatePrice(selectedCountry, selectedShareholder, selectedOffice, selectedIncorporationType, selectedIsSameDirector, optionValue);
    };

    // New function to handle minute book option change
    const handleMinuteBookOptionChange = (event) => {
        setSelectedMinuteBookOption(event.target.value);
        updatePrice(selectedCountry, selectedShareholder, selectedOffice, selectedIncorporationType, selectedIsSameDirector, event.target.value);
    };



    // Replace the incorrect 'elseif' with 'else if' in the updatePrice function
    const updatePrice = (country, shareholder, office, incorporationType, isSameDirector, minuteBookOption) => {
        let basePrice;
        if (parseInt(country, 10) === 1) {
            basePrice = 1499;
        } else if (parseInt(country, 10) === 2) {
            basePrice = 1499;
        } else if (parseInt(country, 10) === 3) {
            basePrice = 1499;
        } else {
            basePrice = 1499;
        }

        let calculatePrice = basePrice += parseInt(350 * shareholder, 10);

        if (parseInt(country, 10) === 3) {
            setAgentServiceFee(800);




        } else {
            setAgentServiceFee(0);



        }

        calculatePrice += agentServiceFee;


        if (parseInt(incorporationType, 10) === 1) {
            calculatePrice += 99; // Standard Incorporation
        } else if (parseInt(incorporationType, 10) === 2) {
            calculatePrice += 399; // Rush Incorporation
        }

        if (parseInt(country, 10) && office === "1") {
            calculatePrice += 1200;
        } else if (parseInt(country, 10) && office === "2") {
            calculatePrice += 0;
        }

        if (selectedIsCorporateShareholder === 'yes' && isSameDirector === 'no') {
            const directorsCount = numberOfDirectors > 0 ? numberOfDirectors : 0;
            calculatePrice += 350 * directorsCount;
        }

        if (selectedGSTHST) {
            calculatePrice += 450;
        }

        if (selectedAnnualCompliance) {
            calculatePrice += 690;
        }


        // Add pricing for minute book option
        if (minuteBookOption === "directorConsent") {
            calculatePrice += 399;
        }

        setPrice(calculatePrice);
    };



    return (



        <div className="containerPriceBox">

            <div className="step-indicator">
                <div className={`step ${step >= 1 ? 'active' : ''}`}></div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}></div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}></div>
                <div className={`step ${step >= 4 ? 'active' : ''}`}></div>
                <div className={`step ${step >= 5 ? 'active' : ''}`}></div>
                <div className={`step ${step >= 6 ? 'active' : ''}`}></div>
                <div className={`step ${step === 7 ? 'active' : ''}`}></div>
            </div>
            {/* <div className="title">On-Demand International</div> */}

            {step === 1 && (
                <div className="countryBox">
                    {/* ... */}

                    <div className="priceBoxTitle">
                        <h2>Please Select your province</h2>
                        <p className='priceBoxPara'> Confirm where your business is located.</p>
                    </div>

                    <div className="province ">
                        <div className="col">
                            <div className="card-group">
                                {/* Card for Ontario */}
                                <div className="card provinceCard" onClick={() => handleCardClick("1")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title pricehead">Ontario</h5>
                                        <p className="card-price"><button type="button" class="btn btn-dark">Start With </button>
                                            <span style={{ fontSize: '30px', color: "#565658" }}> $</span> 1499 <span style={{ fontSize: '24px', color: "#565658" }}>CAD</span></p>

                                        <p className="card-text mt-3">


                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Preparation of the Articles of Incorporation</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Filing of the Articles</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Name Search</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Government Filing Fee</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Certificate of Incorporation</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Business Identification Number (BIN) Registration</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Introduction to Canadian Local Banks</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Nuans Certification</p>

                                        </p>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="country"
                                                value="1"
                                                checked={selectedCountry === "1"}
                                                onChange={handleCountryChange}
                                            />

                                        </label>
                                    </div>
                                </div>

                                {/* Card for British Columbia */}
                                <div className="card provinceCard" onClick={() => handleCardClick("2")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title pricehead">British Columbia</h5>
                                        <p className="card-price"><button type="button" class="btn btn-dark">Start With </button>
                                            <span style={{ fontSize: '30px', color: "#565658" }}> $</span> 1499 <span style={{ fontSize: '24px', color: "#565658" }}>CAD</span></p>
                                        <p className="card-text">


                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Preparation of the Articles of Incorporation</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Filing of the Articles</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Name Search</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Government Filing Fee</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Certificate of Incorporation</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Business Identification Number (BIN) Registration</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Introduction to Canadian Local Banks</p>




                                        </p>
                                        <div className="text-center">
                                            <label className="radio-label ">
                                                <input
                                                    type="radio"
                                                    name="country"
                                                    value="2"
                                                    checked={selectedCountry === "2"}
                                                    onChange={handleCountryChange}
                                                />

                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Card for Alberta */}
                                <div className="card provinceCard" onClick={() => handleCardClick("3")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title pricehead">Alberta</h5>
                                        <p className="card-price"><button type="button" class="btn btn-dark">Start With </button>
                                            <span style={{ fontSize: '30px', color: "#565658" }}> $</span> 1499 <span style={{ fontSize: '24px', color: "#565658" }}>CAD</span></p>
                                        <p className="card-text">



                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Preparation of the Articles of Incorporation</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Filing of the Articles</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Name Search</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Government Filing Fee</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Certificate of Incorporation</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Business Identification Number (BIN) Registration</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Introduction to Canadian Local Banks</p>

                                        </p>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="country"
                                                value="3"
                                                checked={selectedCountry === "3"}
                                                onChange={handleCountryChange}
                                            />

                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}




            {step === 2 && (
                <div className="countryBox">
                    <div className="priceBoxTitle">
                        <h2>Corporate Minute Book</h2>
                        <p className="priceBoxPara">Select an option for minute book:</p>
                    </div>
                    <div className="province row">
                        <div className="col">
                            <div className="card-group">
                                {/* Card for Director Consent */}
                                <div className="card provinceCard" onClick={() => handleMinuteBookOptionCardClick("directorConsent")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title pricehead">Essential Startup Document (Electronic Copy) <span class="badge text-bg-dark">Recommended</span></h5>
                                        <p className="card-text">

                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Subscription For Shares</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                Director Consent</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                               First Director Resolution</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                                By-Laws</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                               Notice of Articles</p>
                                            <p><PiCaretDoubleRightDuotone style={{ fontSize: '1.4rem', marginRight: "0.4rem" }} />
                                               Director Consent</p>
                                        




                                        </p>
                                        <p className="card-price">
                                            <span style={{ fontSize: '30px', color: "#565658" }}>$</span>399<span style={{ fontSize: '24px', color: "#565658" }}>CAD</span>
                                        </p>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="minuteBookOption" id="directorConsent" value="directorConsent" checked={selectedMinuteBookOption === "directorConsent"} onChange={handleMinuteBookOptionChange} />
                                            <label className="form-check-label" htmlFor="directorConsent">Select</label>
                                        </div>
                                    </div>
                                </div>
                                {/* Card for None */}
                                {/* <div className="card provinceCard" onClick={() => handleMinuteBookOptionCardClick("none")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title pricehead">None</h5>
                                        <p className="card-text">Description or additional information about None.</p>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="minuteBookOption" id="none" value="none" checked={selectedMinuteBookOption === "none"} onChange={handleMinuteBookOptionChange} />
                                            <label className="form-check-label" htmlFor="none">Select</label>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}











{/* {step === 3 && (
                <div className="countryBox step2-container">
                    <div className="step2-title">How many shareholders?</div>
                    <div className="step2-description">
                        Choose the number of shareholders and specify if the shareholder is a corporation.
                    </div>

                    <div className="province row step2-form">
                        <label htmlFor="shareholderNumber" className="step2-form-label">Number of Shareholders:</label>
                        <input
                            type="number"
                            id="shareholderNumber"
                            value={selectedShareholder}
                            onChange={(e) => handleShareholderChange(e)}
                            className="step2-form-input"
                        /> */}




{step === 3 && (
        <div className="countryBox step2-container">
          <div className="step2-title">How many shareholders?</div>
          <div className="step2-description">
            Choose the number of shareholders and specify if the shareholder is a corporation.
          </div>
          <div className="province row step2-form">
            <label htmlFor="shareholderNumber" className="step2-form-label m-4">
              Number of Shareholders:
            </label>
            <p>A director/shareholder of a Canadian corporation needs to provide identification documents for a background check.</p>
            <div className="shareholder-options-box card-group">
              {[1, 2, 3, 4].map((option) => (
                <div key={option} className={`card provinceCard card-body priceboxing shareholder-option-box ${selectedShareholder === option ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    id={`shareholderOption${option}`}
                    name="shareholderNumber"
                    value={option}
                    checked={parseInt(selectedShareholder, 10) === option}
                    onChange={(e) => handleShareholderChange(e)}
                    className="step2-form-input  "
                  />
                  <label htmlFor={`shareholderOption${option}`} className="shareholder-label-box">
                    {option}
                  </label>
                </div>
              ))}
            </div>

                        <label htmlFor="isCorporateShareholder" className="step2-form-label m-5">Is Shareholder Corporate?</label>
                        <p>If the shareholder of a Canadian corporation is another corporate entity, additional documents such as the incorporation certification and articles of incorporation need to be legally verified.</p>
                        <select
                            id="isCorporateShareholder"
                            value={selectedIsCorporateShareholder}
                            onChange={(e) => handleIsCorporateShareholderChange(e)}
                            className="step2-form-select"
                        >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>

                        {selectedIsCorporateShareholder === "yes" && (
                            <div className='directorBox'>
                                <label htmlFor="isSameDirector" className="step2-form-label">Is Director Same as Shareholder?</label>
                               
                                <select
                                    id="isSameDirector"
                                    value={selectedIsSameDirector}
                                    onChange={(e) => handleIsSameDirectorChange(e)}
                                    className="step2-form-select"
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>

                                {selectedIsSameDirector === 'no' && (
                                    <>
                                        <label htmlFor="numberOfDirectors" className="step2-form-label">Number of Directors:</label>
                                        <input
                                            type="number"
                                            id="numberOfDirectors"
                                            value={numberOfDirectors}
                                            onChange={(e) => setNumberOfDirectors(parseInt(e.target.value) || 0)}
                                            className="step2-form-input"
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {step === 4 && (
                <div className="countryBox">


                    <div className='priceBoxTitle'>
                        <h2>Please select the months for your office address?</h2>
                        <p className='priceBoxPara'></p>
                    </div>

                    <div className="province row">

                        <div className="col">
                            <div className="card-group">


                                {/* Card for 12 Months */}
                                <div className="card provinceCard" onClick={() => handleOfficeCardClick("1")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title pricehead">12 Months</h5>
                                        <p className="card-text">A virtual office utilizes a physical location that receives mail for you and can serve as an official business address for your company. It allows you to have a physical presence in any city without the bloated costs of office space rentals.</p>

                                        <p className="card-price">
                                            <span style={{ fontSize: '30px', color: "#565658" }}> $</span> 1200 <span style={{ fontSize: '24px', color: "#565658" }}>CAD</span></p>


                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="office"
                                                id="office12Months"
                                                value="1"
                                                checked={selectedOffice === "1"}
                                                onChange={handleOfficeChange}
                                            />
                                            <label className="form-check-label " htmlFor="office12Months">
                                                Select
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Card for None */}
                                <div className="card provinceCard" onClick={() => handleOfficeCardClick("3")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title pricehead">None</h5>
                                        <p className="card-text">Description or additional information about None.</p>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="office"
                                                id="officeNone"
                                                value="3"
                                                checked={selectedOffice === "3"}
                                                onChange={handleOfficeChange}
                                            />
                                            <label className="form-check-label" htmlFor="officeNone">
                                                Select
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 5 && (
                <div className="countryBox">


                    <div className='priceBoxTitle'>
                        <h2>Selecting the Appropriate Incorporation Type</h2>
                        <p className='priceBoxPara'></p>
                    </div>

                    <div className="province row">

                        <div className="col">
                            <div className="card-group">
                                {/* Card for Standard Incorporation */}
                                <div className="card provinceCard" onClick={() => handleIncorporationTypeCardClick("1")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title pricehead">Standard Incorporation</h5>
                                        <p className="card-text">The standard timeline for incorporating a company spans approximately 25 working days. </p>
                                        <p className="card-price">
                                            <span style={{ fontSize: '30px', color: "#565658" }}> $</span> 99 <span style={{ fontSize: '24px', color: "#565658" }}>CAD</span></p>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="incorporationType"
                                                id="standardIncorporation"
                                                value="1"
                                                checked={selectedIncorporationType === "1"}
                                                onChange={handleofficeprocess}
                                            />
                                            <label className="form-check-label" htmlFor="standardIncorporation">
                                                Select
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Card for Rush Incorporation */}
                                <div className="card provinceCard" onClick={() => handleIncorporationTypeCardClick("2")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title pricehead">Rush Incorporation</h5>
                                        <p className="card-text">the standard timeline for incorporating a company spans approximately 7-10 working days. </p>
                                        <p className="card-price">
                                            <span style={{ fontSize: '30px', color: "#565658" }}> $</span> 399 <span style={{ fontSize: '24px', color: "#565658" }}>CAD</span></p>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="incorporationType"
                                                id="rushIncorporation"
                                                value="2"
                                                checked={selectedIncorporationType === "2"}
                                                onChange={handleofficeprocess}
                                            />
                                            <label className="form-check-label" htmlFor="rushIncorporation">
                                                Select
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            {/* // Additional Step 4 for Alberta: Agent Service Fee */}
            {step === 5 && selectedCountry === '3' && (
                <div className="countryBox">
                    <div className='priceBoxTitle'>
                        <h2>Agent Service Fee*</h2>

                        <p className="card-price priceBoxPara">
                            <span style={{ fontSize: '30px', color: "#565658" }}> $</span> {agentServiceFee} <span style={{ fontSize: '24px', color: "#565658" }}>CAD</span></p>

                        <p>A local attorney or agent for service is designed for incorporating a corporation, extra-provincial registration, business set up in Canada by non-residents and other corporate filing purposes. The attorney or agent must be located locally (within the geographical boundary of the designated province). Failure to appoint a local attorney or agent may result rejection of a new registration and dissolution of an existing corporation.</p>
                    </div>
                    {/* Add any additional content or description for the agent service fee step */}
                </div>
            )}



            {step === 6 && (
                <div className="countryBox">
                    <div className="priceBoxTitle">
                        <h2>Last Step ...</h2>
                        <p className="priceBoxPara">Select post-incorporation options:</p>
                    </div>
                    <div className="postIncorporationOptions">

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="annualComplianceCheckbox"
                                checked={selectedAnnualCompliance}
                                onChange={() => setSelectedAnnualCompliance(!selectedAnnualCompliance)}
                            />
                            <label className="form-check-label h109" htmlFor="annualComplianceCheckbox">
                                Annual Compliance ($690 CAD) <span class="badge text-bg-dark">Recommended</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}








            {step === 7 && (
                <div className="countryBox">


                    <div className='priceBoxTitle'>
                        <h2>Pay Now</h2>
                        <p className='priceBoxPara'>Total Price: ${price} </p>
                    </div>

                    <div className="province row">
                        <div className="col priceBoxHeading"><p></p></div>
                        <div className="col">
                            <div className="card-group">
                                {/* Card for Stripe */}
                                {/* <div className="card provinceCard" onClick={() => handlePaymentOptionCardClick("stripe")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title">Stripe</h5>
                                        <p className="card-text">Description or additional information about Stripe payment.</p>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentOption"
                                                id="stripePayment"
                                                value="stripe"
                                                checked={selectedPaymentOption === "stripe"}
                                                onChange={() => setSelectedPaymentOption("stripe")}
                                            />
                                            <label className="form-check-label" htmlFor="stripePayment">
                                                Select
                                            </label>
                                        </div>
                                    </div>
                                </div> */}

                                {/* Card for PayPal or other payment options */}
                                {/* <div className="card provinceCard" onClick={() => handlePaymentOptionCardClick("paypal")}>
                                    <div className="card-body priceboxing">
                                        <h5 className="card-title">PayPal (or Other)</h5>
                                        <p className="card-text">Description or additional information about PayPal payment.</p>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentOption"
                                                id="paypalPayment"
                                                value="paypal"
                                                checked={selectedPaymentOption === "paypal"}
                                                onChange={() => setSelectedPaymentOption("paypal")}
                                            />
                                            <label className="form-check-label" htmlFor="paypalPayment">
                                                Select
                                            </label>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Stripe Checkout component */}
                    {selectedPaymentOption === 'stripe' && (
                        <StripeCheckout
                            stripeKey="pk_test_51J6TOJDyOVzZxe5dtOFHL6ztQAk8YtSJCnxjA1lMsnCrNtcppzC5xPe9il5PTKfWaGP2gVsv5rUlPtk43tjuqJEN00ySurYRd7"
                            token={handlePayment}
                            amount={price * 100} // Amount in cents
                            name="Your Company Name"
                            description="Service Description"
                            currency="CAD"
                        >
                            <button id="stripe-checkout-btn" style={{ display: 'none' }}></button>
                        </StripeCheckout>
                    )}

                    {/* Add similar logic for other payment options if needed */}
                </div>
            )}

            <div className="button-container">
                {step !== 1 && (
                    <button className={`btn btn-dark flowBtnBack ${step === 1 ? 'hidden' : ''}`} onClick={handleBack}>
                        Back
                    </button>
                )}
                <button className={`btn btn-dark flowBtn ${step === 6 ? 'hidden' : ''}`} onClick={handleNext}>
                    {step < 7 ? 'Next' : 'Pay'}
                </button>
            </div>



            {/* Total Price */}
            <div className="total-price-section main-price">
                <p className='main-price-paragraph'> Total Price:
                    <span style={{ fontSize: '30px', color: "#565658" }}> $</span><span style={{ fontSize: '44px', color: "#565658" }}> {price} </span><span style={{ fontSize: '24px', color: "#565658" }}>CAD</span>
                </p>
            </div>

        </div>
    );
};

export default Nonresident;


