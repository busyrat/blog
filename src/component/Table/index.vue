<template>
  <div class="i-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="col in tableColumns" :key="col.prop" :label="col.label" v-bind="col.tableColumn">
        <template slot-scope="scope">
          <template v-if="col.prop === '_operate'">
            <template v-for="(btn, index) in operate(scope.row)">
              <el-button :key="index" type="text" @click="operateClick(btn, scope.row)">{{ btn.text }}</el-button>
            </template>
          </template>
          <template v-else>
            <slot :name="col.prop" :row="scope.row">
              <span>{{ scope.row[col.prop] }}</span>
            </slot>
          </template>
        </template>
      </el-table-column>
      <div slot="empty" class="empty">
        <i></i>
        暂无数据
      </div>
    </el-table>
    <div class="pagination-box" v-if="pagination.total !== -1 && tableData.length > 0">
      <el-pagination
        :current-page.sync="pagination.currentPage"
        @current-change="pagination.onChange"
        background
        layout="prev, pager, next"
        :total="pagination.total"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ITable',
  props: {
    // 表格列的数据
    tableColumns: {
      type: Array,
      required: true,
      default: () => []
    },
    // 表格行的数据
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    // 操作列按钮配置，回调函数必须返回有 text 和 onClick 的对象
    operateButton: Function,
    // 分页配置
    pagination: {
      type: [Object, Boolean],
      default: () => ({
        total: -1,
        currentPage: 0,
        onChange: () => {}
      })
    }
  },

  methods: {
    operate(row) {
      const btn = this.operateButton(row)
      if (Object.prototype.toString.call(btn) === '[object Object]') {
        return [btn]
      } else {
        return btn
      }
    },
    operateClick(btn, row) {
      if (btn.onClick) {
        btn.onClick(row)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.i-table /deep/ {
  .el-table {
    &::before {
      height: 0;
    }
    thead tr th {
      background-color: #f8fafd;
      &:nth-of-type(1) {
        padding-left: 20px;
      }
      .cell {
        color: #a9b0ce;
      }
    }
    tbody tr td:nth-of-type(1) {
      padding-left: 20px;
    }
  }
  .el-table tr {
    th,
    td {
      border-bottom: 0;
    }
  }
}
.empty {
  text-align: center;
  font-size: 14px;
  color: #acb3bb;
  position: relative;
  padding-top: 106px;
  padding-bottom: 94px;

  i {
    margin-bottom: 5px;
    display: block;
    // background: url(../../../src/assets/images/common/statusEmptyBg.png) no-repeat center;
    width: 146px;
    height: 147px;
    margin-left: auto;
    margin-right: auto;
  }
}

.pagination-box /deep/ {
  height: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  //修改分页样式
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    margin: 0 5px;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    font-size: 12px;
    min-width: 35px;
    border-radius: 0px;
    height: 35px;
    line-height: 35px;
    color: #7f7f7f;
    font-weight: normal;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #7996f5;
    border: 1px solid #7996f5;
    color: #fff;
  }

  .el-pagination.is-background .el-pager li:hover {
    background: #7996f5;
    border: 1px solid #7996f5;
    color: #fff;
  }
}
</style>