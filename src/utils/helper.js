import moment from "moment";

function formatCurrency(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function padLine(partOne, partTwo, columnsPerLine = 30, str = " ") {
  let concat = "";

  partOne = partOne || "";
  partTwo = partTwo || "";

  if(partOne.length + partTwo.length > columnsPerLine) {
    let temp = partOne + partTwo;
    let p1 = temp.substring(0, 30);
    let p2 = temp.substring(30, temp.length);

    temp = str;
    let padding = columnsPerLine - p2.length;
    for(let i = 0; i < padding; i++) {
      temp = temp + str;
    }

    concat = partOne + "\n" + temp + partTwo;
  } else {
    let temp = str;
    let padding = columnsPerLine - (partOne.length + partTwo.length);
    for(let i = 0; i < padding; i++) {
      temp = temp + str;
    }

    concat = partOne + temp + partTwo;
  }

  return concat;
}

function getReceiptPrint(setting, order) {
  let date = moment(order.createdAt).format('L');
  let time = moment(order.createdAt).format('HH:mm');
  let timestamp = `DATE  ${date} ${time}`;
  let code = `#${order.code}`;
  let receipt = { 
    name: setting.name,
    printer: setting.receiptPrinter,
    header1: setting.header1,
    header2: setting.header2,
    header3: setting.header3,
    header4: setting.header4,
    header5: setting.header5,
    footer1: setting.footer1,
    footer2: setting.footer2,
    footer3: setting.footer3,
    order: padLine(timestamp, code),
    subtotal: padLine("SUBTOTAL", formatCurrency(order.subtotal)),
    discount: padLine("DISCOUNT", formatCurrency(order.discount)),
    tax: padLine("TAX", formatCurrency(order.tax)),
    total: padLine("TOTAL", formatCurrency(order.total), 15),
    items: [] 
  };

  order.items.forEach(item => {
    let quantity = "";
    if (item.quantity < 10) quantity = `0${item.quantity}`
    else quantity = `${item.quantity}`

    let temp = `${quantity} ${item.name}`;
    temp = padLine(temp, formatCurrency(item.subtotal));

    receipt.items.push(temp);
  })

  return receipt;
}

export default {
  getReceiptPrint
}