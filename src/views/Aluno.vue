<template>
  <div>
    <nav class="navbar bg-success text-white">
      <div class="navbar-brand"><img src="https://fhdfm.github.io/sca-web/img/logo.svg"></div>
      {{ matricula }} - {{ nome }}
    </nav>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">MINHAS NOTAS</li>
      </ol>
    </nav>

    <div class="aluno">  
      <table class="table">
        <thead class="table-active">
          <tr>
            <th >Disciplina</th>
            <th>Provas</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(dad, index) in dados">
            <td class="text-left">{{ dad.disciplina }}</td>
            <td>
              <ul class="list-group">
                <li class="list-group-item table-striped" v-for="not in dad.notas" style="padding: 5px;">{{ not.data }} - <b>{{ not.nota }}</b></li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr>
    <button class="btn btn-sm btn-danger text-uppercase" type="button" v-on:click="sair()">Sair</button>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'aluno',
  data() {
    return {
      dados: [],
      notas: [],
	    nome: null,
	    matricula: null,
      disciplina: null
    }
  },
  methods: {
    sair() {
      window.localStorage.removeItem('token')
      this.$router.push({ path: "/" })
    },
    getLista() {
      axios
        .get('https://harleydiniz.herokuapp.com/api/notas/listar', {
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          }
        })
        .then(res => {
          console.log(res);
          console.log('status', res.status);
          this.dados = res.data.disciplinas
          this.nome = res.data.nome
          this.notas = res.data.disciplinas.notas;
		      this.matricula = res.data.matricula
        })
        .catch(err => {
          console.error(err);
        })
    }
  },
  created() {
    this.getLista()
  }
}
</script>