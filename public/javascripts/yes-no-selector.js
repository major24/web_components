// https://alligator.io/web-components/attributes-properties/

(function() {
    const tmpl = document.createElement('template');

    tmpl.innerHTML = `
                <input type="radio" name= "yes_no"
                    id="selector1"
                    value="yes" />
                <label id="label_selector1" for="selector1">..</label>

                <input type="radio" name="yes_no"
                    id="selector2"
                    value="no" />
                <label id="label_selector2" for="selector2">..</label>
    `;

    class YesNoSelector extends HTMLElement {
        constructor() {
            console.log('init popup');
            super();

            // create shasow root
            this.attachShadow = this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this.selector1 = this.shadowRoot.querySelector('#selector1');
            this.selector2 = this.shadowRoot.querySelector('#selector2');
            this.label_selector1 = this.shadowRoot.querySelector('#label_selector1');
            this.label_selector2 = this.shadowRoot.querySelector('#label_selector2');
        } //endof ctor

        connectedCallback() {
            console.log('in connected-cb');

            if (this.hasAttribute('label1')){
                console.log('found=' + this.getAttribute('label1'));
                this.label_selector1.innerHTML = this.getAttribute('label1');
            } else {
                this.label_selector1.innerHTML = 'Yes'; // default to Yes
            }

            this.hasAttribute('label2') 
                ?  this.label_selector2.innerHTML = this.getAttribute('label2')
                : this.label_selector2.innerHTML = 'No';

            this.hasAttribute('value1') 
                ?  this.selector1.value = this.getAttribute('value1')
                : this.selector1.value = 'yes';

            this.hasAttribute('value2') 
                ?  this.selector2.value = this.getAttribute('value2')
                : this.selector2.value = 'no';
            
            // add event listeners
            this.selector1.addEventListener('click', this.selector1_clicked);
            this.selector2.addEventListener('click', this.selector2_clicked);
        }

        static get observedAttributes() {
            return ['label1', 'label2', 'value1', 'value2'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log('in attributeChanged-cb');
            console.log(name);
            console.log(oldValue);
            console.log(newValue);
            //this.displayVal.innerText = this.value;
        }

        disconnectedCallback() {
            this.selector1.removeEventListener('click', this.selector1_clicked);
            this.selector2.removeEventListener('click', this.selector2_clicked);
        }

        selector1_clicked(e){
            console.log(e.target);
        }

        selector2_clicked(e) {
            console.log(e.target);
        }

    }

    window.customElements.define('yes-no-selector', YesNoSelector);
})();
