<template>
    <div id="app">
      <h2>{{ title }}</h2>
      <input v-model="newNotes" placeholder="Add new note" />&nbsp;
      <button @click="addNewNotes">Add Notes</button>
      <p v-for="note in notes" :key="note.id">
        <b>* {{ note.description }}</b>&nbsp;
        <button @click="deleteNotes(note.id)">Delete Notes</button>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const API_URL = 'http://localhost:5038/';
  
  const title = 'Todo App';
  const newNotes = ref('');
  const notes = ref([]);
  
  const refreshData = async () => {
    try {
      const response = await axios.get(API_URL + 'api/todoapp/GetNotes');
      notes.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  const addNewNotes = async () => {
    const formData = new FormData();
    formData.append('newNotes', newNotes.value);
  
    try {
      const response = await axios.post(API_URL + 'api/todoapp/AddNotes', formData);
      refreshData();
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const deleteNotes = async (id) => {
    try {
      const response = await axios.delete(API_URL + 'api/todoapp/DeleteNotes?id=' + id);
      refreshData();
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  onMounted(refreshData);
  </script>
  