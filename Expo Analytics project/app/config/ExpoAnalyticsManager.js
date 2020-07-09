import { Analytics, PageHit, ScreenHit, Event, Transaction, AddItem } from 'expo-analytics';
import { Platform, NativeModules } from 'react-native';

/**
 * Singleton ExpoAnalyticsManager beheerd de Expo Analytics library.
 * Wordt enkel aangemaakt in het begin als de instantie null is.
 */
export default class ExpoAnalyticsManager {

    /**
     * ExpoAnalyticsManager instantie
     * 
     * Standaardwaarde = null
     * 
     * Wordt geïnitialiseerd wanneer getInstance() wordt aangesproken als het null is
     */
    static instance = null;

    /**
     * Variabele transid is de transactie nummer
     * 
     * Standaardwaarde = 1234
     */
    transid = 1234;

    /**
     * Expo Analytics object.
     * 
     * Standaardwaarde = null
     * 
     * Wordt elke keer geïnitialiseerd wanneer getInstance() wordt aangesproken.
     */
    _analytics = null;

    /**
     * Geeft de ExpoAnalyticsManager instantie terug waarbij de variabele instance niet null
     * is en variabele _analytics een nieuw expo analytics object bevat.
     * 
     * Deze methode zal ook de taal van het toestel bepalen en doorgeven aan het params object.
     * 
     * @param {Object} [params] - bevat geen of verschillende parameters deze parameters kan je
     * vinden op: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
     */
    static getAnalytics(params) {
        if(ExpoAnalyticsManager.instance ==null){
            ExpoAnalyticsManager.instance = new ExpoAnalyticsManager();
        }
        const deviceLanguage =
            Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
            : NativeModules.I18nManager.localeIdentifier;
        parameters = {...params,ul:deviceLanguage}
        this.instance._analytics = new Analytics("UA-153309176-1",parameters);
        return this.instance;
    }

    /**
     * Deze methode zal een pagina hit versturen met een bepaalde naam,
     * deze wordt dan in de terminal weergeven voor debuggings mogelijkheden,
     * indien er een foutmelding optreed dan wordt deze opgevangen en weergegeven in de terminal.
     * @param {string} name - naam van de pagina dat wordt bezocht
     */
    pageHit(name){
        this._analytics.hit(new PageHit(name))
            .then(() => console.log("succes " + name))
            .catch(e => console.log(e.message));
    }

    /**
     * Deze methode zal een scherm hit versturen met een bepaalde naam,
     * deze wordt dan in de terminal weergeven voor debuggings mogelijkheden,
     * indien er een foutmelding optreed dan wordt deze opgevangen en weergegeven in de terminal.
     * @param {string} name - naam van de pagina dat wordt bezocht
     */
    screenHit(name){
        this._analytics.hit(new ScreenHit(name))
            .then(() => console.log("succes " + name))
            .catch(e => console.log(e.message));
    }

    /**
     * Deze methode zal een event versturen met een bepaalde categorie, actie, label en waarde,
     * deze wordt dan in de terminal weergeven voor debuggings mogelijkheden,
     * indien er een foutmelding optreed dan wordt deze opgevangen en weergegeven in de terminal.
     * 
     * Wanneer er een event verstuurt wordt vergeet niet om een pad naam en pagina titel mee door
     * te sturen met de analytics instantie vb.: instantie.getAnalytics({dp:"/pad naam", dt:"Pagina Naam"}).event(...);
     * 
     * @param {string} category - categorie event vb. "Like"
     * @param {string} action - actie event vb. "Like-Bourbon-and-Brown-Sugar-Flank-Steak"
     * @param {string} [optReclabel=null] - label is optioneel maar aanbevolen e.g. "Bourbon and Brown Sugar Flank Steak"
     * @param {number} [optvalue=null] - waarde is optioneel, maar wordt meestal op 1 geplaatst
     */
    event(category,action,optReclabel=null,optvalue=null){
        this._analytics.event(new Event(category, action, optReclabel, optvalue))
            .then(() => console.log("Succes Category: " + category + ". Action: " + action + ". Label: " + optReclabel + ". Value: " + optvalue ))
            .catch(e => console.log(e.message));
    }

    /**
     * Deze methode zal een dimensie toevoegen, deze dimensie moet weliswaar eerst aangemaakt
     * worden in Google Analytics zelf alvorens deze te kunnen gebruiken.
     * 
     * Om de data hiervan weldegelijk te meten moet er een pagehit worden verstuurd nadien
     * anders zal er verkeerde data meegezonden worden met deze dimensie.
     * 
     * @param {number} id - id van de dimensie deze waarde kan terug gevonden worden in
     * Google Analytics in Admin -> [select property] -> Custom Definitions -> Custom Dimensions
     * @param {(number|string)} value - waarde dat moet worden opgevolgd, deze waarde kan
     * ofwel een getal zijn ofwel text
     */
    addCustomDimension(id,value){
        this._analytics.addCustomDimension(id,value);
    }

