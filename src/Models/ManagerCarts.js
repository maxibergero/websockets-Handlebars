import {promises as fs} from 'fs'

class ManagerCarts{
    constructor(){
        this.path = './src/carts.json'
    }

    async getCarts(){
        try {
            const carts = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } catch (error) {
            throw new Error(`Error en la lectura de cars: ${error}`);
            
        }
    }

    async getCartsById(id){
        try {
            const cars = await this.getCarts();
            const carrito = cars.find((c) => {return c.id === id})
            return carrito;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async getMayId(){
        try {
            const carts = await this.getCarts();
            let mayId = 0;
            carts.forEach(carrito => {
                if(carrito.id > mayId){
                    mayId = carrito.id
                }
            });
            return mayId;

        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async writeFileCarts(carts){
        try {
            const stringCarts =  JSON.stringify(carts);
             await fs.writeFile(this.path, stringCarts)

        } catch (error) {
            throw new Error(`Error en la escritura de carritos: ${error}`);
        }
    }


    //Agrega un nuevo carrito al archivo carts.json
    async createCart(){
        try {

            const carrito = {id:undefined, products: [{}]}
            //Se busca el id mayor y se agrega a prod
            carrito.id = await this.getMayId() + 1;

           const carts = await this.getCarts();
           carts.push(carrito);
           await this.writeFileCarts(carts)
       } catch (error) {
           throw new Error(`${error}`)
       }
    }

    async addProduct(idCart, idProduct) {
        try {
            const carts = await this.getCarts();
            
            // Buscar el carrito correspondiente a idCart
            const cartToUpdate = carts.find(cart => cart.id === idCart);
    
            if (cartToUpdate) {
                //Buscamos por idProduct
                const productToUpdate = cartToUpdate.products.find(product => product.id === idProduct);
    
                if (productToUpdate) {
                    // Si el producto existe en el carrito, incrementar la cantidad en 1
                    productToUpdate.quantity += 1;
                } else {
                    // Si el producto no existe en el carrito, agregarlo con cantidad 1
                    cartToUpdate.products.push({ id: idProduct, quantity: 1 });
                }
                //Actualizamos en archivo carts
                await this.writeFileCarts(carts)

            } else {
                throw new Error(`El carrito con id ${idCart} no fue encontrado.`);
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async isIdExisting(id) {
        try {
            const carts = await this.getCarts();
            const exists = carts.some(c => c.id === id);
            return exists;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}




export default ManagerCarts;


