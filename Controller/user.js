
const jwt = require('jsonwebtoken');
const db = require('../helper/relation')


const bcrypt = require('bcrypt');

const { User, Notes } = db;

module.exports = {
    msg: (req, res) => {
        console.log("hello bung!")
        res.end()
    },

    createUser: async (req, res) => {
        const saltRound = 7;
        const password = req.body.password;
        console.log(password);
        const hashPassword = await bcrypt.hash(password, saltRound)
        try {
            const data = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            })
            res.json(data)
        } catch (error) {
            console.log(Error.message);
            res.status(422).json({ message: Error.sqlMessage })
        }
    },

    getOne: async (req, res) => {
       try {
         const data = await User.findOne({
         where: {username: req.params.username}
         })
         if(!data){
             res.status(404).json({message: "Data Not Found!"})
         }
         res.status(201).json({message: "Succes", data: data})
       } catch(error) {
         res.status(422).json({message: error.message})
       }
    },

    login: async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;

            const data = await User.findOne({
                where: {
                    username: username
                },
            })
            if (!data) {
                throw Error(`Data Not Found!`)
            }
            const isVeryfied = await bcrypt.compare(password, data.password);
            console.log(isVeryfied);
            if(!isVeryfied) {
                throw Error(`Wrong Password!`)
            }

            const payload = {
                ID: data.dataValues.id,
                username: username,
                email: email
            }
            console.log(payload)
            const token = jwt.sign(payload, "hey")
            res.json({ username: data.username, email:data.email, token: token })
        } catch (err) {
            res.json({ msg: err.message })
        }
    },

    logout: async (req, res) => {
        res.status(200).json({message: "Logout Succes!"})
    },

    register: async (req, res) => {
        try {
            const username = req.body.username
            const data = await User.findOne({
                where: {
                    username: username
                },
            })
            console.log(req.payload);   
            res.json({ userId: data.id ,username: data.username })
        } catch (Error) {
            console.log( Error.message )
            res.status(422).json({ message: Error.sqlMessage })
        }
    },

    user: async (req, res) => {
        const data = await User.findOne({
            where: {
                id: req.payload.ID
            },
            include: [{model: Notes}]
        })
        res.json({data})
    },

    getUser: async (req, res) => {
        const data = await User.findAll({
            // limit: JSON.parse(req.query.size),
            // offset: JSON.parse(req.query.page)
               
        })
        res.json(data)
    },

    updateUser: async (req, res) => {
        const id = req.params.id
        const data = await User.update({
            username: req.body.username,
            email: req.body.email,
            password : req.body.password
        }, { 
            where: {
                id: id,
            }
        })
        res.json({ Message: `Succes to Update` })
    },

    deleteUser: async (req, res) => {
        const id = req.params.id
        const data = await User.destroy({
            where: {
                id: id
            }
        })
        res.json({ Messsage: `Succesfull to delete!` })
    }

}