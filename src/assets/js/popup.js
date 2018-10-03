export default class Popup {

    /**
     * Constructs a new popup
     */
    constructor(message, classes = []) {
        this.createElement(message, classes);
    } 

    /**
     * Creates a new popup element
     * @param {string} message the message to display in the popup
     * @param {string[]} classes optional list of classes to add to the popup
     */
    createElement(message, classes = []) {
        this.el = document.createEasy("div", {
            props: { innerHTML: `<div class="popup-content">${message}</div>` },
            classes: [ "popup" ].concat(classes)
        })

        document.querySelector("body").appendChild(this.el);
    }

    /**
     * Displays the popup
     * @param {int} duration the amount of time in seconds to display the popup.  If 0, it will display until manually hidden
     */
    display(duration = 0) {
        this.el.classList.add("active");

        if(duration > 0) {
            setTimeout(() => this.hide(), duration * 1000);
        }
    }

    /**
     * Hides the popup
     */
    hide() {
        this.el.classList.remove("active");
    }
}