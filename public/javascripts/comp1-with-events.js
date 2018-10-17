//https://alligator.io/web-components/attributes-properties/

(function() {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>
        .comp1-content {
            border-style: groove;
            padding: 5px;
        }
    </style>
    <div  class="comp1-content">
        <div>component1</div>
        <br />
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
  }

  window.customElements.define('comp-1', Comp1);
})();