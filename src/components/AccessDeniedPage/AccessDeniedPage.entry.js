/**
 * Created by IamThilina on 4/23/2016.
 */
import globalEntry from './../globalEntry';
import AccessDeniedPage from './AccessDeniedPage';

import React from 'react';

let stringifiedJSON = document.getElementById('props').textContent;
stringifiedJSON = stringifiedJSON.replace(/&(lt|gt|quot);/g, function(mm, pp) {
  return (pp === 'lt') ? '<' : ((pp === 'gt') ? '>' : '"');
});
const props = JSON.parse(stringifiedJSON);

globalEntry(<AccessDeniedPage {...props}/>);
