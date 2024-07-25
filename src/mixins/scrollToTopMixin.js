export const scrollToTopMixin = {
  methods: {
    scrollToTop() {
      this.$nextTick(() => {
        const modal = document.querySelector('.p-dialog-content');
        if (modal) {
          modal.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          console.error('Element .p-dialog-content not found');
        }
      });
    }
  }
};
