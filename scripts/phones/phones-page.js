'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import Sorting from './components/sorting.js'
import Search from "./components/search.js";
import ShoppingCart from "./components/shopping-cart.js";
import PhoneViewer from "./components/phone-viewer.js";

export default class PhonesPage {
    constructor({element}) {
        this._element = element;

        this._filter = {
            query: '',
             sort: {
                order: 'name',
                 type: 'text'
             },
        };

        this._initCatalog();
        this._initViewer();
        this._initShoppingCart();
        this._initFilter();

        this._refreshPhones();


    }

    _initCatalog() {
        this._catalog = new PhonesCatalogue({
            element: this._element.querySelector('[data-component="phones-catalog"]'),
        });

        this._catalog.on('phoneSelected', (event) => {
            let phoneId = event.detail;

            PhonesService.loadPhone(phoneId, (phone) => {
                this._viewer.show(phone);
                this._catalog.hide();
            });
        });

        this._catalog.on('add', (event) => {
            let phoneId = event.detail;

            this._shoppingCart.addItem(phoneId);
        });

    }

    async  _refreshPhones() {
        const callback = (phones) => {
            this._catalog.setPhones(phones);
        };

        PhonesService.loadPhones(this._filter, callback);
    }

    _initFilter() {
        this._phoneSorting = new Sorting({
            element: this._element.querySelector('[data-component="sorting"]')
        });
        this._phoneSorting.on('phoneSorting', (event) => {
            debugger;
            this._filter.sort = event.detail;
            this._refreshPhones()
        });

        this._phoneSearch = new Search({
            element: this._element.querySelector('[data-component="search"]'),
        });
        this._phoneSearch.on('phoneSearch', (event) => {
           this._filter.query = event.detail.value;
           this._refreshPhones()
           });
    }

    _initShoppingCart()  {
        this._shoppingCart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]'),
        });


    }

    _initViewer() {
        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]'),
        });

        this._viewer.on('back', () => {
            this._viewer.hide();
            this._catalogue.show();
        });

        this._viewer.on('add', (event) => {
            let phoneId = event.detail;

            this._shoppingCart.addItem(phoneId);
        });

    }
}
