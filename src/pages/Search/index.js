import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-items";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [products, setProduct] = React.useState([]);
    const page = searchParams.get("page") || 1;
    const [pages, setPages] = React.useState({
        limit: 12,
    });

    React.useEffect(() => {
        getProducts({
            params: {
                name: keyword,
                limit: 12,
                page: page,
            }
        }).then(({ data }) => {
            setPages({ ...pages, ...data.data.pages });
            setProduct(data.data.docs)
        });
    }, [keyword, pages])
    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
                    <div className="product-list card-deck">
                        {
                            products.map((item) =>
                                <ProductItem item={item} />
                            )
                        }
                    </div>
                </div>
                {/*	End List Product	*/}
                <Pagination pages={pages} />
            </div>

        </>
    )
}
export default Search;