<template>
  <div>
    <!--新增文件-->
    <div class='new_addfile'>
      <el-button type="primary" size="mini" @click='addFileWarp'>新增文件</el-button>
    </div>

    <!--表格-->
    <el-table :data="tableData" style="width: 100%"
              border
              size='mini'
              height="415"
    >
      <el-table-column
        align="center"
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="标题"
        min-width='140'
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        min-width='150'>
        <template slot-scope="scope">
          <span>{{scope.row.createDate|createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center" >
        <template slot-scope="scope">
          <a :href='scope.row.filePath' download  target="_blank"><el-button type="text" size="mini">下载</el-button></a>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen'>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum">
      </el-pagination>
    </div>


    <!--新增文件dialog-->
    <el-dialog
      title="上传文件"
      :visible.sync="addFileShow"
      width="500px"
      >
      <!--文件上传-->
      <div style='height: 300px;'>
        <el-upload
          class="upload-demo"
          drag
          :on-success="otherFileChange"
          action="http://www.srm-greatech.com/gzSrm/system/file/upFile.do?fileType=other.path"
          :headers='header'
          :limit="8"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div class='bth_warp'>
        <el-button type="primary" @click='saveFile'>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共方法
  import Interface from 'api/Interface.js'


  export default {
    name:'fileList',
    data(){
      return {
        // 文件上传设置token
        header:{
          Authorization: localStorage.getItem('token')
        },
        // 表格列表
        tableData: [],
        // 表格当前页面
        pageNum:1,
        // 请求数量
        pageSize:8,
        // 总数量
        totalNum:0,
        // 新增文件dialog
        addFileShow:false,
        // 上传后的文件列表
        selectFileList:[]
      }
    },

    mounted(){
      // 分页获取文件列表
      this.handleCurrentChange()
    },
    filters: {
      // 创建时间
      createDate:function(val){
        return Interface.renderTime(val).slice(0,11)
      }
    },

    methods:{
      // 分页获取文件列表
      handleCurrentChange(){
       let params={
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          search:""
        }
        axios.post(config.api,'/file/getFileList.do',params).then((res) => {
          //加载完成，关闭遮罩层
          console.log(res);
          this.tableData=res.data
          // 总条数
          if(res.data.length>0){
            this.totalNum=res.data[0].totalNum
          }
        })
      },
      // 点击新增文件
      addFileWarp(){
        this.addFileShow=true
      },
      // 文件上传成功
      otherFileChange(response,fileList){
        // 保存上传的文件itemList，删除的时候做对比
        this.selectFileList.push({src:response.data[0],itemList:fileList})
      },
      // 删除文件
      handleRemove(file){
        // 对比上传的文件，判断具体删除哪个
        var arr=this.selectFileList
        let _this=this
        arr.map(function(item,index){
          if(item.itemList==file){
            _this.selectFileList.splice(index,1)
          }
        })
      },
      // 保存文件
      saveFile(){
        let FileList=[]
        this.selectFileList.map(function (item) {
          FileList.push({
            filePath:item.src
          })
        })
        axios.post(config.api,'/file/saveFileList.do',FileList).then((res) => {
          if(res.status=='0'){
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 清空文件上传列表
                this.selectFileList=[]
                // 隐藏上传弹框
                this.addFileShow=false
              }
            })
          }
        })
      },
      // 上传超出数量
      handleExceed(files, fileList) {
        this.$message.warning(`当前最多选择 8 个文件`);
      }
    }
  }
</script>

<style lang='stylus' scoped>

  .new_addfile
    margin-top:20px;
    margin-bottom:20px;
  .el-col-2
    width: 8.33333%;
    text-align: center;

  .el-table >>> thead
    color: #1f2d3d;

  .el-table
    border 1px solid #dddddd;
    overflow hidden;

  // 分页
  .page_fen
    width: 100%;
    height: 60px;
    background: #f5f5f5;
    display flex
    justify-content center
    align-items: center
    margin-top: 20px;
    padding: 0px 20px;
    box-sizing border-box;

  .forbidden
    color: #ff6666

  .bth_warp
    width:100%;
    display flex
    justify-content center
</style>

