const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
	try {
		const students = await Student.findAll();
		res.status(200).json(students);
	} catch (err) {
		res.sendStatus(404);
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const studentId = req.params.id;
		const student = await Student.findByPk(studentId);
		res.status(200).json(student);
	} catch (err) {
		res.sendStatus(404);
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const newStudent = await Student.create(req.body);
		res.status(201).json(newStudent);
	} catch (err) {
		res.sendStatus(400);
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const studentToUpdate = await Student.findByPk(req.params.id);
		const updatedStudent = await studentToUpdate.update(req.body);
		res.status(200).json(updatedStudent);
	} catch (err) {
		res.sendStatus(400);
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const studentToDelete = await Student.findByPk(req.params.id);
		await studentToDelete.destroy();
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

// Task.completeAll = async function() {
// 	await this.update(
// 		{ complete: true },
// 		{
// 			where: {
// 				complete: false
// 			}
// 		}
// 	);
// };

module.exports = router;
