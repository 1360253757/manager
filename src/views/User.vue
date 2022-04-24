<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="queryForm" :inline="true" :model="user">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID"/>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset(queryForm)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate" v-has="'user-add'">新增
        </el-button
        >
        <el-button
            type="danger"
            @click="handlePatchDel"
            v-has="'user-delete'"
        >批量删除
        </el-button
        >
      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"/>
        <el-table-column
            v-for="item in columns"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :formatter="item.formatter"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)" v-has="'user-modify'"
            >编辑
            </el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :disabled="scope.row.state === 2"
                v-has="'user-delete'"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :total="pager.total"
          :page-size="pager.pageSize"
          @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
  <!--  Dialog 部分-->

  <el-dialog title="用户新增" v-model="showModal">
    <el-form
        ref="dialogForm"
        :model="userForm"
        label-width="100px"
        :rules="rules"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
            v-model="userForm.userName"
            :disabled="action == 'edit'"
            placeholder="请输入用户名称"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input
            v-model="userForm.userEmail"
            :disabled="action == 'edit'"
            placeholder="请输入用户邮箱"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="userForm.mobile" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="岗位" prop="job">
        <el-input v-model="userForm.job" placeholder="请输入岗位"/>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="userForm.state">
          <el-option :value="1" label="在职"></el-option>
          <el-option :value="2" label="离职"></el-option>
          <el-option :value="3" label="试用期"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系统角色" prop="roleList">
        <el-select
            v-model="userForm.roleList"
            placeholder="请选择用户系统角色"
            multiple
            style="width: 100%"
        >
          <el-option
              v-for="role in roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-cascader
            v-model="userForm.deptId"
            placeholder="请选择所属部门"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            style="width: 100%"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
    </template>
  </el-dialog>
</template>
<script>
import {getCurrentInstance, nextTick, onMounted, reactive, ref, toRaw} from "vue";
import utils from "./../utils/utils.js";

export default {
  name: "User",
  setup() {
    const ctx = getCurrentInstance().appContext.config.globalProperties
    // 查询表单
    const user = reactive({
      state: 1,
    });
    const pager = reactive({
      pageSize: 10,
      pageNum: 1
    })
    // 用户列表
    const userList = ref([])
    // 定义动态表格-格式
    const columns = reactive([
      {
        label: "用户ID",
        prop: "userId",
      },
      {
        label: "用户名",
        prop: "userName",
      },
      {
        label: "用户邮箱",
        prop: "userEmail",
        width: 200
      },
      {
        label: "用户角色",
        prop: "role",
        formatter(row, column, value) {
          return {
            0: "管理员",
            1: "普通用户",
          }[value];
        },
      },
      {
        label: "用户状态",
        prop: "state",
        formatter(row, column, value) {
          return {
            1: "在职",
            2: "离职",
            3: "试用期",
          }[value];
        },
      },
      {
        label: "注册时间",
        prop: "createTime",
        width: 180,
        formatter: (row, column, value) => {
          return utils.formateDate(new Date(value));
        },
      },
      {
        label: "最后登录时间",
        prop: "lastLoginTime",
        width: 180,
        formatter: (row, column, value) => {
          return utils.formateDate(new Date(value));
        },
      },
    ]);
    const queryForm = ref(null)
    // 多选
    const selectedUserIds = reactive([])
    // 弹框显示对象
    const showModal = ref(false);
    // 新增用户Form对象
    const userForm = reactive({
      state: 3,
    });
    // 所有角色列表
    const roleList = ref([]);
    // 所有部门列表
    const deptList = ref([]);
    // 定义用户操作行为
    const action = ref("add");
    // 定义表单校验规则
    const rules = reactive({
      userName: [
        {
          required: true,
          message: "请输入用户名称",
          trigger: "blur",
        },
      ],
      userEmail: [
        {
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change'],
        }
      ],
      mobile: [
        {
          pattern: /1[3-9]\d{9}/,
          message: "请输入正确的手机号格式",
          trigger: "blur",
        },
      ],
      deptId: [
        {
          required: true,
          message: "请输入用户邮箱",
          trigger: "blur",
        },
      ],
    });
    const dialogForm = ref(null);


    onMounted(() => {
      getUserList()
      getRoleList()
      getDeptList()
    })
    // 获取用户列表
    const getUserList = async () => {
      const params = {...user, ...pager}
      const res = await ctx.$api.user.getUserList(params)
      userList.value = res.list
      pager.total = res.page.total
    }
    // 查询事件处理
    const handleQuery = async () => {
      await getUserList()
    }
    // 重置查询表单
    const handleReset = async (val) => {
      val.resetFields();
    }
    // 分页条
    const handleCurrentChange = async (val) => {
      pager.pageNum = val
      await getUserList()
    }
    // 点击删除按钮 (单个用户)
    const handleDelete = async (index, row) => {
      const res = await ctx.$api.user.userDel({
        userIds: [row.userId]
      })
      if (res) {
        userList.value.splice(index, 1)
        ctx.$message.success("删除成功");
        getUserList();
      }
    }
    // 表格选择
    const handleSelectionChange = (val) => {
      selectedUserIds.splice(0, selectedUserIds.length)
      val.forEach(item => {
        selectedUserIds.push(item.userId)
      })
    }
    // 批量删除用户
    const handlePatchDel = async () => {
      if (selectedUserIds.length === 0) {
        ctx.$message.error("请选择要删除的用户")
        return
      }
      const res = await ctx.$api.user.userDel({
        userIds: selectedUserIds
      })
      if (res > 0) {
        ctx.$message.success("删除成功")
        await getUserList()
      }

    }
    // 新增用户
    const handleCreate = () => {
      showModal.value = true
      action.value = 'add'
    }
    const handleClose = () => {
      showModal.value = false
      handleReset(dialogForm.value)
    }
    // 提交 Dialog
    const handleSubmit = () => {
      dialogForm.value.validate(async (valid) => {
        if (valid) {
          let data = toRaw(userForm)
          console.log(data)
          data.action = action.value
          const res = await ctx.$api.user.userSubmit(data)
          showModal.value = false
          ctx.$message.success('用户创建成功')
          await handleReset(dialogForm.value)
          await getUserList()
        }
      })
    }
    // 新增用户时的角色列表
    const getRoleList = async () => {
      roleList.value = await ctx.$api.role.getRoleAllList()
    }
    // 新增用户时的部门列表
    const getDeptList = async () => {
      deptList.value = await ctx.$api.user.getDeptList()
    }
    // 编辑用户
    const handleEdit = (index, row) => {
      showModal.value = true
      action.value = 'edit'
      nextTick(() => {
        Object.assign(userForm, row)
      })
    }

    return {
      user,
      userList,
      columns,
      pager,
      queryForm,
      selectedUserIds,
      userForm,
      showModal,
      rules,
      action,
      deptList,
      roleList,
      dialogForm,
      handleReset,
      handleQuery,
      getUserList,
      handleCurrentChange,
      handleDelete,
      handleSelectionChange,
      handlePatchDel,
      handleCreate,
      handleClose,
      handleSubmit,
      getRoleList,
      getDeptList,
      handleEdit
    }
  }
}
</script>

<style lang="scss">
</style>
