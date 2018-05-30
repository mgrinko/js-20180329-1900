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

        this._catalogue = new PhonesCatalogue({
            element: this._element.querySelector('[data-component="phones-catalog"]')
        });
        this._catalogue.on('add', (event) => {
            let phoneId = event.detail;

            this._shoppingCart.addItem(phoneId);
        });

        PhonesService.loadPhones((phones) => {
            this._catalogue.setPhones(phones);
        });

        // this._catalogue._element.addEventListener('phoneSelected', (event) => {
        this._catalogue.on('phoneSelected', (event) => {
            let phoneId = event.detail;

            PhonesService.loadPhone(phoneId, (phone) => {
                this._viewer.show(phone);
                this._catalogue.hide();
            });
        });

        this._phoneSorting = new Sorting({
            element: this._element.querySelector('[data-component="sorting"]')
        });
        this._phoneSorting.on('phoneSorting', (event) => {
            let query = {
                detail: event.detail,
                value: "sort"
            }
            PhonesService.loadPhones((phones) => {
                this._catalogue.setPhones(phones);
            }, query);
            this._catalogue.show();
        });

        this._phoneSearch = new Search({
            element: this._element.querySelector('[data-component="search"]'),
        });
        this._phoneSearch.on('phoneSearch', (event) => {
            let query = {
                detail: event.detail,
                value: "search"
            }
            PhonesService.loadPhones((phones) => {
                this._catalogue.setPhones(phones);
            }, query);
        });

        this._shoppingCart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]'),
        });

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
