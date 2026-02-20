import {
  getAllUsersService,
  createUserService,
  updateUserService,
  updateUserStatusService,
  getProfileService,
} from "../services/user.service.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await createUserService(name, email, password, role);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const IdToChange = (req.user.role == 'ADMIN') ? req.params.id : req.user.id; 
    const result = await updateUserService(IdToChange, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const result = await updateUserStatusService(
      req.params.id,
      req.body.status
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await getProfileService(req.user.id);
    res.json({ profile: user });
  } catch (error) {
    next(error);
  }
};