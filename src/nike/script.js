var eventBus = new Vue()

Vue.component('product', {
    props: {
        detail: {
            type: String,
            required: true
        }
    },
    template: `
    <div>
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
                    details: {{ detail }}
                    <h2>R$ {{ price }}</h2>

                <button v-on:click="addToCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">Adicionar ao carrinho</button>

                <button v-on:click="dellToCart"
                        :disabled="!inStock"              
                        :class="{ disabledButton: !inStock }">Remover do carrinho</button>
                
            </div>
        </div>

        <product-tabs :reviews="reviews"></product-tabs>

            
    </div>

    `,
    data() {
        return {
            product: 'SOCKS',
            brand: 'Vue Mastery',
            price: 2.99,
            selectedVariant: 0,
            desconto: false,
            variants: [
                {
                    variantId: 1,
                    variantColor: 'black',
                    variantImage: '../../img/nike/meiapreta.png',
                    variantQuantity: 10
                },
                {
                    variantId: 2,
                    variantColor: 'white',
                    variantImage: '../../img/nike/meiabranca.png',
                    variantQuantity: 10
                }
            ],


            tamanhos: [
                {
                    tamanhoId: 101,
                    tamanhoSize: "35"
                },
                {
                    tamanhoId: 102,
                    tamanhoSize: "37"
                },
                {
                    tamanhoId: 103,
                    tamanhoSize: "41"
                }
            ],

            reviews: []
        }
    },

    methods: {
        updateProduct(index) {
            this.selectedVariant = index
        },

        addToCart() {
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
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },

        image() {
            return this.variants[this.selectedVariant].variantImage
        },

        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
    },
    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form fundo" @submit.prevent="onSubmit">

    <p class="error" v-if="errors.length">
        <b>Corriga o(s) seguinte(s) erro(s):</b>
            <ul>
                <li v-for="error in errors"> {{ error }} </p></li>
            </ul>
    </p>

    <p>
      <label for="name">Nome:</label>
      <input class="name" v-model="name" required>
    </p>
    
    <p>
      <label for="review">Descrição:</label>      
      <textarea id="review" v-model="review" required></textarea>
    </p>
    
    <p>
      <label for="rating">Avaliação:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>
      <label for="recomendacao">Recomendaria esse produto?</label>
      <select id="recomendacao" v-model="recomendacao">
        <option>Sim</option>
        <option>Não</option>
    </select>
    </p>
    

    <p>
      <input type="submit" value="Enviar avaliação">  
    </p>    
  
  </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recomendacao: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recomendacao) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recomendacao: this.recomendacao
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recomendacao = null
            }

            else {
                if (!this.name) this.errors.push("O campo Nome não pode ser vazio")
                if (!this.review) this.errors.push("O campo Descrição não pode ser vazio")
                if (!this.rating) this.errors.push("O campo Avaliação não pode ser vazio")
                if (!this.recomendacao) this.errors.push("O campo Recomendação não pode ser vazio")
            }

        }
    }
})

 Vue.component('product-tabs', {
     props: {
        reviews:{
            type: Array,
            required: true
        }
     },
      template: `
        <div>
          <span class="tab" 
                :class="{ activateTab: selectedTab === tab}"
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectedTab = tab"
                >{{ tab }}</span>

          <div v-show="selectedTab === 'Avaliações /'" class="fundo-review reviews">
                <h1>Avaliações</h1>
                <p v-if= "!reviews.length">Não temos avaliação ainda... Gostaria de ser o primeiro?</p>
                <ul v-else class="avaliacoes">
                    <li v-for="(review, index) in reviews" class="fundo-review" :key="index">
                        <p><b>Nome: </b>{{ review.name }}</p>
                        <p><b>Descrição:</b> </p>{{ review.review }}
                        <p><b>Avaliação:</b> </p>{{ review.rating }}
                        <p><b>Recomendaria esse produto?</b> </p>{{ review.recomendacao }}
                    </li>
                </ul>
            </div>

            <product-review v-show="selectedTab === 'Fazer uma avaliação'"></product-review>
        </div>
      `,
      data() {
        return {
          tabs: ['Avaliações /', 'Fazer uma avaliação'],
          selectedTab: 'Reviews'
        }
      }
    })

var app = new Vue({
    el: '#app',
    data: {
        detail: 'this is the details of the product',
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        deleteCart(id) {
            this.cart.pop(id)
        },
        cleanCart() {
            this.cart = []
            console.log('Carrinho limpo com sucesso!!')
        }
    }
})