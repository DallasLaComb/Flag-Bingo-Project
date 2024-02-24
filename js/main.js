// main.js
import { loadNavbar } from './navbar.js';
import { setupUIHandlers } from './uiHandlers.js';

$(document).ready(function() {
  loadNavbar();
  setupUIHandlers();
});
