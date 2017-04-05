<template>
  <div>
     <button @click="add(3)">增加</button><br>
     <span>现在的数字是：{{count}},现在是：{{isOdd}}</span><br>
     <button @click="decrement">减少</button><br>
     <button @click="addOdd">偶数才能增加</button><br>
     <button @click="addAsync">一秒后增加</button><br>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  name: 'vuex',
  data () {
    return {
      number:0
    }
  },
  //将页面需要的数据，放在getter里，不需要在data里声明
  //注意:组件内部的自身属性就放在组件内部，只有页面间共同维护的数据才需要放入store，以免导致store冗余
  computed:mapGetters([
      'count',
      'isOdd'
  	]),
  //调用store里的方法有三种方式，下面是第一种
  // methods:mapActions([
  //     'add',
  //     'decrement',
  //     'addOdd',
  //     'addAsync'
  // 	])
  //这是第二种
   methods:mapActions(
       {
        add:'add',
        decrement:'decrement',
        addOdd:'addOdd',
        addAsync:'addAsync'
       }
    )
   //下面是第三种
   // methods:{
   //    add(index){
   //      this.$store.dispatch('add',index)
   //    }
   // }
   //注意：第一二种方式不需要正在mapActions里设置形参
   //采用方式视具体情况，也可以多种结合
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    	div {
    		display: flex;
    		justify-content: center;
    		flex-direction: column;
    		align-items: center;
    		margin-top: 200px
    	}
</style>
