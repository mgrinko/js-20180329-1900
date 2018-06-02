'use strict';

import httpGet from "../../utils/httpGet.js";
const apiaddr = 'http://localhost:3000/api';

const PhonesService = {
  getPhones() {
      return httpGet(apiaddr+'/phones.json');
  },

  getPhoneById(id){
      return httpGet(`${apiaddr}/phones/${id}.json`);
  },

  filterPhones(phones, filter){
      return phones.filter((phone)=>{
          return !filter || phone.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      })
  },
  sortPhones(phones, sortBy){
      return phones.sort((f1, f2)=>{
          return f1[sortBy] > f2[sortBy] ? 1 : -1;
      })
  }


};

export default PhonesService;