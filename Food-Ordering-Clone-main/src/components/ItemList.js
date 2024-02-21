import { RES_IMG_BASE_URL } from "../utils/constants";
import { addItem, removeItem, clearCart } from "../utils/store/cartSlice";
import { useDispatch } from "react-redux";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleClickItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="text-left my-6 flex justify-between border-b-2"
        >
          <div className="w-9/12">
            <span className="font-semibold">{item.card.info.name}</span>
            <div>
              <span>
                ₹{" "}
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
              <p className="text-xs">{item.card.info.description}</p>
              <div className=" m-4"></div>
            </div>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button
                className="px-2 mx-16 rounded-lg bg-black text-white shadow-lg"
                onClick={() => handleClickItem(item)}
              >
                Add +
              </button>
            </div>
            <img src={RES_IMG_BASE_URL + item.card.info.imageId} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
