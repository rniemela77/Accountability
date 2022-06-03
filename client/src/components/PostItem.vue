<script setup>
import { onMounted, ref } from "vue";
import PostService from "../PostService";

const posts = ref([]);
const error = ref("");
const text = ref("");

onMounted(async () => {
  try {
    posts.value = await PostService.getPosts();
  } catch (err) {
    error.value = err.message;
  }
});

const addPost = async () => {
  try {
    await PostService.insertPost(text.value);
    text.value = "";
    posts.value = await PostService.getPosts();
  } catch (err) {
    error.value = err.message;
  }
};

const deletePost = async (id) => {
  try {
    await PostService.deletePost(id);
    posts.value = await PostService.getPosts();
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div>
    <h1>Latest Posts</h1>

    <div>
      <input type="text" v-model="text" placeholder="Create a post" />
      <button @click="addPost">Add Post</button>
    </div>

    <hr />

    <p v-if="error">{{ error }}</p>
    <ul>
      <li v-for="post in posts" :key="post._id">
        {{
          `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`
        }}
        <p>{{ post.text }}</p>
        <button @click="deletePost(post._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
