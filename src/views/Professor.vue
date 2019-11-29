<template>
  <div>
    <nav class="navbar bg-primary text-white">
      <div class="navbar-brand"><img src="/img/logo.svg"></div>
      {{ matricula }} - {{ nome }}
    </nav>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">MINHAS DISCIPLINAS</li>
      </ol>
    </nav>
    
    <div class="professor">  
      <table class="table">
        <thead class="table-active">
          <tr>
            <th class="text-left">Disciplina</th>
            <th class="text-left">Provas</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(dad, index) in dados">
            <td class="text-left">{{ dad.descricao }}</td>
            <td class="text-left">
              <ul class="list-inline">
                <li class="list-inline-item" v-for="dat in dad.datas" style="padding: 5px;">
                  <button data-toggle="tooltip" data-placement="top" v-if="dat.qtdNotas > 0" type="button" class="btn btn-success" title="Alterar notas"  v-on:click="alunosProva(dad, dat)">{{ dat.data }}</button>
                  <button data-toggle="tooltip" data-placement="top" v-if="dat.qtdNotas === 0" type="button" class="btn btn-secondary" title="Lançar notas" v-on:click="alunosProva(dad, dat)">{{ dat.data }}</button>
                </li>
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
  name: 'professor',
  data() {
    return {
      dados: [],
      nome: null,
      matricula: null,
    }
  },
  methods: {
    sair() {
      window.localStorage.removeItem('token')
      this.$router.push({ path: "/" })
    },
    getLista() {
      axios
        .get('https://harleydiniz.herokuapp.com/api/disciplinas/listar', {
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          }
        })
        .then(res => {
          this.dados = res.data.disciplinas
          this.nome = res.data.nome
		      this.matricula = res.data.matricula
        })
        .catch(err => {
          console.error(err)
        })
    },
    alunosProva(dad, dat) {
      console.log(JSON.stringify(dad), JSON.stringify(dat))
      this.$router.push({ path: `/nota/${dad.id}/${dat.data.replace(new RegExp('/', 'g'), '-')}` })
    }
  },
  created() {
    this.getLista()
  }
}
</script>