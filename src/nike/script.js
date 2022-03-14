var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks','Jacket':'Sneackers',
        desc: 'Very confortable and stylish socks for one snow day',
        image: '../../img/nike/meiapreta.png',
        desconto : true,
        qtd: 40,
        variants: [
            {
                variantId: 1,
                variantColor: "Preto",
                variantImage: '../../img/nike/meiapreta.png'
            },
            {
                variantId:2,
                variantColor: "Branco",
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
        
        cart:0,
    },

        methods: {
            addToCart: function() {
                this.cart += 1
            }
        ,
        updateImage: function(variantImage) {
            this.image = variantImage
        }
    
    }
        
})