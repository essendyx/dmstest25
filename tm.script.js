// ==UserScript==
// @name         OMM AI
// @namespace    http://tampermonkey.net/
// @version      2025-02-06
// @description  try to take over the world!
// @author       You
// @match        https://extract.omm.cloud/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=omm.cloud
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Ersetzt das Textlogo "DataExtract" durch das DMS Automation-Bild.
     */
    function replaceLogo() {
        const logoElement = document.querySelector('.logo');
        if (logoElement) {
            logoElement.innerHTML = '<img src="https://www.dms-gruppe.de/wp-content/uploads/2022/08/DMS_Automation-1024x195.png" alt="DMS Automation Logo" style="max-height: 60px; width: auto;">';
        }
    }

    /**
     * Fügt CSS-Regeln ein, die den Look der Seite an das CD/CI von DMS Automation anpassen.
     */
    function injectCustomStyles() {
        const customCSS = `
            /* Grundlegende Schriftart und Farben */
            html, body {
                background-color: #ffffff !important;
                font-family: 'Open Sans', sans-serif !important;
                color: #333333 !important;
            }

            /* Navigation / Seitenleiste */
            .side-menu {
                background-color: #ffffff !important;
                border-right: 2px solid #003366 !important;
                padding: 1rem;
            }
            .side-menu a {
                color: #C73E2C !important;
                font-weight: 600;
                text-decoration: none;
                margin-bottom: 1rem;
                display: block;
            }
            .side-menu a.active {
                background-color: #C73E2C !important;
                color: #ffffff !important;
                padding: 0.5rem 1rem;
                border-radius: 4px;
            }

            /* Logo – wird über replaceLogo() eingefügt */
            .logo {
                /* zentriert evtl. das Logo, je nach Bedarf */
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1rem;
            }

            /* Allgemeine Button-Stile */
            .p-button, .p-button > button {
                background-color: #C73E2C !important;
                border-color: #C73E2C !important;
                color: #ffffff !important;
                font-weight: 600;
            }
            .p-button:hover, .p-button > button:hover {
                background-color: #002244 !important;
                border-color: #002244 !important;
            }

            /* Tabellendesign */
            .p-datatable-thead th {
                background-color: #C73E2C !important;
                color: #ffffff !important;
                font-family: 'Open Sans', sans-serif !important;
                font-weight: 600 !important;
                padding: 0.5rem !important;
            }
            .p-datatable-tbody tr {
                border-bottom: 1px solid #dddddd !important;
            }
            .p-datatable-tbody td {
                padding: 0.5rem !important;
            }

            /* Paginierung */
            .p-paginator {
                background-color: #f4f4f4 !important;
                border-top: 1px solid #dddddd !important;
                padding: 0.5rem;
            }
            .p-paginator-page.p-highlight {
                background-color: #C73E2C !important;
                color: #ffffff !important;
            }

            /* Überschriften */
            h1, h2, h3, h4, h5, h6 {
                color: #C73E2C !important;
                font-family: 'Open Sans', sans-serif !important;
            }

            /* Weitere Anpassungen für CD/CI */
            /* Beispiel: Links in Buttons und sonstige Elemente */
            a, .p-link {
                color: #C73E2C !important;
            }

            /* Falls Checkboxen/Filter/andere Controls angepasst werden sollen */
            .p-checkbox .p-checkbox-box,
            .p-dropdown .p-dropdown-label {
            }
        `;
        const styleEl = document.createElement('style');
        styleEl.type = 'text/css';
        styleEl.appendChild(document.createTextNode(customCSS));
        document.head.appendChild(styleEl);
    }

    /**
     * Initialisiert die Anpassungen
     */
    function init() {
        replaceLogo();
        injectCustomStyles();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Damit auch spätere DOM-Änderungen (z. B. durch Angular) berücksichtigt werden:
const observer = new MutationObserver((mutations) => {
    const logoElement = document.querySelector('.logo');
    // Nur ersetzen, wenn das Logo noch den Originaltext enthält.
    if (logoElement && logoElement.textContent.trim() === 'DataExtract') {
        replaceLogo();
    }
});
observer.observe(document.body, { childList: true, subtree: true });

})();