    /**
     * Deze methode zal een metric toevoegen, deze metric moet weliswaar eerst aangemaakt
     * worden in Google Analytics zelf alvorens deze te kunnen gebruiken.
     * 
     * Om de data hiervan weldegelijk te meten moet er een pagehit worden verstuurd nadien
     * anders zal er verkeerde data meegezonden worden met deze metric.
     * 
     * @param {number} id - id van de metric deze waarde kan terug gevonden worden in
     * Google Analytics in Admin -> [select property] -> Custom Definitions -> Custom Metrics
     * @param {(number|string)} value - waarde dat moet worden opgevolgd, deze waarde kan
     * ofwel een getal zijn ofwel text
     */
    addCustomMetric(id,value){
        this._analytics.addCustomMetric(id,value);
    }

    /**
     * Deze methode is voor het verwijderen van een bepaalde dimensie, dit is voornamelijk
     * om er voor te zorgen dat deze enkel zal werken op bepaalde plaatsen binnen de code.
     * 
     * Deze methode wordt na de pagehit geplaatst zodat de dimensie enkel bestaat bij die
     * bepaalde pagehit en dus niet wordt meegestuurd met andere pagehits.
     * 
     * @param {number} id - id van de dimensie deze waarde kan terug gevonden worden in
     * Google Analytics in Admin -> [select property] -> Custom Definitions -> Custom Dimensions
     */
    removeCustomDimension(id){
        this._analytics.removeCustomDimension(id);
    }

    /**
     * Deze methode is voor het verwijderen van een bepaalde metric, dit is voornamelijk
     * om er voor te zorgen dat deze enkel zal werken op bepaalde plaatsen binnen de code.
     * 
     * Deze methode wordt na de pagehit geplaatst zodat de metric enkel bestaat bij die
     * bepaalde pagehit en dus niet wordt meegestuurd met andere pagehits.
     * 
     * @param {number} id - id van de metric deze waarde kan terug gevonden worden in
     * Google Analytics in Admin -> [select property] -> Custom Definitions -> Custom Metrics
     */
    removeCustomMetric(id){
        this._analytics.removeCustomMetric(id);
    }

    /**
     * Deze methode is voor het aanmaken van een transactie zodat er nadien items
     * aantoegevoegd kunnen worden.
     * 
     * @param {string} [optAffiliation] - naam van de app of business, optioneel
     * @param {number} [optRecRevenue] - totaal bedrag van de transactie/aankoop, optioneel
     * maar aangeraden
     * @param {number} [optShipping] - bedrag voor transport, optioneel
     * @param {number} [optTax] - bedrag voor belasting, optioneel
     */
    sendTransaction(optAffiliation, optRecRevenue, optShipping, optTax){
        this.transid++;
        this._analytics.hit(new Transaction(this.transid, optAffiliation, optRecRevenue, optShipping, optTax))
            .then(() => console.log('id: ' + this.transid + ', affiliation: ' + optAffiliation + ', revenue: ' + optRecRevenue + ', shipping: ' + optShipping + ', tax: ' + optTax))
            .catch(e => console.log(e.message));
    }

    /**
     * Deze methode is voor het toevoegen van een item aan een transactie.
     * 
     * Deze methode wordt aangeroepen nadat een transactie is aangemaakt, gelieve wel ervoor
     * te zorgen dat er telkens een andere transactie id wordt meegegeven anders zal de
     * transactie niet meer kloppen in Google Analytics.
     * 
     * @param {string} name - naam van het aangekochte item
     * @param {number} optRecPrice - de prijs voor 1 item, is optioneel maar wel aangeraden
     * @param {number} optQuantity - de hoeveelheid items er aangekocht is, is optioneel
     * @param {string} optRecSku - de Stock Keeping Unit van het product (id), is optioneel
     * maar wel aangeraden
     * @param {string} optRecCategory - de categorie van het item, is optioneel maar wel aangeraden
     */
    addItem(name, optRecPrice, optQuantity, optRecSku, optRecCategory){
        this._analytics.hit(new AddItem(this.transid, name, optRecPrice, optQuantity, optRecSku, optRecCategory))
            .then(() => console.log('id: ' + this.transid + ', name: ' + name + ', price: ' + optRecPrice + ', quantity: ' + optQuantity + ', sku: ' + optRecSku + ', category: ' + optRecCategory))
            .catch(e => console.log(e.message));
    }

}