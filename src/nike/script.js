Vue.component('product',{
    props: {
        detail: {
            type: String,
            required: true
        }
    },
    template:`
    <div class="container">
            <div class="fundo">
                <h1>{{ title }}</h1>
                <div class="alinha-horizontal-semquebra">
                        <center><img class="img-produto" v-bind:src="image"></center>
                        <div v-for="(variant, index) in variants" 
                            :key="variant.variantId"
                            class="color-box"
                            :style="{ backgroundColor: variant.variantColor }"
                            @mouseover="updateProduct(index)">
                        </div>
                    
                    <div class="product-info">
                        <p v-if="inStock"> In Stock!   </p>
                        <p v-else>Out of Stock!        </p>
                        <p v-if="desconto">Em promoção!</p>

                        <!-- <div class="alinha-sizes">
                            <div v-for="tamanho in tamanhos" 
                                :key="tamanho.tamanhoId">
                                <p>{{ tamanho.tamanhoSize }} </p>
                            </div>
                        </div> -->
                    </div>

                </div>
                    <p>details: {{ detail }}</p>
                    <h2>R$ {{ price }}</h2>

                <button v-on:click="addToCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">Adicionar ao carrinho</button>

                <button v-on:click="dellToCart"
                        :disabled="!inStock"              
                        :class="{ disabledButton: !inStock }">Remover do carrinho</button>
                
            </div>

            <product-review @review-submitted="addReview"></product-review>
        </div>

    `,
    data() {
        return {
        product: 'SOCKS',
        brand: 'Vue Mastery',
        price: 2.99,
        selectedVariant: 0,
        desconto : false,
        variants: [
            {
                variantId: 1,
                variantColor: 'black',
                variantImage: '../../img/nike/meiapreta.png',
                variantQuantity: 10 
            },
            {
                variantId:2,
                variantColor: 'white',
                variantImage: '../../img/nike/meiabranca.png',
                variantQuantity: 10
            }
        ],


        tamanhos: [
            {
                tamanhoId:101,
                tamanhoSize:"35"
            },
            {
                tamanhoId:102,
                tamanhoSize:"37"
            },
            {
                tamanhoId:103,
                tamanhoSize:"41"
            }
            ],

            reviews: []
        }
    },

        methods: {
            updateProduct(index) {
                this.selectedVariant = index
            },

            addToCart () {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
                console.log('Adicionado ao carrinho')
            },
            
            dellToCart() {
                this.$emit('dell-to-cart', this.variants[this.selectedVariant].variantId)
                console.log('Deletado do carrinho')
            },
            cleanToCart() {
                this.$emit('clean-to-cart', this.variants[this.selectedVariant].variantId)
                console.log('Carrinho está vazio')
            },
            addReview(productReview) {
                this.reviews.push(productReview)
            }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },

        image() {
            return this.variants[this.selectedVariant].variantImage
        },

        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
    }
})      

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
        return {
          name: null,
          review: null,
          rating: null
        }
      },
      methods: {
        onSubmit() {
            let productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
      }
    }
  })

var app = new Vue({
    el: '#app',        
    data:{
        detail: 'this is the details of the product',
        cart:[],
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        },
        deleteCart(id){
            this.cart.pop(id)
        },
        cleanCart(){
            this.cart = []
            console.log('Carrinho limpo com sucesso!!')
        }
    }
})