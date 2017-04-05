<template>
  <div class="reader" @mousemove="startScale($event)" @mouseup="overScale">
    <!-- 阅读器显示 -->
    <div :style="{width:item.width-1+'%',height:windowHeight - 150 + 'px'}" v-for="(item,index) in epubUrls" v-show="item.panelShow" class="panelContent">
        <!-- 每个窗口的控制 -->
        <div class="panelControl">
        	<span class="panelButtons">
        	   <button v-show="item.panelShow" @click="handleScale(index)">—</button>
        	   <button v-show="!item.panelShow" @click="handleScale(index)">口</button>
        	   <button @click="handleClose(index)">×</button></span>
        </div>
        <!-- 每个窗口的内容 -->
    	<div class="panelScale" >
    	   <iframe :src="item.url" frameborder="0" width="100%" height="100%" marginheight="20px" marginwidth="10px"></iframe>
    	   <div class="placeHold"  @mousedown="getScale(item,index)"></div>
    	</div>
    </div>
    <!-- 底部栏控制 -->
    <div class="panels">
    	<ul>
    		<li v-for="(item,index) in epubUrls" :style="{width:100/epubUrls.length-1.3+'%',background:(item.panelShow?'white':'#2c3e50')}" @click="handleScale(index)">
    		    <span>{{item.url}}</span> 
    		    <span class="panelButtons">
    		      <!-- 控制按钮 -->
    		       <button v-show="item.panelShow" @click.stop="handleScale(index)">—</button>
    		       <button v-show="!item.panelShow" @click.stop="handleScale(index)">口</button>
    		       <button @click.stop="handleClose(index)">×</button>
    		    </span>
    		</li>
    	</ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      epubUrls:[{
      	url:'http://localhost:8080/#/epubReader',
      	panelShow:true,
      	scaleAble:false
      },{
      	url:'http://localhost:8080/#/epubReader',
      	panelShow:true,
      	scaleAble:false
      },{
      	url:'http://localhost:8080/#/epubReader',
      	panelShow:true,
      	scaleAble:false
      }],
      windowHeight:800,
      isResize:false
    }
  },
  methods:{
    add(){
      this.iframeNumber++;
      this.epubUrls.push({
      	url:'http://localhost:8080/#/epubReader',
      	panelShow:true
      });
    }, //添加窗口
    handleScale(index){
     this.epubUrls[index].panelShow = !this.epubUrls[index].panelShow;  //缩放窗口
     this.resizePanels();
    },
    handleClose(index){
      if(confirm('确认删除该窗口？')){
      	this.epubUrls.splice(index,1);
      };

      this.resizePanels();
    }, 
    //关闭指定窗口

    resizePanels(){
    	var arr = [];
	     this.epubUrls.forEach((item,index)=>{
	                if(item.panelShow){
	                	arr.push(item)
	                }
	        	});
	     this.epubUrls.forEach((item)=>{
	          item.width = 100/arr.length;
	     })
    },
    //重新绘制窗口大小
     
     //获取窗口缩放位置
     getScale(item,index){
        item.scaleAble = true;
        this.isResize = true
     },
     //开始缩放
     startScale(e){
        if(this.isResize){
        	this.epubUrls.forEach((item,index)=>{
                if(item.scaleAble){
                	console.log(item.width);
                	console.log(e.clientX/window.innerWidth*100)
                	this.$set(this.epubUrls[index],item.width,e.clientX/window.innerWidth*100);
                	 console.log(item.width)
                }

        	});

        }
     },
     //取消缩放
     overScale(){
     	this.isResize = false;
        this.epubUrls.forEach((item,index)=>{
           item.scaleAble = false;
      	})
     }
  },
  mounted(){
  	//获取浏览器显示区高度
  	this.windowHeight = window.innerHeight; 
  	this.epubUrls.forEach((item,index)=>{
        item.width = 100/this.epubUrls.length;
  	})
  },
  // watch:{
  // 	 'epubUrls': {
  //     handler: function(now,old){
  //      console.log(now);
  //      console.log(old)
  //    	},
  //     deep: true
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .reader{
   	 display: flex;
   	 justify-content: space-around;
   	 margin-top: 30px;
   }

   .panelContent {
     border: 2px solid #aaa;
     box-sizing: border-box;
     border-radius: 5px;
   }
 
   .panelControl{
      height: 5%;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background: #42b983;
      border-bottom: 1px solid #aaa
   }

   /*iframe {
     cursor: w-resize;
   }*/
   .panelScale{
   	display: flex;
   	justify-content: space-between;
   	height: 95%;
   }
/*
   .placeHold{
   	width: 1%;
   	height: 100%;
   	cursor: w-resize;
   }*/

   ul{
   	display: flex;
   	justify-content: flex-start;
   	align-items: center;
   	height: 100%;
   }
 
    ul li {
       height: 80%;
       display: flex;
       align-items: center;
       justify-content: space-between;
       margin-left: 10px;
       overflow: hidden;
       text-overflow: ellipsis;
       word-wrap: nowrap;
       padding-left: 10px;
       border: 1px solid #aaa;
       border-radius: 3px
    }

    .panelButtons{
       padding-right: 10px;
       display: flex;

    }

    .panelButtons button{
    	width: 20px;
    	height: 20px;
    	margin-right: 5px;
    	display: flex;
    	align-items: center;
        justify-content: center;
        font-size: 12px;
    }

    .panelButtons button:nth-child(3){
    	background: #ff4400;
    	border: none;
    	outline: none;
    	color:white;
    	font-size: 16px;
    	border-radius: 2px
    }

    .panelButtons button:nth-child(3):active{
    	background:darkred;   
    }

    .panelButtons button:nth-child(3):hover{
    	background:darkred;   
    }



   .panels{
   	height: 50px;
   	width: 100%;
   	background: #42b983;
   	position: fixed;
   	left: 0;
   	bottom:0;
   }
</style>
