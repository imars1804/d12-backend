export function login (req, res) {
    const {userName} = req.body;
    const userSession = req.session.userName;
    if(userSession) {
        return res.status(200).json({
            session: {
                state: true,
                user: userName
            },
            message: `El usuario ${userSession} inicio sesion antes`
        })
    }
    if(!userName || !userName.trim()) {
        return res.status(406).json({
            session: {
                state: false,
                user: ''
            },
            message: 'Nombre de usuario incorrecto'
        })
    }
    req.session.userName = userName;
    res.status(200).json({
        session: {
            state: true,
            user: req.session.userName || 'Anonimo'
        },
        message: `El usuario ${userName} ha iniciado sesion`
    })
}
export function logout (req, res) {
    const userSession = req.session.userName;
    if(!userSession) {
        return res.status(200)
    }
}