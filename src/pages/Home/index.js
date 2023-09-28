import React from "react";
import ProductItem from "../../shared/components/product-items";
import { getProducts } from "../../services/Api";

const Home = () => {
    const [featuredProduct, setFeaturedProduct] = React.useState([]);
    const [lastestProduct, setLastestProduct] = React.useState([]);

    React.useEffect(() => {
        getProducts({
            params: {
                limit: 6,
                "filter[is_featured]": true,
            }
        }).then(({data}) => setFeaturedProduct(data.data.docs));
        
        getProducts({
            params: {
                limit: 6,
            }
        }).then(({ data }) => {
            setLastestProduct(data.data.docs)
        });
    }, [])

    return (
        <>
            {/*	Feature Product	*/}
            <div className="products">
                <h3>Sản phẩm nổi bật</h3>
                <div className="product-list card-deck">
                    {
                        featuredProduct.map((item) =>
                            <ProductItem item={item} />
                        )
                    }
                </div>
            </div>
            {/*	End Feature Product	*/}
            {/*	Latest Product	*/}
            <div className="products">
                <h3>Sản phẩm mới</h3>
                <div className="product-list card-deck">
                    {
                        lastestProduct.map((item) => 
                            <ProductItem item = {item} />
                        )
                    }
                </div>
            </div>
            {/*	End Latest Product	*/}
        </>
    )
}
export default Home;