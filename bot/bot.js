const { Telegraf } = require('telegraf');
const { uuid } = require('uuidv4');
const mongoose = require('mongoose');

//DB logic

mongoose.connect(
  'mongodb+srv://vladmiron:travazabor206@cluster0.6mfby.mongodb.net/store'
);

const db = mongoose.connection;

db.on('error', () => console.log('connection error'));
db.once('open', () => {
  console.log('Connection Successful!');
});

const BotOrderSchema = mongoose.Schema({
  userId: Number,
  orderId: String,
  username: String,
  name: String,
  phone: String,
  creditCard: String,
  address: String,
  items: String,
  price: Number,
});

const BotOrder = mongoose.model('BotOrder', BotOrderSchema, 'bot_orders');

const web_link =
  'https://6443dad32b67272a011e8ea2--glittering-churros-4dce8d.netlify.app/';

const bot = new Telegraf('6246457668:AAELqSTKfGDp5uQoNfWAlL1mzLU4_pb36kw');
bot.start((ctx) =>
  ctx.reply('Welcome !!!', {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Go shopping',
            web_app: {
              url: web_link,
            },
          },
        ],
      ],
    },
  })
);
bot.on('message', async (ctx) => {
  const web_data = ctx.message.web_app_data?.data;
  const userInfo = ctx.update.message.from;

  if (web_data) {
    try {
      const orderId = uuid();

      const data = JSON.parse(web_data);

      const botOrderDoc = new BotOrder({
        userId: userInfo.id,
        orderId,
        username: userInfo.username ?? '',
        name: `${userInfo.first_name} ${userInfo.last_name ?? ''}`.trim(),
        phone: data?.phone ?? '',
        creditCard: data?.creditCard ?? '',
        address: data?.address ?? '',
        items: data?.order,
        price: data?.price.toFixed(2),
      });

      botOrderDoc
        .save()
        .then(() => console.log('Order has saved'))
        .catch((e) => console.error(e));

      await ctx.reply(
        '\u23f3 Thanks for the order. Your order a processing now...'
      );

      setTimeout(async () => {
        await ctx.reply(`
      \u{1F355} Order info:
       - order ID: ${orderId}
       - username: ${userInfo.username ?? ''}
       - name: ${userInfo.first_name} ${userInfo.last_name ?? ''}
       - phone: ${data?.phone}
       - address: ${data?.address}
       - items: ${data?.order}
       - price: ${data?.price.toFixed(2)}
      `);
      }, 2000);

      setTimeout(async () => {
        await ctx.reply(
          'We are waiting for you again. With love, 101pizza restaurant'
        );
      }, 4000);
    } catch (e) {
      console.log(e);
    }
  }
});
bot.launch();
