const { Router } = require('express');

const Poll = require('../models/Poll');
const Assessment = require('../models/Assessment');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/create', auth, async(req, res) => {
    try {
        const { projectAuthors, cards } = req.body;

        const poll = new Poll({
            projectAuthors,
            cards,
            owner: req.user.userId
        });

        await poll.save();

        res.status(201).json({ poll, message: 'Протокол создан!' });
        
    } catch(err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.post('/change/:id', auth, async(req, res) => {
    try {
        const { projectAuthors, cards } = req.body;
        const poll = await Poll.findByIdAndUpdate(req.params.id, {projectAuthors, cards});
        res.status(201).json({ poll, message: 'Данные обновлены!' });
    } catch(err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.get('/', auth, async(req, res) => {
    try {
        const polls = await Poll.find({ owner: req.user.userId });
        res.json(polls);
    } catch(err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.get('/:id', async(req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if(!poll) {
            res.json(404);
        } else {
            res.json(poll);
        }
    } catch(err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.delete('/delete/:id', auth, async(req, res) => {
    try {
        const assessments = await Assessment.find({ owner: req.params.id });
        assessments.forEach( async (assessment) => {
            await Assessment.findByIdAndRemove({ _id: assessment._id });
        })
    } catch(err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }

    try {
        const poll = await Poll.findByIdAndRemove(req.params.id);
        res.json({poll, message: 'Протокол удален.'});
    } catch(err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.post('/assessment', async(req, res) => {

    const { expert, projectAuthor, marks, owner } = req.body;

    try {
        const fetched = await Assessment.find({ expert: expert });

        for(let i = 0; i < fetched.length; i++) {
            if(fetched[i].projectAuthor === projectAuthor) {
                res.status(403).json({ message: 'Оценка по выбранному автору уже была дана'});
                return;
            }
        }
    } catch(err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
    try {
        const assessment = new Assessment({
            expert,
            projectAuthor,
            marks,
            owner
        });

        await assessment.save();

        res.status(201).json({ assessment, message: 'Оценка записана!' });
        
    } catch(err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.get('/getassessment/:owner', auth, async(req, res) => {
    try {
        const assessment = await Assessment.find({ owner: req.params.owner });
        res.json(assessment);
    } catch(err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
});

module.exports = router;