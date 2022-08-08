import React from "react";
import GooglePayButton from "@google-pay/button-react";

const PayButton = ({ donationAmount }) => {
  return (
    <div>
      <GooglePayButton
        buttonColor="white"
        buttonSizeMode="fill"
        style={{
          width: "50%",
          height: "100%",
        }}
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: process.env.REACT_APP_MERCHANT_ID,
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: process.env.REACT_APP_MERCHANT_ID,
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: donationAmount,
            currencyCode: "USD",
            countryCode: "US",
          },
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("load payment data", paymentRequest);
        }}
      />
    </div>
  );
};

export default PayButton;
