"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Checkout = () => {
  const [softwaredata, setSoftwaredata] = useState("");
  const [cardsdata, setCardsdata] = useState("");
  const [keyfobdata, setKeyfobdata] = useState("");
  const [cTotal, setCtotal] = useState("");
  const [kfTotal, setKftotal] = useState("");
  const [srTotal, setSrtotal] = useState("");
  const [deposit, setDeposit] = useState(
    parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal)
  );
  const [creditCard, setCreditCard] = useState();
  const [expireMonth, setExpireMonth] = useState();
  const [expireYear, setExpireYear] = useState();
  const [cvc, setCvc] = useState();
  const [country, setCountry] = useState("default");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  const dueAmount =
    parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal) - deposit < 0
      ? 0
      : (
          parseFloat(cTotal) +
          parseFloat(kfTotal) +
          parseFloat(srTotal) -
          deposit
        ).toFixed(2);

  let paymentResponse;
  let storedUserData;
  let customers;
  if (typeof localStorage !== "undefined") {
    storedUserData = JSON.parse(localStorage.getItem("data") ?? null);
    customers = JSON.parse(localStorage.getItem("customers") ?? null);
  }

  const cardPaymentHandler = async () => {
    paymentResponse = await axios.post("/api/payment/card", {
      amount: deposit,
      cardNumber: creditCard,
      month: expireMonth,
      year: expireYear,
      cvc,
      cardHolderName: storedUserData.fullname,
    });
  };

  const hostedPaymentHandler = async () => {
    setIsLoading(true);
    try {
      paymentResponse = await axios.post("/api/payment/hosted", {
        amount: deposit,
        dueAmount: dueAmount,
        userData: storedUserData,
        custom: {
          softwareData: softwaredata,
          cardsData: cardsdata,
          keyFobData: keyfobdata,
        },
      });
      const paymentUrl = paymentResponse?.data?.data?.url;

      localStorage.setItem(
        "transactionRreference",
        paymentResponse?.data["transactionReference"]
      );

      setPaymentLink(paymentUrl);
      // Send Email before going to Payment Method
      try {
        if (process.env.WORLDPAY_USERNAME == "Yes") {
          const emailRegistration = await axios.post("/api/notify", {
            userData: storedUserData,
            softwareData: softwaredata,
            cardsData: cardsdata,
            keyFobData: keyfobdata,
            customers,
            orderSummary: [
              `${cardsdata.needed + 100} Additional Cards ${
                cardsdata.option
              } = ${cTotal}`,
              `${keyfobdata.customers} Keyfobs = ${kfTotal}`,
              `${
                keyfobdata.addrings == "No" ? 0 : keyfobdata.customers
              } Split Rings = ${srTotal}`,
              `Total = ${(
                parseFloat(cTotal) +
                parseFloat(kfTotal) +
                parseFloat(srTotal)
              )
                .toFixed(2)
                .replace(",", ".")}`,
              `Deposity (today) = $${deposit}`,
              `Balance Due (before dispatch) = ${dueAmount}`,
            ],
            transactionReference: paymentResponse?.data["transactionReference"],
          });

          console.log(emailRegistration);
        }
      } catch (error) {
        console.log(error);
      }

      window.open(paymentUrl, "_self");
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const inputCreditCardData = (e) => {
    if (e.target.name == "creditcard") {
      const value = e.target.value;

      if (/\D/.test(value)) {
        alert("Just numbers");
      }
      if (value.length <= 16) {
        setCreditCard(value);
      }
    }

    if (e.target.name == "expireMonth") {
      const value = e.target.value;
      if (value.length <= 2) {
        setExpireMonth(value);
      }
    }
    if (e.target.name == "expireYear") {
      const value = e.target.value;
      if (value.length <= 4) {
        setExpireYear(value);
      }
    }
    if (e.target.name == "cvc") {
      const value = e.target.value;
      if (value.length <= 3) {
        setCvc(value);
      }
    }
    //if(e.target.name == 'creditcard'){}
  };

  const selectedCountry = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    let storageSoft = JSON.parse(localStorage.getItem("software"));
    let storageCards = JSON.parse(localStorage.getItem("cardsdata"));
    let storageKeyfobs = JSON.parse(localStorage.getItem("keyfobs"));

    setSoftwaredata(storageSoft);
    setCardsdata(storageCards);
    setKeyfobdata(storageKeyfobs);

    // if(averagecustomers != ''){
    //     setCustomers( parseInt(averagecustomers))
    // }
  }, []);

  useEffect(() => {
    if (cardsdata != "") {
      if (cardsdata.option == "full payment") {
        setCtotal(cardsdata.totaldue.toFixed(2).replace(",", "."));
      } else {
        setCtotal(cardsdata.payment.toFixed(2).replace(",", "."));
      }
    }
  }, [cardsdata]);

  useEffect(() => {
    if (keyfobdata != "") {
      setKftotal(
        (keyfobdata.customers * keyfobdata.price * 0.5)
          .toFixed(2)
          .replace(",", ".")
      );

      if (keyfobdata.addrings == "No") {
        setSrtotal("0.00");
      } else {
        setSrtotal(
          (Math.ceil(keyfobdata.customers / 100) * (6 * 0.5))
            .toFixed(2)
            .replace(",", ".")
        );
      }
    }
  }, [keyfobdata]);

  useEffect(() => {
    setDeposit(parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal));
  }, [cTotal, kfTotal, srTotal]);

  const handleDeposit = (e) => {
    setDeposit(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    //alert(expireYear + ' ' )

    if (
      creditCard == null ||
      expireYear == null ||
      expireMonth == null ||
      cvc == null ||
      country == "default"
    ) {
      alert("Complete the fields");
    } else {
      if (expireYear < 2023) {
        alert("Invalid expiration date");
      } else if (expireYear == 2023 && expireMonth < 7) {
        alert("Invalid expiration date");
      } else if (creditCard.length < 16) {
        alert("Invalid Credit Card");
      } else if (cvc.length < 3) {
        alert("Invalid CVC");
      } else {
        cardPaymentHandler();
        // router.push('/funnel/thanks');
      }
    }
  };

  const hideElement = {
    display: "none",
  };

  return (
    <div className="flex flex-col w-[95%] my-4 py-5 items-center bg-white rounded-lg shadow-md relative h-full md:w-[52%]">
      <p
        className="fontTitle text-center"
        style={{ fontWeight: "700", color: "#a52a2a", padding: "5px 0 20px 0" }}
      >
        Checkout
      </p>
      <p
        className="fontSubTitle text-center"
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#4a6bb6",
          lineHeight: "1.2",
          paddingBottom: "0.5rem",
        }}
      >
        Order Summary
      </p>
      <table className="w-[95%] border rounded-lg">
        <thead>
          <tr className="border-b bg-[#7a94b3]">
            <th
              className="resize-text py-1 px-2 w-[75%] text-white"
              style={{ fontWeight: "700" }}
            >
              Description
            </th>
            <th
              className="resize-text py-1 px-2 w-[25%] text-white"
              style={{ fontWeight: "700" }}
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-[#ffffff]">
            <td className="resize-text py-1 px-2">
              Referral Marketing Cards
              {/* Software Subscription 
                <br /> {softwaredata.description} */}
            </td>
            <td className="resize-text py-1 px-2">FREE</td>
          </tr>
          <tr className="border-b bg-[#96cfd1]">
            <td className="resize-text py-1 px-2">
              {cardsdata.needed + 100} Additional Cards <br /> ({" "}
              {cardsdata.option} ) <br />
              {/* (100 free cards + { cardsdata.needed }) */}
            </td>
            <td className="resize-text py-1 px-2">&#163; {cTotal} </td>
          </tr>
          <tr className="border-b bg-[#ffffff]">
            <td className="resize-text py-1 px-2">
              {keyfobdata.customers} Keyfobs
            </td>
            <td className="resize-text py-1 px-2">&#163; {kfTotal}</td>
          </tr>
          <tr className="border-b bg-[#96cfd1]">
            <td className="resize-text py-1 px-2">
              {keyfobdata.addrings == "No" ? 0 : keyfobdata.customers} Split
              Rings
            </td>
            <td className="resize-text py-1 px-2">&#163; {srTotal} </td>
          </tr>
        </tbody>
      </table>

      <div className="w-[95%] flex items-center pt-3">
        <p
          className="fontTitle  w-[75%]"
          style={{
            fontWeight: "700",
            color: "black",
            margin: "3px 0 4px 0",
            fontSize: "1rem",
            padding: "0 0 0 0",
            textAlign: "end",
          }}
        >
          Total:
        </p>
        <p
          className="fontTitle text-center w-[25%]"
          style={{
            fontWeight: "700",
            color: "black",
            margin: "3px 0 4px 0",
            fontSize: "1rem",
            padding: "0 0 0 0",
          }}
        >
          &#163;
          {(parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal))
            .toFixed(2)
            .replace(",", ".")}
        </p>
      </div>

      <div className="w-[95%] flex items-center pt-3">
        <p
          className="fontTitle w-[75%]"
          style={{
            fontWeight: "700",
            color: "black",
            margin: "3px 0 4px 0",
            fontSize: "0.8rem",
            padding: " 0 5px 0 0",
            textAlign: "end",
          }}
        >
          Deposit (today):
        </p>
        {/* <p className="fontTitle text-center" style={{ fontWeight:'700', color:'black' , margin: '5px 0 10px 0'}}>&#163;{ (parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal)).toFixed(2).replace(',', '.') }</p> */}
        <div className="flex font-bold w-[25%] h-fit px-1 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div className="w-[100%] flex overflow-hidden">
            £
            <input
              type="text"
              name="deposit"
              value={`${deposit}`}
              onChange={handleDeposit}
              className=" outline-none max-w-[60px]"
            />
          </div>
        </div>
      </div>

      <div className="w-[95%] flex items-center pt-3">
        <p
          className="fontTitle w-[75%]"
          style={{
            fontWeight: "700",
            color: "black",
            margin: "3px 0 4px 0",
            fontSize: "0.8rem",
            padding: " 0 5px 0 0",
            textAlign: "end",
          }}
        >
          Balance Due (before despatch):
        </p>
        {/* <p className="fontTitle text-center" style={{ fontWeight:'700', color:'black' , margin: '5px 0 10px 0'}}>&#163;{ (parseFloat(cTotal) + parseFloat(kfTotal) + parseFloat(srTotal)).toFixed(2).replace(',', '.') }</p> */}
        <input
          type="text"
          value={`£${dueAmount}`}
          className="font-bold w-[25%] h-fit px-1 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* PAYMENT METHOD */}
      <div style={hideElement}>
        <p
          className="fontSubTitle text-center"
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#4a6bb6",
            lineHeight: "1.2",
            paddingBottom: "0.5rem",
          }}
        >
          Payment Method
        </p>

        <label htmlFor="card" className="fontForm mb-1 w-[85%] text-left">
          Card number
        </label>
        <div className="w-[85%] flex px-2 py-2 mb-2 rounded-lg border border-gray-300 focusInput ">
          <input
            type="number"
            name="creditcard"
            value={creditCard}
            required
            onChange={inputCreditCardData}
            placeholder="1234 1234 1234 1234"
            className="w-[60%] outline-none"
          />
          <img
            src="https://res.cloudinary.com/dbew7ibhf/image/upload/v1689307395/extendida_Mesa_de_trabajo_1_u8bpxc.png"
            alt=""
            className="w-[40%] object-contain"
          />
        </div>

        <label htmlFor="card" className="fontForm mb-1 w-[85%] text-left">
          Expiry
        </label>
        <div className="w-[85%] px-2 py-2 mb-2 rounded-lg border border-gray-300 focusInput ">
          <input
            type="number"
            name="expireMonth"
            value={expireMonth}
            className="w-[40px] text-center outline-none"
            placeholder="MM"
            onChange={inputCreditCardData}
          />
          /
          <input
            type="number"
            name="expireYear"
            value={expireYear}
            className="w-[55px] text-center outline-none"
            placeholder="YYYY"
            onChange={inputCreditCardData}
          />
        </div>

        <label htmlFor="card" className="fontForm mb-1 w-[85%] text-left">
          CVC
        </label>
        <input
          type="number"
          name="cvc"
          value={cvc}
          onChange={inputCreditCardData}
          placeholder="CVC"
          className="w-[85%] px-2 py-2 mb-2 rounded-lg border border-gray-300 focusInput "
        />

        <label htmlFor="country" className="fontForm mb-1 w-[85%] text-left">
          Country
        </label>

        <select
          name="country"
          className="w-[85%] px-2 py-2 mb-2 rounded-lg border border-gray-300 focusInput"
          value={country}
          onChange={selectedCountry}
        >
          <option value="default" disabled selected>
            Select a Country
          </option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="Afghanistan">Afghanistan</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Benin">Benin</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
          <option value="Botswana">Botswana</option>
          <option value="Brazil">Brazil</option>
          <option value="Brunei">Brunei</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameroon">Cameroon</option>
          <option value="Canada">Canada</option>
          <option value="Cape Verde">Cape Verde</option>
          <option value="Central African Republic">
            Central African Republic
          </option>
          <option value="Chad">Chad</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Colombia">Colombia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo">Congo</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Croatia">Croatia</option>
          <option value="Cuba">Cuba</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="East Timor">East Timor</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Fiji">Fiji</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Greece">Greece</option>
          <option value="Grenada">Grenada</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guinea">Guinea</option>
          <option value="Guinea-Bissau">Guinea-Bissau</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Honduras">Honduras</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iran">Iran</option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Korea, North">Korea, North</option>
          <option value="Korea, South">Korea, South</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Laos">Laos</option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libya">Libya</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Macedonia">Macedonia</option>
          <option value="Madagascar">Madagascar</option>
          <option value="Malawi">Malawi</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Maldives">Maldives</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Marshall Islands">Marshall Islands</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mexico">Mexico</option>
          <option value="Micronesia">Micronesia</option>
          <option value="Moldova">Moldova</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montenegro">Montenegro</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar">Myanmar</option>
          <option value="Namibia">Namibia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherlands">Netherlands</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Palau">Palau</option>
          <option value="Panama">Panama</option>
          <option value="Papua New Guinea">Papua New Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Qatar">Qatar</option>
          <option value="Romania">Romania</option>
          <option value="Russia">Russia</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
          <option value="Saint Lucia">Saint Lucia</option>
          <option value="Saint Vincent and the Grenadines">
            Saint Vincent and the Grenadines
          </option>
          <option value="Samoa">Samoa</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Serbia">Serbia</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra Leone">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="South Sudan">South Sudan</option>
          <option value="Spain">Spain</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Swaziland">Swaziland</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syria">Syria</option>
          <option value="Taiwan">Taiwan</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania">Tanzania</option>
          <option value="Thailand">Thailand</option>
          <option value="Togo">Togo</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Vatican City">Vatican City</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Yemen">Yemen</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
        </select>
      </div>
      {/* <button
        type="submit"
        className="px-4 py-2 buttonsMain mt-3"
        onClick={hostedPaymentHandler}
        disabled={isLoading}
      >
        {isLoading ? "Processing Payment..." : "Pay Amount"}
      </button> */}
      <button
        type="submit"
        className="px-4 py-2 buttonsMain mt-3"
        onClick={isLoading ? null : hostedPaymentHandler}
      >
        {isLoading ? (
          "Processing..."
        ) : paymentLink ? (
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            Open Link for Payment
          </a>
        ) : (
          "Pay Amount"
        )}
      </button>
    </div>
  );
};

export default Checkout;
