export default{
    props:["pagination"],
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled':!pagination.has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="$emit('get-product',pagination.current_page -1)" >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="(item,i) in pagination.total_pages" :key="i" :class="{'active':pagination.current_page == item}"  class="page-item"><a class="page-link" href="#" @click.prevent="$emit('get-product',item)">{{item}}</a></li>
      <li class="page-item" :class="{'disabled':!pagination.has_next}">
        <a class="page-link" href="#" aria-label="Next"  @click.prevent="$emit('get-product',pagination.current_page +1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
}