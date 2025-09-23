const { transactions, purchasesAndDownloads } = require("../../models/indexs");
const paypal = require("@paypal/paypal-server-sdk");
const payPalEnvironment = new paypal.core.SandboxEnvitonment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
);

const client = new paypal.core.PayPalHttpClient(payPalEnvironment);

exports.createOrder = async (req: any, res: any) => {
  try {
    const { cart, total } = req.body;
    const { id } = req.user;

    if (!cart || !Array.isArray(cart) || !total) {
      return res?.json({
        status: false,
        message: "incorrect argument. Payment was unable to be created",
      });
    }

    const toNumber = parseFloat(total);

    if (isNaN(toNumber)) {
      return res?.json({
        status: false,
        message: "incorrect argument. Payment was unable to be created",
      });
    }

    const createOrderRequest = new paypal.orders.OrdersCreateRequest();
    createOrderRequest.requestBody({
      intent: "CAPTURE",
      purchase_unit: [
        {
          amount: { currency_code: "USD", value: toNumber },
        },
      ],
    });

    const order = await client.execute(createOrderRequest);
    const orderTxn_id = order.result.id;

    await Promise.all(
      cart.map((item) => {
        transactions.create({
          user_id: id,
          book_id: item.id,
          amount: item.amount,
          status: "pending",
          tnx_ref: orderTxn_id,
        });
      })
    );

    return res?.json({
      status: true,
      message: "payment initialized. Order created",
      orderId: orderTxn_id,
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.completePayment = async (req: any, res: any) => {
  try {
    const { orderId } = req.params;
    const { id } = req.user;

    if (!orderId) {
      return res?.json({
        status: false,
        message: "invalid order request",
      });
    }

    const createOrderRequest = new paypal.orders.OrdersCaptureRequest(orderId);
    createOrderRequest.requestBody({});

    const capture = await client.execute(createOrderRequest);

    const updateRederRequest = await transactions.update(
      { status: "paid" },
      { where: { tnx_ref: orderId } }
    );

    if (!updateRederRequest) {
      return res?.json({
        status: false,
        message: "something went wrong will completing your request. try again",
      });
    }

    const getOrder = await transactions.findAll({
      where: { tnx_ref: orderId },
    });

    await Promise.all(
      getOrder.map((order: any) => {
        purchasesAndDownloads.create({
          user_id: id,
          book_id: order.book_id,
          downloaded: false,
        });
      })
    );

    return res?.json({
      status: true,
      message: "payment successfull",
      data: capture.result,
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};
