const puppeteer = require("puppeteer");

exports.getContributorDGIIData = async (rnc) => {
  const selector = "#cphMain_txtRNCCedula";
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto(
    "https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx"
  );
  await page.waitForSelector(selector);

  await page.click(selector);
  await page.keyboard.type(rnc);

  await page.keyboard.press("Enter");

  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    let data = {};
    const firstCol = document.querySelectorAll('td[style="font-weight:bold;"]');
    const secondCol = document.querySelectorAll(
      'td:not([style="font-weight:bold;"])'
    );

    for (var i = 0; i < firstCol.length; i++) {
      data[firstCol[i].innerText] = secondCol[i].innerText;
    }

    return data;
  });

  await page.close();
  await browser.close();

  return data;
};
