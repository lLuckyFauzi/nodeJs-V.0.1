const express = require("express");
const router = express.Router();
const UserController = require("../Controller/user");
const middleware = require("../middleware/middleware");

/**
 * @swagger
 * /getUser:
 *  get:
 *    summary: Get User
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: User was created
 *      404:
 *        description: User was not found
 *      500:
 *        description: Some error happened
 */
router.get("/getUser", UserController.getUser);

/**
 * @swagger
 * /getOne/{username}:
 *  get:
 *    summary: Get User
 *    parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: User was created
 *      404:
 *        description: User was not found
 *      500:
 *        description: Some error happened
 */
router.get("/getOne/:id", UserController.getOne);

/**
 * @swagger
 * /createUser:
 *  post:
 *    summary: Create User
 *    tags: [USER]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   username:
 *                     type: string
 *                     description: The user's name.
 *                     example: LuckyFauzi
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: LuckyFauzi@gmail.com
 *                   password:
 *                     type: string
 *                     description: The user's password.
 *                     example: Lucky12345
 *    responses:
 *      200:
 *        description: User was created
 *      404:
 *        description: User was not found
 *      500:
 *        description: Some error happened
 */
router.post("/createUser", UserController.createUser);

/**
 * @swagger
 * /updateUser/{id}:
 *  put:
 *    summary: Update User by the id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *    tags: [USER]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   username:
 *                     type: string
 *                     description: The user's name.
 *                     example: LuckyFauzi
 *    responses:
 *      200:
 *        description: User was created
 *      404:
 *        description: User was not found
 *      500:
 *        description: Some error happened
 */
router.put("/updateUser/:id", UserController.updateUser);

/**
 * @swagger
 * /deleteUser/{id}:
 *  delete:
 *    summary: Delete User by the id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: User was created
 *      404:
 *        description: User was not found
 *      500:
 *        description: Some error happened
 */
router.delete("/deleteUser/:id", UserController.deleteUser);

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Register
 *    tags: [USER]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   username:
 *                     type: string
 *                     description: The user's name.
 *                     example: admin1
 *                   password:
 *                     type: string
 *                     description: The user's name.
 *                     example: 123
 *    responses:
 *      200:
 *        description: User was created
 *      404:
 *        description: User was not found
 *      500:
 *        description: Some error happened
 */
router.post("/register", middleware.middleware, UserController.register);

/**
 * @swagger
 * /logout:
 *  get:
 *    summary: Get User
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: User was created
 *      404:
 *        description: User was not found
 *      500:
 *        description: Some error happened
 */
router.get("/logout", UserController.logout);

router.get("/pagination", UserController.pagination);

router.post("/login", UserController.login);

router.post("/userDetail", middleware.middleware, UserController.user);

module.exports = router;
