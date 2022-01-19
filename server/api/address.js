const router = require("express").Router();
const {models: {Address}} = require("../db");
const { isLoggedIn, isAdmin } = require("../middleware");
// how to have the admin manage the address of all users?

module.exports = router

router.post('/', isLoggedIn, async(req, res, next) =>{
    try{
       res.send(await Address.create({place:req.body.address, userId:req.user.id}))
    }
    catch(ex){
        next(ex)
    }
})

router.get('/', isLoggedIn, async(req, res, next) =>{
    try{
       res.send(await Address.findAll({where: { userId:req.user.id}}))
    }
    catch(ex){
        next(ex)
    }
})

router.put("/:id", isLoggedIn, async (req, res, next) => {
    try {
      const adddress = await Address.findByPk(req.params.id);
      await adddress.update(req.body);
      res.send(await address.save()); 
    } catch (err) {
      next(err);
    }
  });
  
router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
      const address = await Address.findByPk(req.params.id);
      await address.destroy();
      res.send(address);
    } catch (err) {
      next(err);
    }
  });