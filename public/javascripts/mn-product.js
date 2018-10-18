//https://alligator.io/web-components/attributes-properties/

(function() {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>
        .mn-product-content {
            border-style: dashed;
            padding: 3px;
        }
    </style>
    <div  class="mn-product-content">
        <span id="product-title">..</span>
        <hr />
        <div>
            <span>Searching for: </span>
            <span id="search-query">...</span>
            <hr />
            <div id="prods"></div>
        </div>
    </div>
  `;

  class MnProduct extends HTMLElement {
    constructor() {
      super();

        //this.submit = this.submit.bind(this);
        this.getProduct = this.getProduct.bind(this);

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //this.submitBtn = this.shadowRoot.querySelector('#submit');
        //this.textValue = this.shadowRoot.querySelector('#search');
        this.productTitleLabel = this.shadowRoot.querySelector('#product-title');
        this.searchQueryLabel = this.shadowRoot.querySelector('#search-query');
        this.prods = this.shadowRoot.querySelector('#prods');

        // adding custom events
        // Create a new event, allow bubbling, and provide any data you want to pass to the "details" property
        //this.eventSearch = new CustomEvent('search', {
          //  bubbles: true,
            //detail: { text: () => this.textValue.value }
        //});
    }

    static get observedAttributes() {
      return ['product-title', 'q'];
    }

    connectedCallback() {
        //this.submitBtn.addEventListener('click', this.submit);

        if (this.hasAttribute('product-title')) {
            this.setAttribute('product-title', this.productTitle);
        } else {
            this.setAttribute('product-title', 'Product:');
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attbChg=' + name);
        this.productTitleLabel.textContent = this.productTitle;
        
        if (name === 'q'){
            var criteria = this.getAttribute('q');
            console.log('in prod-' + criteria);
            this.searchQueryLabel.textContent = criteria;
            if (criteria != undefined && criteria.length > 0) {
                var prods = this.getProduct(criteria);
                console.log(prods);
                this.displayProduct(prods);
            }
        }
    }

    disconnectedCallback() {
      //this.submitBtn.removeEventListener('click', this.submit);
    }


    //submit() {
      //  console.log('submit..');
        //this.dispatchEvent(this.eventSearch);
    //}

    get productTitle() {
      return this.getAttribute('product-title');
    }

    set productTitle(newValue) {
      this.setAttribute('product-title', newValue);
    }

    getProduct(pname){
        var data = this.getSampleData();
        //console.log(data);
        pname = pname.toLowerCase();
        var p = data.filter(x => {
            return x.category.startsWith(pname);
        });
        return p;
    }

    displayProduct(data) {
        console.log('in tbl');
        console.log(data);
        if (data === undefined || data === null || data.length === 0){
            this.prods.innerHTML = 'Cannot find products!';
            return false;
        } 

        var items = data[0].products;
        var tblHdr = `<table border='1'><tbody>`;
        var tmp;
        for (var i=0; i<items.length; i++){
            tmp += '<tr><td>' + items[i] + '</td></tr>';
        }
        var tblFtr = `</tbody></table>`;

        this.prods.innerHTML = tblHdr + tmp + tblFtr;
    }


    // get mock data - should come from api call
    getSampleData() {
        return [
            {
                "category": "computer",
                "products": ["Asus 15in", "Thinkpad 17in", "HP zbook 17in", "Dell XPS 360"]
            },
            {
                "category": "books software",
                "products": ["Java 8 3rd Edition", "ASP.Net Introduction", "Docker 101"]
            },
            {
                "category": "books novels",
                "products": ["Angels in the Dark", "Midnight Run", "Brave New World", "To The Lighthouse"]
            },
            {
                "category": "electronics",
                "products": ["iPhone 6s", "Samsung 3g"]
            }
        ];
    }



  }

  window.customElements.define('mn-product', MnProduct);
})();