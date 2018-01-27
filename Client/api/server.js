import express from 'express';
import PictureRoutes from './routes/pictureRoutes';
import fs from 'fs';
import Helpers from './utils/helpers';
import Service from './service';

let port = process.env.PORT || 3000;
let ACTIONS_FOLDER = "./actions/";
let ACTIONS_CONFIG_FILE = "./api/configuration/actions.json";

let helpers = new Helpers();
let actionsCofig = helpers.readJSONFile(ACTIONS_CONFIG_FILE);

actionsCofig.forEach(function (elem) {
    if (elem.action && elem.path) {
        if (!elem.action.template) {
            elem.action = require(ACTIONS_FOLDER + elem.action).action;
            console.log(elem.action);
        }
    } else {
        console.log("unknown configuration: " + JSON.stringify(elem));
    }
});

//Routes
//let pictureRouters = new PictureRoutes(app);

let appService = new Service(actionsCofig);
appService.run(port);

export default appService

