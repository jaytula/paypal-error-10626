import axios from "axios"

const PAYPAl_NVP_ENDPOINT = 'https://api-3t.sandbox.paypal.com/nvp'
const PAYPAL_API_USERNAME = process.env.PAYPAL_API_USERNAME
const PAYPAL_API_PASSWORD = process.env.PAYPAL_API_PASSWORD
const PAYPAl_API_SIGNATURE = process.env.PAYPAL_API_SIGNATURE
const CC_NUMBER = process.env.CC_NUMBER

test('main test', () => {
  expect(PAYPAL_API_USERNAME).toBeTruthy();
  expect(PAYPAL_API_PASSWORD).toBeTruthy();
  expect(PAYPAl_API_SIGNATURE).toBeTruthy();

  const data = {
    METHOD: 'DoDIrectPayment',
    PAYMENTACTION: 'Sale',
    IPADDRESS: '127.0.0.1',
    AMT: '106.26',
    CREDITCARDTYPE: 'Visa',
    ACCT: CC_NUMBER,
    EXPDATE: '122030',
    CVV2: '369',
    FIRSTNAME: 'John',
    LASTNAME: 'Doe',
    STREET: '123 Sesame St',
    STREET2: '',
    CITY: 'Santa Maria',
    STATE: 'CA',
    ZIP: '90001',
    COUNTRYCODE: '840',
    DESC: 'Description goes here',
    INVNUM: 'Inventory num goes here',
    BUTTONSOURCE: 'ButtonSourceXYZ',
    NOTIFYURL: '',
    EMAIL: 'somebody@somewhere.com',
    PHONENUM: '555-555-5555',
    USER: PAYPAL_API_USERNAME,
    PWD: PAYPAL_API_PASSWORD,
    VERSION: '3.0',
    SIGNATURE: PAYPAl_API_SIGNATURE
  }

  const searchParams = new URLSearchParams();

  for(let [key, value] of Object.entries(data)) {
    searchParams.set(key, value);
  }

  console.log(searchParams.toString())

//   axios.post(PAYPAl_NVP_ENDPOINT)
})