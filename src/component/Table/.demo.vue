<template>
  <div>
    <i-table :tableData="tableData" :tableColumns="tableColumns" :operateButton="operateButton" :pagination="pagination">
      <template slot="status" slot-scope="scope">
        <span>{{ statusText(scope.row.status) }}</span>
      </template>
    </i-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          companyName: '公司一',
          status: 1 // '0:草稿  1：待审核 2：审核通过 3：审核失败
        },
        {
          companyName: '公司二',
          status: 2 // '0:草稿  1：待审核 2：审核通过 3：审核失败
        }
      ],
      tableColumns: [
        {
          prop: 'companyName',
          label: '机构名称'
        },
        {
          prop: 'status',
          label: '机构状态',
          tableColumn: {
            align: 'center'
          }
        },
        {
          prop: '_operate',
          label: '操作'
        }
      ],
      pagination: {
        total: 0,
        currentPage: 0,
        onChange: () => {}
      }
    }
  },

  mounted() {},

  methods: {
    operateButton(row) {
      const detail = {
        text: '查看详情',
        onClick: row => {
          //
        }
      }
      const del = {
        text: '删除',
        onClick: row => {
          //
        }
      }
      return [[], detail, [del], detail][row.status]
    },

    statusText(status) {
      return ['', '审核中', '审核通过', '审核失败'][status]
    }
  },

  computed: {}
}
</script>
<style lang="scss" scoped>
</style>