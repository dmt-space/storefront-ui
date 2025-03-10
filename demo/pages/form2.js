import { Grid, GridItem } from "storefront-ui/Grid";

import { FormHeader } from "../theme/FormHeader";
import { StatefulRadioGroup, Radio } from "../theme/Radio";
import { Button } from "../theme/Button";
import IconArrowBack from "../../data/svg/arrow_back.svg";

import { Radio$ } from "storefront-ui/Radio";
import RadioBorder from "../theme/RadioBorder";
import Device from "storefront-ui/Device";
import { R } from "storefront-ui/Config";

import {
  SelectNative$,
  StatefulSelectNative$
} from "storefront-ui/SelectNative";

import { rslin } from "responsive-helpers";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { useTheme } from "storefront-ui/Theme";
import React, { useState } from "react";
import OrderDetails from "../theme/OrderDetails";
import { ProgressSteps } from "../theme/ProgressSteps";
import CheckoutPage from "../components/CheckoutPage";
import routerPush from "../helpers/routerPush";

const Form2 = () => {
  const theme = useTheme();
  const spacer = rslin(theme.spacings.s100, theme.spacings.s140).css(
    "margin-top"
  );
  return (
    <CheckoutPage>
      <Grid gutterVertical={20}>
        <GridItem>
          <Device desktop>
            <ProgressSteps
              data={[
                {
                  label: "Cart",
                  href: "/cart"
                },
                {
                  label: "Information",
                  href: "/form1"
                },
                {
                  label: "Shipping",
                  href: "/form2"
                },
                {
                  label: "Payment",
                  href: "/form3"
                }
              ]}
              active={2}
              lastCompleted={2}
              onClick={stepIndex => {
                console.log("clicked step " + stepIndex);
              }}
            />
          </Device>
        </GridItem>
        <GridItem
          css={css`
            ${spacer}
          `}
        >
          <OrderDetails
            rows={[
              {
                label: "Contact",
                value: "john@mail.com",
                href: "/form1"
              },
              {
                label: "Ship to",
                value: "Poland, Gdansk PA 16754, United States",
                href: "/form1"
              }
            ]}
          />
        </GridItem>
        <GridItem
          css={css`
            ${spacer}
          `}
        >
          <FormHeader title={"Shipping method"} />
        </GridItem>
        <GridItem>
          <StatefulRadioGroup
            initialState={{ value: "shipment1" }}
            name={"shipment"}
          >
            <RadioBorder value="shipment1" rightLabel={"FREE"}>
              <strong>Free Shipping</strong> (next day delivery)
            </RadioBorder>
            <RadioBorder value="shipment2" rightLabel={"$12.00"}>
              <strong>2-Day Shipping</strong>
            </RadioBorder>
          </StatefulRadioGroup>
        </GridItem>

        <GridItem
          css={css`
            display: flex;
            flex-wrap: wrap;
            ${R.from("md").css("justify-content: space-between;")}
            ${R.to("sm").css("&>div{margin-bottom: 16px; width: 100%;}")}
          `}
        >
          <div
            css={css`
              ${R.to("sm").css("order: 2;")}
              display: flex;
              align-items: center;
            `}
          >
            <Button
              size={"large"}
              kind={"minimal"}
              fitContainer={true}
              startEnhancer={<IconArrowBack />}
              onClick={() => {
                routerPush("/form1");
              }}
            >
              Return to customer information
            </Button>
          </div>

          <div css={css``}>
            <Button
              fitContainer={true}
              size={"large"}
              onClick={() => {
                routerPush("/form3");
              }}
            >
              Continue to payment method
            </Button>
          </div>
        </GridItem>
      </Grid>
    </CheckoutPage>
  );
};

Form2.hideDesktopMenu = true;

export default Form2;
