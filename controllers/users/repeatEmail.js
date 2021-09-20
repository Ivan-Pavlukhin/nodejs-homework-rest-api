const { BadRequest, NotFound } = require('http-errors')

const { User } = require('../../model')
const { sendMail } = require('../../utils')

const mail = {
  subject: 'register'
}

const repeatEmail = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('missing required field email')
  }
  const user = await User.findOne({ email })
  console.log(user)
  if (!user) {
    throw new NotFound()
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  await sendMail({
    ...mail,
    to: email,
    html: `<a href='http://localhost:3000/api/users/verify/${user.verifyToken}'>Подтвердить регистрацию</a>`
  })
  res.status(200).json({ message: 'Письмо с подтверждением отправленно вам на почту.' })
}

module.exports = repeatEmail
