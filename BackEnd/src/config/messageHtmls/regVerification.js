const regVerification = (code) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Verify your email</title>
        </head>
        <body>
            <h2>Verify your email</h2>
            <p>Your verification code is:</p>
            <h1>${code}</h1>
            <p>This code will expire in 5 minutes.</p>
        </body>
        </html>
    `
}

module.exports = regVerification