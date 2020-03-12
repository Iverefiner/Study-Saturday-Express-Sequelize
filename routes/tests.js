const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
	try {
		const tests = await Test.findAll();
		res.status(200).json(tests);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const test = await Test.findByPk(req.params.id);
		res.status(200).json(test);
	} catch (err) {
		next(err);
	}
});

router.post('/student/:id', async (req, res, next) => {
	try {
		// console.log(req.body);
		const student = await Student.findByPk(req.params.id);
		// console.log(student.__proto__);
		// const newTest = await Test.create(req.body);
		// const assignedTest = await student.setTest(newTest);
		const assignedTest = await student.createTest(req.body);
		// console.log(student.__proto__);
		res.status(201).json(assignedTest);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		await Test.destroy({
			where: {
				id: req.params.id
			}
		});
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
