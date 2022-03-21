const state={
    coin:[],
    candleData: [],
    lineSeries: null,
    candleStickStatus:0,
    detailStatus:0,
    cursorData:{open:0,close:0,low:0,high:0}
   
};

const getters={

    

};

const mutations={

    setCoinData(state,coinData){
        state.coin=coinData
    },
    setCandleStickStatus(state,_status){
        state.candleStickStatus=_status
    },

    setCursorData(state,_cursorData){
        state.cursorData=_cursorData
    },

    setDetailStatus(state,_status){
        state.detailStatus=_status
    },
   
    setCandleData(state,_candleDate){
       
        state.candleData=_candleDate
    },

    setLineSeries(state,_lineSeries){
        // console.log(_lineSeries);
        state.lineSeries=_lineSeries
    },

    setLineSeriesData(state){
        
        state.lineSeries.setData(state.candleData)
    },

    updateLineSeriesData(state,object){
        state.lineSeries.update(object)
    },

    pushCandleData(state,object){
        state.candleData.push(object)
    }
};

const actions={

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,   
  }