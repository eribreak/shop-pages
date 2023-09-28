import React from "react";
import { Link } from "react-router-dom";
import ProductItem from "../../shared/components/product-items";
import { getCategory, getProdctCategory } from "../../services/Api";
import { useParams } from "react-router-dom";

const Category = () => {
    const [product, setProduct] = React.useState([]);

    const [productItem, setProductItem] = React.useState("");

    const params = useParams();

    const id = params.id;

    React.useEffect(() => {
        getProdctCategory(id, {}).then(({ data }) => setProduct(data.data.docs));
        getCategory(id, {}).then(({ data }) => setProductItem(data.data));
    }, [id])

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <h3>{`${productItem.name} (hiện có ${product.length} sản phẩm)`}</h3>
                    <div className="product-list card-deck">
                        {
                            product.map((item) =>
                                <ProductItem item={item} />
                            )
                        }
                    </div>
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <ul className="pagination">
                        <li className="page-item"><Link className="page-link" to="#">Trang trước</Link></li>
                        <li className="page-item active"><Link className="page-link" to="/#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">Trang sau</Link></li>
                    </ul>
                </div>
            </div>

        </>
    )
}
export default Category;