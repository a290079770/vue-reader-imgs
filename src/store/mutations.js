/*
  这里面只用于对state的操作，不允许进行逻辑、流程、异步等操作
 */
import {
     	ADD,
     	DECREMENT
       } from './types.js';

//state是保存整个仓库的状态
var state = {
	count:10
}

const mutations = {
    [ADD]:(state,index)=>{
      state.count += index;
    },
    [DECREMENT]:(state)=>{
      state.count --;
    }
}


export default {
	mutations,
	state
}

//这里需要将mutations和state一起暴露给index.js
//如果是将state独立出来的，可以另外处理