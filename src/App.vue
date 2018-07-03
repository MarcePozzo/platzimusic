<template lang="pug">
  #app
    img(src='./assets/logo.png')
    h1 PlatziMusic
    select(v-model="paisSeleccionado")
      option(v-for="pais in paises" v-bind:value="pais.value") {{pais.name}}
    spinner(v-show="cargando")
    ul(v-show="!cargando")
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>
import getArtists from './api'
import Artist from './components/Artist.vue'
import Spinner from './components/Spinner.vue'
export default {
  name: 'app',
  data () {
    return {
      artists: [],
      paises: [
        {name: 'Argentina', value: 'argentina'},
        {name: 'Colombia', value: 'colombia'},
        {name: 'España', value: 'spain'}
      ],
      paisSeleccionado: 'argentina',
      cargando: true
    }    
  },
  components:{
    Artist,
    Spinner
  },
  methods: {    
    refreshArtist(){
      const self = this    
      this.cargando = true
      getArtists(this.paisSeleccionado)
        .then(function(artists){
          self.cargando = false
          self.artists = artists
        })
    }
  },
  mounted(){
   this.refreshArtist()
  },
  watch: {
    paisSeleccionado(){
      this.refreshArtist()
    }
  }
}
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px

  h1, h2
    font-weight normal

  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px

  a
    color #42b983
</style>
