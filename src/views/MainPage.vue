<template>
  <Header :activeIndex="`/`" />
  <el-main>
    <el-row :gutter="20">
      <el-col :lg="14" :xs="24">
        <h2 class="users-table__header">Список пользователей</h2>
        <el-table
          class="users-table"
          :data="pagedTableData"
          style="width: 100%"
          v-loading="loading"
          element-loading-text="Loading..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="name" label="Имя" />
          <el-table-column prop="role" label="Роль" />
          <el-table-column prop="ctime" label="Дата создания" />
          <el-table-column label="Действия">
            <template #default="scope">
              <el-button
                @click="deleteRow(scope.$index)"
                type="danger"
                size="small"
                >Удалить</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :total="totalPages * 10"
          @current-change="setPage"
        />
      </el-col>
      <el-col :lg="10" :xs="24">
        <h2 class="events-table__header">События</h2>
        <transition name="el-fade-in-linear">
          <el-table
            class="events-table"
            :data="eventsUpload"
            style="width: 100%"
          >
            <el-table-column prop="ctime" label="Дата" />
            <el-table-column prop="event" label="Событие" />
          </el-table>
        </transition>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
  data() {
    return {
      tableData: [],
      eventsData: [],
      totalPages: Number,
      page: 1,
      loading: Boolean,
      svg: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.axios
        .get(
          "https://test.relabs.ru/api/users/list?offset=" + (this.page - 1) * 5
        )
        .then((response) => {
          this.totalPages = response.data.total / 5;
          this.tableData = response.data.items;
          this.toHumanDate(this.tableData);
          this.loading = false;
        });
    },

    toHumanDate(date) {
      const dataOptions = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      if (Array.isArray(date)) {
        for (let i = 0; i < date.length; i++) {
          date[i].ctime = new Date(date[i].ctime * 1000).toLocaleString(
            "ru-RU",
            dataOptions
          );
        }
      } else {
        return new Date(date * 1000).toLocaleString("ru-RU", dataOptions);
      }
    },
    setPage(val) {
      this.page = val;
      this.fetchData();
    },
    deleteRow(index) {
      this.tableData.splice(index, 1);
    },
  },
  mounted() {
    if (!this.$store.state.isLogged) {
      this.$router.push({ path: "/login" });
    } else {
      this.fetchData();
      this.$connect("wss://test.relabs.ru/event", { format: "json" });
      this.$options.sockets.onmessage = (res) => {
        let temp = JSON.parse(res.data);
        let time = this.toHumanDate(temp.ctime);
        this.eventsData.push({ ctime: time, event: temp.event });
      };
    }
  },
  unmounted() {
    if (this.$store.state.isLogged) this.$disconnect();
  },
  computed: {
    pagedTableData() {
      return this.tableData;
    },
    eventsUpload() {
      if (this.eventsData.length > 10) {
        this.eventsData.shift();
      }
      return this.eventsData;
    },
  },
};
</script>
<style >
.el-header {
  padding: 0 !important;
}
.pagination {
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: #e5e7e9;
}
.users-table__header,
.events-table__header {
  margin-bottom: 15px;
  text-align: center;
}
</style>

