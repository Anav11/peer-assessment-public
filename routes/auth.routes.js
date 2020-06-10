const {Router} = require('express');
const bycrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');

const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный Email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}),
        check('firstname', 'Поле \'Имя\' не может быть пустым').isLength({min: 1, max: 20}),
        check('lastname', 'Поле \'Фамилия\' не может быть пустым').isLength({min: 1, max:20})
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации.'
                })
            }

            const {
                firstname, 
                lastname,
                email, 
                password
            } = req.body;

            const candidate = await User.findOne({ email });

            if(candidate) {
                return res.status(400).json({ message: 'Такой Email уже зарегистрирован'});
            }

            const hashedPassword = await bycrypt.hash(password, 12);
            const user = new User({firstname, lastname, email, password: hashedPassword});
            await user.save(function(err) {
                if(err) console.log(err.message);
            });

            res.status(201).json({ message: 'Пользователь создан'});

        } catch(err) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
        }
    }
);

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный Email').isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async(req, res) => { 
        const errors = validationResult(req);

        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные.'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});

            if(!user) {
                return res.status(400).json({ message: 'пользователь не найден' });
            }

            const isMatch = await bycrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret')
            );

            res.status(200).json({ token, userId: user.id, firstname: user.firstname, lastname: user.lastname, message: 'Добро пожаловать' });

        } catch(err) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
        }
    }
);

module.exports = router;