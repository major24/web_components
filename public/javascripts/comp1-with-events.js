//https://alligator.io/web-components/attributes-properties/

(function() {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>
    </style>
    <div>
        Search: <input type="text" id="search"></input>
        <button type="button" id="submit">Submit</button>
    </div>
  `;

  class Comp1 extends HTMLElement {
    constructor() {
      super();

        this.submit = this.submit.bind(this);

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.submitBtn = this.shadowRoot.querySelector('#submit');
        this.textValue = this.shadowRoot.querySelector('#search');

        // adding custom events
        // Create a new event, allow bubbling, and provide any data you want to pass to the "details" property
        this.eventAwesome = new CustomEvent('awesome', {
            bubbles: true,
            detail: { text: () => this.textValue.value }
        });
    }

    connectedCallback() {
      this.submitBtn.addEventListener('click', this.submit);

      if (!this.hasAttribute('value')) {
        this.setAttribute('value', "");
      }
    }

    submit() {
        console.log('submit..');
        this.dispatchEvent(this.eventAwesome);
    }

    static get observedAttributes() {
      return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      //this.displayVal.innerText = this.value;
    }

    get value() {
      return this.getAttribute('value');
    }

    set value(newValue) {
      this.setAttribute('value', newValue);
    }

    disconnectedCallback() {
      this.submitBtn.removeEventListener('click', this.submit);
    }




    // The form element listens for the custom "awesome" event and then consoles the output of the passed text() method
    //form.addEventListener('awesome', e => console.log(e.detail.text()));

    // -------------------------



  }

  window.customElements.define('comp-1', Comp1);
})();