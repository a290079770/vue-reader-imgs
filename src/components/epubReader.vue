<template>
  <div class="epubReader" > 
    <div class="content" v-bind:style="{height:windowHeight+'px'}" >
        <div id="area" v-bind:style="{height:windowHeight-50+'px'}"></div>
        <div class="header">
    	   <span :style="{opacity:item.opacity}" v-for="(item,index) in oparateList" @click="showTab(item)" @mouseenter="changeOpacity(item)" @mouseleave="changeOpacity(item)"><img :src="item.src" alt="">
    	    {{item.menuName}}
    	   </span> 
        </div> 
        <div class="menu catalogueList" v-show="oparateList[0].showTab">
             <el-tree
              :data="catalogueList"
              :props="defaultProps"
              style="border:none"
              accordion
              @node-click="handleNodeClick">
            </el-tree>
        </div>
         <div class="menu bookmarkList" v-show="oparateList[1].showTab">
        	    <el-table
                :data="tableData5"
                style="width: 100%">
                <el-table-column type="expand">
                   这里是笔记的详情
                </el-table-column>
                <el-table-column
                  label="作者"
                  prop="userName">
                </el-table-column>
                <el-table-column
                  label="笔记标题"
                  prop="title">
                </el-table-column>
                <el-table-column
                  label="添加时间"
                  prop="createDate">
                </el-table-column>
              </el-table>
        </div>
         <div class="menu viewList" v-show="oparateList[2].showTab">
        	 <div>
              <h3>阅读模式</h3>
              <ul>
                <li>左右分页</li>
                <li>章节分组</li>
                <li>无限滚动</li>
              </ul>
           </div>
           <div>
             <h3>分页模式</h3>
              <ul>
                <li>自适应</li>
                <li>强制单页</li>
                <li>强制双页</li>
              </ul>
           </div>
        </div>
         <div class="menu fontList" v-show="oparateList[3].showTab">
            <div class="font-size">
              <h3>字体大小</h3>
              <p><span>
                   A+
                 </span>
                 <span>
                   A-
                 </span></p>
            </div>
            <div class="word-space">
              <h3>行间距</h3>
              <p>
                <span><img src="/static/iconfont/高度增加.png" alt=""></span>
                <span><img src="/static/iconfont/高度减少.png" alt=""></span>
              </p>
            </div>
            <div class="font-family">
              <h3>字体设置</h3>
              <ul>
                <li>微软雅黑</li>
                <li>黑体</li>
                <li>宋体</li>
                <li>楷体</li>
              </ul>
            </div>
        </div>
         <div class="menu colorList" v-show="oparateList[4].showTab">
          	<div>
                <h3>背景颜色</h3>
                <ul>
                  <li v-for="item in colorList" :style="{background:item}"></li>
                </ul>
             </div>
             <div>
               <h3>字体颜色</h3>
                <ul>
                   <li v-for="item in colorList" :style="{background:item}"></li>
                </ul>
             </div>
        </div>

        <div class="arrow leftArrow" @click="changePage('prevPage')">
          <img src="/static/iconfont/rightArrow.png" alt="">
        </div>
        <div class="arrow rightArrow" @click="changePage('nextPage')">
          <img src="/static/iconfont/rightArrow.png" alt="">
        </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'epubReader',
  data(){
      return{
      	color:'black',
      	Book:{},
        windowHeight:800,
        fontSize:14,
        catalogueList:[
            {
            	label:'3.1 可靠性介绍',
            	children:[
            	   {
            	     label:'3.1.1 概述', 
            	   },
            	    {
            	     label:'3.1.2 可靠性定义与分类',
            	   },
            	    {
            	     label:'3.1.3 可靠性的数学描述', 
            	   }
            	]
            },
            {
            	label:'3.2 集成电路可靠性介绍',
            	children:[
            	   {
            	     label:'3.2.1 概述',	  
            	   },
            	    {
            	     label:'3.2.2 代工厂的可靠性工程',  
            	   },
            	    {
            	     label:'3.2.3 集成电路可靠性面临的挑战',	  
            	   },
            	    {
            	     label:'3.2.4 可靠性工作内容介绍',
            	   }
            	]
            },
            {
            	label:'3.3 工艺可靠性工程与创新',
            	children:[
            	   {
            	     label:'3.3.1 概述',  
            	   },
            	    {
            	     label:'3.3.2 工艺可靠性评估项目介绍',  
            	   },
            	    {
            	     label:'3.3.3 工艺可靠性的创新', 
            	   }
            	]
            },
            {
            	label:'3.4 产品可靠性工程与创新',
            	children:[
            	   {
            	     label:'3.4.1 概述', 
            	   },
            	    {
            	     label:'3.4.2 工作寿命测试',
            	   },
            	    {
            	     label:'3.4.3 鲁棒性',
            	   },
            	    {
            	     label:'3.4.4 环境测试',	  
            	   },
            	    {
            	     label:'3.4.5 产品可靠性的创新', 
            	   },
            	    {
            	     label:'3.4.6 鲁棒性', 
            	   }
            	]
            },{
            	label:'3.5 总结',
            },{
            	label:'3.6 思考提高加油站',
            }

        ],
        activeName: '0',
        oparateList:[
            {
            	src:"/static/iconfont/菜单.png",
            	menuName:'目录',
            	showTab:false,
            	opacity:0.8
            },
            {
            	src:"/static/iconfont/书签.png",
            	menuName:'笔记',
            	showTab:false,
            	opacity:0.8
            },
            {
            	src:"/static/iconfont/界面.png",
            	menuName:'界面',
            	showTab:false,
            	opacity:0.8
            },
            {
            	src:"/static/iconfont/文字.png",
            	menuName:'文字',
            	showTab:false,
            	opacity:0.8
            },
            {
            	src:"/static/iconfont/颜色.png",
            	menuName:'颜色',
            	showTab:false,
            	opacity:0.8
            },
        ],
        
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData5: [{
          userName: '张三',
          title: '可靠性介绍',
          createDate: '2017-03-28'
        },
        {
          userName: '李四',
          title: '可靠性管理',
          createDate: '2017-03-28'
        },{
          userName: '王二麻子',
          title: '可靠性工程',
          createDate: '2017-03-28'
        }],
        colorList:[
          'white',"#f4ecd8",'#42b983','#333','black'
        ]
      }
  },
  methods:{
     changePage(arrow){
        this.Book[arrow]();
     },
     fontChange(){
     	this.oprateShow.fontList = true;
     },
     changeOpacity(item){
     	if(item.showTab){
     		item.opacity = 1
     	}else{
     		if(item.opacity == 1){
             	item.opacity = 0.7;
	        }else{
	        	item.opacity = 1;
	        }
     	}
        
     },
     showTab(item){
     	if(item.showTab){
     		item.showTab = false;
     		// item.opacity = 0.7;
     	}else{
     	   this.oparateList.forEach((item)=>{
              item.showTab = false;
              item.opacity = 0.7;
	     	})
	        item.opacity = 1;
	        item.showTab = true;
     	}
     },
     clearModel(){
     	console.log(1)
     },
     handleNodeClick(data) {
        console.log(data);
      }
  },
  mounted(){
  	 var _this = this;
  	 var Book = ePub({
      bookPath : '/static/知识体系测试书籍-20170322-薛建川.epub',
      version: 1, // Changing will cause stored Book information to be reloaded
      restore: false, // Skips parsing epub contents, loading from localstorage instead
      storage: false, // true (auto) or false (none) | override: 'ram', 'websqldatabase', 'indexeddb', 'filesystem'
      spreads: false, // Displays two columns
      fixedLayout : false, //-- Will turn off pagination
      styles : {
        "color":_this.color,
        "font-size":_this.fontSize+'px'
      }, // Styles to be applied to epub
      width : false,
      height: true, 
     });

    // Book.open('./books/知识体系测试书籍-20170322-薛建川.epub')
    Book.renderTo("area");

    this.Book = Book;

    this.windowHeight = window.innerHeight;


  }
}
</script>
   
