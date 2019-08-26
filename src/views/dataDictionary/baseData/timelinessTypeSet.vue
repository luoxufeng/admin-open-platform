<template>
  <YtoPage title="" showIcon="">
    <el-form ref="form" :model="form" label-width="130px">
        <el-row>
            <yto-form-item label="代码" :span="4" prop="code">
                <el-input v-model.trim="form.code" @keyup.native.enter="searchList"></el-input>
            </yto-form-item>

            <yto-form-item label="名称" :span="4" prop="name">
                <el-input v-model.trim="form.name" @keyup.native.enter="searchList"></el-input>
            </yto-form-item>
            <yto-form-item label="使用范围" :span="4" prop="useRange">
                <el-select v-model.trim="form.useRange" placeholder="请选择">
                    <el-option v-for="(val,index) in useRangeList" :label="val.value" :value="val.key"
                               :key="index"></el-option>
                </el-select>
            </yto-form-item>

            <el-form-item style="float:right;">
                <el-button type="primary" @click="searchList">查询</el-button>
                <el-button plain @click="resetFn">重置</el-button>
            </el-form-item>
        </el-row>
    </el-form>
    <div slot="search">
        <el-button plain size="small" @click="addData('addTemp')" v-if="checkBtnAouth('A_MDM_BDM_BTN_SXLX_ADD')">新增</el-button>
        <el-button plain size="small" @click="deleteData" v-if="checkBtnAouth('A_MDM_BDM_BTN_SXLX_DEL')" disabled>删除</el-button>
    </div>
    <YtoTable :pager="page" :columns="columns" :data="tableData" slot="body"
              @selection-change="handleTableSelectionChange" @sortChange="sortChange"
              @size-change="handleSizePageChange"
              @current-change="handleCurrentPageChange">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column slot="table_deal" fixed="right" align="center" width="100" :resizable="false" label="操作">
            <template slot-scope="scope" v-if="checkBtnAouth('A_MDM_BDM_BTN_SXLX_EDIT')">
                <yto-svg name="edit" :scope="scope" @handle="handleEdit"></yto-svg>
            </template>
        </el-table-column>
    </YtoTable>
    <!-- 新增弹窗 -->
    <el-dialog v-dialogDrag :title="dialogFormTitle" :visible.sync="dialogFormVisible" width="470px"
               :close-on-click-modal="false" @close="dialogCloseFn('addTemp')">
        <el-form ref="addTemp" :model="addTemp" label-position="right" label-width="130px">
            <el-row class="dialogDiv">

                <yto-form-item label="代码" prop="code" :span="1" :rules="addOrUpdateFlag===true?'required':'code'">
                    <el-input :disabled="addOrUpdateFlag" v-model.trim="addTemp.code"
                              :maxlength="wordLen.normal"></el-input>
                </yto-form-item>

                <yto-form-item label="名称" prop="name" :span="1" rules="name">
                    <el-input v-model.trim="addTemp.name" :maxlength="wordLen.normal"></el-input>
                </yto-form-item>
                <yto-form-item label="英文名称" prop="englishName" :span="1" rules="_grapheme">
                    <el-input :maxlength="wordLen.normal" v-model.trim="addTemp.englishName"></el-input>
                </yto-form-item>

                <el-col>
                    <el-form-item label="使用范围" prop="useRange">
                        <el-select v-model="addTemp.useRange" placeholder="请选择">
                            <el-option v-show="val.key!==''" v-for="(val,index) in useRangeList" :label="val.value"
                                       :value="val.key"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="描述" prop="description" class="formTextArea">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model.trim="addTemp.description"
                                  :maxlength="wordLen.super">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <YtoButton @cancelFn="dialogFormVisible=false" @addFn="saveFn('addTemp')" saveText="保存"></YtoButton>
        </el-form>
    </el-dialog>
</YtoPage>
</template>
<script>
import API from '@/api/dataDictionary/baseData/timelinessTypeSet'

