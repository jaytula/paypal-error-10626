import axios from "axios";

const PAYPAl_NVP_ENDPOINT = "https://api-3t.sandbox.paypal.com/nvp";
const PAYPAL_API_USERNAME = process.env.PAYPAL_API_USERNAME;
const PAYPAL_API_PASSWORD = process.env.PAYPAL_API_PASSWORD;
const PAYPAL_API_SIGNATURE = process.env.PAYPAL_API_SIGNATURE;
const CC_NUMBER = process.env.CC_NUMBER;

test("main test", async () => {
  expect(PAYPAL_API_USERNAME).toBeTruthy();
  expect(PAYPAL_API_PASSWORD).toBeTruthy();
  expect(PAYPAL_API_SIGNATURE).toBeTruthy();

  const INVNUM = new Date().toString();

  const data = {
    METHOD: "DoDIrectPayment",
    PAYMENTACTION: "Sale",
    IPADDRESS: "127.0.0.1",
    AMT: "106.26",
    CREDITCARDTYPE: "Visa",
    ACCT: CC_NUMBER,
    EXPDATE: "122030",
    CVV2: "369",
    FIRSTNAME: "John",
    LASTNAME: "Doe",
    STREET: "123 Sesame St",
    STREET2: "",
    CITY: "Santa Maria",
    STATE: "CA",
    ZIP: "90001",
    COUNTRYCODE: "840",
    DESC: "Description goes here",
    INVNUM,
    BUTTONSOURCE: "ButtonSourceXYZ",
    NOTIFYURL: "",
    EMAIL: "somebody@somewhere.com",
    PHONENUM: "555-555-5555",
    USER: PAYPAL_API_USERNAME,
    PWD: PAYPAL_API_PASSWORD,
    VERSION: "3.0",
    SIGNATURE: PAYPAL_API_SIGNATURE,
  };

  const searchParams = new URLSearchParams();

  for (let [key, value] of Object.entries(data)) {
    searchParams.set(key, value);
  }

  const response = await axios.post(PAYPAl_NVP_ENDPOINT, searchParams.toString());
  const responseParams = new URLSearchParams(response.data);
  
  expect(responseParams.get('ACK')).toBe('Failure');
  expect(responseParams.get('L_ERRORCODE0')).toBe('10626');
  
  const transactionID = responseParams.get('TRANSACTIONID');

  const detailsData = {
    METHOD: 'GetTransactionDetails',
    TRANSACTIONID: transactionID,
    USER: PAYPAL_API_USERNAME,
    PWD: PAYPAL_API_PASSWORD,
    VERSION: "3.0",
    SIGNATURE: PAYPAL_API_SIGNATURE,
  };

  const detailsSearchParams = new URLSearchParams();

  for (let [key, value] of Object.entries(detailsData)) {
    detailsSearchParams.set(key, value);
  }

  const detailsResponse = await axios.post(PAYPAl_NVP_ENDPOINT, detailsSearchParams.toString());
  const detailsResponseSearchParams = new URLSearchParams(detailsResponse.data);
  expect(detailsResponseSearchParams.get('PAYMENTSTATUS')).not.toBe('Completed');
});
