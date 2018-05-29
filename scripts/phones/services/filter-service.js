'use strict';

const FilterService = {
	filter({query, phones, element}) {
	  for (const phone of phones) {
	    element.querySelector(`[data-phone-id="${phone.id}"]`)
	      .classList.toggle('hidden', !phone.name.toUpperCase().includes(query.toUpperCase()));
	  }

	  return element.querySelectorAll('.hidden').length <  Object.keys(phones).length;
	}
}

export default FilterService;
