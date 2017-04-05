/*
  这里面定义所有页面需要的展示数据，具体的内容根据具体组件要求来定义
 */
export default {
   count:(state)=>{
     return state.mutations.count;
   },
   //对应vuex.vue组件中的getter
   isOdd:(state)=>{
     return state.mutations.count % 2 == 0 ? '偶数':'奇数' 
   }	
}