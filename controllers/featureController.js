import { StatusCodes } from "http-status-codes";
import Feature from "../models/FeatureModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { NotFoundError } from "../errors/customError.js";

export const getAllFeatures = async (req, res) => {
  //pagination logic
  const page = +req.query.page || 1;
  const limit = 50;
  const skip = (page - 1) * 50;

  const features = await Feature.find(
    {},
    {
      featureTitle1: 1,
      featureTitle2: 1,
      photos: 1,
      featureNo: 1,
      date: 1,
    }
  )
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({ data: features });
};
export const getLastFiveFeatures = async (req, res) => {
  const features = await Feature.find(
    {},
    {
      featureTitle1: 1,
      featureTitle2: 1,
      photos: 1,
      featureNo: 1,
      date: 1,
    }
  );

  const lastFive = features.slice(-5);

  res.status(StatusCodes.OK).json({ data: lastFive });
};

export const getRandomFeatures = async (req, res) => {
  const features = await Feature.find(
    {},
    {
      featureTitle1: 1,
      featureTitle2: 1,
      photos: 1,
      featureNo: 1,
      date: 1,
    }
  );
  const featLength = features.length;
  const randomNum = () => {
    let num = Math.floor(Math.random() * featLength) + 1;
    if (num === featLength) return randomNum();
    return num;
  };
  const get4Num = () => {
    return [randomNum(), randomNum(), randomNum(), randomNum(), randomNum()];
  };

  const uniqueArr = [...new Set(get4Num())];

  res.status(StatusCodes.OK).json({
    data: uniqueArr.map((num) => features[num]),
  });
};

export const getFeatureById = async (req, res) => {
  const { id } = req.params;
  const feature = await Feature.find({ featureNo: id });

  if (!feature) {
    throw new NotFoundError(`Can not find the feature with ID:${id}`);
  }

  res.status(StatusCodes.OK).json({ data: feature });
};

export const createFeature = async (req, res) => {
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

  const newFeature = await Feature.create(req.body);
  res.status(StatusCodes.CREATED).json({ data: newFeature.featureNo });
};

export const editFeature = async (req, res) => {
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

  req.body.ogPhotos = req.body.ogPhotos.split(",");

  req.body.photos = [...req.body.photos, ...req.body.ogPhotos];

  const updatedFeature = await Feature.findOneAndUpdate(
    { featureNo: id },
    req.body,
    {
      new: true,
    }
  );

  if (!updatedFeature) {
    throw new NotFoundError(`Can not find the feature with ID:${id}`);
  }

  res.status(StatusCodes.OK).json({ data: updatedFeature });
};
