<template>
  <div class='sidebar'>
    <el-menu unique-opened :default-active="$route.path" mode="vertical"  background-color="#2BB3D5" text-color="#fff" active-text-color="#F56C6C">
      {{$route.params}}
      <!-- 遍历路由表，生成左侧菜单 -->
      <template v-for="(item,index) in meuns" v-if="!JSON.parse(item.hidden)">
        <!-- 多级菜单 -->
        <template>
          <el-submenu :index="item.path">
            {{item.path}}
            <template slot="title">
              <i :class="item.meta.icon"></i><span slot="title"> {{item.meta.title}}</span>
            </template>
            <!-- 遍历子菜单 -->
            <template v-for="(itemChild,indexChild) in item.children"  v-if="!JSON.parse(itemChild.hidden)">
              <!-- 当发现存在3级或大于3级菜单时,重新遍历当前组件 -->
              <template v-if="itemChild.children&&itemChild.children.length>0">
                {{itemChild}}
                <side-meuns :routes="[itemChild]" class="nest-menu"></side-meuns>
              </template>
              <!-- 2级菜单时-->
              <template v-else>
                <router-link :to="item.path+'/'+itemChild.path">
                  <el-menu-item :index="item.path+'/'+itemChild.path">
                    <!--设置ico-->
                    <i v-if="itemChild.meta.icon" :class="itemChild.meta.icon"></i>
                    <!--菜单名称-->
                    <span slot="title" style='margin-left:10px'>{{itemChild.meta.title}}</span>
                  </el-menu-item>
                </router-link>
              </template>
            </template>
            <!-- 遍历子菜单 end-->
          </el-submenu>
        </template>
        <!-- 多级菜单 end-->
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {mapMutations} from 'Vuex'

  export default {
    name: 'AsideLeft',
    props: {
      routes: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        // 侧边栏目录
        meuns: '',
      }
    },
    mounted() {
      // 侧边列表
      this.meuns =  global.antRouter
    }
  }
</script>

<style lang='stylus' scoped>

  .sidebar>>>.el-submenu__title i
    color: #fff;

  .sidebar
    width: 210px;
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    /*background: #C4C4C4;*/
    background: #2BB3D5;
    overflow-y: auto
    padding-bottom 100px

    .ico_archives
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/archives.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_pice
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/pice.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_purchase
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/purchase.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_barcode
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/barcode.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_deliver
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/deliver.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_setup
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/setup.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_information
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/information.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_Collect
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/Collect.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_Finance
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/Finance.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_Goods
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/returnGoods.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_Smallbell
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/header/lingdang.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_fileList
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/aside/fileList.png')
      background-size 100% 100%
      margin-right: 5px
    .ico_note
      display inline-block
      width 20px
      height 20px
      background url('../../../static/image/header/Notebook.png')
      background-size 100% 100%
      margin-right: 5px
</style>
