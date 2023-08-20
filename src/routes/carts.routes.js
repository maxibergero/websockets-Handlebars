import {Router} from 'express';
import ManagerCarts from '../Models/ManagerCarts.js'

const managerCarts = new ManagerCarts();

const cartsRouter = Router();

cartsRouter.get('/', async (req,res)=>{
    try {
        const carts = await managerCarts.getCarts();
        res.status(200).send(carts)
    } catch (error) {
        res.status(400).send(`${error}`)
    }
})

cartsRouter.get('/:id', async (req,res)=>{
    try {
        const id = parseInt(req.params.id, 10)
        const carrito = await managerCarts.getCartsById(id);
        if(carrito){
            res.status(200).send(carrito)
        }else{
            res.status(400).send(`El carrito con ID: ${id} no existe!!`)
        }
        
    } catch (error) {
        res.status(400).send(`${error}`)
    }
})

cartsRouter.post('/:idCart/product/:idProduct', async (req, res) => {
    try {
        const idCart = parseInt(req.params.idCart, 10);
        const idProduct = parseInt(req.params.idProduct, 10);

        if(await managerCarts.isIdExisting(idCart)){
            await managerCarts.addProduct(idCart, idProduct)
            res.status(200).send("Carrito actualizado con éxito!!")
        }else{
            res.status(200).send(`El carrito con ID: ${req.params.idCart} no existe. Producto no agregado al carrito!!`)
        }
    } catch (error) {
        res.status(400).send(`${error}`)
    }
});

cartsRouter.post('/', async(req, res) =>{
    try {
        await managerCarts.createCart();
        res.status(200).send("Carrito creado con éxito!!")
    } catch (error) {
        res.status(400).send(`${error}`)
    }
})







export default cartsRouter;