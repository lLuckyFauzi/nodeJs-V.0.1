const jwt = require("jsonwebtoken");
const db = require("../helper/relation");

const bcrypt = require("bcrypt");

const { User, Notes } = db;

module.exports = {
  msg: (req, res) => {
    console.log("hello bung!");
    res.end();
  },

  createUser: async (req, res) => {
    const saltRound = 7;
    const password = req.body.password;
    console.log(password);
    const hashPassword = await bcrypt.hash(password, saltRound);
    try {
      const data = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword,
      });
      res.json(data);
    } catch (error) {
      console.log(Error.message);
      res.status(422).json({ message: Error.sqlMessage });
    }
  },

  getOne: async (req, res) => {
    try {
      const data = await User.findOne({
        include: [{ model: Notes }],
        where: { id: req.params.id },
      });
      if (!data) {
        res.status(404).json({ message: "Data Not Found!" });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(422).json({ message: error.sqlMessage });
    }
  },

  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const data = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!data) {
        throw Error(`Not Found!`);
      }
      const isVeryfied = await bcrypt.compare(password, data.password);
      console.log(isVeryfied);
      if (!isVeryfied) {
        throw Error(`Wrong Password!`);
      }

      const payload = {
        ID: data.dataValues.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: email,
      };
      console.log(payload);
      const token = jwt.sign(payload, "hey");
      res.json({ firstname: data.firstname, email: data.email, token: token });
    } catch (err) {
      res.json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    res.status(200).json({ message: "Logout Succes!" });
  },

  register: async (req, res) => {
    try {
      const data = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      console.log(req.payload);
      res.json({
        userId: data.id,
        firstname: data.firstname,
        email: data.email,
      });
    } catch (Error) {
      console.log(Error.message);
      res.status(422).json({ message: Error.sqlMessage });
    }
  },

  user: async (req, res) => {
    try {
      const data = await User.findOne({
        where: {
          ID: req.payload.ID,
        },
        include: [{ model: Notes }],
      });
      if (!data) {
        res.status(404).json({ message: "Not Found!" });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(422).json({ message: error.sqlMessage });
    }
  },

  getUser: async (req, res) => {
    const data = await User.findAll({});
    res.status(200).json({ data });
  },

  pagination: async (req, res) => {
    try {
      const data = await User.findAll({
        limit: JSON.parse(req.query.size),
        offset: JSON.parse(req.query.page),
      });
      if (data == 0) {
        res.status(404).json({ message: "Out of Pages!" });
      }
      res.json({ data });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    const id = req.params.id;
    const data = await User.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ Message: `Succes to Update` });
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    const data = await User.destroy({
      where: {
        id: id,
      },
    });
    res.json({ Messsage: `Succesfull to delete!` });
  },
};
