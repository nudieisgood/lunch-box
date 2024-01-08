import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/customError.js";
import Order from "../models/OrderModel.js";
import { verifyJWT } from "../utlits.js";
import Item from "../models/ItemModel.js";

export const createOrder = async (req, res) => {
  const { checkoutInfo } = req.cookies;
  if (!checkoutInfo) throw new BadRequestError("invalid token");

  const { checkoutInfo: items } = verifyJWT(checkoutInfo);
  const ids = await Item.find(
    {
      _id: {
        $in: items.map((item) => new mongoose.Types.ObjectId(item.itemId)),
      },
    },
    {
      name: 1,
      stock: 1,
      price: 1,
      isAvailable: 1,
    }
  );

  if (ids.map((id) => id.isAvailable).includes(false))
    throw new BadRequestError("some items are unavailable");

  const promises = items.map(async (item) => {
    let checkOther;
    if (item.sizing === "ONE SIZE FITS ALL") {
      const itemInfo = await Item.findById(item.itemId);
      if (itemInfo.stock[0].quantity === 0) {
        throw new BadRequestError(`some items are out of stock`);
      }

      const updateStock = itemInfo.stock.splice(0, 1, {
        size: "ONE SIZE FITS ALL",
        quantity: itemInfo.stock[0].quantity - 1,
      });
      await Item.findByIdAndUpdate(item.itemId, { stock: itemInfo.stock });
    }
    if (item.sizing === "SMALL") {
      const itemInfo = await Item.findById(item.itemId);
      if (itemInfo.stock[0].quantity === 0) {
        throw new BadRequestError(`some items are out of stock`);
      }

      const updateStock = itemInfo.stock.splice(0, 1, {
        size: "SMALL",
        quantity: itemInfo.stock[0].quantity - 1,
      });
      await Item.findByIdAndUpdate(item.itemId, { stock: itemInfo.stock });
    }
    if (item.sizing === "MEDIUM") {
      const itemInfo = await Item.findById(item.itemId);
      if (itemInfo.stock[1].quantity === 0) {
        throw new BadRequestError(`some items are out of stock`);
      }

      const updateStock = itemInfo.stock.splice(1, 1, {
        size: "MEDIUM",
        quantity: itemInfo.stock[1].quantity - 1,
      });
      await Item.findByIdAndUpdate(item.itemId, { stock: itemInfo.stock });
    }
    if (item.sizing === "LARGE") {
      const itemInfo = await Item.findById(item.itemId);
      if (itemInfo.stock[2].quantity === 0) {
        throw new BadRequestError(`some items are out of stock`);
      }

      const updateStock = itemInfo.stock.splice(2, 1, {
        size: "LARGE",
        quantity: itemInfo.stock[2].quantity - 1,
      });
      await Item.findByIdAndUpdate(item.itemId, { stock: itemInfo.stock });
    }
    if (item.sizing === "XLARGE") {
      const itemInfo = await Item.findById(item.itemId);
      if (itemInfo.stock[3].quantity === 0) {
        throw new BadRequestError(`some items are out of stock`);
      }

      const updateStock = itemInfo.stock.splice(3, 1, {
        size: "XLARGE",
        quantity: itemInfo.stock[3].quantity - 1,
      });
      await Item.findByIdAndUpdate(item.itemId, { stock: itemInfo.stock });
    }
  });
  try {
    await Promise.all(promises);
    req.body.items = items;
    const order = await Order.create(req.body);

    res.status(StatusCodes.CREATED).json({ data: order });
  } catch (error) {
    throw new BadRequestError(`some items are out of stock`);
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(StatusCodes.OK).json({ data: orders });
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ _id: id });

  res.status(StatusCodes.CREATED).json({ data: order });
};

export const updateOrderById = async (req, res) => {
  const { id } = req.params;

  const updatedOrder = await Order.findByIdAndUpdate(
    id,

    { status: req.body.status },
    {
      new: true,
    }
  );

  res.status(StatusCodes.CREATED).json({ msg: "updated booking status" });
};
