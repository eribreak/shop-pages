import { BASE_URL } from "../constants/app"

export const getImageProduct = (imgName)  => {
    return `${BASE_URL}/assets/uploads/products/${imgName}`;
}