import passport from "passport";
import local from "passport-local"
import { userModel } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils";

const LocalStrategy = local.LocalStrategy

const initializePassport = () => {
    passport.use()
        "register",
        new LocalStrategy(
            {
                usernameField: "email",
                passReqToCallback: true
            }, async (req, username, password, done) =>{
                const { first_name, last_name,email , age, role } = req.body

                if(!first_name || !last_name || !email || !age || !password) {
                    return res.status(400).json({ message: 'Missing required fields' })
                }
            
                try {
                    const user = await userModel.findOne({ email: username})

                    if(user) {
                        console.log('User already exists')
                        return done(null, false)
                    }

                    const newUser = await userModel.create({ 
                        first_name, 
                        last_name, 
                        email, 
                        age, 
                        password: hashPassword(password),
                        role })
                    res.status(201).redirect('/login')
                    return done(null, newUser)
                } catch(error) {
                    return done(`Error: ${error}`, false)
                }
            }
        )

        // passport.use(
        //    "restore,
        //    new LocalStrategy({

        //}
        //)

        passport.use(
            "login",
            new LocalStrategy({
                usernameField: "email",
            },
            async (username, password, done) => {
                try {
                    const user = await userModel.findOne({ email: username })

                    if (!user) {
                        console.log('User not found')
                        return done(null, false)
                    }

                    if(!comparePassword(user, password)){
                        console.log('Invalid Password')
                        return done(null, false)
                    }

                    return done(null, user)
                } catch(error) {
                    return done(`Error: ${error}`, false)
                }
            }
        )
        )

        // passport.use(
        //    "logout,
        //    new LocalStrategy({

        //}
        //)

        passport.serializeUser((user, done) => {
            done(null, user._id)
        })

        passport.deserializeUser(async (id, done) => {
            try {
                const user = await userModel.findById(id)
                done(null, user)
            } catch(error) {
                done(error, false)
            }
        })
}

export default initializePassport