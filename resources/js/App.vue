<template>
  <main>
    <div class="wrapper">
      <Navbar />

      <Menu />

      <Header />

      <Footer />

      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
    <FlashMessage position="right top"></FlashMessage>
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Menu from "./components/Menu.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Menu,
    Header,
    Footer
  }
};
</script>