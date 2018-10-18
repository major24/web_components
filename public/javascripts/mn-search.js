//https://alligator.io/web-components/attributes-properties/

(function() {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>
        .mn-search-content {
            border-style: groove;
            padding: 3px;
        }
    </style>
    <div  class="mn-search-content">
        <span id="search-title">..</span>
        <input type="text" id="search"></input>
        <button type="button" id="submit">Submit</button>
    </div>
  `;

  class MnSearch extends HTMLElement {
    constructor() {
      super();

        this.submit = this.submit.bind(this);
        //this.submitOnKeypress = this.submitOnKeypress.bind(this);

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.submitBtn = this.shadowRoot.querySelector('#submit');
        this.textValue = this.shadowRoot.querySelector('#search');
        this.searchTitleLabel = this.shadowRoot.querySelector('#search-title');

        // adding custom events
        // Create a new event, allow bubbling, and provide any data you want to pass to the "details" property
        this.eventSearch = new CustomEvent('search', {
            bubbles: true,
            detail: { text: () => this.textValue.value }
        });


    }

    static get observedAttributes() {
      return ['search-title'];
    }

    connectedCallback() {
        this.submitBtn.addEventListener('click', this.submit);

        if (this.hasAttribute('search-title')) {
            this.setAttribute('search-title', this.searchTitle);
        } else {
            this.setAttribute('search-title', 'Search:');
        }

        this.textValue.addEventListener('input', e => {
            this.submitOnKeypress(e.target);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.searchTitleLabel.textContent = this.searchTitle;
    }

    disconnectedCallback() {
      this.submitBtn.removeEventListener('click', this.submit);
      this.textValue.removeEventListener('input', this.submitOnKeypress);
    }


    submit() {
        console.log('submit..');
        this.dispatchEvent(this.eventSearch);
    }

    submitOnKeypress(e) {
        console.log('submit on keypress..');
        console.log(e.value);
        if (e.value && e.value.length > 3){
            this.dispatchEvent(this.eventSearch);
        }
    }

    get searchTitle() {
      return this.getAttribute('search-title');
    }

    set searchTitle(newValue) {
      this.setAttribute('search-title', newValue);
    }
  }

  window.customElements.define('mn-search', MnSearch);
})();