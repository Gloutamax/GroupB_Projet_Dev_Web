const Matériaux = require("../models/materiel");
module.exports ={

 cget: async (req, res) => {
  res.json(await Matériaux.findAll());
},
 create: async (req, res, next) => {
try {
  res.status(201).json(await Matériaux.create(req.body));
} catch (e) {
     next(e);
    }
},
 get: async (req, res, next) => {
 const id = parseInt(req.params.id, 10);
 const matériaux = await Matériaux.findByPk(id);
 if (!matériaux) {
 res.sendStatus(404);
} else {
 res.json(matériaux);
}
},
 patch: async (req, res, next) => {
 try {
 const id = parseInt(req.params.id, 10);
 const [nbUpdated, [matériaux]] = await Matériaux.update(req.body, {
 where: { id },
 returning: true,
 individualHooks: true,
 });
if (nbUpdated === 0) {
 return res.sendStatus(404);
 }
return res.json(matériaux);
 }catch (e){
 next(e);
 }
},
delete: async (req, res, next) => {
const id = parseInt(req.params.id, 10);
const nbDeleted = await Matériaux.destroy ({ where: {id}});
if (nbDeleted === 0) {
return res.sendStatus(404);
}
return res.sendStatus(204);
},
};