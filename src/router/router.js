import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App';
import Reader from '@/components/Reader';
import Bmap from '@/components/bmap';
import EpubReader from '@/components/epubReader';
import Vuex from '@/components/vuex';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'reader',
      component: Reader
    },
     {
      path: '/reader',
      name: 'reader',
      component: Reader
    },
    {
      path: '/epubReader',
      name: 'epubReader',
      component: EpubReader
    },
    {
      path: '/bmap',
      name: 'bmap',
      component: Bmap
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: Vuex
    }
  ]
})
