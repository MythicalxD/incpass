import React, { useState } from "react";
import { PiCaretDoubleRightDuotone } from "react-icons/pi";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Resident.css"; // Add a separate CSS file for styling

const Nonresident = () => {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedShareholder, setSelectedShareholder] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedIncorporationType, setSelectedIncorporationType] =
    useState("");
  const [selectedIsCorporateShareholder, setSelectedIsCorporateShareholder] =
    useState("no");
  const [selectedIsSameDirector, setSelectedIsSameDirector] = useState("yes");
  const [numberOfDirectors, setNumberOfDirectors] = useState(0);
  const [agentServiceFee, setAgentServiceFee] = useState(0);

  // New state for minute book
  const [selectedMinuteBookOption, setSelectedMinuteBookOption] = useState("");
  const [price, setPrice] = useState(0);

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // If it's the final step, trigger the Stripe payment
      document.getElementById("stripe-checkout-btn").click();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    updatePrice(
      event.target.value,
      selectedShareholder,
      selectedOffice,
      selectedIncorporationType,
      selectedIsSameDirector
    );
  };

  const handleShareholderChange = (event) => {
    setSelectedShareholder(event.target.value);
    updatePrice(
      selectedCountry,
      event.target.value,
      selectedOffice,
      selectedIncorporationType,
      selectedIsSameDirector
    );
  };

  const handleOfficeChange = (event) => {
    setSelectedOffice(event.target.value);
    updatePrice(
      selectedCountry,
      selectedShareholder,
      event.target.value,
      selectedIncorporationType,
      selectedIsSameDirector
    );
  };

  const handleofficeprocess = (event) => {
    setSelectedIncorporationType(event.target.value);
    updatePrice(
      selectedCountry,
      selectedShareholder,
      selectedOffice,
      event.target.value,
      selectedIsSameDirector
    );
  };

  const handleCardClick = (countryValue) => {
    setSelectedCountry(countryValue);
    updatePrice(
      countryValue,
      selectedShareholder,
      selectedOffice,
      selectedIncorporationType,
      selectedIsSameDirector
    );
  };

  // Function to handle card click in step 3
  const handleOfficeCardClick = (officeValue) => {
    setSelectedOffice(officeValue);
    updatePrice(
      selectedCountry,
      selectedShareholder,
      officeValue,
      selectedIncorporationType,
      selectedIsSameDirector
    );
  };

  // Function to handle card click in step 4
  const handleIncorporationTypeCardClick = (typeValue) => {
    setSelectedIncorporationType(typeValue);
    updatePrice(
      selectedCountry,
      selectedShareholder,
      selectedOffice,
      typeValue,
      selectedIsSameDirector
    );
  };

  const handleIsCorporateShareholderChange = (event) => {
    setSelectedIsCorporateShareholder(event.target.value);
    // Reset director-related options when changing corporate shareholder status
    setSelectedIsSameDirector("yes");
  };

  const handleIsSameDirectorChange = (event) => {
    setSelectedIsSameDirector(event.target.value);
    updatePrice(
      selectedCountry,
      selectedShareholder,
      selectedOffice,
      selectedIncorporationType,
      selectedIsSameDirector,
      event.target.value
    );
  };

  // New step for minute book
  const handleMinuteBookOptionCardClick = (optionValue) => {
    setSelectedMinuteBookOption(optionValue);
    updatePrice(
      selectedCountry,
      selectedShareholder,
      selectedOffice,
      selectedIncorporationType,
      selectedIsSameDirector,
      optionValue
    );
  };

  // Modify the places where updatePrice is called to pass the required arguments
  const handleMinuteBookOptionChange = (event) => {
    setSelectedMinuteBookOption(event.target.value);
    updatePrice(
      selectedCountry,
      selectedShareholder,
      selectedOffice,
      selectedIncorporationType,
      selectedIsSameDirector,
      event.target.value
    );
  };

  // Replace the incorrect 'elseif' with 'else if' in the updatePrice function
  const updatePrice = (
    country,
    shareholder,
    office,
    incorporationType,
    isSameDirector,
    minuteBookOption
  ) => {
    let basePrice;
    if (parseInt(country, 10) === 1) {
      basePrice = 1;
    } else if (parseInt(country, 10) === 2) {
      basePrice = 1199;
    } else if (parseInt(country, 10) === 3) {
      basePrice = 1199;
    } else {
      basePrice = 1199;
    }

    let calculatePrice = (basePrice += parseInt(350 * shareholder, 10));

    if (parseInt(country, 10) === 3) {
      setAgentServiceFee(800);
    } else {
      setAgentServiceFee(0);
    }

    calculatePrice += agentServiceFee;

    if (parseInt(incorporationType, 10) === 1) {
      calculatePrice += 49; // Standard Incorporation
    } else if (parseInt(incorporationType, 10) === 2) {
      calculatePrice += 249; // Rush Incorporation
    }

    if (parseInt(country, 10) && office === "1") {
      calculatePrice += 399;
    } else if (parseInt(country, 10) && office === "2") {
      calculatePrice += 599;
    } else if (parseInt(country, 10) && office === "3") {
      calculatePrice += 899;
    } else if (parseInt(country, 10) && office === "4") {
      calculatePrice += 0;
    }

    if (selectedIsCorporateShareholder === "yes" && isSameDirector === "no") {
      const directorsCount = numberOfDirectors > 0 ? numberOfDirectors : 0;
      calculatePrice += 350 * directorsCount;
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
        <div className={`step ${step >= 1 ? "active" : ""}`}></div>
        <div className={`step ${step >= 2 ? "active" : ""}`}></div>
        <div className={`step ${step >= 3 ? "active" : ""}`}></div>
        <div className={`step ${step >= 4 ? "active" : ""}`}></div>
        <div className={`step ${step >= 5 ? "active" : ""}`}></div>
        <div className={`step ${step === 6 ? "active" : ""}`}></div>
      </div>
      {/* <div className="title">On-Demand International</div> */}

      {step === 1 && (
        <div className="countryBox">
          {/* ... */}

          <div className="priceBoxTitle">
            <h2>Please Select your province</h2>
            <p className="priceBoxPara">
              {" "}
              Confirm where your business is located.
            </p>
          </div>

          <div className="province ">
            <div className="col">
              <div className="card-group">
                {/* Card for Ontario */}
                <div
                  className="card provinceCard"
                  onClick={() => handleCardClick("1")}
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">Ontario</h5>
                    <p className="card-price">
                      <button type="button" class="btn btn-dark">
                        Start With{" "}
                      </button>
                      <span style={{ fontSize: "30px", color: "#565658" }}>
                        {" "}
                        $
                      </span>{" "}
                      1199{" "}
                      <span style={{ fontSize: "24px", color: "#565658" }}>
                        CAD
                      </span>
                    </p>

                    <p className="card-text mt-3">
                      <p>
                        <b>Non-Resident Director Document Legalization</b>
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Preparation of the Articles of Incorporation
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Filing of the Articles
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Name Search
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Government Filing Fee
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Certificate of Incorporation
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Business Identification Number (BIN) Registration
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Introduction to Canadian Local Banks
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Nuans Certification
                      </p>
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
                <div
                  className="card provinceCard"
                  onClick={() => handleCardClick("2")}
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">British Columbia</h5>
                    <p className="card-price">
                      <button type="button" class="btn btn-dark">
                        Start With{" "}
                      </button>
                      <span style={{ fontSize: "30px", color: "#565658" }}>
                        {" "}
                        $
                      </span>{" "}
                      1199{" "}
                      <span style={{ fontSize: "24px", color: "#565658" }}>
                        CAD
                      </span>
                    </p>
                    <p className="card-text">
                      <p>
                        <b>Non-Resident Director Document Legalization</b>
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Preparation of the Articles of Incorporation
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Filing of the Articles
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Name Search
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Government Filing Fee
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Certificate of Incorporation
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Business Identification Number (BIN) Registration
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Introduction to Canadian Local Banks
                      </p>
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
                <div
                  className="card provinceCard"
                  onClick={() => handleCardClick("3")}
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">Alberta</h5>
                    <p className="card-price">
                      <button type="button" class="btn btn-dark">
                        Start With{" "}
                      </button>
                      <span style={{ fontSize: "30px", color: "#565658" }}>
                        {" "}
                        $
                      </span>{" "}
                      1199{" "}
                      <span style={{ fontSize: "24px", color: "#565658" }}>
                        CAD
                      </span>
                    </p>
                    <p className="card-text">
                      <p>
                        <b>Non-Resident Director Document Legalization</b>
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Preparation of the Articles of Incorporation
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Filing of the Articles
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Name Search
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Government Filing Fee
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Certificate of Incorporation
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Business Identification Number (BIN) Registration
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Introduction to Canadian Local Banks
                      </p>
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
        <div className="countryBox step2-container">
          <div className="step2-title">How many shareholders?</div>
          <div className="step2-description">
            Choose the number of shareholders and specify if the shareholder is
            a corporation.
          </div>
          <div className="province row step2-form">
            <label htmlFor="shareholderNumber" className="step2-form-label m-4">
              Number of Shareholders:
            </label>
            <p>
              A director/shareholder of a Canadian corporation needs to provide
              identification documents for a background check.
            </p>
            <div className="shareholder-options-box card-group">
              {[1, 2, 3, 4].map((option) => (
                <div
                  key={option}
                  className={`card provinceCard card-body priceboxing shareholder-option-box ${
                    selectedShareholder === option ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id={`shareholderOption${option}`}
                    name="shareholderNumber"
                    value={option}
                    checked={parseInt(selectedShareholder, 10) === option}
                    onChange={(e) => handleShareholderChange(e)}
                    className="step2-form-input  "
                  />
                  <label
                    htmlFor={`shareholderOption${option}`}
                    className="shareholder-label-box"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>

            <label
              htmlFor="isCorporateShareholder"
              className="step2-form-label m-5"
            >
              Is Shareholder Corporate?
            </label>
            <p>
              If the shareholder of a Canadian corporation is another corporate
              entity, additional documents such as the incorporation
              certification and articles of incorporation need to be legally
              verified.
            </p>
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
              <div className="directorBox">
                <label htmlFor="isSameDirector" className="step2-form-label">
                  Is Director Same as Shareholder?
                </label>

                <select
                  id="isSameDirector"
                  value={selectedIsSameDirector}
                  onChange={(e) => handleIsSameDirectorChange(e)}
                  className="step2-form-select"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                {selectedIsSameDirector === "no" && (
                  <>
                    <label
                      htmlFor="numberOfDirectors"
                      className="step2-form-label"
                    >
                      Number of Directors:
                    </label>
                    <input
                      type="number"
                      id="numberOfDirectors"
                      value={numberOfDirectors}
                      onChange={(e) =>
                        setNumberOfDirectors(parseInt(e.target.value) || 0)
                      }
                      className="step2-form-input"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="countryBox">
          <div className="priceBoxTitle">
            <h2>Please select the months for your office address?</h2>
            <p className="priceBoxPara"></p>
          </div>

          <div className="province row">
            <div className="col">
              <div className="card-group">
                {/* Card for 3 month */}
                <div
                  className="card provinceCard"
                  onClick={() => handleOfficeCardClick("1")}
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">3 Months</h5>
                    <p className="card-text">
                      A virtual office utilizes a physical location that
                      receives mail for you and can serve as an official
                      business address for your company. It allows you to have a
                      physical presence in any city without the bloated costs of
                      office space rentals. Up to 5 mail scans included.
                    </p>

                    <p className="card-price">
                      <span style={{ fontSize: "30px", color: "#565658" }}>
                        {" "}
                        $
                      </span>{" "}
                      399{" "}
                      <span style={{ fontSize: "24px", color: "#565658" }}>
                        CAD
                      </span>
                    </p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="office"
                        id="office3month"
                        value="1"
                        checked={selectedOffice === "1"}
                        onChange={handleOfficeChange}
                      />
                      <label className="form-check-label" htmlFor="officeNone">
                        Select
                      </label>
                    </div>
                  </div>
                </div>

                {/* Card for 6 month */}
                <div
                  className="card provinceCard"
                  onClick={() => handleOfficeCardClick("2")}
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">6 Months</h5>
                    <p className="card-text">
                      A virtual office utilizes a physical location that
                      receives mail for you and can serve as an official
                      business address for your company. It allows you to have a
                      physical presence in any city without the bloated costs of
                      office space rentals. Up to 5 mail scans included.
                    </p>

                    <p className="card-price">
                      <span style={{ fontSize: "30px", color: "#565658" }}>
                        {" "}
                        $
                      </span>{" "}
                      599{" "}
                      <span style={{ fontSize: "24px", color: "#565658" }}>
                        CAD
                      </span>
                    </p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="office"
                        id="office6month"
                        value="2"
                        checked={selectedOffice === "2"}
                        onChange={handleOfficeChange}
                      />
                      <label className="form-check-label" htmlFor="officeNone">
                        Select
                      </label>
                    </div>
                  </div>
                </div>

                {/* Card for 12 Months */}
                <div
                  className="card provinceCard"
                  onClick={() => handleOfficeCardClick("3")}
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">12 Months</h5>
                    <p className="card-text">
                      A virtual office utilizes a physical location that
                      receives mail for you and can serve as an official
                      business address for your company. It allows you to have a
                      physical presence in any city without the bloated costs of
                      office space rentals. Up to 20 mail scans included.
                    </p>

                    <p className="card-price">
                      <span style={{ fontSize: "30px", color: "#565658" }}>
                        {" "}
                        $
                      </span>{" "}
                      899{" "}
                      <span style={{ fontSize: "24px", color: "#565658" }}>
                        CAD
                      </span>
                    </p>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="office"
                        id="office12Months"
                        value="3"
                        checked={selectedOffice === "3"}
                        onChange={handleOfficeChange}
                      />
                      <label
                        className="form-check-label "
                        htmlFor="office12Months"
                      >
                        Select
                      </label>
                    </div>
                  </div>
                </div>

                {/* Card for None */}
                <div
                  className="card provinceCard"
                  onClick={() => handleOfficeCardClick("4")}
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">
                      No, thanks. I have my own office space.
                    </h5>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="office"
                        id="officeNone"
                        value="4"
                        checked={selectedOffice === "4"}
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

      {step === 4 && (
        <div className="countryBox">
          <div className="priceBoxTitle">
            <h2>Selecting the Appropriate Incorporation Type</h2>
            <p className="priceBoxPara"></p>
          </div>
          <div className="province row">
            <div className="col">
              <div className="card-group">
                {/* Card for Standard Incorporation */}
                <div
                  className="card provinceCard"
                  onClick={() => handleIncorporationTypeCardClick("1")}
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">
                      Standard Incorporation
                    </h5>
                    <p className="card-text">
                      The standard timeline for incorporating a company spans
                      approximately 25 working days.{" "}
                    </p>
                    <p className="card-price">
                      <span style={{ fontSize: "30px", color: "#565658" }}>
                        {" "}
                        $
                      </span>{" "}
                      49{" "}
                      <span style={{ fontSize: "24px", color: "#565658" }}>
                        CAD
                      </span>
                    </p>
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
                      <label
                        className="form-check-label"
                        htmlFor="standardIncorporation"
                      >
                        Select
                      </label>
                    </div>
                  </div>
                </div>
                {/* Card for Rush Incorporation */}
                <div
                  className="card provinceCard"
                  onClick={() => handleIncorporationTypeCardClick("2")}
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">Rush Incorporation</h5>
                    <p className="card-text">
                      the standard timeline for incorporating a company spans
                      approximately 7-10 working days.{" "}
                    </p>
                    <p className="card-price">
                      <span style={{ fontSize: "30px", color: "#565658" }}>
                        {" "}
                        $
                      </span>{" "}
                      249{" "}
                      <span style={{ fontSize: "24px", color: "#565658" }}>
                        CAD
                      </span>
                    </p>
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
                      <label
                        className="form-check-label"
                        htmlFor="rushIncorporation"
                      >
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
      {step === 4 && selectedCountry === "3" && (
        <div className="countryBox">
          <div className="priceBoxTitle">
            <h2>Agent Service Fee*</h2>

            <p className="card-price priceBoxPara">
              <span style={{ fontSize: "30px", color: "#565658" }}> $</span>{" "}
              {agentServiceFee}{" "}
              <span style={{ fontSize: "24px", color: "#565658" }}>CAD</span>
            </p>

            <p>
              A local attorney or agent for service is designed for
              incorporating a corporation, extra-provincial registration,
              business set up in Canada by non-residents and other corporate
              filing purposes. The attorney or agent must be located locally
              (within the geographical boundary of the designated province).
              Failure to appoint a local attorney or agent may result rejection
              of a new registration and dissolution of an existing corporation.
            </p>
          </div>
          {/* Add any additional content or description for the agent service fee step */}
        </div>
      )}

      {step === 5 && (
        <div className="countryBox">
          <div className="priceBoxTitle">
            <h2>Corporate Minute Book</h2>
            <p className="priceBoxPara">Select an option for minute book:</p>
          </div>
          <div className="province row">
            <div className="col">
              <div className="card-group">
                {/* Card for Director Consent */}
                <div
                  className="card provinceCard"
                  onClick={() =>
                    handleMinuteBookOptionCardClick("directorConsent")
                  }
                >
                  <div className="card-body priceboxing">
                    <h5 className="card-title pricehead">
                      Essential Corporate Minute Book (Electronic Copy)
                    </h5>
                    <p className="card-text">
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Shareholder Resolution Dispensing With Auditor
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Subscription For Shares
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Director Consent
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        First Director Resolution
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        By-Laws
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Notice of Articles
                      </p>
                      <p>
                        <PiCaretDoubleRightDuotone
                          style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                        />
                        Notice Of Issuance Of Uncertificated Share
                      </p>
                    </p>
                    <p className="card-price">
                      <span style={{ fontSize: "30px", color: "#565658" }}>
                        $
                      </span>
                      399
                      <span style={{ fontSize: "24px", color: "#565658" }}>
                        CAD
                      </span>
                    </p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="minuteBookOption"
                        id="directorConsent"
                        value="directorConsent"
                        checked={selectedMinuteBookOption === "directorConsent"}
                        onChange={handleMinuteBookOptionChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="directorConsent"
                      >
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

      {step === 6 && (
        <div className="countryBox">
          <div className="priceBoxTitle">
            <h2>Pay Now</h2>
            <p className="priceBoxPara">Total Price: ${price}</p>
          </div>

          <a href="https://buy.stripe.com/fZedU6aJa53e9by2gr">
            <button id="stripe-checkout-btn" role="link"></button>
          </a>
        </div>
      )}

      <div className="button-container">
        {step !== 1 && (
          <button
            className={`btn btn-dark flowBtnBack ${step === 1 ? "hidden" : ""}`}
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <button
          className={`btn btn-dark flowBtn ${step === 6 ? "hidden" : ""}`}
          onClick={handleNext}
        >
          {step < 6 ? "Next" : "Pay"}
        </button>
      </div>

      {/* Total Price */}
      <div className="total-price-section main-price">
        <p className="main-price-paragraph">
          {" "}
          Total Price:
          <span style={{ fontSize: "30px", color: "#565658" }}> $</span>
          <span style={{ fontSize: "44px", color: "#565658" }}> {price} </span>
          <span style={{ fontSize: "24px", color: "#565658" }}>CAD</span>
        </p>
      </div>
    </div>
  );
};

export default Nonresident;
