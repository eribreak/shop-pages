import { Link, useLocation, useSearchParams } from "react-router-dom";

const Pagination = ({ pages }) => {
    const { limit, total, currentPage, next, prev, hasNext, hasPrev } = pages;
    const { pathname, search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const totalPages = Math.ceil(total / limit);

    const formatUrl = (page) => {
        return `${pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;
    };

    const renderPagesHtml = (delta = 2) => {
        let pagesHtml = [];
        const left = currentPage - delta;
        const right = currentPage + delta;
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                i === currentPage ||
                (i >= left && i <= right)
            ) {
                pagesHtml.push(i);
            }
            else if (
                left - 1 === i ||
                right + 1 === i

            ) {
                pagesHtml.push("...");
            }
        }
        return pagesHtml;
    }
    return (
        <div id="pagination">
            <ul className="pagination">
                {
                    hasPrev
                    ?  <li className="page-item"><Link className="page-link" to={formatUrl(prev)}>Trang trước</Link></li>
                    : null
                }

                {
                    renderPagesHtml().map((value) =>
                        <li className={`page-item ${value === currentPage && 'active'}`}>
                            {
                                value === "..."
                                ? <span className="page-link">
                                    {value}
                                </span>
                                : <Link className="page-link" to={formatUrl(value)}>{value}</Link>                            
                            }
                        </li>
                    )
                }

                {
                    hasNext
                    ? <li className="page-item"><Link className="page-link" to={formatUrl(next)}>Trang sau</Link></li>
                    : null
                }
            </ul>
        </div>
    );
};

export default Pagination;
