const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { id, content } = req.body

    const purchaseAd = await Ad.findById(id).populate('author')
    const user = await User.findById(req.userId)

    await Mail.sendMail({
      from: '"Oseias Paulo" <hoseaps@hotmail.com>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      html: `<p>Teste</p> ${content}`
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
