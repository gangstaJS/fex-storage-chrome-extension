<template>
    <div class="keys-storage">
      <div class="keys-storage__head">
        <m-button raised primary ripple>Add</m-button> 
        <m-button raised primary accent v-if="showCtrls">Remove</m-button>
      </div>
      
      <div class="keys-storage__body">
        <m-table @select="onSelect">
            <m-table-head>
                <m-table-row>
                    <m-table-h>Key</m-table-h>
                    <m-table-h>Expiration Date</m-table-h>
                </m-table-row>
            </m-table-head>

            <m-table-body>
                <m-table-row v-for="key in keys" selection :m-item="key">
                    <m-table-cell>
                      <a :href="'http://fex.net/#!'+key.token" target="_blank">{{key.token}}</a>
                    </m-table-cell>
                    <m-table-cell>{{key.countdown}}</m-table-cell>
                </m-table-row>
            </m-table-body>
        </m-table>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .keys-storage {
    width: 500px;
    min-height: 200px;
    max-height: 600px;
    margin: 10px;
    
    &__head {
      min-height: 40px;
      background: #fff;
      //box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
      //border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    &__body {
      margin-top: 15px;
      
      > table {
        width: 100%
      }
    }
  }
</style>

<script>
    import moment from 'moment';
    import countdown from 'countdown';
    import 'moment-countdown';
    import Storage from 'shared/storage'
    
    export default{
        created() {
            this.fetchKeys();
        },
        
        methods: {
          onSelect(objects) {
            if(Object.keys(objects).length) {
              this.showCtrls = true;
            } else {
              this.showCtrls = false;
            }
          },
          
          fetchKeys() {
            Storage.getAll().then(res => {
              
              
              console.log(res.data);
              
              if(!res.data) return;
              
              Object.keys(res.data).forEach(k => {
                res.data[k].countdown = moment(res.data[k].create_time*1000).add(7, 'days').countdown().toString();
              });
              
              this.keys = res.data;
            });
          }
        },
        
        data(){
            return {
              keys: null,
              showCtrls: false,
            }
        }
    }
</script>
