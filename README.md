# paypal-error-10626

## Summary

This is a demo with just one test case to show PayPal's NVP API method `DoDirectPayment` returns an response `ACK` of
Failure but the transaction appears to go through and the credit card is charged.

Simply supply environment variables indicated in `.env.example`.

```shell
# Copy to .env and edit to your values
cp .env.example .env 

# Install npm packages
npm i

# Run test
npm run test
```

There is only one file to study and it is mostly self explanatory: https://github.com/jaytula/paypal-error-10626/blob/master/test/main.test.ts
