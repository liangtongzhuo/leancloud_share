<template>
  <div class="content">
    <h1> 动漫回忆录 </h1>
    <ul>
      <li v-for="anime in animes" :key="anime.get('id')">
        <h3>《{{anime.get('title')}}》 观影年龄：{{anime.get('age')}} </h3>
          
        <i v-for="people in anime.get('peopleArr')" :key="people.get('id')">
        「 {{people.get('name')}} 」
        </i>

        <br v-if="anime.get('peopleArr')"/>
        <span @click="updateAnime(anime)">修改</span> 
        <span @click="removeAnime(anime)">删除</span>
        <span @click="addPeople(anime)">添加人物</span>
      </li>
    </ul>
    <div class="button" @click="saveAnime">添加动漫</div>
  </div>
</template>

<script>
import AV from "leancloud-storage";

export default {
  name: "Base",
  data() {
    return {
      animes: []
    };
  },
  async mounted() {
    this.getAnime();
  },
  methods: {
    async getAnime() {
      const query = new AV.Query("Anime");
      query.include(["peopleArr"]);
      query.ascending("createdAt");
      try {
        this.animes = await query.find();
      } catch (error) {
        alert(error);
      }
    },
    // 添加数据
    async saveAnime() {
      const Anime = AV.Object.extend("Anime");
      const anime = new Anime();
      const title = prompt("动漫名字？", "");
      const age = prompt("儿时年龄？", "");
      anime.set("title", title);
      anime.set("age", age);
      try {
        await anime.save();
        this.getAnime();
        alert("保存成功");
      } catch (error) {
        alert(error);
      }
    },
    async updateAnime(anime) {
      const title = prompt("动漫名字？", "");
      const age = prompt("几岁看的？", "");
      anime.set("title", title);
      anime.set("age", age);
      try {
        await anime.save();
        this.getAnime();
        alert("保存成功");
      } catch (error) {
        alert(error);
      }
    },
    async removeAnime(anime) {
      if (!confirm("确定要删除吗？")) return;
      try {
        await anime.destroy();
        this.getAnime();
      } catch (error) {
        alert(error);
      }
    },
    async addPeople(anime) {
      const People = AV.Object.extend("People");
      const people = new People();
      const name = prompt("人物名字？", "");
      people.set("name", name);
      people.set("anime", anime);
      try {
        await people.save();
      } catch (error) {
        alert(error);
      }

      try {
        anime.add("peopleArr", people);
        await anime.save();
        this.getAnime();
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>


<style scoped>
.content {
  padding: 30px;
}
h3 {
  margin: 5px 0 5px 0;
}
i {
  font-style: normal;
}
ul {
  padding-left: 0;
}
li {
  list-style-type: none;
  color: #42b983;
  border-left: solid #42b983 3px;
  padding-left: 10px;
  line-height: 30px;
}
li span {
  color: #42b983;
  font-size: 13px;
  margin-left: 10px;
  padding: 5px;
  border-radius: 3px;
  border: solid #42b983 1px;
  cursor: pointer;
}
.button {
  color: #fff;
  background: #42b983;
  display: inline-block;
  border-radius: 3px;
  padding: 5px 15px 5px 15px;
  cursor: pointer;
}
</style>



    // // 新建一个 ACL 实例
    //   var acl = new AV.ACL();
    //   acl.setPublicReadAccess(true);
    //   acl.setWriteAccess(AV.User.current(), true);
    //   // 将 ACL 实例赋予 anime 对象
    //   anime.setACL(acl);
