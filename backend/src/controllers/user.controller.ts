import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { sign } from "jsonwebtoken";

import userModel from "../models/user";
import { config } from "../config/config";
import { UserSchemaType } from "../types/user";
import { encryptPassword, verifyPassword } from "../utils/password";
import cloudinary from "../config/cloudinary";
import fileUpload from "express-fileupload";

const registerPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;

  // validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    const error = createHttpError(400, "Please provide all details");
    return next(error);
  }

  // database call
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(
        400,
        "user already exists with this email."
      );
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "error while getting user"));
  }

  const hashedPassword = await encryptPassword(password);
  let newUser: UserSchemaType;
  try {
    // new user
    newUser = await userModel.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      gender,
      dob: new Date(dob),
      nic,
      role,
    });

    res.status(201).json({
      message: "user registered successfully please login to contiune",
    });
  } catch (error) {
    return next(createHttpError(500, "error in creating user\n " + error));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(createHttpError(400, "Please provide all details"));
  }

  let user: UserSchemaType | null;

  try {
    // finding user
    user = await userModel.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
  } catch (error) {
    return next(createHttpError(500, "error finding user from database"));
  }

  try {
    // comparing password
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return next(createHttpError(400, "Incorrect password for this email"));
    }
  } catch (error: any) {
    return next(createHttpError(500, error.message));
  }

  try {
    // comparing role
    if (role !== user.role) {
      return next(
        createHttpError(400, `${user.role} with this email already exists.`)
      );
    }
  } catch (error: any) {
    return next(createHttpError(500, error.message));
  }

  try {
    // token generation JWT
    const token = sign({ id: user._id }, config.jwtSecret as string, {
      expiresIn: config.jwtExpires,
    });

    // response
    const cookieName = user.role === "admin" ? "adminToken" : "patientToken";
    res
      .status(200)
      .cookie(cookieName, token, {
        expires: new Date(
          Date.now() + Number(config.cookieExpires) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User Logged in Successfully",
        user: user,
      });
  } catch (error) {
    return next(createHttpError(500, "error while signing jwt token"));
  }
};

const RegisterAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, phone, password, gender, dob, nic } =
      req.body;

    // validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !nic
    ) {
      const error = createHttpError(400, "Please provide all details");
      return next(error);
    }

    const isRegistered = await userModel.findOne({ email });
    if (isRegistered) {
      return next(
        createHttpError(400, "Account with this email already exists.")
      );
    }

    const hashedPassword = await encryptPassword(password);

    const newAdmin = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob: new Date(dob),
      nic,
      role: "admin",
    });
    newAdmin.save();

    res.status(201).json({
      success: true,
      message: "New admin register successfully",
    });
  } catch (error: any) {
    next(createHttpError(error.statusCode, error.message));
  }
};

const fetchAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allDoctors = await userModel.find({ role: "doctor" });
    res.status(200).json({ success: true, doctors: allDoctors });
  } catch (error) {
    next(createHttpError(500, "failed to fetch all doctors."));
  }
};

const getLoggedInUserDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(createHttpError(500, "internal server error"));
  }
};

const logoutAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Admin logged out successfully",
      });
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};

const logoutPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .status(200)
      .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User logged out successfully!",
      });
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};

const registerDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || Object.keys(req.files).length == 0) {
      return next(createHttpError(400, "Doctor Image is Required!"));
    }
    const { doctorAvatarImage } = req.files as {
      doctorAvatarImage: fileUpload.UploadedFile;
    };
    const allowedFormats = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    if (!allowedFormats.includes(doctorAvatarImage.mimetype)) {
      return next(createHttpError(400, "this File format is not supported"));
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      nic,
      doctorDepartment,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !nic ||
      !doctorDepartment
    ) {
      return next(
        createHttpError(400, "please provide all details to register doctor")
      );
    }
    const isRegistered = await userModel.findOne({ email });
    if (isRegistered) {
      return next(
        createHttpError(
          400,
          `${isRegistered.role} already exists with this email.`
        )
      );
    }

    // upload to cloudinary
    //@ts-ignore
    const cloudinaryResponse = await cloudinary.uploader.upload(
      doctorAvatarImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "cloudinary Error",
        cloudinaryResponse.error || "unknown Cloudinary error"
      );
    }
    console.log(cloudinaryResponse.secure_url);

    const hashedPassword = await encryptPassword(password);

    const newDoctor = await userModel.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      gender,
      dob,
      nic,
      role: "doctor",
      doctorDepartment,
      doctorAvatarImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    newDoctor.save();

    res.status(201).json({
      success: true,
      message: "new doctor registered successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    return next(createHttpError(500, "internal Server Error"));
  }
};

export {
  registerPatient,
  RegisterAdmin,
  loginUser,
  fetchAllDoctors,
  getLoggedInUserDetail,
  logoutAdmin,
  logoutPatient,
  registerDoctor,
};
