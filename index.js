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