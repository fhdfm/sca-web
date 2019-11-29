<template>
  <div>
    <nav class="navbar bg-primary text-white">
      <div class="navbar-brand"><img src="/img/logo.svg"></div>
      {{ matricula }} - {{ nome }}
    </nav>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">
          <router-link to="/professor">MINHAS DISCIPLINAS</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">LANÇAR NOTAS</li>
      </ol>
    </nav>

    <h3 class="text-left">{{ nomeDisciplina }} - {{ data }}</h3>
    
    <div class="nota">  
      <table class="table">
        <thead class="table-active">
          <tr>
            <th class="text-left">Matricula</th>            
            <th class="text-left">Nome</th>
            <th class="text-left">Nota</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(alu, index) in alunos">
            <td class="text-left">{{ alu.matricula }}</td>            
            <td class="text-left">{{ alu.nome }}</td>
            <td class="text-left">
              <input alternative class="form-control" v-model="alu.nota" type="text">
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-md btn-success text-uppercase align-left" type="button" v-on:click="enviar()">Enviar</button>
    </div>
    <hr>
    <button class="btn btn-sm btn-danger text-uppercase" type="button" v-on:click="sair()">Sair</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'nota',
  data() {
    return {
      alunos: [],
      nome: null,
      matricula: null,
      nomeDisciplina: null,
      data: null
    }
  },
  methods: {
    sair() {
      window.localStorage.removeItem('token')
      this.$router.push({ path: "/" })
    },
    getNotas() {
      axios
        .get('https://harleydiniz.herokuapp.com/api/provas/alunosPorProva', {
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          },
          params: {
            idDisciplina: this.$route.params.id,
            dataProva: this.$route.params.data.replace(new RegExp('-', 'g'), '/')
          }
        })
        .then(res => {
          this.nome = res.data.nome
          this.alunos = res.data.alunos
          this.matricula = res.data.matricula
          this.nomeDisciplina = res.data.nomeDisciplina
          this.data = this.$route.params.data.replace(new RegExp('-', 'g'), '/')
        })
        .catch(err => {
          console.error(err)
        })
    },
    enviar() {
      axios
        .post('https://harleydiniz.herokuapp.com/api/provas/publicar', { notas: this.alunos },
        {
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          }
        })
        .then(res => {
          this.$router.push({ path: "/professor" })
          console.log(res);
        }).catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getNotas();
  }
}
</script>