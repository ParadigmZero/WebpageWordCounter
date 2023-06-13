import {urlResolver, getEmbeddedPageUrls, wordCount, jsCount, cheerioTest} from "../src/index";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Import puppeteer
import puppeteer from 'puppeteer';



// test("urls are properly resolved (with base url) in the urlResolver method", () => {
//     expect(urlResolver("http://www.mydomain.com/","./dir/mypage.html")).toEqual("http://www.mydomain.com/dir/mypage.html");
//     expect(urlResolver("http://www.mydomain.com/","mypage.html")).toEqual("http://www.mydomain.com/mypage.html");
//     expect(urlResolver("http://www.mydomain.com/","http://www.adifferentsite.com")).toEqual("http://www.adifferentsite.com");
// });

// test("The getEmbeddedPageUrls function should extract the url from embedded content tags", () => {
//     expect(getEmbeddedPageUrls(`
//     <html>

// <!-- 
//     Embedding HTML in HTML to a depth of 1,
//     using the three possible methods:
//     iframe, embed and object tags

//     example, 6 embedded elements:
//     - 3 iframes
//     - 2 objects
//     - 1 embed
// -->

// <body>

//     <div>
//         <object data="./index.html"></object>
//     </div>
//     <div>
//         <iframe src="./index.html" title="embeddedItem1">
//         </iframe>
//     </div>
//     <div>
//         <iframe src="./index.html">
//         </iframe>
//     </div>

//     <div>
//         <embed type="text/html" src="./index.html">
//     </div>


//     <div>
//         <iframe src="./index.html">
//         </iframe>
//     </div>

//     <div>
//         <object data="./index.html"></object>
//     </div>


// </body>

// </html>`)).toEqual([ "./index.html","./index.html","./index.html","./index.html",
//     "./index.html","./index.html"]);
// });

// test("Ignore non-HTML embedded elements", () => {
//     expect(getEmbeddedPageUrls(`
//     <html>
// <!-- 
//     TEST
// -->

// <body>
//     <div>
//         <embed type="image/jpg" src="./index.html">
//     </div>
//     <div>
//     <embed type="image/jpg" src="image.jpeg">
// </div>
//     <div>
//         <embed type="video/webm" src="./index.html">
//     </div>

//     <div>
//     <embed type="video/webm" src="./vid.avi">
// </div>

//     <div>
//         <object data="./index.mp4"></object>
//     </div>
//     <div>
//         <object data="http://www.mydomain.com/image.jpg"></object>
//     </div>
// </body>

// </html>`)).toEqual([]);
// });

// test("The wordCount function should return the correct word count for a given page", () => {
//     expect(wordCount("http://paradigmzero.github.io/webpagewordcounter/index.html",[],[])).toEqual(20);
//     expect(wordCount("http://paradigmzero.github.io/webpagewordcounter/depth1embedded.html",[],[])).toEqual(120);
//     expect(wordCount("http://paradigmzero.github.io/webpagewordcounter/depth2embedded.html",[],[])).toEqual(140);
// });

// test("",async ()=>{
//     await jsCount();

//     expect(true).toEqual(true);
// });

// Cheerio cannot deal with JS rendered text, choose
// Puppeteer, maybe playwrite, maybe JSDOM
// test("Cheerio test",()=>{
//     cheerioTest();
// })

test("JSDOM", ()=>{

    // jsdom.defaultDocumentFeatures = { 
    //     FetchExternalResources   : ['script'],
    //     ProcessExternalResources : ['script'],
    //     MutationEvents           : '2.0',
    //     QuerySelector            : false
    //   };

    const dom = new JSDOM(`<html>

    <!-- Simple example how JavaScript assigned text cannot be counted as simply
        as HTML text... REACT pages, for instance, are a prime example of this.
    -->
    <head>      </head>
        <body>
        
        <p id="p1">foobar</p>
        <script>
        document.getElementById("p1").innerText = "one Two three four Five Six Seven";
        </script>
        </body>

    </html> `, {runScripts: "dangerously"});

    console.log(typeof(dom.window.document.getElementById("p1").textContent));
    console.log(dom.window.document.getElementById("p1").textContent);

    // console.log(dom);
    // const { document } = (new JSDOM(`...`)).window;

    // const { window } = new JSDOM(`...`);

    // console.log(window);
    // console.log(dom.window.document);
        // console.log(dom.window.document.querySelector("p").textContent);

});


// test("Puppeteer", async ()=>{
//       // Launch the browser
//   const browser = await puppeteer.launch({headless: true});

//   // Create a page
//   const page = await browser.newPage();

//   // Go to your site
//   await page.goto('https://paradigmzero.github.io/webpagewordcounter/scriptTextComplex.html');

//   const extractedText = await page.$eval('*', (el : any) => el.innerText);
//   console.log(extractedText);

//     // page.waitForSelector('p').then((e)=> console.log(e));

//   await browser.close();

// });
