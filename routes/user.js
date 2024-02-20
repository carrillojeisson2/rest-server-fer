
const {Router} = require("express");
const { getUsers, postUsers, pathUsers, deleteUsers } = require("../controllers/user");

const router = Router();

router.get('/', getUsers )
router.post('/', postUsers )
router.patch('/:id', pathUsers )
router.delete('/', deleteUsers )


module.exports = router;