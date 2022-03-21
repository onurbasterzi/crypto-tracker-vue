import mainStream from "./streams/mainStream"
import candleStickStream from "./streams/candleStickStream"
import detailStream from "./streams/detailStream"
import binance from "./binance"
import tradeStream from "./streams/tradesStream"
import tools from "./tools"


export const initMainSocket=()=>mainStream.sockInit()
export const closeMainSocket=()=>mainStream.sockClose()

export const klines=(symbol, interval)=>binance.klines(symbol, interval)
export const trades=(symbol)=>binance.trades(symbol);

export const initCandleStickSocket=(endpoint)=>candleStickStream.sockInit(endpoint)
export const closeCandleStickSocket=()=>candleStickStream.sockClose()

export const initDetailSocket=(endpoint)=>detailStream.sockInit(endpoint)
export const closeDetailSocket=()=>detailStream.sockClose()

export const initTradeSocket=(endpoint)=>tradeStream.sockInit(endpoint)
export const closeTradeSocket=()=>tradeStream.sockClose()

export const timeFormatter=(timestamp)=>tools.timeFormatter(timestamp)
export const dateUtcFormatter=(timestamp)=>tools.dateUtcFormatter(timestamp)


