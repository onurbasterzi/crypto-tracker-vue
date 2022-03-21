export default {
  timeFormatter: (timestamp) => {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return  hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  },

  dateUtcFormatter:(timestamp)=>{
    const d = new Date(timestamp);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()) / 1000;
  }
};
