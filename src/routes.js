/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import moment from 'moment';
import http from './core/HttpClient';
import App from './components/App';
import HomePage from './components/HomePage/HomePage';
import AccessDeniedPage from './components/AccessDeniedPage/AccessDeniedPage';
import jwt from 'jsonwebtoken';
import Config from './config';
import request from 'request';
import Promise from 'promise';


const router = new Router(on => {
  on('*', async (state, next) => {
    // console.log(state);
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/', async () => {
    return <HomePage />;
  });

   on('*', async (state) => {
    const content = await http.get(`/api/content?path=${state.path}`);
    return content && <ContentPage {...content} />;
  });

});

export default router;
