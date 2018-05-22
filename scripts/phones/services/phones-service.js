'use strict';

const PhonesService = fetch('./phones/phones.json')
  .then(response =>  response.json());
  
export default PhonesService;


