<template>
    <div>
        <el-table :data="data" ref="customTable" :max-height="maxHeight"
        border stripe :columns="columns" tooltip-effect="light"
        @selection-change="selectChange"
        :cell-class-name="cellHandle"
        style="margin-top: 12px" @sort-change='sortChange'>
            <slot></slot>
            <el-table-column
            v-if='isShowOrHidden'
            prop="" type="index" width="60"
            align="center"
            label="序号"
            :resizable="false">
                 <template slot-scope="scope">
                    {{pager ? pager.limit * (pager.pageNo - 1) + scope.$index + 1 : '' }}
                </template>
            </el-table-column>
            <el-table-column
                    :resizable="false"
                    :sortable="obj.sort===false?false:'custom'"
                    align="center"
                    v-for="(obj, index) in columns" :key="index"
                    :show-overflow-tooltip="obj.tooltip"
                    :min-width="obj.minWidth"
                    :width="obj.width"
                    :prop="obj.prop" :label="obj.label">
            </el-table-column>
            <slot name="table_deal"/>
        </el-table>
        <el-pagination
        v-if="isShowOrHidden"
        v-bind="$attrs"
        v-on="$listeners"
        style="text-align: center;margin:20px 0;"
        :current-page="pager.pageNo"
        :page-sizes="pager.sizes"
        :page-size="pager.limit"
        :total="pager.total"
        layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'YtoTable',
  props: {
    columns: Array,
    data: Array,
    pager: Object,
    maxHeight: {
      type: Number,
      default: 2000
    },
    isShowOrHidden: {
      type: Boolean,
      default: () => { return true }
    }
  },
  data () {
    return {
      selectData: [],
      selectRow: []
    }
  },
  methods: {
    selectChange (val) {
      this.$emit('selection-change', val)
      this.selectData = val
    },
    sortChange (column) {
      this.$emit('sortChange', column)
    },
    // 多选高亮选中行
    cellHandle ({ row, rowIndex }) {
      if (this.selectRow.includes(rowIndex)) {
        return 'selectbg'
      }
    }
  },
  watch: {
    selectData (data) {
      this.selectRow = []
      if (data.length > 0) {
        data.forEach(item => {
          this.selectRow.push(this.data.indexOf(item))
        })
      }
    }
  }
}
</script>

<style>
.selectbg {
  background-color: #f2edf5 !important;
}
</style>
