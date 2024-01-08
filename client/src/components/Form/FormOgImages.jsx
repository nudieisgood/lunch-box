import { AiFillStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const FormOgImages = ({ ogPhotos, deleteOgPhoto, changeMainPic }) => {
  return (
    <>
      <h4 className="heading-3 mt-sm">
        已上傳圖片 點擊{<BsTrash className="inline-block" />}
        刪除 / {<AiFillStar className="inline-block" />} 為首圖
      </h4>
      <div className="form__images">
        {ogPhotos.length > 0 &&
          ogPhotos.map((photo) => (
            <div className="form__og-item" key={photo}>
              <img className="form__image" src={photo} alt="item photo" />
              <button
                type="button"
                onClick={() => {
                  deleteOgPhoto(photo);
                }}
                className="btn-trash"
              >
                <BsTrash />
              </button>
              <button
                type="button"
                onClick={() => {
                  changeMainPic(photo);
                }}
                className="btn-star"
              >
                {photo === ogPhotos[0] ? (
                  <AiFillStar />
                ) : (
                  <AiFillStar className="btn-star--not-first" />
                )}
              </button>
            </div>
          ))}
      </div>
    </>
  );
};
export default FormOgImages;
