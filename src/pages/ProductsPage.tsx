import React, {useContext} from "react";
import {useProducts} from "../hooks/products";
import {ModalContext} from "../context/ModalContext";
import {IProduct} from "../models";
import {Loader} from "../components/Loader";
import {ErrorMessage} from "../components/ErrorMessage";
import {Product} from "../components/Product";
import {Modal} from "../components/Modal";
import {CreateProduct} from "../components/CreateProduct";

export function ProductsPage() {
    const {products, loading, error, addProduct} = useProducts()
    // const [modal, setModal] = useState(false)

    const {modal, open, close} = useContext(ModalContext)
    const createHandler = (product: IProduct) => {
        // setModal(false)
        close()
        addProduct(product)
    }

    return (
        <div className="container mx-auto max-w-2xl pt-5">
            {/*<Product product = {products[0]} test = {'test'}/>*/}
            {/*<Product product = {products[0]}/>*/}
            {/*<Product product = {products[1]}/>*/}
            {/*{loading && <p className="text-center">Loading....</p>}*/}
            {loading && <Loader/>}
            {/*{error && <p className="text-center text-red-600">{error}</p>}*/}
            {error && <ErrorMessage error={error}/>}
            {products.map(product => <Product product={product} key={product.id}/>)}
            {/*{modal && <Modal title="Create new product" onClose={() => setModal(false)}>*/}
            {modal && <Modal title="Create new product" onClose={() => close()}>
                <CreateProduct onCreate={createHandler}/>
            </Modal>}
            <button
                className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
                // onClick={() => setModal(true)}
                onClick={() => open()}
            >
                +
            </button>
        </div>
    )
}