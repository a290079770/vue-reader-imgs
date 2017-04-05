import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var state = {
	count:10
}


const actions = {
	add:({  //处理异步请求，流程控制，逻辑代码等
		commit  //commit包含是一个对象，里面包含所有的actions
	})=>{
        commit('add');
	},
	decrement:({
		commit
	})=>{
		commit('decrement')
	},
	addOdd:({
		commit,
		state
	})=>{
		if(state.count % 2 == 0) {
			commit('add');
		}
	},
	addAsync:({
		commit
	})=>{
		new Promise(resolve=>{
            setTimeout(function(){
            	commit('add')
            },1000)
		})
	} 
};



const mutations = {   //处理数据的变化，增加减少等
    add(state){
    	state.count ++;
    },
    decrement(state) {
    	state.count --;
    },


};

const getters = {
	count(state){
        return state.count;
	}
}




export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})