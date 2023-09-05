import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { validarToken } from "./JWT";

passport.use(
    new BearerStrategy(
        {
            passReqToCallback: true,
        },
        async function (req:any, token:any, done:any) {
            const usuario = await validarToken(req, token);
            if (!usuario) return done(null, false);
            return done(null, usuario);
        }
    )
);
export default passport;
