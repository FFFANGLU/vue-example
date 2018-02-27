var storage = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	get(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

let list = storage.get("fl");

let vm = new Vue({
	el:"#wrap",
	data:{
		list,
		add:"",
		edittodo:"",
		beforetodo:"",
		visiblity:"all"
	},
	computed:{
		unfinishedLength(){
			return this.list.filter((item)=>{
				return !item.isFinished
			}).length
		},
		filterList(){
			var filter = {
				all(list){
					return list
				},
				finished(list){
					return list.filter((item)=>{
						return item.isFinished
					});
				},
				unfinished(list){
					return list.filter((item)=>{
						return !item.isFinished
					});
				}
			};
			return filter[this.visiblity] ? filter[this.visiblity](list) : list;
		}
	},
	watch:{
		list:{
			handler:function(){
				storage.save("fl",this.list);
			},
			deep:true
		}
	},
	methods:{
		addTo(){
			if (this.add === '') return
			list.push({
				title:this.add,
				isFinished:false
			});
			this.add="";
		},
		consoleLog(data){
			console.log(data)
		},
		deleteTodo(data){
			var index = this.list.indexOf(data);
			this.list.splice(index,1);
		},
		editor(data){
			this.beforetodo = data.title;
			console.log(this.beforetodo)
			this.edittodo = data;
		},
		editend(){
			this.edittodo='';
		},
		canceledit(data){
			data.title = this.beforetodo;
			this.edittodo='';
		}
	},
	directives:{
		"focus":{
			update(el,binding){
				el.focus();
			}
		}
	}
});
function watchHash(){
	var hash = window.location.hash.slice(1);
	vm.visiblity = hash;
}

watchHash();
window.addEventListener("hashchange",watchHash);