export default {
  data () {
    return {
      form: {
        code: '', // 代码
        name: '', // 名称
        useRange: '' // 使用范围
      },
      dialogFormVisible: false, // 新增弹窗
      multipleSelection: [], // 表格多选
      dialogFormTitle: '', // 弹窗标题
      addOrUpdateFlag: false, // 修改或新增
      columns: [
        { prop: 'code', label: '代码' },
        { prop: 'name', label: '名称' },
        { prop: 'useRange', label: '使用范围' }
      ],
      tableData: [],
      addTemp: {
        code: '', // 代码
        name: '', // 名称
        englishName: '', // 英文名称
        useRange: 'OUTTER', // 使用范围
        description: '' // 描述
      },
      useRangeList: []
    }
  },
  methods: {
    resetFn () {
      this.resetForm()
      this.searchList()
    },
    handleSizePageChange (val) {
      this.page.limit = val
      this.getList()
    },
    handleCurrentPageChange (val) {
      this.page.pageNo = val
      this.getList()
    },

    // 修改
    async handleEdit (index, val) {
     
    },

    // 新增
    addData (formName) {
      this.$store.state.ytoBase.validate.id = ''
      delete this.addTemp.id
      this.dialogFormTitle = '新增时效类型'
      this.addOrUpdateFlag = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.resetForm(formName)
      })
    },
    // 表格多选
    handleTableSelectionChange (val) {
      this.multipleSelection = val
    },
    // 删除数据
    deleteData () {
      if (this.multipleSelection.length === 0) {
        this.hint('请选择实例记录', 'warning')
      } else {
        this.confirmFn(this.delete)
      }
    },

    async delete () {
      let ids = []
      this.multipleSelection.forEach((val) => {
        ids.push(val.id)
      })
      let obj = { ids }
      let data = await API.deleteByIds(obj)
      if (data.status === 0) {
        if (this.tableData.length === this.multipleSelection.length && this.page.pageNo !== 1) {
          this.page.pageNo--
        }
        this.delSuccess()
        this.getList()
      } else {
        this.delFail()
      }
    },

    saveFn () {
      let obj = this.addTemp
      obj.code = obj.code.toUpperCase()
      if (this.addOrUpdateFlag) { // 改
        API.update(obj).then(res => {
          if (res.status === 0) {
            this.dialogFormVisible = false
            this.saveSuccess()
            this.getList()
          } else {
            this.saveFail()
          }
        })
      } else { // 新增
        API.save(obj).then(res => {
          if (res.status === 0) {
            this.dialogFormVisible = false
            this.saveSuccess()
            this.getList()
          } else {
            this.saveFail()
          }
        })
      }
    },
    // 查询获取数据
    getList () {
      let obj = { ...this.page, ...this.form }
      API.queryList(obj).then(res => {
        if (res.status === 0) {
          this.tableData = res.data.records
          this.page.total = parseInt(res.data.total)
          if (this.page.total != 0 && this.page.total <= this.page.limit * (this.page.pageNo - 1)) {
            this.page.pageNo = 1
            this.getList()
            return
          }
          res.data.records.forEach(v => {
            if (v.useRange === 'OUTTER') {
              v.useRange = '营销时效'
            } else {
              v.useRange = '计费时效'
            }
          })
        } else {
          this.hint('查询失败', 'warning')
        }
      })
    },
    searchList () {
      this.page.pageNo = 1
      this.page.limit = 10
      this.getList()
    },
    sortChange (column) {
      this.page.sortName = column.prop
      this.page.sortOrder = column.order === 'descending' ? 'desc' : 'asc'
      if (column.prop === 'useRange') {
        this.page.sortName = 'USE_RANGE'
      }
      this.getList()
    },
    // 关闭dialog事件
    dialogCloseFn (formName) {
      this.resetForm(formName)
    }
  },
  mounted () {
    this.$store.state.ytoBase.validate.url = API.validateUrl
    this.getList()
  },
  created () {
    API.queryUseRange().then(res => {
      if (res.status === 0) {
        this.useRangeList = res.data.list
      } else {
        this.hint('获取使用范围错误')
      }
    })
  }
}
</script>
 <style lang="scss" scoped>
</style>
