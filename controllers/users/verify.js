const { NotFound } = require('http-errors')

const { User } = require('../../model')

const verify = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true }, { new: true })
  if (!user) {
    throw new NotFound('Пользователь не найден')
  }
  res.send('<h2>Email подтвержден</h2>')
}

module.exports = verify
