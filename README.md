# <h1> Vue.js Todo App </h1>

By: *Ahmed Zakaria*



### Technologies
  * Vue.js
    - src structure: App.vue, assets, components, composables  
    - instance: name, components, data, mounted, methods, watch, watch handler, props, 
    - directives: v-if, v-model, v-for, v-on(or @ as shorthand)
    - attributes
    - style scoped
    - components
  * Vue CLI: maintain app like install, uninstall dependencies, ,libraries and run app and show errors
  * Scss: vars, nested, partial files
  * JSON
  * JSON server
  * Axios
  * Github


### Feature
  * Not need refresh to show create, update, and delete effect
  * Not need click sort button to show sort effect


### Explanation
Full crud(create, read, update, delete) operations for todos
* on app mounted/refresh: app gets todos from JSON
* on create todo : 
  - todos list updated with new todo automatically without refresh 
  - new todo id = higher todo id in list + 1, not list length + 1 this may cause conflicts where equal id for existing todo, which make ids unique ever
* on update todo: 
  on click todo update icon, take clicked id to find this todo in list and fill data in form, then update todo with new data automatically without refresh 
* on delete todo: 
  on click todo delete icon, take clicked id to remove this todo from list automatically without refresh 
* on sort : 
  - take truthy sort type (asc as true, desc as false) and sort attribute to sort, 
  - first specific sort type, then sort attribute
  - id: sort like with normal numbers with(parseInt)
  - title: sort like with normal chars with (toLowerCase, codePointAt)
  - description: sort on description chars length
  - tags: sort on tags count


### Color Schemes
* ![#00b782](https://placehold.co/12x12/00b782/00b782.png) `#00b782`
* ![#2f485e](https://placehold.co/12x12/2f485e/2f485e.png) `#2f485e`
* ![#a0b9cf](https://placehold.co/12x12/a0b9cf/a0b9cf.png) `#a0b9cf`
* ![#fbfdfd](https://placehold.co/12x12/fbfdfd/fbfdfd.png) `#fbfdfd`



### Run App as follows
  * Clone app: git clone https://github.com/AhmedZkaria22/Vue.js-Todo-App.git
  * Setup npm: npm install
  * Run app: vue ui
  * Run json server: json-server --watch src/json/todos_data.json


#### Find me :
  - Gmail     ahmedzkaria372017@gmail.com 
  - LinkedIn  https://www.linkedin.com/in/ahmed-zakaria-a554a4183
  - Facebook  https://www.facebook.com/profile.php?id=100009428856148 
      
    
> - *your opinion important , Don't hesitate to tell me with any bugs or updates app need*
> - *Wait next version of app*
> - *Wait for more projects*
