import { Router } from "express"
import passport from "passport"
import { userModel } from '../models/user.model.js'
import { comparePassword, hashPassword } from "../utils.js"

const router = Router()

router.get('/github', passport.authenticate('github', {scope: ['user:email'] }))

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/')
})

router.post('/login', passport.authenticate("login", { failureRedirect: '/failLogin' }), async (req, res) => {
    if(!req.user) {
        return res.status(404).json({ message: 'User not found' })
    }

    req.session.user = {
        first_names: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    }

    res.status(200).redirect('/profile')
})

router.get('/failLogin', (req, res) => {
    res.status(401).json({ message: 'You are not authenticated' })
})

router.post('/register',passport.authenticate("register", { failureRedirect: '/session/failRegister' }), async (req, res) => {
    return res.status(201).redirect('/login')
})

router.get('/failRegister', (req, res) => {
    res.status(401).json({ message: 'You are not registered' })
})

router.post('/restore', async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await userModel.findOne({ email })

        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if(comparePassword(user, password)){
            return res.json({ message: 'Passwords is the same' })
        }

        user.password = hashPassword(password)
        await user.save()
        return res.json({ message: 'Passwords updated' })
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

export default router