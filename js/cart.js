new Vue({
  el: '#app',
  data: {
  	total:0,
   productList:[]
  },
  filters: {
   
  },
  mounted: function() {
     this.loadData()
  },
  methods: {
      loadData:function(){
        var _this=this;
        this.$http.get('data/cart.json?t='+new Date().getTime()).then(function(res){
            _this.productList=res.body.result.list
            _this.total=res.body.result.totalMoney
        })
      }

    }
});
