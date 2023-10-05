import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCommnetsProduct, getCommentByProduct, getProduct } from "../../services/Api";
import { getImageProduct } from "../../shared/ultils";
import { format } from "date-fns";
import addToCart from "../../redux-setup/reducers/cart"
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/constants/action-type";

const ProductDetails = () => {

    const id = useParams().id;
    const [product, setProduct] = React.useState("");
    const [commnet, setComment] = React.useState([]);
    const [inputComment, setInputComment] = React.useState([]);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const addToCart = (type) => {
        const { name, image, price } = product;
        dispatch({
            type: ADD_TO_CART,
            payload: {
                _id: id,
                name,
                image,
                price,
                qty: 1,
            },
        });
        if(type === "buy-now") {
            return navigate("/Cart");
        }
    }



    const fomatPrice = (price) => {
        const roundPrice = Math.ceil(price / 1000) * 1000;
        return roundPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputComment({ ...inputComment, [name]: value });
    }

    const onSubmitComment = (e) => {
        e.preventDefault();
        createCommnetsProduct(id, inputComment, {}).then(({ data }) => {
            if (data.status == "success") setInputComment("");
            getCommnet(id)
        });
    }

    const getCommnet = (id) => {
        getCommentByProduct(id, {}).then(({ data }) => {
            setComment(data.data.docs);
        })
    }

    React.useEffect(() => {
        getProduct(id, {}).then(({ data }) => {
            setProduct(data.data);
        });
        getCommnet(id);
    }, [id]);

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div id="product">
                    <div id="product-head" className="row">
                        <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                            <img src={getImageProduct(product.image)} />
                        </div>
                        <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                            <h1>{product.name}</h1>
                            <ul>
                                <li><span>Bảo hành:</span> 12 Tháng</li>
                                <li><span>Đi kèm: </span> {product.accessories}</li>
                                <li><span>Tình trạng:</span> {product.status} </li>
                                <li><span>Khuyến Mại:</span> {product.promotion} </li>
                                <br />
                                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                                <li id="price-number"> {fomatPrice(product.price)} </li>
                                <li id="status">{product.is_stock ? "Còn hàng" : "Hết hàng"}</li>
                            </ul>
                            <div id="add-cart">
                                <button onClick={() => addToCart("buy-now")} className="btn btn-warning mr-2">
                                    Mua ngay
                                </button>

                                <button onClick={() => addToCart("add-to-cart")} className="btn btn-info">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="product-body" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Đánh giá về {product.name}</h3>
                            <p>
                                {product.details}
                            </p>
                        </div>
                    </div>
                    {/*	Comment	*/}
                    <div id="comment" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Bình luận sản phẩm</h3>
                            <form method="post">
                                <div className="form-group">
                                    <label>Tên:</label>
                                    <input onChange={onChangeInput} name="name" required type="text" className="form-control" value={inputComment.name || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input onChange={onChangeInput} name="email" required type="email" className="form-control" id="pwd" value={inputComment.email || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Nội dung:</label>
                                    <textarea onChange={onChangeInput} name="content" required rows={8} className="form-control" defaultValue={""} value={inputComment.content || ""} />
                                </div>
                                <button onClick={onSubmitComment} type="submit" name="sbm" className="btn btn-primary">Gửi</button>
                            </form>
                        </div>
                    </div>
                    {/*	End Comment	*/}
                    {/*	Comments List	*/}
                    <div id="comments-list" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            {
                                commnet.map((item) =>
                                    <div className="comment-item">
                                        <ul>
                                            <li><b>{item.name}</b></li>
                                            <li>{format(new Date(item.updatedAt), 'yyyy-MM-dd HH:mm:ss')}</li>
                                            <li>
                                                <p>{item.content}</p>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {/*	End Comments List	*/}
                </div>
                {/*	End Product	*/}
                <div id="pagination">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default ProductDetails;