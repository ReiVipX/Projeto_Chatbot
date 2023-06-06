//funcoes auxiliares ou uteis

let modalKey = 0

let quantProdutos = 1

let cart = []


const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)



const abrirModal = () => {
    seleciona('.ProdutoWindowArea').style.opacity = 0
    seleciona('.ProdutoWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.ProdutoWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.ProdutoWindowArea').style.opacity = 0
    setTimeout(() => seleciona('.ProdutoWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {

    // BOTOES FECHAR MODAL
    selecionaTodos('.ProdutoInfo--cancelButton, .ProdutoInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
}

const preencheDadosProduto = (OfertaItem, item,index ) => {
    OfertaItem.setAttribute('data-key', index)
    OfertaItem.querySelector('data-key', index)
    OfertaItem.querySelector('.Produto-item--img img').src = item.img
    OfertaItem.querySelector('.Produto-item--price s').innerHTML = `R$ ${item.price.toFixed(2)}`
    OfertaItem.querySelector('.Produto-item--price2').innerHTML = `R$ ${(item.price-(item.desc*item.price)).toFixed(2)}`
    OfertaItem.querySelector('.Produto-item--name').innerHTML = item.name
    
}

const preencheDadosModal = (item) => {
    // document.querySelector('.pizzaBig img').src = item.img
    // document.querySelector('.pizzaInfo h1').innerHTML = item.name
    // document.querySelector('.pizzaInfo--desc').innerHTML = item.description
    // document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
    seleciona('.ProdutoBig img').src = item.img
    seleciona('.ProdutoInfo h1').innerHTML = item.name
    seleciona('.ProdutoInfo--desc').innerHTML = item.description
    seleciona('.ProdutoInfo--actualPrice s').innerHTML = `R$ ${item.price.toFixed(2)}`
    seleciona('.ProdutoInfo--actualPrice2').innerHTML = `R$ ${(item.price-(item.desc*item.price)).toFixed(2)}`
}

const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .pizza-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.Produto-item').getAttribute('data-key')
    console.log('Produto clicada ' + key)
    console.log(ofertaJson[key])

    // garantir que a quantidade inicial de pizzas é 1
    quantProdutos = 1

    // Para manter a informação de qual pizza foi clicada
    modalKey = key

    return key
}
const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.ProdutoInfo--qtmais').addEventListener('click', () => {
        quantProdutos++
        seleciona('.ProdutoInfo--qt').innerHTML = quantProdutos
    })

    seleciona('.ProdutoInfo--qtmenos').addEventListener('click', () => {
        if(quantProdutos > 1) {
            quantProdutos--
            seleciona('.ProdutoInfo--qt').innerHTML = quantProdutos	
        }
    })
}

const adicionaNoCarrinho= () => {
    seleciona('.ProdutoInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar ao carrinho')

        console.log("Produto "+ modalKey)
        console.log("Quant. " + quantProdutos)

        let price = seleciona('.ProdutoInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
        console.log(price)

        let identificador = ofertaJson[modalKey].id

        let key = cart.findIndex((item) => item.identificador == identificador)
        console.log('esta é a key= '+ key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantProdutos
        } else {
            // adicionar objeto pizza no carrinho
            let Produto = {
                identificador,
                id: ofertaJson[modalKey].id,
                qt: quantProdutos,
                price: ofertaJson[modalKey].price // price: price
            }
            cart.push(Produto)
            console.log(Produto)
            console.log('Sub total R$ ' + (Produto.qt * Produto.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })

}
const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('main').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
   
}
const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}
const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-openner span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		seleciona('aside').classList.add('show')

		// zerar meu .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let ofertaItem = ofertaJson.find( (item) => item.id == cart[i].id )
			console.log(ofertaItem)

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			

			let ofertaName = `${ofertaItem.name}`

			// preencher as informacoes
			cartItem.querySelector('img').src = ofertaItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = ofertaName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * ofertaJson[modalKey].desc
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML =`R$ ${subtotal.toFixed(2)}`
		seleciona('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
		seleciona('.total span:last-child').innerHTML    = `R$ ${total.toFixed(2)}`

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
        seleciona('.menu-openner span').innerHTML = 0
        cart.length=0 
    })
}

ofertaJson.map((item, index) =>{
    
    let OfertaItem = document.querySelector('.models .Produto-item').cloneNode(true)
    seleciona('.Produto-area').append(OfertaItem)

    preencheDadosProduto(OfertaItem,item,index)

    //Produto Clicado
    OfertaItem.querySelector('.Produto-item a').addEventListener('click', (e)   =>{
        e.preventDefault()
        console.log('Clicou ')
        

        let chave = pegarKey(e)

        //abrir a janela modal
        //document.querySelector('.ProdutoWindowArea').style.display = 'flex'
        abrirModal()
        //preenchimento dos dados
        //document.querySelector('.ProdutoInfo h1').innerHTML = item.name
        //document.querySelector('.ProdutoBig img').src = item.img
       // document.querySelector('.ProdutoInfo--actualPrice').innerHTML =`R$ ${item.price.toFixed(2)}`
       preencheDadosModal(item)

       seleciona('.ProdutoInfo--qt').innerHTML = quantProdutos
        
        
        
    })

    botoesFechar()

   })
    
   mudarQuantidade()
   adicionaNoCarrinho()
   atualizarCarrinho()
    fecharCarrinho()
    finalizarCompra()