import { StatusCodes } from "http-status-codes";
import Item from "../models/ItemModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { NotFoundError } from "../errors/customError.js";
import { verifyJWT } from "../utlits.js";

export const getAllItems = async (req, res) => {
  const { typeFilter, statusFilter, sort, cartItemsId, status } = req.query;

  const queryObj = {};

  queryObj.isAvailable = true;

  const { token } = req.cookies;
  if (token) {
    const { role } = verifyJWT(token);

    if (role === "admin") {
      queryObj.isAvailable = [true, false];
    }
  }

  if (status) {
    queryObj.status = status;
    queryObj.isAvailable = true;
  }

  if (cartItemsId?.length) {
    queryObj._id = cartItemsId;
    queryObj.isAvailable = [true, false];
  }

  if (typeFilter && typeFilter !== "all") {
    queryObj.type = typeFilter;
  }

  if (statusFilter && statusFilter !== "all") {
    queryObj.status = statusFilter;
  }

  //pagination logic
  const currentPage = +req.query.currentPage || 1;
  const limit = 16;
  const skip = (currentPage - 1) * 16;

  const items = await Item.find(queryObj, {
    name: 1,
    photos: 1,
    price: 1,
    status: 1,
    stock: 1,
    isAvailable: 1,
  })
    .skip(skip)
    .limit(limit);

  const totalItems = await Item.countDocuments(queryObj);

  res.status(StatusCodes.OK).json({ data: items, currentPage, totalItems });
};

export const getItemById = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);

  if (!item) {
    throw new NotFoundError(`Can not find the item with ID:${id}`);
  }

  res.status(StatusCodes.OK).json({ data: item });
};

export const activeItemById = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);

  const updatedItem = await Item.findByIdAndUpdate(
    id,
    { isAvailable: !item.isAvailable },
    { new: true }
  );

  if (!updatedItem) {
    throw new NotFoundError(`Can not find the item with ID:${id}`);
  }

  res.status(StatusCodes.OK).json({ msg: "item updated" });
};

export const createItem = async (req, res) => {
  if (req.files) {
    const promises = req.files.map((file) => {
      return cloudinary.v2.uploader
        .upload(file.path)
        .then((result) => {
          console.log("*** Success: Cloudinary Upload");
          return result;
        })
        .catch((err) => {
          console.log("*** Error: Cloudinary Upload");
        });
    });
    const data = await Promise.all(promises);

    const promisesForDelete = req.files.map((file) => {
      return fs
        .unlink(file.path)
        .then((result) => {
          console.log("*** Success: delete");
        })
        .catch((err) => {
          console.log("*** Error");
        });
    });
    await Promise.all(promisesForDelete);

    req.body.photos = data.map((photo) => {
      return photo.secure_url;
    });
    req.body.cloudinaryphotosId = data.map((photo) => {
      return photo.public_id;
    });
  }
  const stock = [];
  if (req.body.sizeS) stock.push({ size: "SMALL", quantity: req.body.sizeS });
  if (req.body.sizeM) stock.push({ size: "MEDIUM", quantity: req.body.sizeM });
  if (req.body.sizeL) stock.push({ size: "LARGE", quantity: req.body.sizeL });
  if (req.body.sizeXL)
    stock.push({ size: "XLARGE", quantity: req.body.sizeXL });

  if (req.body.oneSize)
    stock.push({ size: "ONE SIZE FITS ALL", quantity: req.body.oneSize });

  req.body.stock = stock;

  const newItem = await Item.create(req.body);

  res.status(StatusCodes.CREATED).json({ data: newItem._id });
  // res.status(StatusCodes.CREATED).json({ data: req.body });
};

export const editItem = async (req, res) => {
  const { id } = req.params;

  if (req.files) {
    const promises = req.files.map((file) => {
      return cloudinary.v2.uploader
        .upload(file.path)
        .then((result) => {
          console.log("*** Success: Cloudinary Upload");
          return result;
        })
        .catch((err) => {
          console.log("*** Error: Cloudinary Upload");
        });
    });
    const data = await Promise.all(promises);

    const promisesForDelete = req.files.map((file) => {
      return fs
        .unlink(file.path)
        .then((result) => {
          console.log("*** Success: delete");
        })
        .catch((err) => {
          console.log("*** Error");
        });
    });
    await Promise.all(promisesForDelete);

    req.body.photos = data.map((photo) => {
      return photo.secure_url;
    });
    req.body.cloudinaryphotosId = data.map((photo) => {
      return photo.public_id;
    });
  }
  const stock = [];
  if (req.body.sizeS) stock.push({ size: "SMALL", quantity: req.body.sizeS });
  if (req.body.sizeM) stock.push({ size: "MEDIUM", quantity: req.body.sizeM });
  if (req.body.sizeL) stock.push({ size: "LARGE", quantity: req.body.sizeL });
  if (req.body.sizeXL)
    stock.push({ size: "XLARGE", quantity: req.body.sizeXL });

  if (req.body.oneSize)
    stock.push({ size: "ONE SIZE FITS ALL", quantity: req.body.oneSize });

  req.body.stock = stock;

  req.body.ogPhotos = req.body.ogPhotos.split(",");

  req.body.photos = [...req.body.photos, ...req.body.ogPhotos];

  const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedItem) {
    throw new NotFoundError(`Can not find the item with ID:${id}`);
  }

  res.status(StatusCodes.OK).json({ data: updatedItem });
};

// export const getFavPlaces = async (req, res) => {
//   const user = await User.findById(req.user.userId).populate({
//     path: "myFavs",
//     populate: { path: "reviews", select: "rating" },
//   });

//   res.status(StatusCodes.OK).json({ data: user.myFavs });
// };

// export const getItems = async (req, res) => {
//   const queryObj = { owner: req.user.userId };

//   if (req.user.role === "admin") {
//     delete queryObj.owner;
//   }
//   const items = await Item.find(queryObj);

//   res.status(StatusCodes.OK).json({ data: items });
// };

// export const deleteItemById = async (req, res) => {
//   const { id } = req.params;

//   const removeItem = await Item.findByIdAndDelete(id);

//   if (!removeItem) {
//     throw new NotFoundError(`Can not find the item with ID:${id}`);
//   }

//   res.status(StatusCodes.OK).json({ msg: "item deleted" });
// };
