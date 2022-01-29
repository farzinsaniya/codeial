//setting up the development env
const development = {
    name: 'development',
    //creating a key for assests
    asset_path: 'assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'developerfarzin@gmail.com',
        pass: 'utqcjjqxpazppqft'
    },
    tls : {rejectUnauthorized : false}
},
    google_client_id: "860103775447-5r8bipe5qkfs2i1b4b41qcp37llg57m7.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}

const production = {
    name: 'production'
}

module.exports = development;