(function() {
    const tmpl = document.createElement('template');

    tmpl.innerHTML = `
        <style>
        </style>
        <div>
            <input type="text" id="postcode" value="" />
            <div>
            <span error-msg style="display:none">Invalid postcode</span>
            </div>
        </div>
    `;

    class PostCode extends HTMLElement {
        constructor() {
            super();

            this.postcode_onblur = this.postcode_onblur.bind(this);
            this.postcode_onfocus = this.postcode_onfocus.bind(this);

            this.attachShadow ({mode: 'open'});
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this.postcodeTxt = this.shadowRoot.getElementById("postcode");  // this.shadowRoot.querySelector('[postcode]');
            this.errorMsg = this.shadowRoot.querySelector('[error-msg]');
            console.log(this.errorMsg);
            //const regex =  RegExp("^[A-Za-z][0-9][A-Za-z] ?[0-9][A-Z|a-z][0-9]$");     //"^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$";
            //const regex = RegExp("^[0-9]{5,5}$");
            this.list = [
                {"country":"ca", "regx": "^[A-Za-z][0-9][A-Za-z] ?[0-9][A-Z|a-z][0-9]$" },
                {"country":"us", "regx": "^[0-9]{5,5}$" }
            ]
        } //endof ctor

        connectedCallback() {
            console.log('add eventhandler');
           this.postcodeTxt.addEventListener("blur", this.postcode_onblur);
           this.postcodeTxt.addEventListener("focus", this.postcode_onfocus);

           if (!this.hasAttribute('country')) {
                this.setAttribute('country', 'ca');
            }
        }

        disconnectedCallback() {
            console.log('remove eventhandler');
            this.postcodeTxt.removeEventListener('blur', this.postcode_onblur);
            this.postcodeTxt.removeEventListener("focus", this.postcode_onfocus);
        }

        postcode_onblur(evt$) {
            const pc = evt$.target.value;
            console.log(this.validate_postcode(pc));
            if (!this.validate_postcode(pc)){
                this.errorMsg.style.display = "block";
            }
        }

        postcode_onfocus(evt$) {
            this.errorMsg.style.display = "none";
        }

        validate_postcode(postcode) {
            console.log('country code=' + this.country);
            const rule = this.list.filter((x) => {
                return x.country === this.country;
            }).map((data) => {
                return data.regx;
            } );

            // console.log(rule[0]);
            const regex = RegExp(rule[0]);
            return regex.test(postcode);
        }

        // property related. reqd to get passed in values
        static get observedAttributes() {
            return ['country'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log('in attributeChanged-cb');
        }

        get country() {
            return this.getAttribute('country');
        }
        set country(newValue) {
            this.setAttribute('country', newValue);
        }

    } //endof HTMLElement

    window.customElements.define('post-code', PostCode);
})();