//https://alligator.io/web-components/attributes-properties/

(function() {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>
        .comp2-content {
            border-style: dashed;
            padding: 5px;
        }
    </style>
    <div  class="comp2-content">
        <div>component2</div>
        <br />
        <div id="display">...</div>
    </div>
  `;

  class Comp2 extends HTMLElement {
    constructor() {
      super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.displayValue = this.shadowRoot.querySelector('#display');

        // adding custom events
        // Create a new event, allow bubbling, and provide any data you want to pass to the "details" property
        //this.eventAwesome = new CustomEvent('awesome', {
          //  bubbles: true,
            //detail: { text: () => this.textValue.value }
        //});
    }

    connectedCallback() {
        console.log('conn cb');
        if (!this.hasAttribute('value')) {
            this.setAttribute('value', "");
        }
    }

    static get observedAttributes() {
      return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.displayValue.innerText = this.value;
    }

    get value() {
      return this.getAttribute('value');
    }

    set value(newValue) {
      this.setAttribute('value', newValue);
    }

    disconnectedCallback() {
    }
  }

  window.customElements.define('comp-2', Comp2);
})();