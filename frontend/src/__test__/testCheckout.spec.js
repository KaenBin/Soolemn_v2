import { Browser, Key, By, until } from "selenium-webdriver";
import { suite } from "selenium-webdriver/testing/index.js";
import { Options } from "selenium-webdriver/edge.js";
import assert from "assert";

suite(
  function (env) {
    describe("Test Checkout", function () {
      let options = new Options();
      let driver;

      beforeEach(async function () {
        driver = await env.builder().setEdgeOptions(options).build();

        await driver.get("http://localhost:3000");
        await driver
          .findElement({ id: "email" })
          .sendKeys("kaenbin134@gmail.com");
        await driver.findElement({ id: "password" }).sendKeys("123456");
        await driver.findElement({ id: "signin" }).click();
      });

      afterEach(async function () {
        await driver.quit();
      });

      async function fillForm(cardNumber) {
        await driver.wait(until.elementLocated({ id: "cardNumber" }), 10000);
        await driver
          .findElement({ id: "cardNumber" })
          .sendKeys(
            cardNumber,
            Key.TAB,
            "1230",
            Key.TAB,
            "123",
            Key.TAB,
            "Tấn Lợi Phan Mai",
            Key.TAB,
            "Vietnam",
            Key.TAB,
            "268 Lý Thường Kiệt",
            Key.TAB,
            Key.TAB,
            "Ho Chi Minh",
            Key.TAB,
            "Thành Phố Hồ Chí Minh - Ho Chi Minh City",
            Key.TAB,
            "700000",
            Key.ENTER
          );
      }

      async function urlMatches(driver) {
        let currentUrl = await driver.getCurrentUrl();
        return currentUrl.includes("localhost:3000/success");
      }

      it("Successful Quick Checkout", async function () {
        await driver
          .wait(until.elementLocated({ id: "products-page" }))
          .click();
        await driver
          .wait(until.elementLocated({ id: "product-0" }), 10000)
          .click();
        await driver
          .findElement({ css: 'button[type="button"][title="Buy Now"]' })
          .click();
        await fillForm("4242424242424242");

        await driver.wait(async () => await urlMatches(driver), 20000);

        let currentUrl = await driver.getCurrentUrl();

        assert(
          currentUrl.includes("localhost:3000/success"),
          "URL does not match 'localhost:3000/success'"
        );
      });

      it("Successful Multiple Checkout", async function () {
        await driver
          .wait(until.elementLocated({ id: "products-page" }))
          .click();
        await driver
          .wait(until.elementLocated({ id: "product-0" }), 10000)
          .click();
        await driver
          .findElement({ css: 'button[type="button"][title="Add to Cart"]' })
          .click();

        await driver.get("http://localhost:3000/cart");
        await driver
          .wait(until.elementLocated({ id: "checkout-button" }), 10000)
          .click();
        await fillForm("4242424242424242");

        await driver.wait(async () => await urlMatches(driver), 20000);

        let currentUrl = await driver.getCurrentUrl();

        assert(
          currentUrl.includes("localhost:3000/success"),
          "URL does not match 'localhost:3000/success'"
        );
      });

      async function textMatches(driver, selector, expectedText) {
        let element = await driver.findElement(selector);
        let text = await element.getText();
        return text === expectedText;
      }

      it("Insufficient Funds Decline", async function () {
        await driver
          .wait(until.elementLocated({ id: "products-page" }))
          .click();
        await driver
          .wait(until.elementLocated({ id: "product-0" }), 10000)
          .click();
        await driver
          .findElement({ css: 'button[type="button"][title="Buy Now"]' })
          .click();
        await fillForm("4000000000009995");

        let selector = By.css("#cardNumber-fieldset-inner > div:nth-child(4)");

        let expectedText =
          "Your credit card was declined because of insufficient funds. Try paying with a debit card instead.";
        await driver.wait(
          async () => await textMatches(driver, selector, expectedText),
          10000,
          `Text did not match the expected value: "${expectedText}"`
        );

        let divElement = await driver.findElement(selector);
        let divText = await divElement.getText();

        console.log("Text from the div:", divText);

        assert.strictEqual(divText, expectedText, "Text does not match");
      });

      it("Stolen Card Decline", async function () {
        await driver
          .wait(until.elementLocated({ id: "products-page" }))
          .click();
        await driver
          .wait(until.elementLocated({ id: "product-0" }), 10000)
          .click();
        await driver
          .findElement({ css: 'button[type="button"][title="Buy Now"]' })
          .click();
        await fillForm("4000000000009979");

        let selector = By.css("#cardNumber-fieldset-inner > div:nth-child(4)");

        let expectedText = "Your card has been declined.";
        await driver.wait(
          async () => await textMatches(driver, selector, expectedText),
          10000,
          `Text did not match the expected value: "${expectedText}"`
        );

        let divElement = await driver.findElement(selector);
        let divText = await divElement.getText();

        console.log("Text from the div:", divText);

        assert.strictEqual(divText, expectedText, "Text does not match");
      });

      it("Incorrect Number Decline", async function () {
        await driver
          .wait(until.elementLocated({ id: "products-page" }))
          .click();
        await driver
          .wait(until.elementLocated({ id: "product-0" }), 10000)
          .click();
        await driver
          .findElement({ css: 'button[type="button"][title="Buy Now"]' })
          .click();
        await fillForm("4242424242424241");

        let selector = By.css("#cardNumber-fieldset-inner > div:nth-child(4)");

        let expectedText = "Your card number is invalid.";
        await driver.wait(
          async () => await textMatches(driver, selector, expectedText),
          10000,
          `Text did not match the expected value: "${expectedText}"`
        );

        let divElement = await driver.findElement(selector);
        let divText = await divElement.getText();

        console.log("Text from the div:", divText);

        assert.strictEqual(divText, expectedText, "Text does not match");
      });

      it("Always Block Fraud", async function () {
        await driver
          .wait(until.elementLocated({ id: "products-page" }))
          .click();
        await driver
          .wait(until.elementLocated({ id: "product-0" }), 10000)
          .click();
        await driver
          .findElement({ css: 'button[type="button"][title="Buy Now"]' })
          .click();
        await fillForm("4100000000000019");

        let selector = By.css("#cardNumber-fieldset-inner > div:nth-child(4)");

        let expectedText =
          "Your card was declined. Please contact your issuer.";
        await driver.wait(
          async () => await textMatches(driver, selector, expectedText),
          10000,
          `Text did not match the expected value: "${expectedText}"`
        );

        let divElement = await driver.findElement(selector);
        let divText = await divElement.getText();

        console.log("Text from the div:", divText);

        assert.strictEqual(divText, expectedText, "Text does not match");
      });
    });
  },
  { browsers: [Browser.EDGE] }
);
