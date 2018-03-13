<template>
  <div class="project">
    <div class="add-project-box" @click="add">
      <i class='fa fa-plus-square'></i>
      <span>创建项目</span>
    </div>
    <div class="cleafix addbox">
      <template v-for="(item, index) in items">
        <div class="block-content" :key="index" @mouseenter="showCancel(item)" @mouseleave="hideCancel(item)">
          <div @dblclick="change(item)">{{item.title}}</div>
          <span @click="cancel(item)">X</span>
          <input type="text" v-show="item.showInput" @blur="changeEnd(item)" v-focus="true" v-model="newTitle">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'Project',
    data(){
      return {
        items:[{
          title:'项目一',
          showX:false,
          showInput:false
        },{
          title:'项目二',
          showX:false,
          showInput:false
        }],
        newTitle:''
      }
    },
    directives:{
      "focus":{
        update(el,binding){
          el.focus();
        }
      }
    },
    methods:{
      add(){
        this.items.push({
          title:"新建项目",
          showX:false,
          showInput:false
        });
      },
      cancel(data){
        var index = this.items.indexOf(data);
        this.items.splice(index,1);
      },
      showCancel(data){
        var index = this.items.indexOf(data);
        var oldTitle = this.items[index].title;
        var oldShowInput = this.items[index].showInput;
        Vue.set(this.items, index, {title:oldTitle,showX:true,showInput:oldShowInput});
      },
      hideCancel(data){
        var index = this.items.indexOf(data);
        var oldTitle = this.items[index].title;
        var oldShowInput = this.items[index].showInput;
        Vue.set(this.items, index, {title:oldTitle,showX:false,showInput:oldShowInput});
      },
      change(data){
        var index = this.items.indexOf(data);
        var oldTitle = this.items[index].title;
        this.newTitle = oldTitle;
        Vue.set(this.items, index, {title:oldTitle,showX:false,showInput:true});
      },
      changeEnd(data){
        var index = this.items.indexOf(data);
        var oldTitle = this.newTitle;
        if( oldTitle.length > 10){
          alert("最多输入10个汉字");
          return
        }
        var oldShowX = this.items[index].showX;
        Vue.set(this.items, index, {title:oldTitle,showX:oldShowX,showInput:false});
      }
    }
  }
</script>
<style>
.block-content span{
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  font-size: 30px;
  line-height: 36px;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
}
.block-content span:hover{
  opacity: .6;
}
.block-content input{
  position: absolute;
  top: 80px;
  left: 30px;
}
  .block-content{
    position: relative;
    float: left;
    margin: 8px;
  }
  .cleafix:after{
    content: '';
    display: block;
    overflow: hidden;
    height: 0;
    line-height: 0;
    clear:both;
  }
  .addbox .block-content{
    width: 20%;
    margin:10px 2%;
  }
.block-content span{
  display: none;
}
  .block-content:hover span{
    display: block;
  }
</style>
