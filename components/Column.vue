<template>
  <div class="Col" :class="`Col--${width}`">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '12',
    },
  },
};
</script>

<style>
.Col { padding: 0 0.5rem; }
.Col--1 { flex: 0 0 8.3333%; }
.Col--2 { flex: 0 0 16.6666%; }
.Col--3 { flex: 0 0 25%; }
.Col--4 { flex: 0 0 33.3333%; }
.Col--5 { flex: 0 0 41.6666%; }
.Col--6 { flex: 0 0 50%; }
.Col--7 { flex: 0 0 58.3333%; }
.Col--8 { flex: 0 0 66.6666%; }
.Col--9 { flex: 0 0 75%; }
.Col--10 { flex: 0 0 83.3333%; }
.Col--11 { flex: 0 0 91.6666%; }
.Col--12 { flex: 0 0 100%; }
</style>
