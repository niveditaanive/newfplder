/*import { parse } from 'json2csv';

import axios from 'axios';
import  cheerio  from 'cheerio';
(async () => {
  const response = await axios('https://www.use.or.ug/content/corporate-announcements');
  const $ = cheerio.load(response.data);
  const arr=[];
  $('tbody>tr').each((i,el)=>{
    
    arr.push($(el).text());
  });
  console.log(arr);
  const text= $('tbody>tr:nth-child(1)').text();
  console.log(text);
})();
const announcemetns = $('.announcements');
import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';

const websiteUrl = 'https://www.use.or.ug/content/corporate-announcements';
const response = await gotScraping(websiteUrl);
const html = response.body;
const $ = cheerio.load(html);
const announcements = $('.announcements');
for (const announcements of announcements) {
  const announcementsElement = $(announcements);
  const announcementsText = announcementsElement.text();

  console.log(announcements);
}*/
import cheerio from "cheerio";
import axios from "axios";
import { parse } from 'json2csv';

const url = "https://www.use.or.ug/content/corporate-announcements";

const results = [];

(async () => {
  const res = await axios(url);
 
  const $ = cheerio.load(res.data);

  const dataelem = $("tbody>tr");
  
  for (const element of dataelem) {
       const titleElement = $(element).find("a");
    const announcement = titleElement.text().trim();

    const sizeElement = $(element).find("td:nth-child(2)");
    const size = sizeElement.text();

    const dateElement = $(element).find("td:nth-child(3)");
    const date = dateElement.text();

       results.push({ announcement, size, date });
  }
    const csv = parse(results);
    console.log(results);
    //console.log(csv);
    
})();
import cheerio from "cheerio";
import axios from "axios";
import { parse } from 'json2csv';
import fs from 'fs';
import open from 'open'; // Import the 'open' package

const url = "https://gse.com.gh/press-releases/";

async function mainurl() {
  try {
    const res = await axios(url);
    const $ = cheerio.load(res.data);
    const dataele = $(".nectar-post-grid-item");
    const results = [];

    for (const ele of dataele) {
      const name = $(ele).find("span.meta-category>a");
      const company_name = name.text().trim();

      const date_ele = $(ele).find("span.meta-date");
      const date = date_ele.text();

      const head_ele = $(ele).find(".post-heading>a:nth-child(1)");
      const pressnote = head_ele.text();

      const pdfbase = $(ele).find("a.nectar-post-grid-link").attr("href");

      results.push({ company_name, date, pressnote, pdfbase });
    }

    await innnerurl(results);
  } catch (error) {
    console.error("Error in mainurl:", error);
  }
}

async function innnerurl(results) {
  try {
    for (const ele of results) {
      const res = await axios(ele.pdfbase);
      const $ = cheerio.load(res.data);
      const pdflink = $("div.content-inner")
        .find("figure>iframe.embed-pdf-viewer.lazyload")
        .attr("data-src");
      
      // Download the PDF
      if (pdflink) {
        const pdfFileName = ele.company_name + "_" + ele.date + ".pdf"; // You can adjust the file naming as per your needs
        const pdfResponse = await axios({ method: "get", url: pdflink, responseType: "stream" });
        const pdfStream = pdfResponse.data;
        const writeStream = fs.createWriteStream(pdfFileName);
        pdfStream.pipe(writeStream);

        writeStream.on("finish", () => {
          console.log(`Downloaded: ${pdfFileName}`);
          // Open the downloaded PDF file
          //open(pdfFileName);
        });
      }
    }
  } catch (error) {
    console.error("Error in innnerurl:", error);
  }
}

mainurl();
