import { Browser, Key, until } from "selenium-webdriver";
import { suite } from "selenium-webdriver/testing/index.js";
import { Options } from "selenium-webdriver/edge.js";
import assert from "assert";

suite(
  function (env) {
    describe("Test Filter", function () {
      let options = new Options();
      let driver;

      beforeEach(async function () {
        driver = await env.builder().setEdgeOptions(options).build();

        await driver.get("http://localhost:3000");
        await driver
          .findElement({ id: "email" })
          .sendKeys("customer@example.com");
        await driver.findElement({ id: "password" }).sendKeys("123456");
        await driver.findElement({ id: "signin" }).click();
      });

      afterEach(async function () {
        await driver.quit();
      });

      it("Test Search", async function () {
        let searchBox = await driver.wait(
          until.elementLocated({ id: "search" }),
          10000
        );
        await searchBox.sendKeys("Pet", Key.ENTER);

        let productNameElement = await driver.wait(
          until.elementLocated({ id: "product-name" }),
          10000
        );

        let productNameText = await productNameElement.getText();
        assert(
          productNameText.includes("Pet"),
          "Similar search results not found"
        );
      });

      it("Test Category", async function () {
        let productLink = await driver.wait(
          until.elementLocated({ id: "products-page" }),
          10000
        );

        await productLink.click();

        let checkboxes = await driver.findElement({
          id: "category-checkboxes",
        });
        await checkboxes.click();

        let option = await driver.wait(
          until.elementLocated({ id: "category-checkboxes-option-1" }),
          10000
        );
        await option.click();
      });

      // TEST PRICE FILTER
      async function initCheckPrice(idOption1, idOption2) {
        let productLink = await driver.wait(
          until.elementLocated({ id: "products-page" }),
          10000
        );

        await productLink.click();

        let price1 = await driver.findElement({
          id: "min-price",
        });
        await price1.click();

        let option1 = await driver.findElement({
          id: idOption1,
        });
        await option1.click();

        let price2 = await driver.findElement({
          id: "max-price",
        });
        await price2.click();

        let option2 = await driver.findElement({
          id: idOption2,
        });
        await option2.click();
      }

      async function checkPriceInRange(element, minPrice, maxPrice) {
        let priceText = await element.getText();
        let price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));

        assert(
          price >= minPrice && price <= maxPrice,
          `Price ${price} is out of range`
        );
      }

      it("Test Minimum Price", async function () {
        await initCheckPrice("min-price-option-1", "max-price-option-4");
        let minPrice = await driver
          .findElement({ id: "min-price", type: "input" })
          .getAttribute("value");
        let maxPrice = await driver
          .findElement({ id: "max-price", type: "input" })
          .getAttribute("value");
        let maxPriceValue = maxPrice === "Highest" ? Infinity : maxPrice;

        await driver.wait(
          until.elementLocated({ css: "[id^='discount-price-']" }),
          10000
        );

        let priceElements = await driver.findElements({
          css: "[id^='discount-price-']",
        });

        for (let element of priceElements) {
          await checkPriceInRange(element, minPrice, maxPriceValue);
        }
      });

      it("Test Maximum Price", async function () {
        await initCheckPrice("min-price-option-1", "max-price-option-3");

        let minPrice = await driver
          .findElement({ id: "min-price", type: "input" })
          .getAttribute("value");
        let maxPrice = await driver
          .findElement({ id: "max-price", type: "input" })
          .getAttribute("value");
        let maxPriceValue = maxPrice === "Highest" ? Infinity : maxPrice;

        await driver.wait(
          until.elementLocated({ css: "[id^='discount-price-']" }),
          10000
        );

        let priceElements = await driver.findElements({
          css: "[id^='discount-price-']",
        });

        for (let element of priceElements) {
          await checkPriceInRange(element, minPrice, maxPriceValue);
        }
      });

      it("Test Manual Price", async function () {
        let productLink = await driver.wait(
          until.elementLocated({ id: "products-page" }),
          10000
        );

        await productLink.click();

        let price1 = await driver.findElement({
          id: "min-price",
        });
        price1.clear();
        price1.sendKeys(4000);
        let price2 = await driver.findElement({
          id: "max-price",
        });
        price2.clear();
        price2.sendKeys(5000);

        await driver.wait(
          until.elementLocated({ css: "[id^='discount-price-']" }),
          10000
        );

        let priceElements = await driver.findElements({
          css: "[id^='discount-price-']",
        });

        for (let element of priceElements) {
          await checkPriceInRange(element, 4000, 5000);
        }
      });

      it("Test Invalid Price", async function () {
        await initCheckPrice("min-price-option-3", "max-price-option-1");

        let errorText = await driver
          .findElement({
            id: "error-text",
          })
          .getText();

        assert.equal(
          errorText,
          "The product you're looking for doesn't exist."
        );
      });
    });
  },
  { browsers: [Browser.EDGE] }
);
