/*(()=>{function o(e,t=document.body){return t.querySelector(e)} var n=0("h1").textContent;console.log(data)})*/

import axios from "axios";
import { profileSelectors } from '../config/scrapperSelector';
import { $, $$ } from '../utils/selectors';


function getToken(){
    return document.cookie
    .split(';')
    .find(cookie => cookie.includes(tokenKey))
    .replace(tokenKey-'=','')
    .replaceAll('"','')
    .trim()
    
}

function getContacInfo(){
    try{ 
     const token = getToken('JSESSIONID')

     const [contactInfoName] = $(profileSelectors.contactInfo).href.match(/in\/.+\/o/g) ?? []
  
     const contactInfoURL = 'https://www.linkedin.com/voyager/api/identity/profiles/${contactInfoName.slice(2,-2)}profileContactInfo'
  
        const{data: {data}}  = await axios.get(contactInfoURL, {
          headers:{
          accept:'application/vnd.linkedin.normalized+json+2.1',
          'csrf-token': 'token',
           } 
        })
     return data
    }catch(error){
     console.log(" ~ file: scrapper.js ~ line 30 ~ getContacInfo ~ error", error)
    }
}


function getEducacion(selector){
    const Elements = $$(selector)
    const titles = []

    Elements.forEach((listItem) => {
        const titleElement = $('span[aria-hidden]', listItem)

        const institucion = titleElement[0].textContent
        const titulo = titleElement[1].textContent
        const fecha = titleElement[2].textContent
          
        titles.push({institucion, titulo, fecha})
    })

    return titles
}

function getExperiencia(selector){
    const Elements = $$(selector)
    const titles = []

    Elements.forEach((listItem) => {
        const titleElement = $('span[aria-hidden]', listItem)

        const cargo = titleElement[0].textContent
        const empresa = titleElement[1].textContent
        const fecha = titleElement[2].textContent
        const direccion = !titleElement[3] ? '' : titleElement[3].textContent

        titles.push({cargo, empresa, fecha, direccion})
    })

    return titles
}


async function scrap(){
  
    const name = $(profileSelectors.name).textContent
    const experienceTitles = getExperiencia(profileSelectors.experiencesElements)
    const educationTitles = getEducacion(profileSelectors.educationElements)
    const contactInfo = await getContacInfo()
    const profile = {
      name,
      contactInfo,
      experienceTitles,
      educationTitles
    }
    console.table(profile)
}
 
scrap()