import { Browser, until } from "selenium-webdriver";
import { suite } from "selenium-webdriver/testing/index.js";
import { Options } from "selenium-webdriver/edge.js";
import assert from "assert";

suite(
  function (env) {
    describe("Test Authentication", function () {
      it("Successful Login", async function () {
        let options = new Options();
        let driver = await env.builder().setEdgeOptions(options).build();

        await driver.get("http://localhost:3000");
        await driver
          .findElement({ id: "email" })
          .sendKeys("customer@example.com");
        await driver.findElement({ id: "password" }).sendKeys("123456");
        await driver.findElement({ id: "signin" }).click();

        let homePageElement = await driver.wait(
          until.elementLocated({ id: "home" }),
          10000
        );

        assert(await homePageElement.isDisplayed());

        await driver.quit();
      });

      it("Wrong Password", async function () {
        let options = new Options();
        let driver = await env.builder().setEdgeOptions(options).build();

        await driver.get("http://localhost:3000");
        await driver
          .findElement({ id: "email" })
          .sendKeys("customer@example.com");
        await driver.findElement({ id: "password" }).sendKeys("654321");
        await driver.findElement({ id: "signin" }).click();

        let errorButton = await driver.wait(
          until.elementLocated({ id: "error" }),
          10000
        );

        let errorText = await errorButton.getText();

        assert.equal(errorText, "INCORRECT PASSWORD. PLEASE TRY AGAIN?");

        await driver.quit();
      });

      it("Wrong Email", async function () {
        let options = new Options();
        let driver = await env.builder().setEdgeOptions(options).build();

        await driver.get("http://localhost:3000");
        await driver
          .findElement({ id: "email" })
          .sendKeys("fakeCustomer@example.com");
        await driver.findElement({ id: "password" }).sendKeys("123456");
        await driver.findElement({ id: "signin" }).click();

        let errorButton = await driver.wait(
          until.elementLocated({ id: "error" }),
          10000
        );

        let errorText = await errorButton.getText();

        assert.equal(
          errorText,
          "USER NOT FOUND. INCORRECT EMAIL OR PASSWORD. PLEASE TRY AGAIN?"
        );

        await driver.quit();
      });

      it("Wrong Email Format", async function () {
        let options = new Options();
        let driver = await env.builder().setEdgeOptions(options).build();

        await driver.get("http://localhost:3000");
        await driver
          .findElement({ id: "email" })
          .sendKeys("customer/example.com");
        await driver.findElement({ id: "password" }).sendKeys("123456");
        await driver.findElement({ id: "signin" }).click();

        let emailError = await driver.wait(
          until.elementLocated({ id: "email-helper-text" }),
          10000
        );

        let errorText = await emailError.getText();

        assert.equal(errorText, "Invalid email format");

        await driver.quit();
      });

      it("Wrong Password Format", async function () {
        let options = new Options();
        let driver = await env.builder().setEdgeOptions(options).build();

        await driver.get("http://localhost:3000");
        await driver
          .findElement({ id: "email" })
          .sendKeys("customer@example.com");
        await driver.findElement({ id: "password" }).sendKeys("123");
        await driver.findElement({ id: "signin" }).click();

        let emailError = await driver.wait(
          until.elementLocated({ id: "password-helper-text" }),
          10000
        );

        let errorText = await emailError.getText();

        assert.equal(errorText, "Password must be at least 4 characters");

        await driver.quit();
      });
    });
  },
  { browsers: [Browser.EDGE] }
);
