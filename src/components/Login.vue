<template>
  
  <body class="text-center">
      <form role="form" class="form-signin" @submit.prevent="onSubmit()">
        <h1 class="h3 mb-3 font-weight-bold">ACESSAR SISTEMA</h1>
        <input alternative class="form-control" placeholder="Matricula" required v-model="matricula" type="text">
        <input alternative class="form-control" placeholder="Senha" required v-model="password" type="password">
        <button class="btn btn-lg btn-success btn-block" type="submit">Entrar</button>
        <br clear="all"/>
        <div v-if="erro" class="mb-3 alert alert-danger" role="alert">
           <b>Confira seus dados de acesso!</b>
        </div>        
      </form>
  </body>

</template>

<script>
import axios from 'axios'
var jwt = require('jsonwebtoken')

export default {
  name: 'Login',
  data() {
    return {
      matricula: null,
      password: null,
      erro: false
    }
  },
  methods: {
    onSubmit() {
      axios
        .post('https://harleydiniz.herokuapp.com/api/seguranca/autenticar', {
          matricula: this.matricula,
          password: this.password
        })
        .then(res => {
                    
          window.localStorage.setItem('token', res.data.accessToken)

          const { perfil } = jwt.decode(res.data.accessToken)

          if (perfil === 'ROLE_ALUNO') {
            this.$router.push({ path: "/aluno" })
          }

          if (perfil === 'ROLE_PROFESSOR') {
            this.$router.push({ path: "/professor" })
          }

        }).catch(err => {
          this.erro = true;
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html,
  body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
