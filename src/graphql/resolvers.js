const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");

function generateToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing in .env");

  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    secret,
    { expiresIn: "7d" }
  );
}

const resolvers = {
  Query: {
    login: async (_, { usernameOrEmail, password }) => {
      if (!usernameOrEmail || !password) throw new Error("All fields are required");

      const key = usernameOrEmail.trim();
      const keyLower = key.toLowerCase();

      const user = await User.findOne({
        $or: [{ email: keyLower }, { username: key }],
      });

      if (!user) throw new Error("Invalid credentials");

      const ok = await user.comparePassword(password);
      if (!ok) throw new Error("Invalid credentials");

      const token = generateToken(user);
      return { token, user };
    },

    getAllEmployees: async (_, __, context) => {
      auth(context.req);
      return Employee.find().sort({ createdAt: -1 });
    },

    searchEmployeeByEid: async (_, { eid }, context) => {
      auth(context.req);
      return Employee.findById(eid);
    },

    searchEmployeesByDesignationOrDepartment: async (_, { keyword }, context) => {
      auth(context.req);
      const re = new RegExp(keyword, "i");
      return Employee.find({ $or: [{ designation: re }, { department: re }] })
        .sort({ createdAt: -1 });
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const cleanUsername = (username || "").trim();
      const cleanEmail = (email || "").trim().toLowerCase();

      if (!cleanUsername || !cleanEmail || !password) {
        throw new Error("All fields are required");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const exists = await User.findOne({ email: cleanEmail });
      if (exists) throw new Error("Email already exists");

      const user = await User.create({
        username: cleanUsername,
        email: cleanEmail,
        password,
      });

      return user;
    },

    addEmployee: async (_, { input }, context) => {
      auth(context.req);

      if (!input) throw new Error("Employee input is required");
      if (input.salary < 1000) throw new Error("Salary must be at least 1000");

      const emp = await Employee.create({
        ...input,
        date_of_joining: new Date(input.date_of_joining),
      });

      return emp;
    },

    updateEmployeeByEid: async (_, { eid, input }, context) => {
      auth(context.req);

      if (!eid) throw new Error("eid is required");
      if (!input) throw new Error("Employee input is required");
      if (input.salary < 1000) throw new Error("Salary must be at least 1000");

      const updated = await Employee.findByIdAndUpdate(
        eid,
        {
          ...input,
          date_of_joining: new Date(input.date_of_joining),
        },
        { new: true, runValidators: true }
      );

      if (!updated) throw new Error("Employee not found");
      return updated;
    },

    deleteEmployeeByEid: async (_, { eid }, context) => {
      auth(context.req);

      if (!eid) throw new Error("eid is required");
      const deleted = await Employee.findByIdAndDelete(eid);
      return !!deleted;
    },
  },
};

module.exports = resolvers;