<style scoped> 
   h3 {
        font:600 16px "微软雅黑";
        color:#42b983;
   }
  .epubReader{
  	height: 100%;
  }
  .header {
  	display: flex;
  	justify-content: space-around;
  	align-items: center;
  	width: 100%;
  	height: 50px;
  	background:#42b983;

  }

  .header img{
    width: 25px;
    height: 25px;
    margin-right: 3px
  }

  .header span{
  	color:white;
    display: flex;
    align-items: center;
    cursor: pointer;
    /*opacity: 0.8;*/
    position: relative;
  }

  .header span:hover {
  	opacity: 1
  }

  .header span ul{
  	position: absolute;
  	left: 0;
  	top:-100px;
  	height: 200px;
  	background: white;
  	border: 1px solid #aaa;
  	color:#42b983;
  }

  .content {
  	display: flex;
  	justify-content: space-between;
  	flex-direction: column;
  	align-items: center;
  	position: relative;
  }

  #area {
    width: 95%;
  }

  

  .menu{
  	position: absolute;
  	left: 0;
  	bottom: 50px;
  	background: white;
  	width: 30%;
  	height: 200px;
  	border: 1px solid #42b983;
    /*border-left: none;*/
  	border-bottom: none
  }

  .catalogueList{
  	overflow: scroll;
    height: auto;
    max-height: 400px;
  }

  .bookmarkList{
  	left:13%;
    overflow: scroll;
    height: auto;
    max-height: 400px;
  }

  .viewList{
  	left: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .viewList div {
    height: 80%;
    width: 40%;
    /*background: red;*/
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
  } 

  .viewList div h3 {
   margin-bottom: 10px;
   margin-left: -17px;
  }

  .viewList div ul li{
    font-size: 20px;
    line-height: 40px;
    cursor: pointer;
  }

  .viewList div ul li:hover {
    text-shadow: 2px 2px 2px #42b983;
  }


  .fontList{
  	left: 52%;
    display: flex;
    /*height: auto;*/
    max-height: 400px;
    justify-content: space-around;
    align-items: center;
    color:#333;
  }

  .fontList div{
    width: 30%;
    height: 60%;
    /*background: red;*/
    display: flex;
    flex-direction: column;
  }
  .fontList div h3 {
    margin-bottom: 20px;
    text-align: center;
  }

  .fontList div p {
    display: flex;
    justify-content: center;
  }
  .font-size {
    border-right: 1px solid #42b983;
  }

  .font-size span {
     width: 40px;
     height: 30px;
     display: flex;
     justify-content: center;
     align-items: center;
     cursor: pointer;
     margin:10px 15px;
     font-size: 34px;
  }

  .font-size span:hover {
    text-shadow: 2px 2px 2px #42b983;
  }

  .word-space {
    border-right: 1px solid #42b983;
  }

  .word-space span {
    cursor: pointer;
    display: flex;
    width: 30px;
    height: 30px;
    margin:12px 10px;
  }

  .font-family {
    display: flex ; 
    justify-content: center;
    align-content: center;
    align-items: center;

  }

  .font-family ul {
    margin-top: -10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

  }

  .font-family li{
     font:600 16px '微软雅黑';
     cursor: pointer;
  }

  .font-family li:hover {
    text-shadow: 2px 2px 2px #42b983; 
  }


  .colorList {
  	left: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .colorList h3{
    margin: 10px 0 10px 0;
    color: #42b983;
  }

  .colorList ul {
    display: flex;  
    justify-content: center;
    align-items: center;
  }

  .colorList li{
    width: 30px;
    height: 30px;
    list-style: none;
    background: red;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
    border: 1px solid #ddd
  }

  .arrow{
    height: 80px;
    height: 80px;
    position: absolute;
    opacity: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -40px
  }

  .arrow:hover{
    opacity: 1
  }

  .leftArrow{
    left: 1px;
    top: 50%; 
    transform:rotate(180deg)
  }

  .rightArrow{
    right: 1px;
    top: 50%;
  }

  @media screen and (max-width: 800px) {
      .menu{
          width: 100%;
        }
        .catalogueList,.bookmarkList,.viewList,.fontList,.colorList {
          left: 0 
        }
  }


  ..demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }




</style>
