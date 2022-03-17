Vue.component('product',{
    props: {
        detail: {
            type: String,
            required: true
        }
    },
    template:`
    <div class="container" >
            <div class="fundo">
                <h1>{{ tittle }}</h1>
                <div class="alinha-horizontal-semquebra">
                        <center><img class="img-produto" v-bind:src="image"></center>
                        <div v-for="(variant, index) in variants" 
                            :key="variant.variantId"
                            class="color-box"
                            :style="{ backgroundColor: variant.variantColor }"
                            @mouseover="updateProduct(index)">
                        </div>
                    
                    <div class="product-info">
                        <p v-if="qtd > 10">In Stock = {{ qtd }} pairs</p>
                        <p v-else-if="qtd >= 1 && 10 > qtd">Almost Sould Out!</p>
                        <p v-else
                        class="risco">Out of Stock</p>
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
                        :disabled="0 >= qtd"
                        :class="{ disabledButton: 0 >= qtd }">Adicionar ao carrinho</button>

                <button v-on:click="dellToCart">Remover do carrinho</button>
                
            </div>
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
                variantImage: '../../img/nike/meiapreta.png'
            },
            {
                variantId:2,
                variantColor: 'white',
                variantImage: '../../img/nike/meiabranca.png'
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
        }
    },

        methods: {
            updateProduct(index) {
                this.selectedVariant = index
            },

            addToCart () {
                this.$emit('add-to-cart', this.variants[this.selectedVariant],variantId)
            }
        ,
        updateImage: function(variantImage) {
            this.image = variantImage
        },
        dellToCart: function(){
            if (this.cart == 0){
                console.log('O carrinho já está vazio')
            }
            else{
                this.cart -= 1
            }
        }
    },

    computed: {
        tittle() {
            return this.brand + '' + this.product
        },

        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        qtd() {
            return this.variant[this.selectedVariant].variantQuantity
        }
    }
})      

var app = new Vue({
    el: '#app',        
    data:{
        detail: 'this is the details of the product',
        cart:0,
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        }
    }
})