/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import mongoose from 'mongoose';
const request = require('request');

import Config from './config';
import Cron, {CronJob} from 'cron';

import Sponsor from './models/sponsors';

const server = global.server = express();
const port = process.env.PORT || 5000;

// create database connection in here, so the app can use it globally.
mongoose.connect('mongodb://dev:educate@ds047514.mongolab.com:47514/educatelanka');

server.set('port', port);

// use body parser so we can get info from POST and/or URL parameters
// use cookie parser so we can cookie to authenticate requsets for private pages
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));

server.use(express.static(path.join(__dirname, '../uploads/sponsors/')));
server.use(express.static(path.join(__dirname, '../uploads/campaigns/')));
server.use(express.static(path.join(__dirname, '../uploads/messages/')));


//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));

/* PUBLIC ROUTES */


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {

  try {
    let statusCode = 200;
    const data = { title: '', story: '', css: '', body: '', myProps: {} };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => {data[key] = value;},
      onPageNotFound: () => statusCode = 404
    };
    await Router.dispatch({ path: req.path, context, req: req, cookie: req.cookies['ELF_COOKIE']}, (state, component) => {
      data.myProps = component.props.children.props;
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});

