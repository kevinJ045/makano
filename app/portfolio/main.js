import jQuery from "jquery";
import bootstrap from "bootstrap";

import components from "./components/index.js";
import bootstrap_css from "bootstrap/dist/css/bootstrap.css";
import css from "./css/main.css";


import { Root } from "./libs/gui.js";
import logic from './do.js';

Root.add(components);

logic.term = components.term;

jQuery(document).ready(logic.init);