new Vue({
  el: '#app',
  data: {
  	total:0,
   productList:[],
   checkAllFlag:false
  },
  filters: {
   formaterMoney:function(val){
   	return '￥'+val.toFixed(2)
   }
  },
  mounted: function() {
     this.loadData()
  },
  methods: {
  		//初始化数据
      loadData:function(){
        var _this=this;
        this.$http.get('data/cart.json?t='+new Date().getTime()).then(function(res){
            _this.productList=res.body.result.list
            _this.total=res.body.result.totalMoney
        })
      },
      //数量的加减
      addCount:function(item,way){
      	if(way>0)
      		item.count++;
      	else
      	{
      		item.count--;
      		if(item.count<1)
      			item.count=1;
      	}
      },
      //选中 取消 某条数据
      select:function(item){
      	if(typeof item.checked=='undefined') 
      		Vue.set(item,'checked',true)
      	else
      		item.checked=!item.checked	
      },
      //全选  取消
      checkAll:function(flag){
      	this.checkAllFlag=flag
      	var _this=this;
      	this.productList.forEach(function(val,index){
      		if(typeof val.checked=='undefined')
	      		Vue.set(val,'checked',_this.checkAllFlag)
	      	else
	      		val.checked=_this.checkAllFlag
      	})
      }

    }
});

Vue.filter('money',function(val,type){
	return '$'+val.toFixed(2)+type
})