<template>
<div>
  <header>
    <h1 class="wrap">任务计划列表</h1>
  </header>
  <div class="wrap" id="wrap">
    <h2>添加任务：</h2>
    <input type="text" class="input" @keyup.enter="addTo" v-model="add">
    <p class="tip1" v-show="list.length">
      <span>{{ unfinishedLength }}个任务未完成</span>
    </p>
    <h2>任务列表：</h2>
    <p class="p" v-show="!list.length">还没有添加任何任务</p>
    <ul>
      <li v-for="item in filterList" :class="{finished:item.isFinished,editing:item === edittodo}">
        <div>
          <input type="checkbox" v-model="item.isFinished" @click="consoleLog(item)">
          <span @dblclick="editor(item)">{{item.title}}</span>
          <button @click="deleteTodo(item)">X</button>
        </div>
        <input
          v-focus="edittodo === item"
          type="text"
          v-model="item.title"
          @keyup.enter="editend()"
          @keyup.esc="canceledit(item)"
          @blur="editend()"
        />
      </li>
    </ul>
  </div>
</div>
</template>

<script>
    import Vue from 'vue'
    var storage = {
      save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
      },
      get(key){
        return JSON.parse(localStorage.getItem(key)) || [];
      }
    }
    let list = storage.get("fl");
    export default {
      name: 'plan',
      data(){
        return {
          list,
          add:"",
          edittodo:"",
          beforetodo:"",
          visiblity:'all'
        }
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
    }
</script>

<style>
  #wrap ul li{
    background: #fff;
  }
</style>
