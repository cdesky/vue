new Vue({
	el:'.container',
	data:{
		addressList:[],
		limit:3,
		curIndex:0
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddr()
		})
	},
	computed:{
		filteraddressList:function(){
			return this.addressList.slice(0,this.limit)
		}
	},
	methods:{
		getAddr:function(){
			var _this=this
			this.$http.get('data/address.json').then(function(data){
				if(data.body.status=='0')
					_this.addressList=data.body.result
			})
		},
		setDef:function(id){
			this.addressList.forEach(function(item,index){
				if(item.addressId==id)
					item.isDefault=true
				else
					item.isDefault=false
			})
		}
	}
})