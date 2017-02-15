<template>
    <div class="keys-storage">
      <div class="keys-storage__head">
        <m-button raised primary ripple @click.native="addObject" :disabled="addDisabled">Add</m-button> 
        <m-button raised primary accent v-if="showCtrls" @click.native="rmSelected">Remove</m-button>
      </div>
      
      <div class="keys-storage__body">
        <div class="keys-storage__loader" v-if="isFetchingKays">
          <div>
            Loading...
          </div>
          <m-progress indeterminate></m-progress>
        </div>
        <h3 v-if="!hasObjects">Keys not found</h3>
        <m-table @select="onSelect" v-if="hasObjects">
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
  h3 {
    text-align: center;
  }
  
  .keys-storage {
    width: 500px;
    margin: 10px;
    
    &__loader {
      position: absolute;
      top: 0; bottom: 0; left: 0; right: 0;
      background: #fff;
      z-index: 99;
    }
    
    &__head {
      min-height: 40px;
      background: #fff;
      //box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
      //border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    &__body {
      margin-top: 15px;
      position: relative;
      
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
              this.selected = objects;
            } else {
              this.showCtrls = false;
              this.selected = null;
            }
          },
          
          rmSelected() {
            let deferreds = [];
            
            Object.keys(this.selected).forEach(k => {
              deferreds.push(Storage.rmObject(this.selected[k].token));
            });
            
            Promise.all(deferreds).then(res => {
              this.fetchKeys()
            })
          },
          
          addObject() {
            this.addDisabled = true;
            Storage.newObject().then(res => {
              this.addDisabled = false;
              window.open(res.url, '_blank');
            })
          },
          
          fetchKeys() {
            this.isFetchingKays = true;
            Storage.getAll().then(res => {
              this.isFetchingKays = false;
              
              if(!res.data || !Object.keys(res.data).length) {
                this.hasObjects = false;
                return;
              }
              
              Object.keys(res.data).forEach(k => {
                res.data[k].countdown = moment(res.data[k].create_time*1000).add(7, 'days').countdown().toString();
              });
              
              this.keys = res.data;
              this.hasObjects = true;
            });
          }
        },
        
        data(){
            return {
              keys: null,
              showCtrls: false,
              hasObjects: false,
              addDisabled: false,
              selected: {},
              isFetchingKays: true,
            }
        }
    }
</script>
