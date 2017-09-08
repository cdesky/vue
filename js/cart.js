new Vue({
  el: '#app',
  data: {
   totalMoney:0,
   productList:[],
   checkAllFlag:false,
   vModal:false
  },
  //局部过滤器  只对应当前的 
//filters: {
// formaterMoney:function(val){
// 	return '$'+val.toFixed(2)
// }
//},
  //最先要加载的入口的方法
  mounted: function() {
     this.loadData()
  },
  methods: {
  		//初始化数据
      loadData:function(){
        var _this=this;
        this.$http.get('data/cart.json?t='+new Date().getTime()).then(function(res){
            _this.productList=res.body.result.list
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
      	this.totalPrice()
      },
      //选中 取消 某条数据
      select:function(item){
      	if(typeof item.checked=='undefined') 
      		Vue.set(item,'checked',true)
      	else
      		item.checked=!item.checked	
      		
      	this.totalPrice()
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
      	this.totalPrice()
      },
      //计算选中的总金额
      totalPrice:function(item){
      	var _this=this;
      	_this.totalMoney=0;
      	this.productList.forEach(function(val,index){
      		if(val.checked)
      		_this.totalMoney+=val.count*val.price
      	})
      }

    }
});

//全局过滤器
Vue.filter('money',function(val,type){
	return '$'+val.toFixed(2)+type
})